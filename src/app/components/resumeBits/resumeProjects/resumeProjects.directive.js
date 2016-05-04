(function() {
  'use strict';

  angular
    .module('sksouza')
    .directive('uziProj', function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/resumeBits/resumeProjects/resumeProjects.tpl.html',
      //controller: 'resumeCtrl'

      };
    return directive;
   });
}());
