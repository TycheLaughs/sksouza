(function() {
   'use strict';
   angular
      .module('sksouza')
      .service('tiles', function($http){

         //var resumeData = {};

         return {
            getPuzzles: function(){
               return $http.get('assets/resources/puzzles.json').then(function(response){

                  return response;
               }, function(error){

                  return error;
               });
            }
         };
      });
}());
