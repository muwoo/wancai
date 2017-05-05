export var newProject = {
	listFullTime:[],
	listPartTime:[],
	addFullTime: function(data) {
		this.listFullTime.push(data)
	},
	addPartTime: function(data) {
		this.listPartTime.push(data)
	},
	removeFullTime: function(id) {
		let index = this.listFullTime.findIndex(item => item.id == id)
		if (index) {
			this.listFullTime.splice(index, 1)
		}
	},
	removePartTime: function(id) {
		let index = this.listPartTime.findIndex(item => item.id == id)
		if (index) {
			this.listPartTime.splice(index, 1)
		}
	},
	clear: function() {
		this.listFullTime = []
		this.listPartTime = []
	},
	listRecord:[],
	addlistRecord: function(data){
		this.listRecord.push(data)
	},
	removelistRecord: function(id){
		let index = this.listRecord.findIndex(item >= item.id == id)
		if(index){
			this.listRecord.splice(index, 1)
		}
	}
}
