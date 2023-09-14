const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

function checkUserRole(req, res, next) {
  const userRole = req.body.user.roles;
  if (userRole == 1) {
    next();
  } else {
    res.status(403).json({
      status: "error",
      message: "Bạn không có quyền CRUD todo.",
    });
  }
}
router.get("/", async (req, res) => {
  try {
    const todo0 = await db.execute("SELECT * FROM works WHERE status = 0");
    let [rows] = todo0;
    const todo1 = await db.execute("SELECT * FROM works WHERE status = 1");
    let [rows2] = todo1;
    res.json({
      status: "success",
      todo0: rows,
      todo1: rows2,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", checkUserRole, async (req, res) => {
  const { name } = req.body.todo;
  try {
    const todo = await db.execute(
      "INSERT INTO works (name,status) VALUES (?,?)",
      [name, 0]
    );
    let [rows] = todo;
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", checkUserRole, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db.execute("SELECT status FROM works WHERE id = ?", [id]);
    let [rows] = todo;
    if (rows.length > 0) {
      const currentStatus = rows[0].status;
      const newStatus = currentStatus == 0 ? 1 : 0;
      const updateResult = await db.execute(
        "UPDATE works SET status = ? WHERE id = ?",
        [newStatus, id]
      );

      if (updateResult[0].affectedRows > 0) {
        res.json({
          status: "success",
          newStatus: newStatus,
        });
      } else {
        res.json({
          status: "error",
          message: "Todo not found",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = JSON.parse(req.query.user);
  const userRole = user.roles;
  try {
    if (userRole == 1) {
      const todo = await db.execute("DELETE FROM works WHERE id = ?", [id]);
      let [rows] = todo;
      if (rows.affectedRows > 0) {
        res.json({
          status: "success",
          todos: rows,
        });
      } else {
        res.json({
          status: "error",
          message: "Todo not found",
        });
      }
    } else {
      res.status(403).json({
        status: "error",
        message: "Bạn không có quyền CRUD todo.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
