const endpoints = require('../endpoints');

class Client {
  constructor(clientID, accessToken = null) {
    this.setClientID(clientID);
    this.setAccessToken(accessToken);

    this.album = new (require('./album'))(this);
  }

  setClientID(clientID) {
    if (!clientID) throw new Error('A Client requires a clientID to function.');
    this.clientID = clientID;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  // @summary
  // Appends clientID and accessToken to the given object.
  append(obj) {
    obj.clientID = this.clientID;
    obj.accessToken = this.accessToken;
    return obj;
  }
}

module.exports = Client;
