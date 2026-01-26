const getAuth = (req, res, next) => {
  console.log("Authentication Work");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};


const userAuth = (req, res, next) => {
  console.log("Authentication Work");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};


module.exports = {
    getAuth,
    userAuth
}