(function() {
  'use strict';

  angular
      .module('sksouza')
      .service('projects', function($http){

         var projectsData = {};

         return {
            getProjects: function(){
                     return $http.get('assets/resources/projects.json').then(function(response){
                        projectsData = response.data.PROJECTS;
                        return response;
                     }, function(error){
                        projectsData = {
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
