//Importing part
import express from "express";
import { format } from "date-fns";
import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { it } from "date-fns/locale";

//Initialization

const app = express();
const PORT = 4000;

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
const directoryPath = path.join(directoryName, "TimeStamp");

//Middle ware
app.use(express.json());

//Routes

//home page
app.get("/", (req, res) => {
  // res.status(200).json({message:'hi welcome to demo node js'})

  res
    .status(200)
    .send(
      `<div > <h1 style="background-color:black;color:red ;margin-left:550px; margin-right:700px ;margin-top:40px"> Node Js Day 1 Task </h1>
    <h2 style="margin:100px">1) To create a Time Stamp use end point as <span style="color:green">'/create'</span> at URL</h2>
    <h2 style="margin:100px">2) To View Created Time Stamp files use end point as  <span style="color:green">'/read'</span> at URL</h2>
      </div>`
    );
});

//Creating a file
let filelocation;
app.get("/create", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-mm-ss");
  console.log(today);
  filelocation = `TimeStamp/${today}.txt`;
  fs.writeFileSync(filelocation, `${today}`, "utf-8");
  res.status(200).send(`
  <div style="background-color:black;color:red;padding:30px;font-size:20px;margin-top:40px;width:700px;margin-left:380px">
   Creating Page of Time Stamp <br> <br>
   Created a Time Stamp name :
  ${today}.txt , Created In TimeStamp Folder 
  <br><br> To View Created Time Stamp files use end point as  <span style="color:green">'/read'</span> at URL 
  </div>
  `);
});

//Reading the files
app.get("/read", (req, res) => {
  let txtFile = [];
  fs.readdir(directoryPath, (err, files) => {
    files.forEach((element) => {
      txtFile.push(element);
    });
    res.status(200).send(`
        <div style="background-color:black;color:red;padding:20px;font-size:20px;width:200px;margin:30px">
      <div style="padding:10px">Created Files <br> <br> ${txtFile.join("<br><br>")} </div>  
        </div>
        `);
  });
});

//port
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
