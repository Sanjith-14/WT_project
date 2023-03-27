const items = require("../models/user_model")
const Detail = items.Detail

const viewPendingRequestUser = async (req,res)=>{
    const {email} = req.body;
    const data = await Detail.aggregate([
        {
            $unwind: '$mails'
        },
        {
            $match: {
                email:email,
                'mails.approvedFlag': false,
                'mails.rejectedFlag': false,
            }
        }
    ])
    res.status(200).json({message:data})
}

const viewApprovedRequestUser = async (req,res)=>{
    const {email} = req.body;
    const data = await Detail.aggregate([
        {
            $unwind: '$mails'
        },
        {
            $match: {
                email:email,
                'mails.approvedFlag': true,
                'mails.rejectedFlag': false,
                'mails.pendingFlag' : false
            }
        }
    ])
    res.status(200).json({message:data})
}

const viewRejectedRequestUser = async (req,res)=>{
    const {email} = req.body;
    const data = await Detail.aggregate([
        {
            $unwind: '$mails'
        },
        {
            $match: {
                email:email,
                'mails.approvedFlag': false,
                'mails.rejectedFlag': true,
                'mails.pendingFlag' : false
            }
        }
    ])
    res.status(200).json({message:data})
}

module.exports = {viewPendingRequestUser,viewApprovedRequestUser,viewRejectedRequestUser}