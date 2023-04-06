const items = require("../models/user_model");
const Detail = items.Detail;

const viewRequestAdmin = async (req, res) => {
  const email = req.body.email;
  const dropVal = req.body.dropVal;
  console.log(email, "  =-= ", dropVal);
  let data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails.toMail": email,
      },
    },
  ]);

  if (dropVal === "pending") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.pendingFlag": true,
        },
      },
    ]);
  } else if (dropVal === "accepted") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.approvedFlag": true,
        },
      },
    ]);
  } else if (dropVal === "rejected") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.rejectedFlag": true,
        },
      },
    ]);
  } else {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
        },
      },
    ]);
  }

  res.render("admin/adminViewRequest.ejs", { data: data, email: email });
};

module.exports = viewRequestAdmin;
