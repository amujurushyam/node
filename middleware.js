const express = require("express");
const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   if (true) {
//     // console.log("Im Middleware");
//     // res.status(200).send("Middleware 1 is executing");
//     next();
//   } else {
//     res.status(404).json({ message: "You are not authorized at Middleware 1" });
//   }
//   next();
// });

// app.use((req, res, next) => {
//   if (!true) {
//     res.status(200).send("Middleware 2 is executing");
//   } else {
//     res.json({ message: "You are not authorized at Middleware 2" });
//   }
// });

// const Middleware1 = (req, res, next) => {
//   if (true) {
//     console.log("Middleware 1 is executing");
//     next();
//   } else {
//     res.status(404).json({ message: "You are not authorized at Middleware 1" });
//   }
// };

// const Middleware2 = (req, res, next) => {
//   if (true) {
//     console.log("Middleware 2 is executing");
//     next();
//   } else {
//     res.status(404).json({ message: "You are not authorized at Middleware 2" });
//   }
// };

// app.get("/info", Middleware1, Middleware2, (req, res) => {
//   res.send("info");
// });

const usernameValidation = (req, res, next) => {
  let inputName = req.body.username;
  var usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
  if (usernameRegex.test(inputName)) {
    next();
  } else {
    res.status(404).json({ message: "Invalid Username" });
  }
};

const passwordValidation = (req, res, next) => {
  let inputPassword = req.body.password;
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_@]{8,}$/;
  if (passwordRegex.test(inputPassword)) {
    next();
  } else {
    res.status(404).json({ message: "Invalid Password" });
  }
};

const emailValidation = (req, res, next) => {
  let inputEmail = req.body.email;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(inputEmail)) {
    next();
  } else if (inputEmail === "") {
    res.status(404).json({ message: "Invalid Email" });
  } else {
    res.status(404).json({ message: "Invalid Email" });
  }
};

app.post(
  "/signup",
  usernameValidation,
  passwordValidation,
  emailValidation,
  (req, res) => {
    res.send("User Registered Successfully");
  }
);

app.listen(3000, () => {
  console.log("Sever is Running");
});
