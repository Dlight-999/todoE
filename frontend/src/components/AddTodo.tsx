import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Todo } from "../types/Todo";
import { addTodo } from "../features/todo/todoSlices";

function AddTodo() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    task: "",
    description: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.task && data.description) {
      const newTodo: Omit<Todo, "_id" | "createdAt" | "updatedAt"> = {
        task: data.task,
        description: data.description,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setData({
        task: "",
        description: "",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="bg-black text-white rounded-lg w-auto p-5">
          Add Todo
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="name">Todo</label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  value={data.task}
                  onChange={handleChange}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-md w-96 h-12 text-black p-2"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={data.description}
                  onChange={handleChange}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-md  w-96 h-12 text-black p-2"
                />
              </div>
              <button
                className="my-5 bg-sky-600 rounded-md p-2 hover:bg-indigo-800 text-lg font-bold"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTodo;
