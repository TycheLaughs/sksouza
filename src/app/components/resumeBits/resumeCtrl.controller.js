(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('resumeCtrl', function ($scope, resume) {
        $scope.toggleProjects = false;
        $scope.toggleXP = false;

      resume.getResume().then(function(response){
         $scope.resume = response.data.RESUME;
         //console.log(JSON.stringify($scope.resume));
         if($scope.resume !== undefined){
            $scope.education = $scope.resume.EDUCATION;
            $scope.header = $scope.resume.HEADER;
            $scope.xp = $scope.resume.XP;
            $scope.exposed = $scope.resume.EXPOSEDTO;
            $scope.skills = $scope.resume.SKILLS;
            $scope.projects = $scope.resume.PROJECTS;
            $scope.other = $scope.resume.OTHERSKILLS;
            $scope.volunteer = $scope.resume.VOLUNTEER;
            //console.log(JSON.stringify($scope.exposed));
         }
      });

      $scope.toggleProj= function(){
        if($scope.toggleProjects === false){
           $scope.toggleProjects = true;
        }
        else{
           $scope.toggleProjects = false;
        }
     };
      $scope.toggleExp= function(){
        if($scope.toggleXP === false){
           $scope.toggleXP = true;
        }
        else{
           $scope.toggleXP = false;
        }
     };


   });
}());
