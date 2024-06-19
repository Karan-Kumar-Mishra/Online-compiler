const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

let code;
let fileextension;
let language;
let command;
let filename;
let outputdestination = "Output/output.txt";
let finalOutput=null;

function showOutput()
{
  setTimeout(() => {
    fs.readFile(outputdestination, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    finalOutput=data;
    console.log(finalOutput);
  });
}, 1000); 
}

app.get('/getOutPUT', (req, res) => {
  const OUTPUT = { message: finalOutput };
  res.json(OUTPUT); 
});

async function compile_code() {
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
    case "nodejs":
      fileextension = ".js";
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
    case "nodejs":
      command = `cls && node ${filename} > ${outputdestination}`;
      break;
    default:
      break;
  }
  fs.writeFile(`Code/code${fileextension}`, code, () => {});
  await exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
  showOutput();
}
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
app.post("/compile", (req, res) => {
  code = req.body.Usertext;
  language = req.body.language;
  compile_code();
  res.redirect("/");
});
app.listen(80, () => {
  console.log(`Server is running on ... `);
});
