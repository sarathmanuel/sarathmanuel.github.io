angular.module('mncApp')
.factory('authFactory', function($http, $window){
	console.log('authFactory was called!');
	let auth = {};

	auth.saveToken = function(token){
		$window.localStorage['mnc-user-token'] = token;
		console.log('Successfully saved token:', token);
	}

	auth.getToken = function(){
		return $window.localStorage['mnc-user-token'];
	}

	auth.isLoggedIn = function(){
		let token = auth.getToken();

		if (token){
			let payload = JSON.parse($window.atob(token.split('.')[1]));
			return (payload.exp > Date.now() / 1000);	//check if token is expired.
		}
		else {
			return false;
		};
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			let token = auth.getToken();
			let payload = JSON.parse($window.atob(token.split('.')[1]));

			console.log(payload);
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
		return $http.post('/login', user).success(function(data){
			auth.saveToken(data.token);
		});
	};
	
	auth.logout = function(){
		$window.localStorage.removeItem('mnc-user-token')
	}

	return auth;
})