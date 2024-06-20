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
let outputdestination = "Output/output.txt";
let finalOutput = "final out put is not found ";
let errorMessage;

io.on("connection", (socket) => {
  socket.on("fetch-code", (text) => {
    const jsonObject = JSON.parse(text);
    code = jsonObject.code;
    language = jsonObject.lang;
    compile_code();
  
  });
});
function showOutput() {
  setTimeout(() => {
    fs.readFile(outputdestination, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      finalOutput = data;
      io.emit("final-result", finalOutput);
    });
  }, 2000);
}
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
    case "java":
      fileextension = ".java";
      filename = `Code/code${fileextension}`;
      break;
    case "python":
      fileextension = ".py";
      filename = `Code/code${fileextension}`;
      break;
    default:
      fileextension = ".txt";
      break;
  }
  switch (language) {
    case "c":
      command = `cls && c++ ${filename} -o run && run > ${outputdestination}`;
      break;
    case "cpp":
      command = `cls && c++ ${filename} -o run && run > ${outputdestination}`;
      break;
    case "java":
      command = `cls &&  javac ${process.cwd()}\\code\\code.java && 
      java ${process.cwd()}\\code\\code >> ${outputdestination} `;
      break;
    case "python":
      command = `cls && python ${filename} > ${outputdestination}`;
      break;
  
  }
  fs.writeFile(`Code/code${fileextension}`, code, () => {

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error message is: ${error}`);
        errorMessage= error+" "+stdout +" "+stderr;;
        console.log("final error =>"+errorMessage);
        setTimeout(() => {
          io.emit("error-message", errorMessage);
        }, 2500);
        return;
      }
      showOutput();
    });
  });
    
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
