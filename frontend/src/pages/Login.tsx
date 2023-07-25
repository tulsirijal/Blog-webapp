import { useState } from "react";
import apiConnect from "../axiosInstance/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../slices/authSlice";
type Formdata = {
  email: string;
  password: string;
};
export default function Login() {
  const [formData, setFormData] = useState<Formdata>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(formData);
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await apiConnect(
        "POST",
        "http://localhost:4000/login",
        formData
      );
      console.log(response.data);
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.data));
      toast.success("Successfully Logged in");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
  }
  return (
    <div className="h-[calc(90vh)] flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-11/12 max-w-[300px] border p-5 rounded-sm"
      >
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="email" className="font-medium">
            Email <sup>*</sup>
          </label>
          <input
            type="text"
            value={formData.email}
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="border outline-none px-4 py-2 w-full "
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="password" className="font-medium">
            Password <sup>*</sup>
          </label>
          <input
            type="text"
            value={formData.password}
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="border outline-none px-4 py-2 w-full "
          />
        </div>
        <button
          type="submit"
          className="text-md  border rounded-md mt-2 px-4 py-2 hover:scale-95 transition-all duration-200 "
        >
          Login
        </button>
      </form>
    </div>
  );
}
