import { useState, useEffect } from "react";
import React from "react";
import Footer from "./Footer";
import ToDoInput from "./ToDoInput";
import { Routes, Route } from "react-router-dom";
import FilterTask from "../Pages/FilterTask";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputContent, setInput] = useState();
  const [done, setDone] = useState(0);

  // console.log(inputContent);
  // console.log(tasks);
  // let save = JSON.stringify(tasks);
  // localStorage.setItem('savedData', save);

  useEffect(() => {
    let saved = localStorage.getItem("savedData");
    saved = JSON.parse(saved);
    // if(saved!== null)
    setTasks(saved);

    // setDone(saved.filter(task=>task.hasDone === true).length);
  }, []);

  useEffect(() => {
    setDone(tasks.filter((task) => task.hasDone === true).length);
    let save = JSON.stringify(tasks);
    localStorage.setItem("savedData", save);
  }, [tasks]);

  const handleChange = (task) => {
    setInput(task);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputContent !== "") {
      let task = {
        content: inputContent,
        hasDone: false,
        isInput: false,
        isShow: false,
        id: tasks.length,
      };
      setTasks((prev) => [...prev, task]);
      setInput("");
      // console.log(tasks);
    }
    // alert('saved');
  };

  const alterTaskChange = (id) => {
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].isInput = !tasks[index].isInput;
    setTasks([...tasks]);
  };

  const onTaskChange = (id, e) => {
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].content = e.target.value;
    setTasks([...tasks]);
  };

  const onKeyUp = (id, e) => {
    if (e.keyCode === 13) {
      let index = tasks.findIndex((task) => task.id === id);
      tasks[index].content === "" ? deleteTask(id) : alterTaskChange(id);
    }
  };

  const deleteTask = (id) => {
    let index = tasks.findIndex((task) => task.id === id);
    let delTask = tasks[index];
    // alert(delTask.hasDone);
    delTask.hasDone === true
      ? setDone((prev) => prev - 1)
      : console.log("del success");
    let newTask = tasks.filter((task) => task.id !== id);
    // newTask = updateId(newTask);
    setTasks(newTask);
  };

  // const updateId = (newTask) => {
  //     for(let i = 0; i< newTask.length; i++){
  //         newTask[i].id = i;
  //     }
  //     return newTask;
  // }

  const setTaskDone = (id) => {
    let index = tasks.findIndex((task) => task.id === id);
    let newTask = tasks;
    newTask[index].hasDone = !newTask[index].hasDone;
    setTasks(newTask);
    newTask[index].hasDone
      ? setDone((prev) => prev + 1)
      : setDone((prev) => prev - 1);
  };

  const selectAll = () => {
    let newTask = tasks;
    //nếu tất cả task đều đã tick thì bỏ tick tất cả
    if (tasks.filter((task) => task.hasDone === true).length === tasks.length) {
      for (let i = 0; i < newTask.length; i++) {
        newTask[i].hasDone = false;
        setDone((prev) => prev - 1);
      }
    }
    //Nếu ko thì tick task nào chưa dc tick
    else {
      for (let i = 0; i < newTask.length; i++) {
        if (newTask[i].hasDone !== true) {
          newTask[i].hasDone = true;
          setDone((prev) => prev + 1);
        }
      }
    }

    setTasks(newTask);
    // let newTasks = [];
    // for(let i = 0 ; i < tasks.length; i++){
    //     if (!tasks[i].hasDone) {
    //         tasks[i].hasDone = true;
    //     }
    //     newTasks = [...newTasks, tasks[i]];
    // }
    // console.log("newTasks", newTasks)
    // setTasks([...newTasks]);
  };

  const deleteAllCompleted = () => {
    let newTask = tasks.filter((task) => task.hasDone !== true);
    setDone(0);
    setTasks(newTask);
  };

  const onMouseEnter = (id) => {
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].isShow = true;
    setTasks([...tasks]);
  };

  const onMouseLeave = (id) => {
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].isShow = false;
    setTasks([...tasks]);
  };

  return (
    <div className="container row d-flex flex-column">
      <div className="col-5 fs-4">
        <h1>Todos</h1>
        <ToDoInput
          handleSubmit={handleSubmit}
          selectAll={selectAll}
          handleChange={handleChange}
          inputContent={inputContent}
        />
        <ul className="list-group">
          <Routes>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <FilterTask
                    tasks={tasks}
                    alterTaskChange={alterTaskChange}
                    deleteTask={deleteTask}
                    setTaskDone={setTaskDone}
                    onTaskChange={onTaskChange}
                    onKeyUp={onKeyUp}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </React.Fragment>
              }
            />
            <Route
              path="/active"
              element={
                <React.Fragment>
                  <FilterTask
                    tasks={tasks.filter((task) => task.hasDone === false)}
                    alterTaskChange={alterTaskChange}
                    deleteTask={deleteTask}
                    setTaskDone={setTaskDone}
                    onTaskChange={onTaskChange}
                    onKeyUp={onKeyUp}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </React.Fragment>
              }
            />
            <Route
              path="/completed"
              element={
                <React.Fragment>
                  <FilterTask
                    tasks={tasks.filter((task) => task.hasDone === true)}
                    alterTaskChange={alterTaskChange}
                    deleteTask={deleteTask}
                    setTaskDone={setTaskDone}
                    onTaskChange={onTaskChange}
                    onKeyUp={onKeyUp}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </React.Fragment>
              }
            />
          </Routes>
        </ul>
      </div>
      <Footer
        done={done}
        tasks={tasks}
        deleteAllCompleted={deleteAllCompleted}
      />
    </div>
  );
}

export default ToDoApp;
