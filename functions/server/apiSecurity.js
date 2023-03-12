const {expressjwt: expressJwt} = require("express-jwt");
const jwks = require("jwks-rsa");
const {getAuth} = require("firebase-admin/auth");
require("./firebase/firebaseConnection")



const checkCORS = (request, response, next) => {
  response.set("Access-Control-Allow-Origin", "*");
  if (request.method === "OPTION") {
    // set header to handle the CORS
    response.set("Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept");
    response.set("Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS");
    response.set("Access-Control-Max-Age", "86400");
    response.sendStatus(204);
  } else {
    next();
  }
}

const isAuth = (request, response, next)=> {
  checkCORS(request,response, async ()=>{

      await getAuth()
          .verifyIdToken(getToken(request))
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            request.auth = {sub: uid}
            next();

            // ...
          })
          .catch((error) => {
            // Handle error
            response.sendStatus(401)
            console.log(error)
          });

  });

};
const getToken = (req)=>{
  if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const checkScope = (req, res, next) => {
  if (req.auth && req.auth.scope &&
    req.auth.scope.indexOf("read.events") > -1) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://kabila.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://api.joinkabila.com",
  issuer: "https://kabila.us.auth0.com/",
  algorithms: ["RS256"],
  getToken: (req)=> {
    console.log("---- auth data ----");
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
});

module.exports = {isAuth, jwtCheck, checkScope, checkCORS};
