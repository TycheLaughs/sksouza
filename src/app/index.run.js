(function() {
  'use strict';

  angular
    .module('sksouza')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $window, $rootScope, $state) {
    $window.ga('create', 'UA-81808989-1', 'sksouza');
    $rootScope.$on('$stateChangeSuccess', function (event) {
      // if (location.hostname === 'github.io') {
           $window.ga('send', 'pageview', { page: $state.current.name });
       // }
    });
    //$log.debug('runBlock end');
  }

})();
