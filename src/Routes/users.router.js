import { Router } from  "express"
import pool from '../db.config.js'

const router = Router();

router.get("/", async(req, res)=>{
    try {
        const result = await pool.query("SELECT * FROM users")
        res.status(200).json({ success: true, data: result.rows })
    } catch (error) {
        res.status(500).json({ success: false, message: error.messsage }) 
    }
})

router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
        if(result.rowCount === 0){
            res.status(404).json({ success:false, message: "User not found"})
        } else {
            res.status(200).json({ success: true, data:result.rows })
        }
    } catch (error) {
        res.status(500).json({ success:false, message: error.message })
    }
})

router.post("/", async (req, res)=>{
    try {
        const result = await pool.query("insert into users (first_name, last_name, email, occupation , avatar)")
        res.send(`${result} created successfully`)
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
})

router.patch("/:id", (req, res)=>{
    const id = req.params.id;
    res.send("updating a users")
})

router.delete("/:id", (req, res)=>{
    res.send("deleting all users")
})

export default router