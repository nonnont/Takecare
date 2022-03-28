const express = require("express");
const router = express.Router();

// Controllers
const {
  listUsers,
  readUsers,
  updateScore,
  getScore,
  postNotebook,
  getNotebook,
  getMarket,
  removeMarket,
  addMeet,
  getMeet,
  updateIdcall,
  addHistoryCall,
  removeMeet,
  getHistoryCall,
  addCancelCall,
  getCancelCall,
} = require("../Controllers/users");

// @Endpoint     http://localhost:5000/api/users
// @Method      GET
// @Access      Public
router.get("/users", listUsers);

// @Endpoint     http://localhost:5000/api/users/:id
// @Method      GET
// @Access      Public
// router.get("/users/:id", readUsers);

// @Endpoint     http://localhost:5000/api/users/:email
// @Method      POST
// @Access      Public
router.put("/users/:email", updateScore);

// @Endpoint     http://localhost:5000/api/users/activity/:email
// @Method      GET
// @Access      Public
router.get("/users/activity/:email", getScore);

// @Endpoint     http://localhost:5000/api/users/activity/notebook
// @Method      POST
// @Access      Public
router.post("/users/activity/notebook/postnotebook", postNotebook);

// @Endpoint     http://localhost:5000/api/users/activity/notebook/getnotebook
// @Method      GET
// @Access      Public
router.get("/users/activity/notebook/getnotebook/:email", getNotebook);

// @Endpoint     http://localhost:5000/api/user/meet/getmarket/:email
// @Method      GET
// @Access      Public
router.get("/user/meet/getmarket/:stress/:depression/:suicide", getMarket);

// @Endpoint     http://localhost:5000/api/user/removemarket/:id
// @Method      DELETE
// @Access      Public
router.delete("/user/removemarket/:id", removeMarket);

// @Endpoint     http://localhost:5000/api/user/addmeet
// @Method      POST
// @Access      Public
router.post("/user/addmeet", addMeet);

// @Endpoint     http://localhost:5000/api/user/addmeet
// @Method      POST
// @Access      Public
router.get("/users/getmeet/:email", getMeet);

// @Endpoint     http://localhost:5000/api/users/:email
// @Method      PUT
// @Access      Public
router.put("/users/updateidcall/:id", updateIdcall);

// @Endpoint     http://localhost:5000/api/user/addHistoryCall
// @Method      POST
// @Access      Public
router.post("/user/addhistorycall", addHistoryCall);

// @Endpoint     http://localhost:5000/api/user/removemeet/:id
// @Method      DELETE
// @Access      Public
router.delete("/user/removemeet/:id", removeMeet);

// @Endpoint     http://localhost:5000/api/user/gethistorycall
// @Method      POST
// @Access      Public
router.get("/user/gethistorycall/:email", getHistoryCall);

// @Endpoint     http://localhost:5000/api/user/addcancelcal
// @Method      POST
// @Access      Public
router.post("/user/addcancelcall", addCancelCall);

// @Endpoint     http://localhost:5000/api/user/getcancelcall
// @Method      POST
// @Access      Public
router.get("/user/getcancelcall/:email", getCancelCall);

module.exports = router;
