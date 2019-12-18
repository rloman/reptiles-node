'use strict';

class ReptileService {

	constructor() {
		this.repository=require('./reptile.repository');
	}

	async findAll() {
		return await this.repository.findAll();
	}

	 async save(reptile) {

		return await this.repository.create(reptile);
	}





	async findById(id) { // be aware: returns a Promise

		 return await this.repository.findById(id);
	}

	async updateById(id, data) {
		return await this.repository.updateById(id, data);
	}

	async deleteById(id) {

		try {
			return await this.repository.deleteById(id);
		}
		catch (error) {
			throw error;
		}
	}

}

module.exports = new ReptileService();
