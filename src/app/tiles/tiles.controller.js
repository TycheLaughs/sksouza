(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('TilesController', TilesController);

  /** @ngInject */
  function TilesController(tiles, $document, $window, $log) {
      var vm = this;
      var i = 0, j;
      var big = 60;
      var small = 30;

      /*vm.sml = $mdMedia('max-width: 700px');
      vm.lrg = $mdMedia('min-width: 701px');*/
      //console.log(vm.sml);
      vm.xPoints = [];
      vm.yPoints = [];
      vm.visited = [];
      vm.curr = {"x":0, "y":0};
      vm.prev;
      vm.squareSize = big;
      vm.puzzleIndex = 0;
      vm.validTile=false;
      vm.alerts = [];
      vm.useSmall = $window.matchMedia('(max-width: 767px)').matches;


      var canv =  $document[0].getElementById('canv');

      //$log.debug(canv);
      //var canvSml=  $document[0].getElementById('canvSml');
      /*
      Determine whether we're on a small screen or not and choose the vm.canvas
      we're using accordingly*/
      if(vm.useSmall){
         canv =  $document[0].getElementById('canvSml');
         vm.squareSize = small;
      }

      vm.context = canv.getContext("2d");
      vm.mouseY = 0;
      vm.mouseX = 0;
      vm.baseColor = "#0E6791";//"#01202F"; //"#A6C9E3";
      vm.activeColor = "#70C9E3";
      vm.wonRound = false;
      vm.puzzleData = {};

      vm.canvasSize = canv.width;
      /*init performs a GET request and selects the data for large or small
       puzzles based on which canvas/screen size. Then it calls draw()
      */
      vm.init = function(){
         tiles.getPuzzles().then(function(response){
           vm.puzzleData = response.data.puzzles;

           if(angular.isDefined(vm.puzzleData)){
             if(vm.squareSize===small){
                 vm.puzzleData = vm.puzzleData.small;
             }
             else{
                 vm.puzzleData = vm.puzzleData.big;
             }
             draw();
           }
        });
      };

      /*
         draw draws the puzzle indicated by the puzzleIndex and populates the
         arrays of points against which ww'll be checking clicks
      */
      function draw(){
         vm.tiles = vm.puzzleData[vm.puzzleIndex].tiles;
         for (i = 0; i < vm.tiles.length; i++){
            vm.xPoints.push(vm.tiles[i].x);
            vm.yPoints.push(vm.tiles[i].y);
         }
         //console.log("~Drawing puzzle~");
         //console.log("There are " + vm.tiles.length + " tiles in this puzzle.");
         vm.context.fillStyle = vm.baseColor;
         vm.context.strokeStyle = "black";

         for(i = 0; i < vm.tiles.length; i++){
            vm.context.fillRect(vm.tiles[i].x, vm.tiles[i].y, vm.squareSize, vm.squareSize);
            vm.context.fill();
            vm.context.strokeRect(vm.tiles[i].x, vm.tiles[i].y, vm.squareSize, vm.squareSize);
            vm.context.stroke();
         }
      }

      /*check cursor does all of our hard work:
         it checks if the click data it was given is within a valid square and
         paints that square if a valid selection.
      */
      function runPuzzle(x, y){
         /** is this a puzzla square? **/
         if(isInPuzzle(x, y)){
            vm.curr = getPuzzleCoord(x,y);
            //$log.debug(vm.curr);
            /** is this the same puzzle square value as one we've visited? (or the one we just visited)**/
            if(!hasBeenVisited()){
               /** is this a valid neighbor? **/
               if(isNeighbor()){
                  //$log.debug("isNotDiagonal: " +(!!isNotDiagonal()));
                  /**   is this not diagonal?**/
                  if(isNotDiagonal()){

                     vm.visited.push(vm.curr);
                     //$log.debug("visited: " + JSON.stringify(vm.visited));
                     vm.prev = vm.curr;
                     //$log.debug(vm.prev);
                     //$log.debug(JSON.stringify(vm.visited));
                     vm.validTile = true;
                  }
               }
            }

            updatePuzzle();
            isWin();
            vm.validTile = false;

         }
      }

      function isInPuzzle(x, y){
         //$log.debug(vm.xPoints);
         for(i = 0; i < vm.xPoints.length; i++){
            if(x > vm.xPoints[i] && x < (vm.xPoints[i] + vm.squareSize)){
               //$log.debug(vm.xPoints[i]);
               if(y > vm.yPoints[i] && y < (vm.yPoints[i] + vm.squareSize)){
                  //$log.debug("isInPuzzle");
                  return true;
               }
            }
         }
         //$log.debug("isNotInPuzzle");
         return false;
      }

      function getPuzzleCoord(x, y){

         for(i = 0; i < vm.xPoints.length; i++){
            if(x > vm.xPoints[i] && x < (vm.xPoints[i] + vm.squareSize)){
               //$log.debug(vm.xPoints[i]);
               if(y > vm.yPoints[i] && y < (vm.yPoints[i] + vm.squareSize)){
                  //$log.debug("isInPuzzle");
                  return {"x":vm.xPoints[i], "y":vm.yPoints[i]};
               }
            }
         }
         return {};
      }

      function hasBeenVisited(){
         if(vm.visited.length === 0){
            //$log.debug("first tile in this puzzle");
            return false;
         }
         else{
            for(j = 0; j < vm.visited.length; j++){
               if(vm.visited[j].x === vm.curr.x && vm.visited[j].y === vm.curr.y){
                  //$log.debug("has been visited before");
                  return true;

               }
            }
         }
         //$log.debug("has not been visited before");
         return false;
      }

      function isNeighbor(){
         if(vm.visited.length !== 0){
            if((Math.abs(vm.curr.x - vm.prev.x) > vm.squareSize) || (Math.abs(vm.curr.y - vm.prev.y) > vm.squareSize)){
               //$log.debug("not adjacent");
               return false;
            }
         }
         //$log.debug("adjacent");
         return true;

      }

      function isNotDiagonal(){
         if(vm.visited.length !== 0){
         //$log.debug((Math.abs(vm.curr.x - vm.prev.x) === vm.squareSize));
         //$log.debug((Math.abs(vm.curr.y - vm.prev.y)=== vm.squareSize));
         return ((Math.abs(vm.curr.x - vm.prev.x) === vm.squareSize) ^ (Math.abs(vm.curr.y - vm.prev.y)=== vm.squareSize));
      }
      return true;

      }

      function updatePuzzle(){
         vm.context.fillStyle = vm.activeColor;
         if(vm.prev.x !== ""){
            vm.context.fillRect(vm.prev.x, vm.prev.y, vm.squareSize, vm.squareSize);
            vm.context.fill();
            vm.context.strokeRect(vm.prev.x, vm.prev.y, vm.squareSize, vm.squareSize);
            vm.context.stroke();
         }

      }

      function isWin(){
         if(vm.visited.length === (vm.tiles.length) && vm.validTile == true){
            $log.debug("Puzzle Complete!");
            vm.wonRound = true;
            vm.puzzleIndex ++;
            //show alert
            //vm.winMessage();
            //$log.debug(vm.alerts.length);
            //$log.debug(JSON.stringify(vm.alerts));
         }
         if(vm.wonRound && vm.puzzleIndex < vm.puzzleData.length){
            vm.redraw();
            vm.clearPuzzle();
         }

      }
      /*
              clear puzzle resets the puzzle and all of its saved data back to
              how it was when originally drawn.
           */
           vm.clearPuzzle = function(){
             if(vm.puzzleIndex < vm.puzzleData.length)
              vm.clearCanv();
              while(vm.visited.length > 0){
                 vm.visited.pop();
              }
              vm.visited =[];
              vm.xPoints = [];
              vm.yPoints = [];
              draw();
              vm.wonRound = false;
              vm.curr = {"x":"", "y":""};
              vm.prev = {"x":"", "y":""};
           };

           /*
              redraw actually draws a new puzzle, progressing the puzzleIndex and
              calling draw()
              It also clears out old puzzle data
           */
          vm.redraw= function(){
              if(vm.wonRound && vm.puzzleIndex < (vm.puzzleData.length - 1)){
                 vm.wonRound = false;
                 wipe();
              }
           };

           /*clearCanv clears the canvas */
         vm.clearCanv = function(){
              vm.context.clearRect(0, 0, canv.width, canv.height);
          };

          function wipe(){
             while(vm.visited.length > 0){
               vm.visited.pop();
            }
             while(vm.xPoints.length > 0){
               vm.xPoints.pop();
               vm.yPoints.pop();
               vm.tiles.pop();
            }
            vm.clearCanv();
         }



           vm.winMessage = function(){
             vm.alerts.push({ msg: 'Puzzle complete!'});
          };
          vm.closeAlert = function() {
             vm.alerts.splice(0);
           };

      canv.addEventListener('click', function (e) {
         vm.mouseX = Number(e.pageX - this.getBoundingClientRect().left + $window.pageXOffset);
         vm.mouseY = Number(e.pageY - this.getBoundingClientRect().top + $window.pageYOffset);
         runPuzzle(vm.mouseX, vm.mouseY);
      });


      vm.init();


   }

}());
