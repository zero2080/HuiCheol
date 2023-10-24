function notSupportedContentType() {
  return new AuthenticationError("E415", "not supported media type");
}

function notAuthorization() {
  return new AuthenticationError("E401", "authentication failed");
}

class AuthenticationError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports = { notSupportedContentType, notAuthorization };
