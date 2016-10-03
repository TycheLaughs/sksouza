(function() {
  'use strict';

  angular
    .module('sksouza')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('resume', {
        url: '/resume',
        templateUrl: 'app/resume/resume.html',
        controller: 'ResumeController',
        controllerAs: 'resume'
      })
      .state('folio', {
        url: '/folio',
        templateUrl: 'app/folio/folio.html',
        controller: 'FolioController',
        controllerAs: 'folio'
      })
      .state('tiles', {
        url: '/tiles',
        templateUrl: 'app/tiles/tiles.html',
        controller: 'TilesController',
        controllerAs: 'puzz'
      })
      .state('editor', {
        url: '/editor',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'editor'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
