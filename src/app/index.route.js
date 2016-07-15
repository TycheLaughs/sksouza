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

     })
     .state('folio', {
        url: '/folio',
        templateUrl: 'app/folio/folio.html',
        controller: 'FolioController',
        controllerAs: 'folio'
     })
     .state('tiles', {
        url: '/tiles',
        templateUrl: 'app/tilePuzzles/tiles.html',
        controller: 'tileCtrl',
        controllerAs: 'tiles'
     })
     .state('editor', {
       url: '/editor',
       templateUrl: 'app/editor/tileEditor.html',
       controller: 'EditorController',
       controllerAs: 'editor'
     })
      .state('resume', {
         url: '/resume',
         templateUrl: 'app/resume/resume.html',
         controller: 'MainController',
         controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
