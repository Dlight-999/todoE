import React from "react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/todo/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-black text-white w-full absolute">
        <div>Todo</div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
