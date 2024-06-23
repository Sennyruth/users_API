import pool from "../db.config.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.messsage });
  }
};

export const getSpecificUser = async (req, res) => {
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
};

export const createUser = async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const avatar = req.body.avatar;
    const insert = await pool.query(
      "INSERT INTO users (first_name, last_name, email, occupation , avatar) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, email, occupation, avatar],
    );
    if (insert.rowCount === 1) {
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { first_name, last_name, email, occupation, avatar } = req.body;
  const id = req.params.id;
  try {
    let updateOperation;
    if (first_name) {
      updateOperation = await pool.query(
        "UPDATE users SET first_name = $1 WHERE id=$2",
        [first_name, id],
      );
    }
    if (last_name) {
      updateOperation = await pool.query(
        "UPDATE users SET last_name = $1 WHERE id=$2",
        [last_name, id],
      );
    }
    if (email) {
      updateOperation = await pool.query(
        "UPDATE users SET email = $1 WHERE id=$2",
        [email, id],
      );
    }
    if (occupation) {
      updateOperation = await pool.query(
        "UPDATE users SET occupation = $1 WHERE id=$2",
        [occupation, id],
      );
    }
    if (avatar) {
      updateOperation = await pool.query(
        "UPDATE users SET avatar = $1 WHERE id=$2",
        [avatar, id],
      );
    }

    if (updateOperation.rowCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteOperation = await pool.query(" DELETE FROM users where id=$1", [
      id,
    ]);
    if (deleteOperation.rowCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
