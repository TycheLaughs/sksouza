(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziXp', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeXP/resumeXp.tpl.html',
      controller: 'resumeCtrl'

      };
    return directive;
   });
}());
