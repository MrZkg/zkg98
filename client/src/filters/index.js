import Vue from 'vue'

// 性别
let enumSex = (value) => {
	switch (value) {
		case 1:
			return "男";
		case 0:
			return "女";
		default:
			return '未知';
	}
}

const filters = {
	enumSex
}
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})