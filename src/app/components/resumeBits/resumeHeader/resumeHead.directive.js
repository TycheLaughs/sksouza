(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziHeader', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeHeader/resumeHead.tpl.html',
      controller: 'resumeCtrl'

      };
    return directive;
   });
}());
