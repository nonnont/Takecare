const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");
const Psychologist = require("../Models/Psychologist");

exports.register = async (req, res) => {
  try {
    // Check user
    const { name, lassname, email, password } = req.body;
    var user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      lassname,
      email,
      password,
    });

    // Encrypt
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!1");
  }
};

exports.registerPsychologist = async (req, res) => {
  try {
    // Check psychologist
    const { name, lassname, expert, education, telephone, email, password } =
      req.body;

    var psychologist = await Psychologist.findOne({ email });
    if (psychologist) {
      return res.status(400).send("Psychologists Already exists");
    }

    const salt = await bcrypt.genSalt(10);
    psychologist = new Psychologist({
      name,
      lassname,
      expert,
      education,
      telephone,
      email,
      password,
    });

    // เก็บ file บน database
    // if (req.file) {
    //   psychologist.verify = req.file.path;
    //   console.log("req.fileeeeeeeee");
    // }
    console.log(psychologist);

    // Encrypt
    psychologist.password = await bcrypt.hash(password, salt);
    await psychologist.save();
    this.res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Register Success");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOneAndUpdate({ email }, { new: true });
    var psychologist = await Psychologist.findOneAndUpdate(
      { email },
      { new: true }
    );

    if (user) {
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      // Payload
      const payload = {
        user: {
          email: user.email,
          role: user.role,
        },
      };

      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.loginPsycho = async (req, res) => {
  try {
    const { email, password } = req.body;
    var psychologist = await Psychologist.findOneAndUpdate(
      { email },
      { new: true }
    );

    if (psychologist && psychologist.enabled) {
      // Check Password
      const isMatch = await bcrypt.compare(password, psychologist.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      // Payload
      const payload = {
        psychologist: {
          email: psychologist.email,
          role: psychologist.role,
        },
      };

      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!");
  }
};

exports.currentPsychologist = async (req, res) => {
  try {
    const psychologist = await Psychologist.findOne({
      email: req.psychologist.email,
    })
      .select("-password")
      .exec();
    res.send(psychologist);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!");
  }
};

exports.listUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
