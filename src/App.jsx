import { useState } from "react";
import TodoZa from "./todoza";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");

  const schemaSubtodo = { title: "", checked: false };
  const schemaTodo = { title: "", checked: false, sub: [] };

  const add = () => {
    setTodo([...todo, { ...schemaTodo, title: text }]);
  };

  const addSubTodo = (index) => {
    const newTodo = [...todo];
    newTodo[index].sub.push({ ...schemaSubtodo, title: text });
    setTodo(newTodo);
    setText("");
  };

  const update = (type, index, subIndex) => {
    if (!text) return;
    if (type === "todo") {
      setTodo(
        todo.toSpliced(index, 1, {
          ...todo[index],
          title: text,
        })
      );
    } else {
      setTodo(
        todo.toSpliced(index, 1, {
          ...todo[index],
          sub: todo[index].sub.toSpliced(subIndex, 1, {
            ...todo[index].sub[subIndex],
            title: text,
          }),
        })
      );
    }
    setText("");
  };

  const checkTodo = (type, index, subIndex) => {
    const newTodo = todo.find((v, i) => i == index);

    if (type === "todo") {
      newTodo.checked = !newTodo.checked;
      if (newTodo.checked) {
        newTodo.sub.forEach((v, i) => (newTodo.sub[i].checked = true));
      } else newTodo.sub.forEach((v, i) => (newTodo.sub[i].checked = false));

      setTodo(todo.toSpliced(index, 1, newTodo));
    } else {
      const newSubtodo = newTodo.sub.find((v, i) => i === subIndex);
      newSubtodo.checked = !newSubtodo.checked;
      newTodo.sub = newTodo.sub.toSpliced(subIndex, 1, newSubtodo);
      newTodo.sub.every((v) => v.checked)
        ? (newTodo.checked = true)
        : (newTodo.checked = false);
      setTodo(todo.toSpliced(index, 1, newTodo));
    }
  };

  const deleteJa = (type, index, subIndex) => {
    if (type === "todo") {
      setTodo(todo.toSpliced(index, 1));
    } else {
      setTodo(
        todo.toSpliced(index, 1, {
          ...todo[index],
          sub: todo[index].sub.toSpliced(subIndex, 1),
        })
      );
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-100 h-[100dvh]">
      <div className="p-5 items-center gap-5 bg-slate-400 w-1/2 flex justify-center flex-col rounded-2xl">
        <h2 className="text-2xl font-bold">Todo list</h2>
        <label htmlFor="" className="flex gap-4 w-full">
          <input
            className="rounded-lg flex-1 outline-none p-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              add();
              setText("");
            }}
            className="px-3 py-1 border bg-green-400 rounded-lg hover:bg-white duration-300 hover:text-green-400 hover:border-green-400"
          >
            add
          </button>
        </label>
        <div className="w-full flex flex-col gap-2">
          {todo.map((v, i) => (
            <TodoZa
              key={i}
              i={i}
              todoall={todo}
              todo={v}
              setTodo={setTodo}
              addSubTodo={addSubTodo}
              deleteJa={deleteJa}
              update={update}
              checkTodo={checkTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
