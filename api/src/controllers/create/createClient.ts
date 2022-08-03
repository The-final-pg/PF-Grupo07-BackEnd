const Client = require("../../models/UserClient");
const bcryptC = require("bcrypt");

const createClient = async (req: any, res: any) => {
    let client = req.body;
    try {
        if(typeof(client.password) === "undefined" || client.password.length < 8){
            throw new Error("Invalid user or password")}
        const hashedPassword = await bcryptC.hash(client.password)
        const clientCreated = await Client.create({
            ...client,
            password: hashedPassword,
            user_mail: client.user_mail.toLowerCase()
        })
        return res.json(clientCreated)
    } catch (err) {
        res.json({msg: "An error has occurred"})
    }
}

module.exports = createClient;