(function() {
  'use strict';

  angular
      .module('sksouza')
      .service('resume', function($http, $q){

         var resumeData = {};

         return {
            getResume: function(){
                     return $http.get('sksouza/assets/resources/resume.json').then(function(response){
                        resumeData = response.data.RESUME;
                        //console.log('Education:' + JSON.stringify(resumeData.EDUCATION));
                        return response;
                     }, function(error){
                        resumeData = {
                           "HEADER": {
                              "email":"WHOOPS",
                              "gitHub":"GOT BACK AN ERROR",
                              "website":"TIME TO DEBUG"
                           }
                        };
                        return error;
                     });


                  }

            };

      });

   }());
