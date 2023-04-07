const items = require("../models/user_model");
const Detail = items.Detail;

approveRequest = async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const content = req.body.content;
  const keyval = req.body.keyval;
  console.log("KEYVAL",keyval);
  console.log("APPROVE", id, email, content);
  // use arrayfilters..
  const detail = await Detail.updateMany(
    { "mails.toMail": email },
    {
      $set: {
        "mails.$[ele].approvedFlag": true,
        "mails.$[ele].approverContent": content,
        "mails.$[ele].approveOrRejectTime": new Date(),
        "mails.$[ele].pendingFlag": false,
      },
    },
    { arrayFilters: [{ "ele.toMail": email, "ele._id": id }] }
  );

  console.log(detail);
  const data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails.toMail": email,
      },
    },
  ]);

  // res.redirect('view-all-request')
  res.render("admin/adminViewRequest.ejs", { data: data, email: email });
  // res.redirect('view-all-request')
  // return res.status(200).json({ message: "Approved Successfully" })
};

rejectRequest = async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const content = req.body.content;
  console.log("REJEct", id, email, content);
  const detail = await Detail.updateMany(
    { "mails.toMail": email },
    {
      $set: {
        "mails.$[ele].rejectedFlag": true,
        "mails.$[ele].approverContent": content,
        "mails.$[ele].approveOrRejectTime": new Date(),
        "mails.$[ele].pendingFlag": false,
      },
    },
    { arrayFilters: [{ "ele.toMail": email, "ele._id": id }] }
  );

  const data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails.toMail": email,
      },
    },
  ]);

  // res.redirect('view-all-request')
  res.render("admin/adminViewRequest.ejs", { data: data, email: email });
  // return res.status(200).json({ message: "Rejected Successfully" })
};

module.exports = { approveRequest, rejectRequest };
