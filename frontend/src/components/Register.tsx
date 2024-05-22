import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <div className="bg-white p-3 rounded-lg flex flex-col items-center">
          <h2 className="head font-semibold text-2xl">Login</h2>
          <form action="">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
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
        </div>
      </div>
    </>
  );
}

export default Register;
