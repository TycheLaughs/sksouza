(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziExposedTo', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeExposedTo/uziExposedTo.html',
      controller:'resumeCtrl'

      };
    return directive;
   });
}());
