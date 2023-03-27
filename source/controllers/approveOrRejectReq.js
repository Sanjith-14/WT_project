const items = require("../models/user_model")
const Detail = items.Detail

approveRequest = async (req,res)=>{
    const{id,email,content} = req.body;
    const date = new Date()
    // use arrayfilters..
    const detail = await Detail.updateMany(
        {"mails.toMail":email},
        {$set:{"mails.$[ele].approvedFlag" : true , "mails.$[ele].approverContent":content , "mails.$[ele].approveOrRejectTime":date , "mails.$[ele].pendingFlag":false}},
        {arrayFilters:[{"ele.toMail":email , "ele._id":id}]}
    )

    console.log(detail)

    return res.status(200).json({message :"Approved Successfully"})
}

rejectRequest = async (req,res)=>{
    const{id,email,content} = req.body;
    const date = new Date()
    const detail = await Detail.updateMany(
        {"mails.toMail":email},
        {$set:{"mails.$[ele].rejectedFlag" : true , "mails.$[ele].approverContent":content , "mails.$[ele].approveOrRejectTime":date , "mails.$[ele].pendingFlag":false}},
        {arrayFilters:[{"ele.toMail":email , "ele._id":id}]}
    )

    return res.status(200).json({message :"Rejected Successfully"})
}

module.exports = {approveRequest,rejectRequest}

