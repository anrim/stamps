var soap = require('soap'),
  util = require('util'),
  vow = require('vow');

// See wdsl viewer here
// http://services.w3.org/xslt?xslfile=http://tomi.vanek.sk/xml/wsdl-viewer.xsl&amp;xmlfile=http://developer.stamps.com/developer/downloads/files/Stamps.com_SWSIM_v24.wsdl&amp;transform=Submit

var STAMPS_API_URL = "http://developer.stamps.com/developer/downloads/files/Stamps.com_SWSIM_v24.wsdl";

/**
* Stamps API client
*/
var Stamps = Object.create({});
module.exports = Stamps;

Stamps._createClient = function () {
  var promise = vow.promise();
  var self = this;
  soap.createClient(STAMPS_API_URL, function(err, res) {
    if (err) {
      console.error(err);
      promise.reject(new Error(err));
    } else {
      var client = res.SwsimV24.SwsimV24Soap;
      self.client = client;
      promise.fulfill();
    }
  });
  return promise;
}

Stamps._authenticate = function () {
  var self = this;
  var options = {
    IntegrationID: this.auth.id,
    Username: this.auth.username,
    Password: this.auth.password
  };
  
  var promise = vow.promise();
  this.client.AuthenticateUser({Credentials: options}, function (err, res, body) {
    if (err) {
      promise.reject(new Error(body));
    } else {
      var token = res.Authenticator;
      self.token = token;
      promise.fulfill();
    }
  });
  return promise;
}

Stamps._cleanseAddress = function (address) {
  var promise = vow.promise();
  this.client.CleanseAddress({Authenticator: this.token, Address: address}, function (err, res, body) {
    if (err) {
      promise.reject(new Error(body));
    } else {
      promise.fulfill(body);
    }
  });
  return promise;
}

Stamps.validateAddress = function (address) {
  var createClient = this._createClient.bind(this);
  var authenticate = this._authenticate.bind(this);
  var cleanseAddress = this._cleanseAddress.bind(this);
  
  return createClient().then(function () {
      return authenticate().then(function () {
        return cleanseAddress(address);
      });
  });
}

/**
* Create stamps client
* 
* @param {Object} auth Credentials to authenticate with Stamps.com
* @return {Stamps}
*/
Stamps.create = function (auth) {
  return Object.create(Stamps, {
    auth: {value: auth},
    client: {enumerable: true, writable: true},
    token: {enumerable: true, writable: true}
  });
}

Stamps.createTestIndicium = function (from, to, rate) {
  var options = {
    Authenticator: this.token,
    Rate: rate,
    From: from,
    To: to
  };
  
  var promise = vow.promise();
  this.client.CreateTestIndicium(options, function (err, result, body) {
    if (err) {
      promise.reject(new Error(body));
    } else {
      promise.fulfill(result);
    }
  });
  return promise;
}