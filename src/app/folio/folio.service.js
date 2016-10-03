(function() {
   'use strict';
   angular
      .module('sksouza')
      .service('folio', function($http){

         //var resumeData = {};

         return {
            getFolio: function(){
               return $http.get('assets/resources/projects.json').then(function(response){
                  
                  return response;
               }, function(error){

                  return error;
               });
            }
         };
      });
}());
