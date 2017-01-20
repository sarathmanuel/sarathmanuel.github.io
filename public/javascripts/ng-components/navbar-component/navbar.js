angular.module('mncApp')
.component('navbar', {
	templateUrl: '/javascripts/ng-components/navbar-component/navbar.html',
	controller: 'navbarController',
	controllerAs: '$ctrl'
})
.controller('navbarController', function(){
	this.isNavCollapsed = true;
})
