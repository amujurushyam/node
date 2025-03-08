// const { log } = require("console");
// const http = require("http");
// const fs = require("fs");
// const url = require("url");
// const { stringify } = require("querystring");
// const { type } = require("os");

// const server = http.createServer((req, res) => {
//   //   if (req.method == "POST") {
//   //     let ipData = "";
//   //     req.on("data", (x) => {
//   //       ipData += x;
//   //     });
//   //     req.on("end", () => {
//   //       fs.appendFile("./path.txt", ipData, (err) => {
//   //         if (err) {
//   //           res.end(err);
//   //         } else {
//   //           res.write("data inserted");
//   //           res.end();
//   //         }
//   //       });
//   //     });
//   //   }
//   if (req.method == "GET") {
//     fs.readFile("./data.json", "utf8", (err, data) => {
//       if (err) {
//         res.write(err);
//         res.end();
//       } else {
//         res.writeHead(206, "ok", { "content-type": "application/json" });
//         let existingData = JSON.parse(data);
//         existingData.push("sai");
//         console.log(existingData);
//         fs.writeFile("./data.json", JSON.stringify(existingData), (err) => {
//           if (err) {
//             res.write(err);
//             res.end();
//           } else {
//             res.write("data inserted");
//             res.end();
//           }
//         });
//       }
//     });
//   }
// });

// server.listen("3107", () => {
//   console.log("server is running");
// });


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
          let newName = "Shyam";
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
