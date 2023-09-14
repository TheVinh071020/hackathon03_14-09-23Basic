import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(user);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users", user)
      .then((res) => {
        if (res.data.status == "success") {
          navigate("/admin");
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu");
        }
      })
      .catch((err = console.log(err)));
  };

  return (
    <div>
      <div
        className="container"
        style={{ height: "100vh", width: "60%", marginTop: "35px" }}
      >
        <h1>Đăng nhập</h1>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
