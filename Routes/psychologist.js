const express = require("express");
const router = express.Router();

// Controllers
const {
  getDataPsychologist,
  postMarket,
  getMarket,
  removeMarket,
  getMeet,
  updateIdcall,
  addHistoryCall,
  removeMeet,
  getHistoryCall,
  addCancelCall,
  getCancelCall,
} = require("../Controllers/psychologist");

// @Endpoint     http://localhost:5000/api/psychologist/:email
// @Method      GET
// @Access      Public
router.get("/psychologist/:email", getDataPsychologist);

// @Endpoint     http://localhost:5000/api/psychologist/market
// @Method      POST
// @Access      Public
router.post("/psychologist/market", postMarket);

// @Endpoint     http://localhost:5000/api/psychologist/getmarket/:email
// @Method      GET
// @Access      Public
router.get("/psychologist/getmarket/:email", getMarket);

// @Endpoint     http://localhost:5000/api/psychologist/removemarket/:id
// @Method      DELETE
// @Access      Public
router.delete("/psychologist/removemarket/:id", removeMarket);

// @Endpoint     http://localhost:5000/api/psychologist/getmeet
// @Method      POST
// @Access      Public
router.get("/psychologist/getmeet/:email", getMeet);

// @Endpoint     http://localhost:5000/api/psychologist/:email
// @Method      PUT
// @Access      Public
router.put("/psychologist/updateidcall/:id", updateIdcall);

// @Endpoint     http://localhost:5000/api/psychologist/addHistoryCall
// @Method      POST
// @Access      Public
router.post("/psychologist/addhistorycall", addHistoryCall);

// @Endpoint     http://localhost:5000/api/psychologist/removemeet/:id
// @Method      DELETE
// @Access      Public
router.delete("/psychologist/removemeet/:id", removeMeet);

// @Endpoint     http://localhost:5000/api/psychologist/gethistorycall
// @Method      POST
// @Access      Public
router.get("/psychologist/gethistorycall/:email", getHistoryCall);

// @Endpoint     http://localhost:5000/api/psychologist/addcancelcal
// @Method      POST
// @Access      Public
router.post("/psychologist/addcancelcall", addCancelCall);

// @Endpoint     http://localhost:5000/api/psychologist/getcancelcall
// @Method      POST
// @Access      Public
router.get("/psychologist/getcancelcall/:email", getCancelCall);

module.exports = router;
