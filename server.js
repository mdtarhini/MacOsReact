const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Message = require("./models/Message");
const path = require("path");
const User = require("./models/User");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
dotenv.config();

// Bodyparse middleware
app.use(express.json());

// connect to Mongo
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Succesfully connected to db");
  })
  .catch((err) => console.log(err));

/*
The message logic. TODO: Add this separetly
*/
let onlineClients = {};
io.on("connection", (client) => {
  client.on("identification", (id) => {
    client.id = id;
    onlineClients[id] = client;
  });

  client.on("message", (msg) => {
    if (!onlineClients[msg.from] || !msg.from) {
      return;
    }
    // Save the message to the database:
    const newMessage = new Message(msg);

    User.findById(msg.from)
      .then((sender) => {
        if (!sender.username) {
          newMessage.expirationDate = new Date(Date.now() + 1000 * 3600);
        }

        newMessage
          .save()
          .then(() => {
            client.emit("message", msg);
            if (onlineClients[msg.to]) {
              onlineClients[msg.to].emit("message", msg);
            }
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  });

  // client.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
});

//Middleware api routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/reminders", require("./routes/api/reminders"));
app.use("/api/notes", require("./routes/api/notes"));
app.use("/api/messages", require("./routes/api/messages"));

// Serve static assest if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`server started on port ${port}`));
