import { useEffect, useState } from "react";
import apiConnect from "../axiosInstance/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/store";
import { MdDelete } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { setUserPost } from "../slices/userPostSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import getText from "../utlis/getTextFromHtml";
export default function UsersPost() {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const {posts} = useSelector((state:RootState)=>state.userPost); 
  const dispatch  = useDispatch();
  async function getUserPosts() {
    let data;
    setLoading(true);
    try {
      const response = await apiConnect(
        "GET",
        "http://localhost:4000/getUserPosts",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data.data);
      data = response.data.data
      dispatch(setUserPost(response.data.data))
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return data;
  }
 async function handleDeletePost(id:number){
    try {
        const response = await apiConnect('DELETE',`http://localhost:4000/deletePost/${id}`,null,{
            Authorization:`Bearer ${token}`
        });
        console.log(response.data);
        toast.success('Deleted Successfully');
        setUserPost(getUserPosts());;
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="space-y-4 mt-5">
      {loading ? <span className="loader"></span>:posts?.length > 0 ? (
        posts?.map((item, index) => {
          return (
            <div key={index} className="border p-4">
              <div className="flex justify-between gap-x-4 ">
                <div>
                  <h2 className="font-semibold text-xl mb-2">{item.title}</h2>
                  <p className="text-md font-light">{getText(item.description)}</p>
                </div>
                <img src={item.image} className="w-[350px] min-h-[150px]" />
              </div>
              <div className="space-x-2 flex items-center">
                <span onClick={()=>handleDeletePost(item.id)}>
                  <MdDelete className="" />
                </span>
                <Link to='/add-post' state={item}>
                    <span className="text-sm">
                      <BsFillPencilFill />
                    </span>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mt-4 text-sm">You have no posts</div>
      )}
    </div>
  );
}
