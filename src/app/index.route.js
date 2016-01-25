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
     })
     .state('tiles', {
        url: '/tiles',
        templateUrl: 'app/tilePuzzles/tiles.html',
        controller: 'tileCtrl',
        controllerAs: 'tiles'
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
