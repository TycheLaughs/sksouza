(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziOther', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeOther/uziOther.html',
      controller:'resumeCtrl'

      };
    return directive;
   });
}());
