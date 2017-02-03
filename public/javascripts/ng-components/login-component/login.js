angular.module('mncApp')
.component('login', {
	templateUrl: '/javascripts/ng-components/login-component/login.html',
	controller: 'loginController',
	controllerAs: '$ctrl'
})
.controller('loginController', function($state, authFactory){
	console.log('login controller is alive!');

	let vm = this;
	vm.title = 'Login Component';
	vm.user = {};

	vm.login = function(){
		authFactory.login(vm.user)
		.then(function(res){
			console.log('received res from authFactory:', res);
			if (res){
				if (res.data.message){
					console.log(res.data.message);
					vm.error = res.data.message;
				}
			}
			else {
				$state.go('fossils');
			}
		})
		.catch(function(err){
			vm.error = err.data.message;
		})
	}
})
