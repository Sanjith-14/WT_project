const items = require("../models/user_model");
const Detail = items.Detail;

const addDetail = async (req, res) => {
  try {
    const { email, toMail, subject, content } = req.body;
    console.log(email);
    const detail = await Detail.updateOne(
      { email: email },
      {
        $push: {
          mails: {
            toMail: toMail,
            sendDateTime: new Date(),
            approverContent: "",
            content: content,
            subject: subject,
          },
        },
      }
    );

    // res.status(200).json({ message: "Added Detail" });
    
  } catch (error) {
    console.log("Error in add Detail");
    console.log(error);
    res.send(error);
  }
};

module.exports = addDetail;
