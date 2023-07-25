import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { RootState } from "../slices/store";
import apiConnect from "../axiosInstance/apiService";
import { useEffect } from "react";
import { setUser } from "../slices/authSlice";
export default function Navbar() {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const links = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Contact us",
      path: "/contact-us",
    },
  ];
  async function getUserDetails() {
    try {
      const response = await apiConnect(
        "GET",
        "http://localhost:4000/getUserDetails",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(response.data.data);
      dispatch(setUser(response.data.data[0]));
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }
  function matchRoute(path: string) {
    return matchPath({ path: path }, location.pathname);
  }
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="">
      <div className="w-11/12 max-w-[1250px] mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1>Blog</h1>
          </Link>
          <ul className="flex items-center gap-x-2">
            {links.map((link, index) => {
              return (
                <NavLink
                  className={`${
                    matchRoute(link.path) ? "text-blue-500 underline" : ""
                  }`}
                  key={index}
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </ul>
          {user ? (
            <Link to="/my-profile">
              <div className="flex items-center gap-1">
                {user?.image !== null ? (
                  <img src={user?.image} className="w-10 h-10 rounded-full" />
                ) : (
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <p className="font-light text-[16px]">{user?.name}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-x-2">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
