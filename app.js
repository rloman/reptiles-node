'use strict';

let bodyParser = require('body-parser');

let express = require('express');
let controller = express();

let reptileService = require('./modules/reptile.service');

controller.use(bodyParser.json());

controller.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

controller.get('/api/reptiles', async function (req, res) {
	let reptiles = await reptileService.findAll();
	res.send(reptiles);
});


controller.post('/api/reptiles', async function (req, res) {
	let reptile = req.body;
	let savedReptile = await reptileService.save(reptile);
	if (savedReptile) {
		res.setHeader('Location', `http://localhost:3001/api/reptiles/${savedReptile.id}`);
		res.status(201).send(savedReptile);
	} else {
		// error, we did NOT find a reptile 
		// so render the common 404 (Not found)
		res.status(404).end();
	}
});

controller.get('/api/reptiles/:id', async function (req, res) {
	let id = +req.params.id
	let reptile = await reptileService.findById(id);
	// OK we found one
	if (reptile) {
		//response successful end with a string of the found row
		res.send(reptile);
	} else {
		// error, we did NOT find one
		// so render the common 404 (Not found)
		res.status(404).end();
	}
});


controller.put('/api/reptiles/:id', async function (req, res) {
	// First read id from params
	let id = +req.params.id
	let inputReptile = req.body;
	let updatedReptile = await reptileService.updateById(id, inputReptile);
	if (updatedReptile) {
		res.send(updatedReptile);
	} else {
		res.status(404).end();
	}
});




controller.delete('/api/reptiles/:id', async function (req, res) {
	let id = +req.params.id;
	 try {
		let result = await reptileService.deleteById(id);
		if (result) {
			res.status(204).end();// true hence the deletion succeeded
		}
		else {
			res.status(404).end();// false hence the deletion failed (non existing)
		}
	}
	catch (error) {
		res.status(412).end();// false hence the deletion failed because of constraints
	}
});

controller.use(express.static('apidocs'));

// set correct time zone
process.env.TZ='Europe/Amsterdam';

// and finally ... run the server :-)
let server = controller.listen(3001, function () {
	console.log('reptiles app listening at http://%s:%s', server.address().address, server.address().port)
});

