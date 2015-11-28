(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('projCtrl', projCtrl);

  /** @ngInject */
  function projCtrl($scope, projects) {
     $scope.projects={};
     projects.getProjects().then(function(response){
        $scope.projects = response.data.PROJECTS;
        console.log(JSON.stringify($scope.projects));
     });
  }
})();
