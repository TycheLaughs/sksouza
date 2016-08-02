(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('FolioController', function ($scope, $state) {
      $scope.$on('$viewContentLoaded', function(event) {
      //   if (location.hostname === 'tychelaughs.github.io') {
             ga('send', 'pageview', { page: $state.current.name });
         //  }

       });
       //console.log($state.current.name);
   });
})();
