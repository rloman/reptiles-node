'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('request');
const DateTime = require('luxon').DateTime;

const baseUrl = 'http://localhost:3001/api/reptiles';

let id; // for later storing an id in between to tests
let victimId; // for later storing an id in between to tests for deletion

describe('Reptile API Tests => ', function () {

	it('POST http://localhost:3001/api/reptiles should create a reptile', function (done) {

		let fixture = {
			name: "Branden Green", 
			voeding: "Dewitt Rosenbaum", 
			huisvesting: "Denver Bode", 
			verzorgingsInformatie: "Mr. Millard Walsh"
		}

		let options = {
			uri: baseUrl,
			json: fixture
		}
		request.post(options, function (error, response, responseBody) {
			id = responseBody.id;

			expect(response.statusCode).to.be.equal(201);
			expect(response.headers.location).to.be.equal(`${baseUrl}/${id}`);
			expect(responseBody.name).to.equal(fixture.name);
			expect(responseBody.voeding).to.equal(fixture.voeding);
			expect(responseBody.huisvesting).to.equal(fixture.huisvesting);
			expect(responseBody.verzorgingsInformatie).to.equal(fixture.verzorgingsInformatie);
			done();
		});
	});

	it('GET http://localhost:3001/api/reptiles should return a list of reptiles', function (done) {
		let options = {
			uri: baseUrl,
			json: true
		}
		request.get(options, function (error, response, responseBody) {
			expect(responseBody.length).to.be.greaterThan(0);
			expect(response.statusCode).to.equal(200);
			done();
		});
	});

	it('GET http://localhost:3001/api/reptiles/:id should return a reptile with id: id', function (done) {
		let fixture = {
			name: "Branden Green", 
			voeding: "Dewitt Rosenbaum", 
			huisvesting: "Denver Bode", 
			verzorgingsInformatie: "Mr. Millard Walsh"
		}

		let options = {
			uri: `${baseUrl}/${id}`,
			json: true
		}
		request.get(options, function (error, response, responseBody) {
			expect(responseBody.name).to.equal(fixture.name);
			expect(responseBody.voeding).to.equal(fixture.voeding);
			expect(responseBody.huisvesting).to.equal(fixture.huisvesting);
			expect(responseBody.verzorgingsInformatie).to.equal(fixture.verzorgingsInformatie);
			expect(response.statusCode).to.equal(200);
			done();
		});
	});

	it('GET http://localhost:3001/api/reptiles/-1 should send status code 404', function (done) {
		let options = {
			uri: `${baseUrl}/-1`,
			json: true
		}
		request.get(options, function (error, response, responseBody) {
			expect(response.statusCode).to.equal(404);
			done();
		});
	});

	it('PUT http://localhost:3001/api/reptiles should modify a reptile', function (done) {
		let fixture = {
			name: "Cayla Schiller PhD", 
			voeding: "Roxie Kuhn", 
			huisvesting: "Eldon Wuckert Sr.", 
			verzorgingsInformatie: "Florentino Runolfsson"
		}

		let options = {
			uri: `${baseUrl}/${id}`,
			json: fixture
		}
		request.put(options, function (error, response, responseBody) {
			expect(responseBody.name).to.equal(fixture.name);
			expect(responseBody.voeding).to.equal(fixture.voeding);
			expect(responseBody.huisvesting).to.equal(fixture.huisvesting);
			expect(responseBody.verzorgingsInformatie).to.equal(fixture.verzorgingsInformatie);
			expect(response.statusCode).to.equal(200);
			done();
		});
	});

	it('PUT http://localhost:3001/api/reptiles/-1 should send status code 404', function (done) {
		let fixture = {
			name: "Shirley Collier", 
			voeding: "Leta Gerhold", 
			huisvesting: "Ms. Katelin Hilpert", 
			verzorgingsInformatie: "Mrs. Randell Lebsack"
		}

		let options = {
			uri: `${baseUrl}/-1`,
			json: fixture
		}
		request.put(options, function (error, response, responseBody) {
			expect(response.statusCode).to.equal(404);
			done();
		});
	});

	it('DELETE http://localhost:3001/api/reptiles should delete the just created reptile', function (done) {
		let options = {
			uri: `${baseUrl}/${id}`,
		}
		request.delete(options, function (error, response, responseBody) {
			expect(response.statusCode).to.equal(204);
			// try to fetch the deleted one, which should fail! (404)
			request.get('http://localhost:3001/api/reptiles/' + id, function (error, response, body) {
				expect(response.statusCode).to.equal(404);
				done();
			});
		});
	});

	it('DELETE http://localhost:3001/api/reptiles/-1 should send status code 404', function (done) {
		let options = {
			uri: `${baseUrl}/-1`,
		}
		request.delete(options, function (error, response, responseBody) {
			expect(response.statusCode).to.equal(404);
			done();
		});
	});
});
