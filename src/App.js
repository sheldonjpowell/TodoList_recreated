import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "./components/AddTask";
import UpdateForm from "./components/UpdateForm";
import ToDo from "./components/ToDo";
import "./App.css";
import AddTaskForm from "./components/AddTask";

function App() {
  // Tasks (TO Do list) State
  const [toDo, setToDo] = useState([]);

  //Temp State

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //  Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };
  // Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };
  // Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };
  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };
  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h1>To Do List</h1>
      <br />
      <br />
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
          changeTask={changeTask}
        />
      ) : (
        <AddTaskForm
          newtask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}
      {/* display Todos */}

      {toDo && toDo.length ? "" : "No Tasks..."}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
