import { Router } from "express";
import pool from "../db.config.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.messsage });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res.status(200).json({ success: true, data: result.rows });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const validateUser = (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const occupation = req.body.occupation;
  const avatar = req.body.avatar;
  if (!first_name || !last_name || !email || !occupation || !avatar) return res.status(400).json({success: false, message: "All fields must be filled"}) 
  next()
};

router.post("/", validateUser, async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const avatar = req.body.avatar;
    const insert = await pool.query(
      "INSERT INTO users (first_name, last_name, email, occupation , avatar) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, email, occupation, avatar]
    );
    if (insert.rowCount === 1) {
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send("updating a users");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteOperation = await pool.query(" DELETE FROM users where id=$1", [id])
    if(deleteOperation.rowCount === 1){
        res.status(200).json({ success: true, message: "User deleted successfully" })
    } else {
        res.status(400).json({ success: false, message: "Invalid user" })
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message })
  }
});

export default router;
