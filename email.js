const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");
const { stringify } = require("querystring");
const { type } = require("os");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    fs.readFile("./email.json", "utf8", (err, data) => {
      if (err) {
        res.end("error");
      } else {
        console.log(JSON.parse(data));
        res.writeHead(200, "ok", { "content-type": "application/json" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.method == "POST") {
    let user = {};
    let input = "";
    req.on("data", (chunk) => {
      input += chunk.toString();
    });
    req.on("end", () => {
      user = JSON.parse(input);

      if (!user.email || !user.name) {
        res.writeHead(400, "Bad Request", {
          "content-type": "application/json",
        });
        res.end(
          JSON.stringify({
            error: "Invalid user object. 'email' and 'name' are required.",
          })
        );
        return;
      }

      fs.readFile("./email.json", "utf8", (err, data) => {
        if (err) {
          res.end("error");
        } else {
          let users = JSON.parse(data);

          const emailExists = users.some(
            (existingUser) => existingUser.email === user.email
          );

          if (emailExists) {
            res.writeHead(400, "Bad Request", {
              "content-type": "application/json",
            });
            res.end(JSON.stringify({ error: "Email already exists." }));
            return;
          }

          users.push(user);

          fs.writeFile("./email.json", JSON.stringify(users), (err) => {
            if (err) {
              res.end("error");
            } else {
              res.writeHead(200, "ok", { "content-type": "application/json" });
              res.end(JSON.stringify(users));
            }
          });
        }
      });
    });
  }
});

server.listen("3105", () => {
  console.log("server is running");
});
