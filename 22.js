const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");
const { stringify } = require("querystring");
const { type } = require("os");

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    fs.readFile("./data.json", "utf8", (err, data) => {
      if (err) {
        res.end(err);
      } else {
        req.on("end", () => {
          let newName = "shyam";
          let existingData = JSON.parse(data);
          existingData.push(newName);
          fs.writeFile("./data.json", JSON.stringify(existingData), (err) => {
            if (err) {
              res.write(err);
              res.end();
            } else {
              res.write("data updated");
              res.end();
            }
          });
        });
      }
    });
  }
});
server.listen("3108", () => {
  console.log("server is running");
});
