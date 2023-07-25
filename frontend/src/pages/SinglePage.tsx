import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConnect from "../axiosInstance/apiService";
import getText from "../utlis/getTextFromHtml";
interface Post {
  id: number;
  title: string;
  description: string;
  postImage?: string;
  userImage?: string;
  name: string;
}
export default function SinglePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post[] | []>([]);
  async function getPost() {
    setLoading(true);
    try {
      const response = await apiConnect(
        "GET",
        `http://localhost:4000/getPost/${id}`
      );
      console.log(response.data.message);
      setPost(response?.data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="w-11/12 max-w-[1250px] mx-auto mt-5">
      {loading ? (
        <span className="spinner"></span>
      ) : (
        <div>
          {post.map((post: Post, index) => {
            return (
              <div key={index} className=" border p-4">
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-4 ">
                  <div>
                    <h2 className="font-semibold text-xl mb-2 mt-2 md:mt-0">{post.title}</h2>
                    <p className="text-md font-light">{getText(post.description)}</p>
                  </div>
                  <img
                    src={post.postImage}
                    className="w-[350px] min-h-[150px]"
                  />
                </div>
                <div className="mt-4 md:mt-2">
                  {post.userImage == null ? (
                    <img
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.name}`}
                      className="w-10 h-10 rounded-full "
                    />
                  ) : (
                    <img src={post.userImage} className="w-10 h-10 rounded-full"/>
                  )}
                  <p className="font-medium">{post.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
