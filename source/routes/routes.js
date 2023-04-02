const express = require('express');
const router = express.Router();

// const ejs = require("ejs");
// router.set('view engine', 'ejs')

const loginRegisterItem = require('../controllers/loginRegister')
const addDetail = require('../controllers/addDetail')
const viewRequestAdmin = require('../controllers/viewRequestAdmin')

const requests = require('../controllers/approveOrRejectReq')
// router.use(express.json());
const threeRequests = require("../controllers/ViewRequestUser")

const viewAllRequest = require("../controllers/viewAllRequest")

router.get("/", (req, res) => {
    try {
        console.log("Welcome to Request Management System - Login")
        res.render("common/login.ejs")
        // res.send("Login success..")
    } catch (error) {
        res.send(error);
    }
})

router.post("/login-user",loginRegisterItem.LoginUser)

router.post("/register-user",loginRegisterItem.RegisterUser)

router.get("/add-detail",addDetail)


router.get("/view-all-request",viewAllRequest)

router.get("/view-request",viewRequestAdmin)

router.get("/approve-request",requests.approveRequest)

router.get("/reject-request",requests.rejectRequest)

router.get("/view-pending-request",threeRequests.viewPendingRequestUser)

router.get("/view-approved-request",threeRequests.viewApprovedRequestUser)

router.get("/view-rejected-request",threeRequests.viewRejectedRequestUser)

module.exports = router;