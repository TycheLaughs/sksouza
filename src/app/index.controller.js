(function() {
  'use strict';

  angular
    .module('sksouza')

    .controller('indexCtrl', function ($scope,  $window, $state) {
      /*$scope.$on('$viewContentLoaded', function(event) {
         //if (location.hostname === 'tychelaughs.github.io') {
             $window.ga('send', 'pageview', { page: $state.current.name });
          //}

      });*/
      $scope.isOpen = false;
      $scope.state = $state;
      $scope.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      //console.log($scope.isSafari);
      //found here: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
      //console.log($state.current.name);
   });
})();
