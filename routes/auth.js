const jwt = require("jsonwebtokens");
module.exports = function auth(req, res, next) {
  //Check for the token
  const token = res.headers["authorization"].split(" ")[1];
  if (!token) return res.sendStatus(403);
  let data=await jwt.verify(token,process.env.JWT);
  if(!data)
  return res.sendStatus(403);

  //got the data
  res.data=data;
  next()

};
