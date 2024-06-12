const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://admin:Bayo8955@cluster0.r3hwbte.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0")

app.get('/getUsers',(req,res)=>{
    UserModel.find({}).then((users)=>{
        res.json(users)
    }).catch((err)=>{
        res.json(err)
    })
})

app.post("/createUser", async (req,res)=>{
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()
    res.json(user)
})

app.delete("/deleteUser/:id", async (req,res)=>{
    const userId = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (deletedUser) {
            res.json({ message: "User deleted successfully", deletedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3001,()=>{
    console.log(`listening on port 3001 `)
})