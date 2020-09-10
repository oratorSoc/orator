const express=require('express')
const {registerUser, registerEmail,removeEmail,sendData,getData}=require('./../controller/register')
const router=express.Router()


router.route('/').post(registerUser)
router.route('/email').post(registerEmail).delete(removeEmail)
router.route('/data').get(getData).post(sendData)

module.exports=router