angular.module('mncApp')
.component('navbar', {
	templateUrl: '/javascripts/ng-components/navbar-component/navbar.html',
	controller: 'navbarController',
	controllerAs: '$ctrl'
})
.controller('navbarController', function(authFactory){
	let vm = this;

	vm.isNavCollapsed = true;

	vm.testToken = function(){
		console.log('local storage token:', authFactory.getToken());
	}

	vm.currentUser = authFactory.currentUser;
	vm.logout = authFactory.logout;
	vm.isLoggedIn = authFactory.isLoggedIn;
})
