(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('projCtrl', projCtrl);

  /** @ngInject */
  function projCtrl($scope, projects) {
     $scope.showTab = 0;
     $scope.projects={};
     projects.getProjects().then(function(response){
        $scope.projects = response.data.PROJECTS;
        //console.log(JSON.stringify($scope.projects));
     });
     $scope.rightArrow = function(){
        if($scope.showTab === $scope.projects.length -1){
           $scope.showTab = 0;
        }
        else{
           $scope.showTab++;
        }

     };
     $scope.leftArrow = function(){
        if($scope.showTab === 0){
          $scope.showTab = $scope.projects.length -1;
       }
       else{
          $scope.showTab--;
       }
    };
  }
}());
