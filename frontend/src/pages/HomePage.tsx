import { useEffect, useState } from "react";
import apiConnect from "../axiosInstance/apiService";
import { Link } from "react-router-dom";
import getText from "../utlis/getTextFromHtml";

interface Posts {
  id: number;
  title: string;
  description: string;
  image?: string;
  userId: number;
}
export default function HomePage() {
  const [posts, setPosts] = useState<Posts[] | []>([]);
  const [loading, setLoading] = useState(false);
  async function getAllPosts() {
    setLoading(true);
    try {
      const response = await apiConnect(
        "GET",
        "http://localhost:4000/getPosts"
      );
      console.log(response.data.message);
      setPosts(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  
  return (
    <div className="w-11/12 max-w-[1250px] mx-auto my-5">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post: Posts, index) => {
            return (
              <div
                key={index}
                className=" border p-4 space-y-2"
                
              >
                <div className=" flex flex-col gap-2 ">
                  <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-xl mb-2">{post.title}</h2>
                      <p className="text-md font-light">
                        {getText(post.description.substring(0, 300))}....
                      </p>
                    </div>
                    <img src={post.image} className="w-[250px] min-h-[150px]" />
                  </div>
                <Link to={`/post/${post.id}`} className="border px-4 py-2 sm:self-start text-center">
                    <span className="">Read more</span>
                </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
