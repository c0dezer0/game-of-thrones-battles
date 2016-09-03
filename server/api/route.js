
const controller = require('./controller');

function initData(app) {
   app.get('/api/list', controller.listPlaces);

   app.get('/api/list/:id', controller.detailPlace);

   app.get('/api/count', controller.countPlaces);

}

module.exports = initData
