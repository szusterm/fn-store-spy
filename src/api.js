import axios from 'axios';

import getResponseObject from '../helpers/getResponseObject';
import isRequestSuccessful from '../helpers/isRequestSuccessful';

class Api {
	async callApiRequest(data) {
		try {
			const response = await axios(data);

			const requestSuccessful = isRequestSuccessful(response.status);

			if (requestSuccessful) {
				return getResponseObject(false, response.data);
			}
			else {
				throw new Error(response.data);
			}
		}
		catch (error) {
			return getResponseObject(true, error.message);
		}
	}

	async fetchItems(data) {
		const {name, type, page} = data;

		const requestData = {
			method: 'get',
			url: '/items/get',
			params: {
				name,
				type,
				page
			}
		};

		return await this.callApiRequest(requestData);
	}

	async addOrder(itemsFnbrIds) {
		const requestData = {
			method: 'post',
			url: '/order/add',
			data: {
				itemsFnbrIds
			}
		};

		return await this.callApiRequest(requestData);
	}

	async fetchConfig() {
		const requestData = {
			method: 'get',
			url: '/config'
		};

		return await this.callApiRequest(requestData);
	}
}

export default new Api();