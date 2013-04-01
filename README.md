#Stamps.com node.js client

A client for stamps.com API that can be used to generate postage labels and validate addresses.

Sign up with [stamps.com developer program](http://developer.stamps.com/developer/) to receive credentials to the API.

##Installation
	npm install stamps

##API

###Create client
####Stamps.create(options)
Create a client for the API with IntegrationID, Username & Password (see above how to get the credentials).
	
	var stamps = Stamps.create(options);

###Create postage label
####stamps.createTestIndicium(from, to, rate)
Create postage label (indicium) image (PNG). Returns a promise.
	
	stamps.createTestIndicium(from, to, rate).then(function (label) {
   		console.log('label url', indicium.URL);
    });

###Validate address
####stamps.validateAddress(address)
	
	stamps.validateAddress({
		Address1: "Company",
		Address2: "123 Street"
	}).then(function (address) {
		console.log('address is valid', address);
	}, function (err) {
		console.log('address not valid', err);
	});
	
###License

(The MIT License)

Copyright (c) 2013 Andreas Rimbe &lt;a@rimbe.net&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.