angular.module('mncApp')
.factory('authFactory', function($http, $window){
	console.log('authFactory was called!');
	let auth = {};

	auth.saveToken = function(token){
		$window.localStorage['mnc-user-token'] = token;
		console.log('Successfully saved token:', token);
	}

	auth.getToken = function(){
		console.log('getting token from localstorage:', $window.localStorage['mnc-user-token']);
		return $window.localStorage['mnc-user-token'];
	}

	auth.isLoggedIn = function(){
		let token = auth.getToken();

		if (token){
			let payload = JSON.parse($window.atob(token.split('.')[1]));
			console.log('checking if logged in:', (payload.expiration > Date.now() / 1000));
			return (payload.expiration > Date.now() / 1000);	//check if token is expired.
		}
		else {
			return false;
		};
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			let token = auth.getToken();
			let payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.username;
		};
	};

	auth.register = function(user){
		return $http.post('/register', user)
		.then(function successCallback(res){
			console.log('registration successful. response:', res);
			console.log('saving token:', res.data.token);
			auth.saveToken(res.data.token);
		})
		.catch(function(err){
			console.log('ERROR:', err);
			return err;
		})
	}
	
	auth.login = function(user){
		return $http.post('/login', user)
		.then(function successCallback(res){
			console.log('login successful. response:', res);
			console.log('saving token to local:', res.data.token);
			auth.saveToken(res.data.token);
		})
		.catch(function(err){
			console.log('LOGIN ERROR:', err);
			return err;
		})
	};
	
	auth.logout = function(){
		console.log('Logging out. deleting jwt.');
		$window.localStorage.removeItem('mnc-user-token')
	}

	return auth;
})