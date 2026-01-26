const express = require("express");
console.log("Server start ");

const app = express();


// app.use("/user", (req, res) => {
//     res.send("every handler")
// })

// This will only handle get call to /user
app.get("/user", (req, res) => {
    res.send({
      firstName: "Atul ",
      lastName: "Kumar Maurya",
    });
})

app.post("/user", (req, res) => {
    console.log("Save data to database");
    
  res.send("Data successfully saved to the database");
});


app.use("/user", (req, res) => {
    res.send("Data is sucessfully deleted");
    
})
//this will match all the http method Api calls to /test
app.use("/test",(req, res) => {
    res.send("Hello from the server" )
})


app.listen(3000, () => {
    console.log("server is successfully  listening on port no 3000");
    
});
