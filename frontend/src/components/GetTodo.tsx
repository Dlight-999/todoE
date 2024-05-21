import React, { useEffect } from "react";
import { RootState } from "../app/store";
import { deleteTodo, getTodo } from "../features/todo/todoSlices";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { formatDistanceToNow } from "date-fns";

function GetTodo() {
  const dispatch = useAppDispatch();
  const { todo } = useAppSelector((state: RootState) => state.todo);

  useEffect(() => {
    const fetchTodos = () => {
      dispatch(getTodo());
    };

    // Fetch todos initially when component mounts
    fetchTodos();

    // Update todos every 5 minutes
    const intervalId = setInterval(fetchTodos, 5 * 60 * 1000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  return (
    <>
      <div className="flex w-full h-full flex-col items-center py-5 mx-2 pt-20 overflow-auto">
        {todo.map((item) => (
          <div
            className="flex flex-col border-b-2 border-black bg-white rounded-lg shadow-xl shadow-gray-600 border text-black p-5 w-full my-2 mx-10 text-lg"
            key={item._id}
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">Task: {item.task}</h2>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
            <div className="flex w-full justify-between itmes-start">
              <h2>Description: {item.description}</h2>
            </div>
            <div className="flex w-full justify-between itmes-start">
              <h2>
                {item.createdAt &&
                  formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetTodo;
