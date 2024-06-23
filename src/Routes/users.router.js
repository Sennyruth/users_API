import { Router } from  "express"
const router = Router();

router.get("/", (req, res)=>{
    res.send("getting all users")
})
router.get("/:id", (req, res)=>{
    res.send("getting a single users")
})
router.post("/", (req, res)=>{
    res.send("creating a users")
})
router.patch("/:id", (req, res)=>{
    res.send("updating a users")
})
router.delete("/:id", (req, res)=>{
    res.send("deleting all users")
})

export default router