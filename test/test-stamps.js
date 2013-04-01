var should = require('should'),
  Stamps = require('../index');

var options =   {
  id: process.env.STAMPS_ID,
  username: process.env.STAMPS_USERNAME,
  password: process.env.STAMPS_PASSWORD
};
  
var from = {
  FullName: "Cruzio",
  Address1: "877 Cedar St",
  Address2: "Ste 150",
  City: "Santa Cruz",
  State: "CA",
  ZIPCode: "95060"
};

var to = {
  FullName: "NextSpace",
  Address1: "101 Cooper Street",
  City: "Santa Cruz",
  State: "CA",
  ZIPCode: "95060"
};

var rate = {
  FromZIPCode: "95060",
  ToZIPCode: "95060",
  ServiceType: "US-PM",
  WeightLb: 0.5,
  PackageType: "Package",
  ShipDate: new Date().toISOString().split('T')[0],
  AddOns: {
    AddOnV2: {
      Amount: 0,
      AddOnType: "US-A-DC"
    }
  }
};
  
describe('Stamps', function () {
  describe('#create', function () {
    it('should create client', function () {
      var stamps = Stamps.create(options);
      should.exist(stamps);
    });
  })
});

describe('Stamps', function () {
  var stamps;
  before(function () {
    stamps = Stamps.create(options);
  });
  
  describe('#validateAddress()', function () {
    it('should validate address', function (done) {
      stamps.validateAddress({
          Address1: '877 Cedar St'
      })
      .then(function (address) {
        should.exist(address);
        done();
      });
    });
  });
  
  describe('#createTestIndicium()', function () {
    it('should create indicum', function (done) {
      stamps.createTestIndicium(from, to, rate).then(function (indicium) {
        should.exist(indicium);
        done();
      });
    });
  });
});

