const items = require("../models/user_model")
const Detail = items.Detail

// If the user views it , it marked as read...
viewRequestAdmin = async (req, res) => {
    const {id,email} = req.body; 
    // const data =await Detail.find({"mails.$[].toMail":email}) 

    // console.log(data)
    const detail = await Detail.updateMany(
        {"mails.toMail":email},
        {$set:{"mails.$[ele].read" : true}},
        { arrayFilters: [ { "ele.toMail": email , "ele._id":id } ] }
    )
    
    res.status(200).json(detail);
}

module.exports = viewRequestAdmin;


// If possible do view request and read requests