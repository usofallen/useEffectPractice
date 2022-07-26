import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { getList, setItem } from "./services/list";

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const [list, setList] = useState([]);
  let mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((items) => {
      if (mounted.current) {
        setList(items);
      }
    });
    return () => (mounted.current = false);
  }, [alert, list, mounted]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert, mounted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput).then(() => {
      if (mounted.current) {
        setItemInput("");
        setAlert(true);
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <h1>My Grocery List</h1>
        <ul>
          {list.map((item) => (
            <li key={item.item}>{item.item}</li>
          ))}
        </ul>
        {alert && <h2> Submit Successful </h2>}
        <form onSubmit={handleSubmit}>
          <label>
            <p>New Item</p>
            <input
              type="text"
              name="item"
              onChange={(event) => setItemInput(event.target.value)}
              value={itemInput}
            />
          </label>
          <button type="submit">Add Item</button>
        </form>
      </div>
    </>
  );
}

export default App;
