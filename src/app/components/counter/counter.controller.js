(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('CountController', CountController);

  /** @ngInject */
  function CountController() {
    var vm = this;
    vm.count = 0;
    vm.counterMode="basic";

    vm.countIncr = function(){
      //$log.debug("calling countIncr()");
      vm.count ++;
   };
   vm.countDecr = function(){
      //$log.debug("calling countDecr()");
     vm.count --;
  };

  }
})();
