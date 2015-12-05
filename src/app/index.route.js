(function() {
  'use strict';

  angular
    .module('sksouza')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
     });
      /*
      .state('projects', {
         url: '/projects',
         templateUrl: 'app/projects/projects.html',
         controller: 'projCtrl',
         controllerAs: 'proj'
      });
      */
    $urlRouterProvider.otherwise('/');
  }

})();
