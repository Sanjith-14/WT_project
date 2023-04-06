const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json())

// router.use(require('connect').bodyParser());

// const ejs = require("ejs");
// router.set('view engine', 'ejs')

const loginRegisterItem = require("../controllers/loginRegister");
const addDetail = require("../controllers/addDetail");

const viewParticularRequest = require("../controllers/viewParticularRequest");

const requests = require("../controllers/approveOrRejectReq");
// router.use(express.json());
const threeRequests = require("../controllers/ViewRequestUser");

const viewRequest = require("../controllers/viewAllRequest");

const viewRequestAdmin = require("../controllers/viewRequestAdmin");

router.get("/", (req, res) => {
  try {
    console.log("Welcome to Request Management System - Login");
    res.render("common/login.ejs");
    // res.send("Login success..")
  } catch (error) {
    res.send(error);
  }
});

router.post("/login-user", loginRegisterItem.LoginUser);

router.post("/register-user", loginRegisterItem.RegisterUser);

router.get("/add-detail", addDetail);

router.get("/view-all-request", viewRequest.viewAllRequest);

router.post("/view-particular-request", viewParticularRequest);

// router.get("/view-request",viewRequestAdmin) - deleted..

router.post("/approve-request", requests.approveRequest);

router.post("/reject-request", requests.rejectRequest);

// router.get("/view-pending-request",threeRequests.viewPendingRequestUser)

// router.get("/view-approved-request",threeRequests.viewApprovedRequestUser)

// router.get("/view-rejected-request",threeRequests.viewRejectedRequestUser)

router.post("/view-request-admin", viewRequestAdmin);

router.post("/view-request-user", threeRequests.viewRequestUser);

router.post(
  "/view-particular-request-user",
  threeRequests.viewParticularRequestUser
);

module.exports = router;
