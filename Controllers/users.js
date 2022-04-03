const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../Models/User");
const Notebook = require("../Models/Notebook");
const Market = require("../Models/Market");
const Meet = require("../Models/Meet");
const HistoryCall = require("../Models/History");
const CancelCall = require("../Models/Cancelcall");
const AverageScore = require("../Models/AverageScore");

// function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error listUsers");
  }
};

// exports.readUsers = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findOne({ _id: id }).select("-password").exec();
//     res.send(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error readUsers");
//   }
// };

exports.updateScore = async (req, res) => {
  try {
    res.send("put score");
    console.log(req.body);

    var email = req.body.email;
    var newStress = req.body.score_stress;
    var newDepression = req.body.score_depression;
    var newSuicide = req.body.score_suicide;

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        score_stress: newStress,
        score_depression: newDepression,
        score_suicide: newSuicide,
      }
    ).exec();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error updateScore");
  }
};

exports.getScore = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);
    const user = await User.findOne({ email: email })
      .select("-password")
      .exec();

    res.send(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getScore");
  }
};

exports.postNotebook = async (req, res) => {
  try {
    // var email = req.params.email;
    const { email, message } = req.body;
    console.log(req.body);

    // const salt = await bcrypt.genSalt(10);
    var notebook = new Notebook({
      email,
      message,
    });

    // Encrypt
    // notebook.message = await bcrypt.hash(message, salt);
    await notebook.save();
    res.send(notebook);
    console.log("POST Notebook success!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! POST Notebook");
  }
};

exports.getNotebook = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const notebook = await Notebook.find({ email: email });
    // const isMatch = await bcrypt.compare(password, user.password);
    res.send(notebook);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getNotbook");
  }
};

exports.getMarket = async (req, res) => {
  try {
    var resarr = [];
    var stress = req.params.stress;
    if (stress >= 5) {
      stress = "โรคความเครียด";
      var market = await Market.find({
        expert: stress,
      }).exec();
      resarr.push(...market);
    }

    var depression = req.params.depression;
    if (depression >= 12) {
      depression = "โรคซึมเศร้า";
      var market = await Market.find({
        expert: depression,
      }).exec();
      resarr.push(...market);
    }

    var suicide = req.params.suicide;
    if (suicide >= 9) {
      suicide = "ความเสี่ยงในการฆ่าตัวตาย";
      var market = await Market.find({
        expert: suicide,
      }).exec();
      resarr.push(...market);
    }

    console.log("stress :", stress);
    console.log("depression :", depression);
    console.log("suicide :", suicide);
    // console.log("req =>", name);
    // const expert = "โรคซึมเศร้า";
    // console.log("email => ", email);
    // const market = await Market.find({
    //   // expert: stress,
    //   // expert: depression,
    //   // expert: suicide,
    // }).exec();

    //var unique = resarr.filter(onlyUnique);
    let uniqueObjArray = [
      ...new Map(resarr.map((item) => [item["_id"].toString(), item])).values(),
    ];
    console.log("uniqueObjArray", uniqueObjArray);
    res.send(uniqueObjArray);
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

exports.addMeet = async (req, res) => {
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

    var meet = new Meet({
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
    await meet.save();
    res.send(meet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error addMeet");
  }
};

exports.getMeet = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const meet = await Meet.find({ emailUser: email });
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
        idCallUser: idcall,
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

    const history = await HistoryCall.find({ emailUser: email });
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

    const cancelcall = await CancelCall.find({ emailUser: email });
    // const isMatch = await bcrypt.compare(password, user.password);
    res.send(cancelcall);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getCancelCall");
  }
};

exports.postAverageScore = async (req, res) => {
  try {
    var email = req.params.email;
    var score1 = req.params.score_stress;
    var score2 = req.params.score2;

    // const { email } = req.body;

    console.log(email, score1, score2);

    // const salt = await bcrypt.genSalt(10);
    var averagescore = new AverageScore({
      email,
      score1: score1,
      score2: score2,
    });

    await averagescore.save();
    res.send(averagescore);
    console.log("POST AverageScore success!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! POST AverageScore");
  }
};

exports.getAverageScore = async (req, res) => {
  try {
    var email = req.params.email;
    // var email = "b";
    console.log("email => ", email);

    const averagescore = await AverageScore.find({ emailUser: email });

    // res.render("<name-of-your-view(ejs,jade)>", { chartData: averagescore });
    res.send(averagescore);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error getAverageScore");
  }
};
