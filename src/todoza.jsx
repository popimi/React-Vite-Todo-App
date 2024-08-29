import React, { useState } from "react";

const TodoZa = ({
  i,
  todo,
  todoall,
  setTodo,
  addSubTodo,
  deleteJa,
  update,
  checkTodo,
}) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDrop = (index) => {
    const updatedSubTodos = [...todo.sub];
    const [removed] = updatedSubTodos.splice(draggedItemIndex, 1);
    updatedSubTodos.splice(index, 0, removed);
    setTodo(todoall.toSpliced(i, 1, { ...todo, sub: updatedSubTodos }));
    setDraggedItemIndex(null);
  };
  return (
    <div className="p-2 bg-slate-200 rounded-lg w-full flex flex-col gap-4 hover:bg-slate-100 duration-300">
      <div className="flex justify-between">
        <label className="flex gap-4 font-semibold justify-center items-center">
          <input
            className="size-3"
            type="checkbox"
            value={todo.checked}
            checked={
              todo.checked || todo.sub.length > 0
                ? todo.sub.every((v) => v.checked)
                  ? true
                  : false
                : false
            }
            onChange={(e) => {
              checkTodo("todo", i);
              console.log(todo);
            }}
          />
          <p className={`${todo.checked ? "line-through" : ""} text-2xl `}>
            {todo?.title}
          </p>
        </label>
        <div className="flex gap-3 justify-center items-center">
          <button
            className="px-2 py-1 bg-green-400 rounded-md"
            onClick={() => addSubTodo(i)}
          >
            addsub
          </button>
          <button
            className="px-2 py-1 bg-red-400 rounded-md"
            onClick={() => deleteJa("todo", i)}
          >
            delete
          </button>
          <button
            className="px-2 py-1 bg-blue-400 rounded-md"
            onClick={() => update("todo", i)}
          >
            update
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {todo.sub?.length > 0 &&
          todo.sub.map((a, index) => (
            <div
              className="bg-slate-400 rounded-md pl-5 pr-2 py-2 flex justify-between w-full duration-300 hover:bg-slate-300"
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              <label className="flex gap-3 justify-center items-center">
                <input
                  value={a.checked}
                  checked={a.checked ? true : false}
                  type="checkbox"
                  onChange={() => checkTodo("subtodo", i, index)}
                />
                <span className={`${a.checked ? "line-through" : ""}`}>
                  {a.title}
                </span>
              </label>
              <div className="flex gap-3 justify-center items-center">
                <button
                  className="px-2 py-1 bg-red-400 rounded-md"
                  onClick={() => deleteJa("subtodo", i, index)}
                >
                  delete
                </button>
                <button
                  className="px-2 py-1 bg-blue-400 rounded-md"
                  onClick={() => update("subtodo", i, index)}
                >
                  update
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoZa;
