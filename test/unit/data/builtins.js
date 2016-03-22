//imports
const crypto = require("crypto");

//api
module.exports.sha = sha;

//sha(data) : hash
function sha(data) {
  const hash = crypto.createHash("sha256");

  hash.write(data);
  return hash.digest("hex");
}
