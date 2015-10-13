(function() {
  'use strict';

  angular
    .module('sksouza')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
