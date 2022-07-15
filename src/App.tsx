import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyBQZh0b1TSZ8A7N-YWQjVDe-EBVhpZ52zY",
  authDomain: "todolist-1dde5.firebaseapp.com",
  projectId: "todolist-1dde5"
});

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
  const [name, setName] = useState("")
  const [email, setEmail] = useState ("")
  const [users, setUsers] = useState([])

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);

    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Edit Task"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      ></Modal>
      <Header></Header>
      <main className={styles.main}>
        <div>
          <h2>What will you do?</h2>
          <TaskForm
            btnText="Create Task"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Your tasks:</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
