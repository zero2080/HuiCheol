const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_PREFIX,
  ALGORITHM,
  ACCESS_EXPIRES,
  REFRESH_EXPIRES,
} = process.env;
const jwt = require("jsonwebtoken");
const InvalidTokenError = require("../errors/InvalidTokenError");
const repository = require("../repository/userRepository");

function authFilter(req, res, next) {
  try {
    let authorization = req.header("Authorization");
    let parseToken = null;

    if (!authorization) {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken) {
        res.status(403).end();
        return;
      } else {
        parseToken = parseRefreshToken(refreshToken);
        res.header["Authorization"] = generateAccessToken({
          id: parseToken.id,
        });
      }
    } else {
      try {
        parseToken = parseAccessToken(authorization);
      } catch (e) {
        if (e.name === "TokenExpiredError") {
          const refreshToken = req.cookies["refreshToken"];
          if (!refreshToken) {
            res.status(403).end();
            return;
          } else {
            parseToken = parseRefreshToken(refreshToken);
            res.header["Authorization"] = generateAccessToken({
              id: parseToken.id,
            });
          }
        } else if (e.name === "InvalidTokenError") {
          res.status(403).end();
          return;
        } else {
          throw e;
        }
      }
    }

    const user = repository.findById(parseToken.id);

    if (!user) {
      res.status(403).end();
    } else {
      req.isAuthenticated = true;
      req.authorization = user;
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(403).end();
  }
}

function authenticator(req, res) {
  const { body } = req;

  const user = repository.findByUsername(body.username);

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });
  res.header["Authorization"] = accessToken;
  res.json({ accessToken });
}

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    issuer: "my-service",
    algorithm: ALGORITHM,
    expiresIn: ACCESS_EXPIRES,
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    issuer: "my-service",
    algorithm: ALGORITHM,
    expiresIn: REFRESH_EXPIRES,
  });
}

function parseAccessToken(token) {
  return parseToken(token.split(" "), ACCESS_TOKEN_SECRET);
}

function parseRefreshToken(token) {
  return parseToken([TOKEN_PREFIX, token], REFRESH_TOKEN_SECRET);
}

function parseToken([bearer, token], secret) {
  if (bearer !== TOKEN_PREFIX) {
    throw new InvalidTokenError();
  }

  return jwt.verify(token, secret, { algorithm: ALGORITHM });
}

module.exports = {
  authFilter,
  authenticator,
};
