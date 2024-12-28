const Task = require('../models/Task')


const createTask = async(req,res)=>{

    const{title,description,dueDate}=req.body

    if(!title||!description||!dueDate){
        res.status(400).json({msg:"Parameters Missing to Create Task"})
    }
    try{
        const task = new Task({title,description,dueDate})
        await task.save()

        res.status(201).json(task)
    }catch(err){
        res.status(500).json({msg:"Error Occurs at CreateTask Controller"})
    }

}

const getAllTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({})

        if(!tasks){
            res.status(404).json({msg:"No Tasks Found"})
        }
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json({msg:"Error Ocuured at getAllTasks Route"})
    }
}

const getSingleTask = async(req,res)=>{
    try{
        const id = req.params.taskId

        if(!id){
            res.json(404).json({msg:"Task id is not provided in the params"})
        }
        const task = await Task.findById({_id : id})

        if(!task){
            res.statues(404).json({msg:"Task Not Found"})
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({msg:"Error Ocurred At getSingleTask Controller"})
    }
}


const updateTask = async(req,res)=>{
    try{
        const id = req.params.taskId

        const {title,description,dueDate}= req.body

        if(!id){
            res.json(404).json({msg:"Task id is not provided in the params"})
        }
        const task = await Task.findByIdAndUpdate(id,{
            title,
            description,
            dueDate,
            updatedAt:Date.now()
        },{new:true})

        if(!task){
            res.status(400).json({msg:"Task Not found To update it!!"})
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({msg:"Error Ocurred At updateTask Controller"})
    }
}


const deleteTask = async(req,res)=>{
    try{
        const id = req.params.taskId


        if(!id){
            res.json(404).json({msg:"Task id is not provided in the params"})
        }
        const task = await Task.findByIdAndDelete({_id:id})

        if(!task){
            res.status(400).json({msg:"Task Not found To Delete it!!"})
        }
        res.status(200).json({msg:"Task Deleted Sucessfully"})
    }
    catch(err){
        res.status(500).json({msg:"Error Ocurred At deleteTask Controller"})
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}