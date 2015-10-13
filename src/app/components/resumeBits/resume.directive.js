(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziResume', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resume.directive.tpl.html',
      controller: 'resumeCtrl',

      };
    return directive;
   });
}());
