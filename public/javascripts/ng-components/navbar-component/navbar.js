angular.module('mncApp')
.component('navbar', {
	templateUrl: '/javascripts/ng-components/navbar-component/navbar.html',
	controller: 'navbarController',
	controllerAs: '$ctrl'
})
.controller('navbarController', function(authFactory){
	this.isNavCollapsed = true;

	this.testToken = function(){
		console.log('local storage token:', authFactory.getToken());
	}
})
