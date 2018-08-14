
export default {
	assert(data, type) {
		switch(type) {
			case 'array':
				return !!data && data.length;
			default:
				return !!data;
		}
	},
	map(array, fn) {
		if (!this.assert(array, 'array'))
			return [];
		return array.map((item, index) => {
			if (typeof fn === 'string')
				return item[fn];
			return fn(item, index);
		});
	},
	mapKeys(array, key) {
		if (!this.assert(array, 'array'))
			return [];
		let obj = {};
		array.forEach(item => {
			obj[item[key]] = item;
		});
		return obj;
	},
	forEach(array, fn) {
		if (!this.assert(array, 'array'))
			return;
		array.forEach(fn);
	},
	filter(array, fn) {
		if (!this.assert(array, 'array'))
			return [];
		return array.filter(fn);
	},
	cloneDeep(obj) {
		if (typeof obj === 'object') {
			let newObj = obj.constructor === Array ? [] : {};
			for (let key in obj) {
				newObj[key] = this.cloneDeep(obj[key]);
			}
			return newObj;
		}
		return obj;
	}
};