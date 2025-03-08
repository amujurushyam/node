const express = require("express");
const app = express();
const fs = require("fs").promises;

app.get("/data", async (req, res) => {
  try {
    let data = await fs.readFile("./users.json", "utf8");
    console.log(data);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.parse(data));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.send({ message: "Error reading data" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
