import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { loginUser } from "../features/todo/authSlice";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useAppDispatch();
  const nagivate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(
      loginUser({ email: userData.email, password: userData.password })
    );
    if (loginUser.fulfilled.match(resultAction)) {
      nagivate("/");
    }
  };
  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <div className="bg-white p-3 rounded-lg flex flex-col items-center">
          <h2 className="head font-semibold text-2xl">Login</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                className="border-black border-2 rounded-md  w-96 h-12 text-black p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={userData.password}
                onChange={handleChange}
                className="border-black border-2 rounded-md  w-96 h-12 text-black p-2"
              />
            </div>
            <h2 className="font-semibold">
              Don't have a account? <Link to="/register">Sign Up</Link>
            </h2>
            <button
              className=" bg-sky-600 w-full rounded-md p-2 hover:bg-indigo-800 text-lg font-semibold"
              type="submit"
            >
              Login
            </button>
          </form>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
