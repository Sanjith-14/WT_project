
const items = require("../models/user_model")
const Credential = items.Credential;
const Detail = items.Detail;

const RegisterUser = async (req,res)=>{
    try {
        const {email,name,role,password} = req.body;
        const userCheck = await Credential.find({email:email})
        if(userCheck.length == 0){
            const credential = new Credential({email:email,name:name,role:role,password:password})
            await credential.save()
            const detail = new Detail({name:name,email:email})
            await detail.save()
            return res.status(200).json({ message: "User registered successfully" })
            // redirect to home / login page
        }
        else{
            return res.status(200).json({ message: "User already exists" })
            // Redirect to login page
        }
    } catch (error) {
        console.log("Error in Register User")
        console.log(error);
        res.send(error);
    }
}

const LoginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;
        let user = await Credential.find({email:email,password:password})
        if(user.length != 0){
            res.status(200).json({message: "User login successful"});
            // Redirect to login page
        }
        else{
            res.status(200).json({message :"Invalid user.Please login again"})
            // Redirect to login page
        }
    } catch (error) {
        console.log("Error in login user")
        console.log(error)
        res.send(error)
    }
}

module.exports = {RegisterUser,LoginUser};

