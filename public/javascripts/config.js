angular.module('mncApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
	.state('home', {
		url: '/',
		component: 'index'
	})
	.state('signup', {
		url: '/register',
		component: 'signup',
		onEnter: function($state, authFactory){
			if(authFactory.isLoggedIn()){
				$state.go('home');
			}
		}
	})
	.state('login', {
		url: '/login',
		component: 'login',
		onEnter: function($state, authFactory){
			if(authFactory.isLoggedIn()){
				$state.go('home');
			}
		}
	})
	.state('future', {
		url: '/future',
		templateUrl: 'templates/future.html',
		controller: 'futureController',
		controllerAs: '$ctrl'
	})
	.state('fossils', {
		url: '/fossils',
		templateUrl: 'templates/fossils.html',
		controller: 'fossilsController',
		controllerAs: '$ctrl'
	})
	.state('opinion', {
		url: '/opinion',
		templateUrl: 'templates/opinion.html',
		controller: 'opinionController',
		controllerAs: '$ctrl'
	})
	.state('article', {
		url: '/article/:id',
		templateUrl: '/',
		controller: 'articleController',
		controllerAs: '$ctrl'
	})
	.state('archive', {
		url: '/archive',
		templateUrl: 'templates/archive.html',
		controller: 'archiveController',
		controllerAs: '$ctrl'
	})
	
	$urlRouterProvider
	.otherwise('/');

//   $locationProvider
//   .html5Mode({ enabled: true, requireBase: false });
})

