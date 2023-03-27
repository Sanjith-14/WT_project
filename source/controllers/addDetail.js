const items = require("../models/user_model")
const Detail = items.Detail

const addDetail = async (req,res)=>{
    console.log("1")
    try {
        const {email,toMail,content} = req.body;
        let datetime = new Date()
    
        console.log(email)
        const detail = await Detail.updateOne(
            {email:email},
            {$push:{mails:{toMail:toMail,sendDateTime:datetime , approverContent:"" , content:content}}})
        
        res.status(200).json({message: "Added Detail"})

        
    } catch (error) {
        console.log("Error in add Detail")
        console.log(error)
        res.send(error)
    }
}

module.exports = addDetail;
