(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('NavController', NavController);

  /** @ngInject */
  function NavController() {
      var vm = this;

      vm.isNavCollapsed = false;
      vm.closeMenu = function(){
         vm.isNavCollapsed = false;
      };
  }
})();
