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

      /*
      Determine whether we're on a small screen or not and choose the canvas
      we're using accordingly*/
      if(vm.useSmall){
         canv =  $document[0].getElementById('canvSml');
         vm.squareSize = small;
      }

      vm.context = canv.getContext("2d");
      vm.mouseY = 0;
      vm.mouseX = 0;
      vm.baseColor = "#0E6791";
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

      /*runPuzzle does all of our hard work:
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
                     isWin();
                     vm.validTile = false;
                  }
               }
            }

            updatePuzzle();
            //isWin(); //need to move the isWin check to the event listener on next pass


         }
      }


      /** isInPuzzle returns true if the given coordinates are within any
      of the puzzle tiles **/
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


      /** getPuzzleCoords returns an object containing the top-left corner
      coordinates of the puzzle in which the passed coordinates are found**/
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

      /** hasBeenVisited returns true if the coordinates of the clicked tile
      being examined is in the visited array of tiles **/
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

      /** isNeighbor checks if the clicked tile is adjacent to the last tile visited**/
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

      /** isNotDiagonal checks that the clicked tile is not diagonal to the previously selected tile **/
      function isNotDiagonal(){
         if(vm.visited.length !== 0){
         //$log.debug((Math.abs(vm.curr.x - vm.prev.x) === vm.squareSize));
         //$log.debug((Math.abs(vm.curr.y - vm.prev.y)=== vm.squareSize));
         return ((Math.abs(vm.curr.x - vm.prev.x) === vm.squareSize) ^ (Math.abs(vm.curr.y - vm.prev.y)=== vm.squareSize));
      }
      return true;

      }

      /** updatePuzzle changes the color of the selected tile, which at this point is vm.prev**/
      function updatePuzzle(){
         vm.context.fillStyle = vm.activeColor;
         if(vm.prev.x !== ""){
            vm.context.fillRect(vm.prev.x, vm.prev.y, vm.squareSize, vm.squareSize);
            vm.context.fill();
            vm.context.strokeRect(vm.prev.x, vm.prev.y, vm.squareSize, vm.squareSize);
            vm.context.stroke();
         }

      }

      /** checks the number of tiles in the visited list and the number of tiles in the puzzle
      kicks off the various bits and bobs to advance to the next puzzle if the two numbers match
      and the most recently clicked tile is valid within the restrictions of the puzzle**/
      function isWin(){
         if(vm.visited.length === vm.tiles.length && vm.validTile == true){
            $log.debug("Puzzle Complete!");
            vm.wonRound = true;
         }
         if(vm.wonRound){
            winMessage();
            vm.puzzleIndex ++;
            $log.debug(vm.alerts.length);
            if(vm.puzzleIndex < vm.puzzleData.length){
               vm.redraw();
               vm.clearPuzzle();
            }

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



         function winMessage(){
            vm.alerts.push({ msg: 'Puzzle complete!'});
          }
         vm.closeAlert = function() {
             vm.alerts.splice(0);
         };


         vm.clickedCanvas = function(e){

            var canvasContainer = $document[0].getElementById('allContent');

            vm.mouseX = Number(e.pageX - canv.getBoundingClientRect().left + $window.pageXOffset);
            vm.mouseY = Number(e.pageY - canv.getBoundingClientRect().top + $window.pageYOffset);
            $log.debug("initially: "+ vm.mouseX + ", "+ vm.mouseY);


            if(canvasContainer.scrollTop){
               $log.debug("using canvasContainer: " + canvasContainer.scrollTop);
               //vm.mouseY -= canvasContainer.scrollTop;
               //$log.debug("recalc'd: "+ vm.mouseX + ", "+ vm.mouseY);

            }
            else if($document[0].documentElement && $document[0].documentElement.scrollTop){
               $log.debug("using documentElement.scrollTop: " + $document[0].documentElement.scrollTop);
               vm.mouseY -= (2 * $document[0].documentElement.scrollTop);
               $log.debug("recalc'd: "+ vm.mouseX + ", "+ vm.mouseY);
            }
            else{
               if($document[0].body && $document[0].body.scrollTop){
                  $log.debug("using document.body.scrollTop: " + $document[0].body.scrollTop);
                  vm.mouseY -= (2 * $document[0].body.scrollTop);
                  $log.debug("recalc'd: "+ vm.mouseX + ", "+ vm.mouseY);
               }
            }

            runPuzzle(vm.mouseX, vm.mouseY);

         }


      vm.init();


   }

}());
