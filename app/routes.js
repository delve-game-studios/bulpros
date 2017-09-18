var UserController = require('./controllers/users.controller.js');
module.exports = function(app) {
	app.get('/', UserController.indexAction);

	app.get('/create', UserController.createAction);

	app.post('/create', UserController.create);

	app.get('/view/:id', UserController.readAction);

	app.get('/edit/:id', UserController.updateAction);

	app.post('/edit/:id', UserController.update);

	app.post('/delete/:id', UserController.delete);

	app.get('/find/:q', UserController.findAction);
}
