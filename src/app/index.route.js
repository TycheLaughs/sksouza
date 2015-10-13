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
      .state('code', {
         url: '/code',
         templateUrl: 'app/code/code.html',
         controller: 'codeCtrl',
         controllerAs: 'code'
      })
      .state('projects', {
         url: '/projects',
         templateUrl: 'app/projects/projects.html',
         controller: 'projCtrl',
         controllerAs: 'proj'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
