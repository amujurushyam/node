const http = require("http");

let users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const server = http.createServer((req, res) => {
  if (req.method === "PUT" && req.url.startsWith("/users/")) {
    const userId = parseInt(req.url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { name, age } = JSON.parse(body);
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        users[userIndex] = { id: userId, name, age };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "User updated successfully",
            user: users[userIndex],
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on 3000");
});
