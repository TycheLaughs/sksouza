(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziEducation', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeEdu/uziEducation.html',
      //controller:'resumeCtrl'

      };
    return directive;
   });
}());
