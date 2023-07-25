import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SinglePage from "./pages/SinglePage";
import MyProfile from "./pages/MyProfile";
import AddPost from "./pages/AddPost";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<SinglePage />} />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              {" "}
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-post"
          element={
            <PrivateRoute>
              <AddPost />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>Error !! NOT FOUND</h1>} />
      </Routes>
    </>
  );
}

export default App;
