const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const { Server } = require("socket.io");
const server = app.listen(80, () => {
  console.log("Server is running on 127.0.0.1..");
});
const io = new Server(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

let code;
let fileextension;
let language;
let command = "Default command ";
let filename;
let errorMessage;

io.on("connection", (socket) => {
  socket.on("fetch-code", (text) => {
    const jsonObject = JSON.parse(text);
    code = jsonObject.code;
    language = jsonObject.lang;
  
    compile_code();
  });
});


function compile_code() {
  switch (language) {
    case "c":
      fileextension = ".c";
      filename = `Code/code${fileextension}`;
      break;
    case "cpp":
      fileextension = ".cpp";
      filename = `Code/code${fileextension}`;
      break;
   
    case "python":
      fileextension = ".py";
      filename = `Code/code${fileextension}`;
      break;
   case "nodejs":
      fileextension=".js";
      filename = `Code/code${fileextension}`;
      break;
    default:
      fileextension = ".txt";
      break;
  }
  switch (language) {
    case "c":
      command = `cls && c++ ${filename} -o run && run `;
      break;
    case "cpp":
      command = `cls && c++ ${filename} -o run && run `;
      break;
    case "python":
      command = `cls && python ${filename} `;
      break;
    case "nodejs":
      command = `cls && node ${filename} `;
      break;
   
  }
   fs.writeFileSync(`Code/code${fileextension}`, code);
   exec(command, (error, stdout, stderr) => {
    if (error) {
     errorMessage = `${error.message}\n${stderr}`;
      console.error('Error:', errorMessage);
      io.emit('error-message', errorMessage);
      return;
    }
    io.emit("final-result", stdout);
  });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
