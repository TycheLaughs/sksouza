(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('ResumeController', ResumeController);

  /** @ngInject */
  function ResumeController(resume) {
    var vm = this;

    vm.resumeFilter='CS';

    resume.getResume().then(function(response){
      vm.resume = response.data.RESUME;

      if(angular.isDefined(vm.resume)){
         vm.education = vm.resume.EDUCATION;
         vm.header = vm.resume.HEADER;
         vm.xp = vm.resume.XP;
         vm.exposed = vm.resume.EXPOSEDTO;
         vm.skills = vm.resume.SKILLS;
         vm.projects = vm.resume.PROJECTS;
         vm.other = vm.resume.OTHERSKILLS;
         vm.volunteer = vm.resume.VOLUNTEER;

      }
   });

   vm.toggleProj= function(){
      if(vm.toggleProjects === false){
         vm.toggleProjects = true;
      }
      else{
         vm.toggleProjects = false;
      }
   };
   vm.toggleExp= function(){
      if(vm.toggleXP === false){
         vm.toggleXP = true;
      }
      else{
         vm.toggleXP = false;
      }
   };

  }
})();
