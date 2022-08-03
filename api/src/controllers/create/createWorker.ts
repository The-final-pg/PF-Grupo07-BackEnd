const UserWorker = require("../../models/UserWorker"); 
const bcryptW = require("bcrypt"); 
/* import * as bcryptW from "bcrypt" */

export const createWorker = async (req: any, res: any) => {
    const worker  = req.body;
    console.log("worker", worker)
    try {
        /* const workerEmail = worker.user_mail
        let userWorker = await UserWorker.findOne({workerEmail});
        if(userWorker){
            return res.send("User already exists. Please log in.")
        } */
        const workerPassword = worker.password
        if(workerPassword === "undefined" || workerPassword.length < 8){
            throw new Error("Invalid user or password")}
        const hashedPassword = await bcryptW.hash(workerPassword, 8)
        const workerCreated = await UserWorker.create({
            ...worker,
            password: hashedPassword,
            user_mail: worker.user_mail.toLowerCase()
        }) 
        return res.json(hashedPassword)
    } catch (err) {
        console.log("error", err)
        return res.json({msg: "An error has occurred"})
    }
}

