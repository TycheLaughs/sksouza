(function() {
   'use strict';
   angular
      .module('sksouza')
      .service('resume', function($http){

         //var resumeData = {};

         return {
            getResume: function(){
               return $http.get('assets/resources/resume.json').then(function(response){
                  //var resumeData = response.data.RESUME;
                  //console.log('Education:' + JSON.stringify(resumeData.EDUCATION));
                  return response;
               }, function(error){
         
                  return error;
               });
            }
         };
      });
}());
