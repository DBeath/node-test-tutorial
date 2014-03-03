// ./test/tests.js

var server = require('../lib/server.js');
var expect = require('chai').expect;
var request = require('request');

describe('response', function() {
	before(function () {
		server.listen(8000);
	});

	after(function () {
		server.close();
	});

	it('should return 400', function (done) {
		request.get('http://localhost:8000', function (err, res, body){
			expect(res.statusCode).to.equal(400);
			expect(res.body).to.equal('wrong header');
			done();
		});
	});

	it('should return 200', function (done) {
		var options = {
			url: 'http://localhost:8000',
			headers: {
				'Content-Type': 'text/plain'
			}
		};
		request.get(options, function (err, res, body) {
			expect(res.statusCode).to.equal(200);
			expect(res.body).to.equal('correct header');
			done();
		});
	});

	it('should emit request body', function (done) {
		var options = {
			url: 'http://localhost:8000',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: 'successfully emitted request'
		};
		var eventFired = false;

		request.get(options, function (err, res, body) {});

		server.on('success', function (data) {
			eventFired = true;
			expect(data).to.equal('successfully emitted request');
		});

		setTimeout( function () {
			expect(eventFired).to.equal(true);
			done();
		}, 10);
	});
});
