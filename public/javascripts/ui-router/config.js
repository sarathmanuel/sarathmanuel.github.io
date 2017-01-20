angular.module('mncApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../../templates/index.html',
    controller: 'homeController',
    controllerAs: '$ctrl'
  })
  .state('article', {
    url: '/article/:id',
    templateUrl: '/',
    controller: 'articleController',
    controllerAs: '$ctrl'
  })
  .state('test', {
    url: '/test',
    templateUrl: '../../templates/test.html',
    controller: 'testController',
    controllerAs: '$ctrl'
  })
  
  $urlRouterProvider
  .otherwise('/');

//   $locationProvider
//   .html5Mode({ enabled: true, requireBase: false });
})

.controller('homeController', function() {
  console.log('homeController is alive!');
  this.title = 'Homepage';
})
.controller('testController', function() {
  console.log('testController is alive!');
  this.title = 'test page';
})