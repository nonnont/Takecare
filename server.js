const express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

// connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("้เชื่อมต่อดาต้าเบส เรียบร้อย"))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

// ทำให้ folder uploads เป็น static
app.use("/uploads", express.static("uploads"));

// Routes
// http://localhost:5000/api/
// V.1
// app.use("/api", require("./Routes/api"));
// V.2 import api auto (กรณี Routes มีหลายไฟล์)
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

// vedio call
const server = require("http").createServer(app);

const p2pID = {};
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  // วางสาย
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");

    // console.log(p2pID);
    // try {
    //   delete p2pID[p2pID[socket.id]];
    //   // io.to(p2pID[socket.id]).emit("callEnded", {});
    //   delete p2pID[socket.id];
    // } catch (err) {
    //   console.log();
    // }
    // console.log(p2pID);
  });

  //  ผู้ใช้โทร
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  // รับสาย
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", {
      signal: data.signal,
      name: data.name,
      me: data.me,
    });
    // p2pID[socket.id] = data.to;
    // p2pID[data.to] = socket.id;
    // console.log(p2pID);
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`start server in port ${port}`));
