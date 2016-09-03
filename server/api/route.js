
const controller = require('./controller');

function initData(app) {
   app.get('/api/list', controller.listPlaces);

}

module.exports = initData
