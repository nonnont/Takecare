const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const Psychologist = require("../Models/Psychologist");
const Market = require("../Models/Market");
const Meet = require("../Models/Meet");
const HistoryCall = require("../Models/History");
const CancelCall = require("../Models/Cancelcall");

exports.getDataPsychologist = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);
    const psychologist = await Psychologist.find({ email: email });
    res.send(psychologist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getDataPsychologist");
  }
};

exports.postMarket = async (req, res) => {
  try {
    const {
      name,
      lassname,
      expert,
      education,
      email,
      telephone,
      date,
      time,
      period,
      price,
    } = req.body;
    console.log(req.body);

    var market = new Market({
      name,
      lassname,
      expert,
      education,
      email,
      telephone,
      date,
      time,
      period,
      price,
    });

    await market.save();
    res.send(market);
    console.log("POST Market success!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! POST Market");
  }
};

exports.getMarket = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);
    const market = await Market.find({ email: email });
    res.send(market);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getMarket");
  }
};

exports.removeMarket = async (req, res) => {
  try {
    // var email = req.params.email;
    var id = req.params.id;

    console.log("id => ", id);
    const market = await Market.findOneAndDelete({
      _id: id,
      // date: date,
    });
    res.send(market);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error removeMarket");
  }
};

exports.getMeet = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const meet = await Meet.find({ emailPsycho: email });
    // const isMatch = await bcrypt.compare(password, user.password);
    res.send(meet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getMeet");
  }
};

exports.updateIdcall = async (req, res) => {
  try {
    var id = req.params.id;
    var idcall = req.body.idcall;

    const meet = await Meet.findOneAndUpdate(
      { _id: id },
      {
        idCallPsycho: idcall,
      }
    ).exec();

    res.send(meet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error updateIdcall");
  }
};

exports.addHistoryCall = async (req, res) => {
  try {
    const {
      namePsycho,
      lassnamePsycho,
      emailPsycho,
      telephonePsycho,
      date,
      time,
      period,
      price,
      nameUser,
      lassnameUser,
      emailUser,
      datail,
    } = req.body;
    console.log("res", req.body);

    var historycall = new HistoryCall({
      namePsycho,
      lassnamePsycho,
      emailPsycho,
      telephonePsycho,
      date,
      time,
      period,
      price,
      nameUser,
      lassnameUser,
      emailUser,
      datail,
    });
    await historycall.save();
    res.send(historycall);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error HistoryCall");
  }
};

exports.removeMeet = async (req, res) => {
  try {
    // var email = req.params.email;
    var id = req.params.id;

    console.log("id => ", id);
    const meet = await Meet.findOneAndDelete({
      _id: id,
      // date: date,
    });
    res.send(meet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error removeMeet");
  }
};

exports.getHistoryCall = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const history = await HistoryCall.find({ emailPsycho: email });
    // const isMatch = await bcrypt.compare(password, user.password);
    res.send(history);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getHistoryCall");
  }
};

exports.addCancelCall = async (req, res) => {
  try {
    const {
      namePsycho,
      lassnamePsycho,
      emailPsycho,
      telephonePsycho,
      date,
      time,
      period,
      price,
      nameUser,
      lassnameUser,
      emailUser,
    } = req.body;
    console.log("res", req.body);

    var cancelcall = new CancelCall({
      namePsycho,
      lassnamePsycho,
      emailPsycho,
      telephonePsycho,
      date,
      time,
      period,
      price,
      nameUser,
      lassnameUser,
      emailUser,
    });
    await cancelcall.save();
    res.send(cancelcall);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error CancelCall");
  }
};

exports.getCancelCall = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const cancelcall = await CancelCall.find({ emailPsycho: email });
    // const isMatch = await bcrypt.compare(password, user.password);
    res.send(cancelcall);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getCancelCall");
  }
};
