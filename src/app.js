const express = require("express");
console.log("Server start ");

const app = express();

// app.get("/user", (req, res) => {

//     console.log(req.query);
    
//     res.send({
//       firstName: "Atul ",
//       lastName: "Kumar Maurya",
//     });
// })

// for dynamic route-> /user/123
app.get("/user/:userID/:name/:pasword   ", (req, res) => {
  console.log(req.params);

  res.send({
    firstName: "Atul ",
    lastName: "Kumar Maurya",
  });
});



app.listen(3000, () => {
    console.log("server is successfully  listening on port no 3000");
    
});
