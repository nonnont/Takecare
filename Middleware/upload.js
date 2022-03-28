const path = require("path");
const multer = require("multer");
const formidable = require("formidable");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "application/pdf") {
      callback(null, true);
    } else {
      console.log("only PDF file supported!");
      callback(null, false);
    }
  },
});

// var upload = async (data) => {
//   // console.log("upload : ");
//   // console.log(data.body);
//   var form = new formidable.IncomingForm();

//   form.parse(data);
//   try {
//     await form.on("fileBegin", function (name, file) {
//       let d = new Date();
//       // let date = dateFormat(d, "dd-mm-yyyy h-MM-ss").toString();
//       // let fileName = date + "_" + file.name;

//       file.path = _dirname + "/uploads/" + file.name;
//     });

//     form.on("file", function (name, file) {
//       //console.log('Uploaded '+file.path);
//       console.log(file);
//       console.log(name);
//     });
//   } catch (err) {
//     console.log("catch error");
//     console.log(err);
//   }
// };

module.exports = upload;
