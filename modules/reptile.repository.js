'use strict';

let mysql = require('mysql');
const util = require('util');

class ReptileRepository {

	constructor() {
		// create a MySQL connection
		this.connection = mysql.createConnection({
			host: 'localhost', 
			database: 'reptiles', 
			user: 'harmster', 
			password: 'harmsterrocks2019!', 
			typeCast: function castField( field, useDefaultTypeCasting ) {
				if (field.type === 'TINY' && field.length === 1) {
					var bytes = field.buffer();
					return( bytes == 1 );
				}
				else {
					return useDefaultTypeCasting();
				}
			}
		});
		this.connection.connect(function (err) {
			if (err) {
				throw err;
			} else {
				// console.log('Connected!');
			}
		});
		this.connection.query = util.promisify(this.connection.query); // Magic happens here.
	}

	async findAll() {
		let reptiles = await this.connection.query('select id, name, voeding, huisvesting, verzorgingsInformatie from reptiles');
		for(let reptile of reptiles) {
		}

		return reptiles;
	}

	async create(reptile) {
		let rowResult = await this.connection.query("insert into reptiles set ?", [reptile]);
		let id = rowResult.insertId;

		return await this.findById(id);
	}



	async findById(id) { // be aware: returns a Promise
		let rows = await this.connection.query('select id, name, voeding, huisvesting, verzorgingsInformatie from reptiles where reptiles.id=?', [id]);
		// this SHOULD be one row(s) but we have to handle it like there might be more ... 
		if(rows && rows[0]){
			let reptile=rows[0];

			return reptile;
		}
	}

	async updateById(id, data) {
		let resultPacket = await this.connection.query('update reptiles set name=?, voeding=?, huisvesting=?, verzorgingsInformatie=? where id=?', [data.name, data.voeding, data.huisvesting, data.verzorgingsInformatie, id]);
		if (resultPacket.affectedRows > 0) {
			// fetch the new row after updating!!!
			let updatedReptile = await this.findById(id);

			return updatedReptile;
		}
		else {
			return false;
		}
	}



	async deleteById(id) {
		try {
			let packetResult = await this.connection.query("delete from reptiles where id='?'", id);

			return packetResult.affectedRows === 1;
		}
		catch (error) { // happens when deletion fails because of constraints
			throw error;
		}
	}

}
module.exports = new ReptileRepository();
