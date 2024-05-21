import React from "react";
import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import GetTodo from "../components/GetTodo";
function Home() {
  return (
    <>
      <div className="flex flex-col w-full ">
        <Navbar />
        <div className="h-screen w-full bg-gray-400">
          <div className="flex justify-evenly h-full">
            <AddTodo />
            <GetTodo />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
