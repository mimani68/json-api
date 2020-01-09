
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

var contact = require('../db/db').contact;
contactAfterQuery = id => contact.filter( x => x.id === id )

var contctSerializer = new JSONAPISerializer('contact', {
	attributes: ['title', 'identity']
})
const userOptionsSeriallizer = {
	attributes: ['firstName', 'lastName'],
	relationshipMeta: [{
		rel: 1,
		source: 'contact'
	}],
}

module.exports.userSeriallizer = function (data) {
	var userSerial = new JSONAPISerializer('users', userOptionsSeriallizer);
	let temp = userSerial.serialize(data)
	temp.includes = []
	temp.includes.push(
		contctSerializer.serialize( contactAfterQuery(data[0].contact) ).data
	)
	temp.links = {}
	temp.data[0].relationships = []
	temp.data[0].relationships.push({
		[userOptionsSeriallizer.relationshipMeta[0].source]: {
			data: {
				id: userOptionsSeriallizer.relationshipMeta[0].rel,
				type: userOptionsSeriallizer.relationshipMeta[0].source.toString()
			}
		}
	})
	return temp
}
