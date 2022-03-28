const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  listUser,
  login,
  currentUser,
  currentPsychologist,
  registerPsychologist,
  loginPsycho,
} = require("../Controllers/auth");

// Middleware
const { auth, adminCheck, authPsycho } = require("../Middleware/auth");
const upload = require("../Middleware/upload");

// @Endpoint     http://localhost:5000/api/register
// @Method      POST
// @Access      Public
router.post("/register", register);

// @Endpoint     http://localhost:5000/api/register-psychologist
// @Method      POST
// @Access      Public
router.post("/register-psychologist", registerPsychologist);
// upload.single("verify"),

// @Endpoint     http://localhost:5000/api/login
// @Method      POST
// @Access      Public
router.post("/login", login);

// @Endpoint     http://localhost:5000/api/login
// @Method      POST
// @Access      Public
router.post("/login-psychologist", loginPsycho);

// @Endpoint     http://localhost:5000/api/current-user
// @Method      POST
// @Access      private
router.post("/current-user", auth, currentUser);

// @Endpoint     http://localhost:5000/api/current-psychologist
// @Method      POST
// @Access      private
router.post("/current-psychologist", authPsycho, currentPsychologist);

// @Endpoint     http://localhost:5000/api/current-admin
// @Method      POST
// @Access      private
router.post("/current-admin", auth, adminCheck, currentUser);

// @Endpoint     http://localhost:5000/api/auth
// @Method      GET
// @Access      Public
router.get("/auth", listUser);

module.exports = router;
