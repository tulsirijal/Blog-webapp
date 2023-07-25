import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import apiConnect from "../axiosInstance/apiService";
import { useSelector } from "react-redux";
import { RootState } from "../slices/store";
import { toast } from "react-hot-toast";
export default function AddPost() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState<any>(null);
  const [previewImg, setPreviewImg] = useState<any>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  // console.log(value);
  // console.log(state);
  function handleThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const img = e.target.files[0];
    setImg(img);
    handlePrevieImg(img);
  }
  function handlePrevieImg(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewImg(fileReader.result);
    };
  }
  const formData = new FormData();
  formData.append("image", img);
  formData.append("title", title);
  formData.append("description", value);

  async function handleSubmit() {
    if(state!==null){
      handleEdit();
    } else {
     handleMake()

  }
  }

  async function handleEdit(){
    try {
      const response = await apiConnect(
        "PUT",
        `http://localhost:4000/updatePost/${state.id}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data);
      toast.success("Successfully edited");
      handleUpdateThumbnail(state.id);
      navigate('/my-profile');
    } catch (error) {
      toast.error("Error while publishing");
    }
  }

  async function handleUpdateThumbnail(id: number) {
    try {
      const response = await apiConnect(
        "PUT",
        `http://localhost:4000/updatePostImage/${id}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleMake(){
    console.log('hello')
    try {
      console.log('hello world');
      const response = await apiConnect(
        "POST",
        "http://localhost:4000/createPost",
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data);
      toast.success("Successfully created");
      navigate('/my-profile');
    } catch (error) {
      console.log(error);
      toast.error("Error while publishing");
    }
  }

  return (
    <div className="w-11/12 max-w-[1250px] mx-auto">
      <div className="my-4">
        <p className="text-md mb-1">
          Title of the blog <sup>*</sup>
        </p>
        <input
          type="text"
          className="border px-4 py-2 w-full  outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <input
        type="file"
        ref={imageRef}
        className="hidden"
        onChange={handleThumbnail}
      />
      <button
        className="px-4 py-2 border my-4"
        onClick={() => imageRef.current?.click()}
      >
        {state ? "Select Thumbnail" : "Add thumbnail"}
      </button>
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        {previewImg && <div>
          <p className="text-sm mb-1">New Thumbnail</p>
          <img src={previewImg} className="w-[200px] min-h-[150px]" />
        </div>}
        {state && (
            <div>
              <p className="text-sm mb-1">Current Thumbnail</p>
              <img src={state?.image} className="w-[200px] min-h-[150px]" />
            </div>
          
        )} 
      </div>

      <button onClick={handleSubmit} className="px-4 py-2 border my-4">
        Submit
      </button>
    </div>
  );
}
