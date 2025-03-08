// const { sample, x } = require("./index");
// const { cal } = require("./module");

// const data = require("./data.json");
// console.log("hii");
// console.log(sample());
// console.log(x);

// let a = 3;
// let b = 7;
// console.log(cal(a, b));
// console.log(data);

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.write("hello nodejs");
//   res.end("response provided");
// });

// server.listen("3101", () => {
//   console.log("server is running");
// });

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.method === "GET") {
//     if (req.url === "/Veg") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ "Item": "Gobhi", screen: "one" }));
//       res.end();
//     } else if (req.url === "/THANDEL") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ "movie name": "THANDEL", screen: "two" }));
//       res.end();
//     } else if (req.url === "/SKYFORCE") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ "movie name": "SKYFORCE", screen: "three" }));
//       res.end();
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.write(JSON.stringify({ message: "Movie not showing now" }));
//       res.end();
//     }
//   } else {
//     res.writeHead(405, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ message: "Method not allowed" }));
//     res.end();
//   }
// });

// server.listen(3121, () => {
//   console.log("Server running on port 3121");
// });

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedURl = url.parse(req.url, true);
  const quantity = parseInt(parsedURl.query.quantity) || 1;

  if (req.method == "GET") {
    if (parsedURl.pathname == "/Menu") {
      res.writeHead(200, "ok", { "content-type": "application/json" });
      res.write(JSON.stringify({ Message: "Hello, Choose The Categories Below", Categories: ["Veg", "Non-Veg"] }));
      res.end();
    } else if (parsedURl.pathname == "/Menu/Veg") {
      const price = 150;
      const gst = 0.05;
      const totalPrice = price * quantity * (1 + gst);
      res.writeHead(200, "ok", { "content-type": "application/json" });
      res.write(JSON.stringify({
        Item: "Gobhi",
        gst: "5%",
        price: price,
        total_price: totalPrice.toFixed(2),
        numberofQuantity: quantity,
        Message: "Thank You For Ordering",
      }));
      res.end();
    } else if (parsedURl.pathname == "/Menu/Non-Veg") {
      const price = 350;
      const gst = 0.05;
      const totalPrice = price * quantity * (1 + gst);
      res.writeHead(200, "ok", { "content-type": "application/json" });
      res.write(JSON.stringify({
        Item: "Chicken",
        gst: "5%",
        price: price,
        total_price: totalPrice.toFixed(2),
        numberofQuantity: quantity,
        Message: "Thank You For Ordering",
      }));
      res.end();
    } else {
      res.writeHead(400, "not found", { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "Item isn't available now" }));
      res.end();
    }
  } else if (req.method == "POST") {
    res.end();
  } else if (req.method == "PUT") {
    res.end();
  } else if (req.method == "DELETE") {
    res.end();
  } else {
    res.end();
  }
});

server.listen("3131", () => {
  console.log("server running");
});

