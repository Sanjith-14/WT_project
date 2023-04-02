const items = require("../models/user_model")
const Detail = items.Detail

viewAllRequest = async (req,res)=>{
    const {id,email} = req.body;
    const data = await Detail.aggregate([
        {
            $unwind: '$mails'
        },
        {
            $match: {
                'mails.toMail': email
            }
        }
    ])
    res.status(200).json({"message":data});
}

module.exports = viewAllRequest;