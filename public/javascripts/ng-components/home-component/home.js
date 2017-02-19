angular.module('mncApp')
.component('index', {
	templateUrl: '/javascripts/ng-components/home-component/home.html',
	controller: indexController,
	controllerAs: '$ctrl'
})

function indexController() {
  console.log('indexController is alive!');
  let vm = this;
  vm.title = 'Home page';
}