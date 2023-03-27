const express = require('express');
const router = express.Router();

const loginRegisterItem = require('../controllers/loginRegister')
const addDetail = require('../controllers/addDetail')
const viewRequestAdmin = require('../controllers/viewRequestAdmin')

const requests = require('../controllers/approveOrRejectReq')
// router.use(express.json());
const threeRequests = require("../controllers/ViewRequestUser")

router.get("/", (req, res) => {
    try {
        console.log("Welcome to Request Management System")
        res.send("Login")
    } catch (error) {
        res.send(error);
    }
})

router.get("/login-user",loginRegisterItem.LoginUser)

router.get("/register-user",loginRegisterItem.RegisterUser)

router.get("/add-detail",addDetail)

router.get("/view-request",viewRequestAdmin)

router.get("/approve-request",requests.approveRequest)

router.get("/reject-request",requests.rejectRequest)

router.get("/view-pending-request",threeRequests.viewPendingRequestUser)

router.get("/view-approved-request",threeRequests.viewApprovedRequestUser)

router.get("/view-rejected-request",threeRequests.viewRejectedRequestUser)

module.exports = router;