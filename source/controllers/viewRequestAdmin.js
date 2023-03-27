const items = require("../models/user_model")
const Detail = items.Detail

// If the user views it , it marked as view..
viewRequestAdmin = async (req, res) => {
    const email = req.body.email; 
    // const data =await Detail.find({"mails.$[].toMail":email}) 

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

    // console.log(data)
    const detail = await Detail.updateMany(
        {"mails.toMail":email},
        {$set:{"mails.$[ele].read" : true}},
        { arrayFilters: [ { "ele.toMail": email } ] }
    )
    
    res.status(200).json(data);
}

module.exports = viewRequestAdmin;
