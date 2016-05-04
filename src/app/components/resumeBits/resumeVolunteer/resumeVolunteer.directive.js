(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziVol', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeVolunteer/resumeVolunteer.tpl.html',
      //controller: 'resumeCtrl'

      };
    return directive;
   });
}());
