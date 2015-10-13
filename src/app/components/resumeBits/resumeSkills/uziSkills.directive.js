(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziSkills', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeSkills/uziSkills.html',
      controller:'resumeCtrl'

      };
    return directive;
   });
}());
