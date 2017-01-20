angular.module('mncApp')
.controller('homeController', function() {
  console.log('homeController is alive!');
  this.title = 'Homepage';
})
.controller('futureController', function() {
  console.log('futureController is alive!');
})
.controller('fossilsController', function() {
  console.log('fossilsController is alive!');
})
.controller('opinionController', function() {
  console.log('opinionController is alive!');
})
.controller('archiveController', function() {
  console.log('archiveController is alive!');
})