import React, { useEffect, useState } from "react";
import axios from "axios";

function Works() {
  const [taskUnCompleted, setTaskUnCompleted] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [todo, setTodo] = useState({
    name: "",
    status: 0,
  });

  const getTask = async () => {
    await axios
      .get("http://localhost:3000/api/v1/works")
      .then((res) => {
        setTaskCompleted(res.data.todo1);
        setTaskUnCompleted(res.data.todo0);
      })
      .catch((err) => console.log(err));
  };

  const handleAddTodo = () => {
    console.log(user);
    if (todo.name) {
      if (user && user.roles == 1) {
        axios
          .post(`http://localhost:3000/api/v1/works`, { user, todo })
          .then((res) => {
            setTodo({
              name: "",
              status: 0,
            });
            getTask();
          })
          .catch((err) => console.log(err));
      } else {
        alert("bạn k có quyền thêm todo");
      }
    } else {
      alert("K đc để trống");
    }
  };

  const handleUpdate = (task) => {
    console.log(task);
    console.log(user);
    if (user && user.roles == 1) {
      axios
        .put(`http://localhost:3000/api/v1/works/${task}`, { user, task })
        .then((res) => {
          getTask();
        })
        .catch((err) => console.log(err));
    } else {
      alert("Bạn không có quyền cập nhật todo.");
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const handleDeleteTodo = (id) => {
    console.log(user);
    if (user && user.roles == 1) {
      console.log(id);
      axios
        .delete(
          `http://localhost:3000/api/v1/works/${id}?user=${JSON.stringify(
            user
          )}`
        )
        .then((res) => {
          getTask();
        })
        .catch((err) => console.log(err));
    } else {
      alert("Bạn không có quyền xoá todo.");
    }
  };

  const handleChange = (e) => {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getTask();
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <div className="btn" style={{ marginLeft: "40%" }}>
        <div className="action">
          <div className="action-add">
            <input
              type="text"
              placeholder="Add"
              name="name"
              onChange={handleChange}
              value={todo.name}
            />
          </div>
          <button className="action-icon" onClick={handleAddTodo}>
            <i class="fa-solid fa-plus cursor"></i>
          </button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Công việc</th>

            <th scope="col" colSpan={2}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {taskUnCompleted.map((taskun, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{taskun.name}</td>
              <td>
                <button
                  onClick={() => handleUpdate(taskun.id)}
                  className="btn btn-info"
                >
                  Hoàn thành
                </button>
                <button
                  onClick={() => handleDeleteTodo(taskun.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="col-6 container">
        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Completed Công việc</h3>
        </div>
        {taskCompleted.map((taskCom, index) => (
          <div
            key={index}
            className="mb-3"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid black",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <p style={{ fontSize: "20px", marginTop: "10px" }}>
              {" "}
              {taskCom.name}{" "}
            </p>
            <div>
              <span
                style={{ marginRight: "10px" }}
                onClick={() => handleDeleteTodo(taskCom.id)}
              >
                <i class="fa-solid fa-circle-check cursor"></i>
              </span>
              {/* <span onClick={() => handleUpdate(taskCom)}>
                <i class="fa-solid fa-circle-check cursor"></i>
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Works;
