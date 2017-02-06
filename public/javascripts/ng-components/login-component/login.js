angular.module('mncApp')
.component('login', {
	templateUrl: '/javascripts/ng-components/login-component/login.html',
	controller: loginController,
	controllerAs: '$ctrl'
})
function loginController($state, authFactory){
	console.log('login controller is alive!');

	let vm = this;
	vm.title = 'Login';
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
				$state.go('home');
			}
		})
		.catch(function(err){
			vm.error = err.data.message;
		});
	};
};
