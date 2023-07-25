import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/store";
import { useRef, useState } from "react";
import apiConnect from "../axiosInstance/apiService";
import { toast } from "react-hot-toast";
import UsersPost from "../components/UsersPost";
import { useNavigate,Link } from "react-router-dom";
import { setUser } from "../slices/authSlice";

export default function MyProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const  {token} = useSelector((state:RootState)=>state.auth);
  const [loading,setLoading] = useState(false);
  const [previewImg,setPreviewImg] = useState<any>(null);
  const [imageData,setImageData] = useState<null | File>(null);
  const imageRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  function handleSelectImage(){
    imageRef.current?.click();
  }
  function handleImage(e:React.ChangeEvent<HTMLInputElement>){
    if (!e.target.files) return
    const img = e.target.files[0];
    setImageData(img);
    console.log(img);
    handlePreviewImg(img);
  }
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData:any = new FormData();
    formData.append('image',imageData);
    setLoading(true)
    try {
      const response = await apiConnect('PUT','http://localhost:4000/updateDisplayPicture',formData,{
        Authorization:`Bearer ${token}`
      });
      console.log(response.data);
      setLoading(false);
      toast.success('updated successfully');

    } catch (error) {
      console.log(error);
      toast.error('AN error ');
      setLoading(false);
    }
  }
  function handlePreviewImg(file:File){
    const fileReader:any = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = ()=>{
      setPreviewImg(fileReader.result);
    }
  }
  function handleLogout(){
    localStorage.clear();
    dispatch(setUser(null));
    navigate('/');
  }
  return (
    <div className="w-11/12 max-w-[1250px] mx-auto mt-5">
      <div className="flex items-center gap-x-3">
          <div>
            {user?.image !== null ? (
              <img src={previewImg || user?.image} className="w-14 h-14 rounded-full" />
            ) : (
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`}
                className="w-14 h-14 rounded-full"
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input type="file" ref={imageRef} className="hidden" onChange={handleImage} />
            <button className="border px-4 py-2 mr-2" type="button" onClick={handleSelectImage}>Select</button>
            <button className="border px-4 py-2 ">{loading ? "Uploading..." : "Upload"}</button>
          </form>
      </div>
      <UsersPost/>
      <div className="my-4 space-x-2">
        <Link to='/add-post' className=''>
          <button className="border px-4 py-2">Add blog</button>
        </Link>
        <button className="border px-4 py-2" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}


