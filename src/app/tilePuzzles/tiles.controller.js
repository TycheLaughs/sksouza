(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('tileCtrl', function ($scope, $mdMedia, $mdDialog, $http){
      var i = 0, j, k = -1;
      var big = 60;
      var small = 30;
      var temp; //floaty var for any misc temporary things
      $scope.sml = $mdMedia('max-width: 700px');
      $scope.lrg = $mdMedia('min-width: 701px');
      //console.log($scope.sml);
      $scope.xPoints = [];
      $scope.yPoints = [];
      $scope.visited = [];
      $scope.curr = {"x":"", "y":""};
      $scope.squareSize = big;
      $scope.puzzleIndex = 0;

      var canv;
      /*
      Determine whether we're on a small screen or not and choose the canvas
      we're using accordingly*/
      if($scope.sml){
         canv = document.getElementsByClassName('canv').namedItem('canvSml');
         $scope.squareSize = small;
         temp = document.getElementsByClassName('canv').namedItem('canv');
         temp.getContext('2d').height = 0;
         temp.getContext('2d').width = 0;
      }
      if($scope.lrg){
         canv = document.getElementsByClassName('canv').namedItem('canv');
         temp = document.getElementsByClassName('canv').namedItem('canvSml');
         temp.getContext('2d').height = 0;
         temp.getContext('2d').width = 0;
      }
      //console.log(canv);
      $scope.context = canv.getContext("2d");
      $scope.mouseY = 0;
      $scope.mouseX = 0;
      $scope.baseColor = "#A6C9E3";
      $scope.activeColor = "#70C9E3";
      $scope.wonRound = false;
      $scope.puzzleData = {};

      $scope.canvasSize = canv.width;
      /*init performs a GET request and selects the data for large or small
       puzzles based on which canvas/screen size. Then it calls draw()
      */
      $scope.init = function(){
         $http.get('assets/resources/puzzles.json').then(function(response){
            $scope.puzzleData = response.data.puzzles;
            if($scope.sml){
               $scope.puzzleData = $scope.puzzleData.small;
            }
            else{
               $scope.puzzleData = $scope.puzzleData.big;
            }
            //console.log(JSON.stringify($scope.puzzleData));
            $scope.draw();
         });

      };

      /*
         draw draws the puzzle indicated by the puzzleIndex and populates the
         arrays of points against which ww'll be checking clicks
      */
      $scope.draw = function (){
         $scope.tiles = $scope.puzzleData[$scope.puzzleIndex].tiles;
         for (i = 0; i < $scope.tiles.length; i++){
   			$scope.xPoints.push($scope.tiles[i].x);
   			$scope.yPoints.push($scope.tiles[i].y);
   		}
         //console.log("~Drawing puzzle~");
         //console.log("There are " + $scope.tiles.length + " tiles in this puzzle.");
         $scope.context.fillStyle = $scope.baseColor;
      	$scope.context.strokeStyle = "black";

      	for(i = 0; i < $scope.tiles.length; i++){
      		$scope.context.fillRect($scope.tiles[i].x, $scope.tiles[i].y, $scope.squareSize, $scope.squareSize);
      		$scope.context.fill();
      		$scope.context.strokeRect($scope.tiles[i].x, $scope.tiles[i].y, $scope.squareSize, $scope.squareSize);
      		$scope.context.stroke();
      	}
      };

      /*check cursor does all of our hard work:
         it checks if the click data it was given is within a valid square and
         paints that square if a valid selection.
      */
      function checkCursor(x, y){
         var lastSelected = {"x":"", "y":""};
         lastSelected.x = $scope.curr.x; //store previous values
         lastSelected.y = $scope.curr.y;
         ////console.log(x + ", " + y);
      	for(i = 0; i < $scope.xPoints.length; i++){
      		if(x > $scope.xPoints[i] && x < ($scope.xPoints[i] + $scope.squareSize)){
      			if(y > $scope.yPoints[i] && y < ($scope.yPoints[i] + $scope.squareSize)){
      				if(($scope.xPoints[i] !== $scope.curr.x) || ($scope.yPoints[i]!== $scope.curr.y)){ //value is not same value

      					$scope.curr.x = $scope.xPoints[i]; //find current values
      					$scope.curr.y = $scope.yPoints[i];

      					if( lastSelected.x !== ""){ //if we've encountered any tile before
                     //diagonals are forbidden; squares must also be neighbors of currently selected square
      						if(isNotDiagonal($scope.curr, lastSelected, $scope.squareSize) && isAdjacent($scope.curr, lastSelected, $scope.squareSize)){
                           //if this is the second tile we're selecting, put the one we previously selected onto visited
      							if($scope.visited.length === 0){
      								$scope.visited.push( lastSelected);
      								$scope.visited[0].x = lastSelected.x;
      								$scope.visited[0].y = lastSelected.y;
      							}
      							else{
      								//did we visit  the previously-selected tile before?
      								for(j = 0; j < $scope.visited.length; j++){
      									if($scope.visited[j].x === lastSelected.x && $scope.visited[j].y === lastSelected.y){
      										k = j;
                                    //console.log("tile already in visited array");
      									}
      								}
      								if(k < 0){ //if we haven't visited the previously-selected tile before, push it to visited
      									$scope.visited.push( lastSelected);
      									//$scope.visited[$scope.visited.length-1].x = lastSelected.x;
      									//$scope.visited[$scope.visited.length-1].y = lastSelected.y;
                                 k = -1;

      								}
      							}

      							//remember that selected is xPoints[i], yPoints[i] here:
      							$scope.context.fillStyle = $scope.activeColor;
      							$scope.context.fillRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
      							$scope.context.fill();
      							$scope.context.strokeRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
      							$scope.context.stroke();
      						}
      								//we're trying to select a tile diagonal to this one, so it shouldn't work.
      								//set selected back to what it was.
      						else{
                           //otherwise, this click was in an invalid spot, so reset the selection to the previous
      							$scope.curr.x = lastSelected.x;
      							$scope.curr.y = lastSelected.y;
      						}
      					}
      					else{
      						//remember that selected is xPoints[i], yPoints[i] here:
                        //paint selection
                        $scope.visited.push($scope.curr);
      						$scope.context.fillStyle = $scope.activeColor;
      						$scope.context.fillRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
      						$scope.context.fill();
      						$scope.context.strokeRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
      						$scope.context.stroke();
      					}

      				}
      			}
      		}
      	}
         //console.log("current: " + JSON.stringify($scope.curr));
         //console.log("previous: " + JSON.stringify(lastSelected));
         //console.log("visited: " + JSON.stringify($scope.visited));
      }
      /*
         checks if the new tile is diagonal to the old selection.
         returns true if not diagonal
      */
      function isNotDiagonal(current, previous, size){

      	return (!!((Math.abs(current.x - previous.x) === size) ^ (Math.abs(current.y - previous.y)=== size)));
      }
      /*
         checks if the new tile is adjacent to the old selection.
         returns true if it is
      */
      function isAdjacent(current, previous, size){

      	if((Math.abs(current.x - previous.x) > size) || (Math.abs(current.y - previous.y) > size)){
      		////console.log("not adjacent");
      		return false;
      	}
      	else{
      		////console.log("adjacent");
      		return true;
      	}
      }

      /*
         clear puzzle resets the puzzle and all of its saved data back to
         how it was when originally drawn.
      */
      $scope.clearPuzzle = function(){

         //console.log("Clearing puzzle");
         $scope.clearCanv();
         while($scope.visited.length > 0){
            $scope.visited.pop();
         }
         $scope.visited =[];
         $scope.xPoints = [];
         $scope.yPoints = [];
         $scope.draw();
         $scope.wonRound = false;
         $scope.curr = {"x":"", "y":""};
      };

      /*
         showDeny
         modal/dialog/alert for when player attempts to go to the next
         puzzle without completing the current one
      */
      $scope.showDeny = function(ev) {
         $mdDialog.show(
          $mdDialog.alert()
           .parent(angular.element(document.querySelector('.inner')))
           .clickOutsideToClose(true)
           .title('Complete this puzzle first.')
           .ariaLabel('No-go')
           .targetEvent(ev)
         );
      };

      /*
         redraw actually draws a new puzzle, progressing the puzzleIndex and
         calling draw()
         It also clears out old puzzle data
      */
      $scope.redraw = function(){
         if($scope.wonRound){
            $scope.puzzleIndex ++;
            $scope.wonRound = false;
            while($scope.visited.length > 0){
               $scope.visited.pop();
               $scope.tiles.pop();
               $scope.xPoints.pop();
               $scope.yPoints.pop();
            }

            $scope.curr = {"x":"", "y":""};
            //console.log("Puzzle index is now " + $scope.puzzleIndex);
            $scope.clearCanv();
            $scope.draw();
         }
      };

      /*clearCanv clears the canvas */
      $scope.clearCanv = function(){
         $scope.context.clearRect(0, 0, canv.width, canv.height);
      };

      /*
         showAlert pops open a modal/dialog with a message upon puzzle
         completion
      */
      $scope.showAlert = function(ev) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('.inner')))
              .clickOutsideToClose(true)
              .title('Puzzle Complete!')
              .ariaLabel('Puzzle Complete')
              .targetEvent(ev)
          );
        };

      canv.addEventListener('click', function (e) {
         $scope.mouseX = Number(e.pageX - this.offsetLeft);
         $scope.mouseY = Number(e.pageY - this.offsetTop);
         checkCursor($scope.mouseX, $scope.mouseY);
         //console.log($scope.visited.length);
         if($scope.visited.length === ($scope.tiles.length)){
            //console.log("Puzzle Complete!");
            $scope.wonRound = true;
            $scope.showAlert(e);
         }
         if($scope.wonRound && $scope.puzzleIndex !== $scope.puzzleData.length-1){
            $scope.redraw();
         }
      });


      $scope.init();


   });

}());
