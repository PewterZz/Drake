import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { set, ref, onValue, remove, update } from "firebase/database";
import fetch from "node-fetch";
import "./Homepage.css";
import AddIcon from "@mui/icons-material/Add.js";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import LogoutIcon from '@mui/icons-material/Logout.js';
import CheckIcon from '@mui/icons-material/Check.js';

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const collectionRef = collection(db, "todos");

  const getlist = async () => {
    const response = await fetch("http://localhost:8080/get-todo");
    const data = await response.json();
    setTodos(data);
    console.log(data);
  };

  useEffect(() => {
    getlist();
  
  }, []);
  
  

  const handleSignOut = () => {
    navigate("/login");
  };

  const writeToDatabase = async (datbod) => {
    const response = await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: datbod }),
    });
    const data = await response.json();
    setTodo("");
    getlist();
    }
    

  const handleUpdate = async (id, new_todo) => {
    const response = await fetch("http://localhost:8080/update/" + String(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: new_todo }),
    });
    const data = await response.json();
    setTodo("");
    getlist();
    
  };

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:8080/delete/" + String(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTodo("");
    getlist();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setIsOpen(false);
    handleUpdate(tempUidd, inputValue);
    setInputValue("");
  };

  


  return (
    <div className="homepage">
      <div>
        <h1 >Todo App</h1>
        <LogoutIcon className="logout-icon" onClick={handleSignOut} />
      </div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter your todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className={"input"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                writeToDatabase(todo);
              }
            }}
          />
          {isEdit ? (
            <CheckIcon onClick={console.log("lol")} />
          ) : (
            <AddIcon className="add-confirm-icon" onClick={() => writeToDatabase(todo)} />
          )}
        </div>
        {isOpen && (
                  <div>
                    <div>Enter some text:</div>
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleClose}>Cancel</button>
                  </div>
                )}
        <div className="todo">
          {todos.map((todi) => {
            console.log(todi.data);
            return (
            <div className="homepage__body__todos__todo" key={todi.id}>
              <div className="homepage__body__todos__todo__icons">
                <EditIcon className="edit-button" onClick={() => {  
                  setTempUidd(todi.id);
                  handleOpen();
                }} />
                <DeleteIcon className="delete-button" onClick={() => handleDelete(todi.id)} />
              </div>
              <p>{todi.data}</p>
            </div>
          )})}
        </div>
      </div>
    </div>

  );
}
