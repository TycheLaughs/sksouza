(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziResFoot', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeFooter/resumeFoot.tpl.html',
      controller: 'resumeCtrl'

      };
    return directive;
   });
}());
