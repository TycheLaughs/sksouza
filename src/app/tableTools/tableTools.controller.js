(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('ToolsController', ToolsController);

  /** @ngInject */
  function ToolsController() {
    var vm = this;
    vm.activeTool = "";


  }
})();
