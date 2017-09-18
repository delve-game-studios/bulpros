var User = require('../models/user.js');;
module.exports = {
	indexAction: function (req, res) {
		User.find({}, function(err, users) {
			res.render('index.ejs', {users: users, message: ''});
		});
	},
	create: function (req, res) {
		var newUser = new User();
		newUser.username = req.body.username;
		if(req.body.password == req.body.password_confirm) {
			newUser.password = req.body.password;
		} else {
			res.redirect('/create');
		}
		newUser.firstName = req.body.firstName;
		newUser.lastName = req.body.lastName;

		newUser.save(function(err) {
			if(!!err) {
				res.redirect('/create');
			}
		});

		var messageTmp = 'User created: <a href="/view/%user%">%user%</a>';
		res.redirect('/');
	},
	createAction: function(req, res){
		res.render('create.ejs', {message: ''});
	},
	readAction: function(req, res){
		User.findOne({_id: req.params.id}, function(err, user) {
			res.render('view.ejs', {user: user, message: ''});
		});
	},
	update: function(req, res){
		User.findOne({_id: req.body._id}, function(err, user) {
			var tmpUser = {};
			if(!!req.body.password && req.body.password == req.body.password_confirm) {
				tmpUser.password = req.body.password;
			} else if(!!req.body.password && req.body.password != req.body.password_confirm) {
				res.render('update.ejs', {user:user,message:'Passwords do not match!',code:'alert'});
			}
			
			tmpUser.username = req.body.username;
			tmpUser.firstName = req.body.firstName;
			tmpUser.lastName = req.body.lastName;

			User.findOneAndUpdate({_id:req.body._id}, tmpUser, function(err) {
				if(!!err) {
					res.render('update.ejs', {user: user, message: err, code: 'danger'});
				} else {
					res.redirect('/');
				}
			});
		});
	},
	updateAction: function(req, res){
		User.findOne({_id: req.params.id}, function(err, user) {
			res.render('update.ejs', {user: user, message: ''});
		});
	},
	delete: function(req, res){
		User.findOne({_id: req.params.id}, function(err, user) {
			if(!!err) {
				res.redirect('/');
			}

			user.remove();
		});

		res.redirect('/');
	},
	findAction: function(req, res) {
		User.find({username: req.params.q}, function(err, users) {
			res.render('/', {users: users, message: ''});
		});
	}
};
