import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { signupUser } from "../features/todo/authSlice";

function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (userData.password !== userData.confirmPassword) {
      alert("Password must be same");
      return;
    }
    const resultAction = await dispatch(
      signupUser({ email: userData.email, password: userData.password })
    );
    if (signupUser.fulfilled.match(resultAction)) {
      nagivate("/");
    }
  };
  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <div className="bg-white p-3 rounded-lg flex flex-col items-center">
          <h2 className="head font-semibold text-2xl">Sign up</h2>
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
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="border-black border-2 rounded-md  w-96 h-12 text-black p-2"
              />
            </div>
            <h2 className="font-semibold">
              Already have Account? <Link to="/register">Login in</Link>
            </h2>
            <button
              className=" bg-sky-600 w-full rounded-md p-2 hover:bg-indigo-800 text-lg font-semibold"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Register;
