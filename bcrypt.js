const bcrypt = require("bcrypt");
const fs = require("fs");
let password = "INDIAISMYCOUNTRY";

// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) {
//     console.log(err);
//   } else {
//     // console.log(hash);
//     fs.writeFile("password.txt", hash, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Hash written to file");
//       }
//     });
//   }
// });

fs.readFile("password.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let password = "INDIAISMYCOUNTRY";
    let storedpassword = data;
    bcrypt.compare(password, storedpassword, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        if (result) {
          console.log("Password is correct");
        } else {
          console.log("Password is incorrect");
        }
      }
    });
  }
});
