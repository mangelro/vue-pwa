/**
 *
 *
 */

import axios from 'axios'

const API_URL = 'http://localhost:41321/v1'

export class ServiceBase {
	constructor() {
		this.client = axios.create({
			baseURL: API_URL,
			timeout: 10000,
		})
	}
}
