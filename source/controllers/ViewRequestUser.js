const { ObjectId } = require("mongodb");
const items = require("../models/user_model");
const Detail = items.Detail;

const viewRequestUser = async (req, res) => {
  const email = req.body.email;
  const dropVal = req.body.dropVal;
  console.log(email,"+",dropVal);
  let data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        email: email
      },
    },
  ]);
  if(dropVal === 'pending'){
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
          "mails.approvedFlag": false,
          "mails.rejectedFlag": false,
        },
      },
    ]);
  }
  else if(dropVal==='accepted'){
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
          "mails.approvedFlag": true,
          "mails.rejectedFlag": false,
          "mails.pendingFlag": false,
        },
      },
    ]);
  }
  else if(dropVal === 'rejected'){
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
          "mails.approvedFlag": false,
          "mails.rejectedFlag": true,
          "mails.pendingFlag": false,
        },
      },
    ]);
  }
  else{
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email
        },
      },
    ]);
  }
  res.render("client/clientViewRequest.ejs", { data: data ,email:email});
  // res.status(200).json({ message: data });
};

// const viewApprovedRequestUser = async (req, res) => {
//   const { email } = req.body;
//   const data = await Detail.aggregate([
//     {
//       $unwind: "$mails",
//     },
//     {
//       $match: {
//         email: email,
//         "mails.approvedFlag": true,
//         "mails.rejectedFlag": false,
//         "mails.pendingFlag": false,
//       },
//     },
//   ]);
//   res.status(200).json({ message: data });
// // };

// const viewRejectedRequestUser = async (req, res) => {
//   const { email } = req.body;
//   const data = await Detail.aggregate([
//     {
//       $unwind: "$mails",
//     },
//     {
//       $match: {
//         email: email,
//         "mails.approvedFlag": false,
//         "mails.rejectedFlag": true,
//         "mails.pendingFlag": false,
//       },
//     },
//   ]);
//   res.status(200).json({ message: data });
// };

const viewParticularRequestUser = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        email: email,
        "mails._id": new ObjectId(id)
      },
    },
  ]);
  res.render("client/clientViewParticularRequest.ejs", { data: data , email:email});
    
};

module.exports = {
  viewRequestUser,
  viewParticularRequestUser
};
