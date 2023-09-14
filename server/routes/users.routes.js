const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM users");
    let rowUser = data[0];
    res.json({
      users: rowUser,
      message: "Lấy toàn bộ users",
    });
  } catch (error) {
    res.json({
      messenge: "K thấy users",
    });
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const users = await db.execute("SELECT * FROM users");
    let [rows] = users;
    const user = rows.find(
      (row, i) => row.email == email && row.password == password
    );
    if (user) {
      res.json({
        status: "success",
        user: user,
      });
    } else {
      res.json({
        status: "error",
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
