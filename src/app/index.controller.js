(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('indexCtrl', indexController);

  /** @ngInject */
  function indexController($scope, $state) {
    $scope.isOpen = false;
    $scope.state = $state;
  }
})();
