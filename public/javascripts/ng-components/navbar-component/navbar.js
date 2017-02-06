angular.module('mncApp')
.component('navbar', {
	templateUrl: '/javascripts/ng-components/navbar-component/navbar.html',
	controller: navbarController,
	controllerAs: '$ctrl'
})
function navbarController(authFactory){
	let vm = this;
	vm.isNavCollapsed = true;

	vm.currentUser = authFactory.currentUser;
	vm.logout = authFactory.logout;
	vm.isLoggedIn = authFactory.isLoggedIn;

	vm.testToken = function(){
		console.log('local storage token:', authFactory.getToken());
	}
};
