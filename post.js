const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");
// const server = http.createServer((req, res) => {
//   if (req.method == "POST") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//       console.log(body);
//       res.end();
//     });

//     req.on("error", (err) => {
//       console.log(err);
//       res.write(err);
//     });
//     req.on("end", () => {
//       res.end("data recieved");
//     });
//   }
// });

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    // fs.readFile("./sample.txt", "utf8", (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     res.write(err);
    //     res.end();
    //   } else {
    //     console.log(data);
    //     res.write(data);
    //     res.end();
    //   }
    // });
    // fs.readFile("./info.txt", "utf8", (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     res.write(err);
    //     res.end();
    //   } else {
    //     console.log(data);
    //     res.write(data);
    //     res.end();
    //   }
    // });

    // let sampleData = fs.readFileSync("./sample.txt", "utf8");
    // console.log(sampleData);

    // let infoData = fs.readFileSync("./info.txt", "utf8");
    // console.log(infoData);----------------dont use this
    let ipData = "hello nodejs";
    fs.appendFile("./info.txt", ipData, (err) => {
      if (err) {
        res.end(err);
      } else {
        res.write("data append");
        res.end();
      }
    });
  }
});

server.listen("3106", () => {
  console.log("server is running");
});
