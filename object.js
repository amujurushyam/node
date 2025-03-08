const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");
const { stringify } = require("querystring");
const { type } = require("os");
const path = require("path");

// const server = http.createServer((req, res) => {
//   if (req.method == "GET") {
//     fs.readFile("./user.json", "utf8", (err, data) => {
//       if (err) {
//         res.end("error");
//       } else {
//         console.log(JSON.parse(data));
//         res.writeHead(200, "ok", { "content-type": "application/json" });
//         res.write(data);
//         res.end();
//       }
//     });
//   }
// });

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    let ipData = { id: 6, name: "sai", location: "bengaluru" };
    fs.readFile("./user.json", "utf8", (err, data) => {
      if (err) {
        res.end(err);
      } else {
        let existingData = JSON.parse(data);
        existingData.push(ipData);
        let updatedData = existingData;
        fs.writeFile("./user.json", JSON.stringify(updatedData), (err) => {
          if (err) {
            res.end(err);
          } else {
            res.write("data updated");
            res.end();
          }
        });
      }
    });
  }
});

server.listen("3106", () => {
  log("Server is running on port 3106");
});
// console.log(path.basename(__dirname));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__dirname));
// console.log(path.parse(__filename));

