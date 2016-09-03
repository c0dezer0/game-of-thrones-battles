
const controller = require('./controller');

function initData(app) {
   app.get('/upload', controller.uploadData);

}

module.exports = initData
