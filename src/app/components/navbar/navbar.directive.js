(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziNav', function () {
      var directive = {
         restrict: 'E',
         templateUrl: 'app/components/navbar/uziNav.directive.tpl.html',
         controller: 'NavController',
         controllerAs: 'menu'

      };
    return directive;
   });
}());
