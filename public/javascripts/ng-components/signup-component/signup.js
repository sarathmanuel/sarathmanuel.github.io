angular.module('mncApp')
.component('signup', {
	templateUrl: '/javascripts/ng-components/signup-component/signup.html',
	controller: signupController,
	controllerAs: '$ctrl'
})
function signupController($state, authFactory){
	console.log('signup controller is alive!');

	let vm = this;
	vm.title = 'Signup Component';
	vm.user = {};

	vm.register = function(){
		authFactory.register(vm.user)
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
