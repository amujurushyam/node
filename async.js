const http = require("http");
const fs = require("fs");

const loadUsers = () => {
  try {
    const data = fs.readFileSync("users.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync("users.json", data);
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { user, role, email } = JSON.parse(body);
        const users = loadUsers();

        if (!user || !role || !email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              status: "error",
              statusCode: 400,
              message: "Missing required fields",
            })
          );
        }

        const emailExists = users.some((u) => u.email === email);
        if (emailExists) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              status: "error",
              statusCode: 400,
              message: "Email already exists",
            })
          );
        }

        users.push({ user, role, email });
        saveUsers(users);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            status: "success",
            statusCode: 201,
            message: "User created successfully",
          })
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            status: "error",
            statusCode: 400,
            message: "Invalid JSON",
          })
        );
      }
    });
  } else if (req.method === "GET" && req.url === "/users") {
    const users = loadUsers().filter((u) => u.role !== "admin");
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        status: "success",
        statusCode: 200,
        data: users,
      })
    );
  } else if (req.method === "GET" && req.url === "/admin") {
    const admins = loadUsers().filter((u) => u.role === "admin");
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        status: "success",
        statusCode: 200,
        data: admins,
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        status: "error",
        statusCode: 404,
        message: "Not found",
      })
    );
  }
});

server.listen(3109, () => {
  console.log(`Server is running on port 3109`);
});
