(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('FolioController', FolioController);

  /** @ngInject */
  function FolioController(folio) {
    var vm = this;

    vm.folioFilter='CS';

    folio.getFolio().then(function(response){
      vm.folio = response.data.PROJECTS;

      if(angular.isDefined(vm.folio)){
         vm.projects = vm.folio;


      }
   });

  }
})();
