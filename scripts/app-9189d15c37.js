!function(){"use strict";angular.module("sksouza",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";angular.module("sksouza").directive("uziNav",function(){var e={restrict:"E",templateUrl:"app/components/navbar/uziNav.directive.tpl.html",controller:"NavController",controllerAs:"menu"};return e})}(),function(){"use strict";function e(){}angular.module("sksouza").controller("NavController",e)}(),function(){"use strict";function e(){var e=this;e.diceDenomination=6,e.diceCount=1,e.diceRolls=[],e.nextDiceCount=1,e.nextDiceDenom=6,e.rollDice=function(){e.clearRecord();for(var s=0;s<e.nextDiceCount;s++)e.diceRolls.push(e.rollOneDie(e.nextDiceDenom));e.diceCount=e.nextDiceCount,e.diceDenomination=e.nextDiceDenom},e.rollOneDie=function(e){var s=Math.floor(Math.random()*e)+1;return s},e.clearRecord=function(){for(;e.diceRolls.length>0;)e.diceRolls.pop()},e.countIncr=function(){e.nextDiceCount++},e.countDecr=function(){e.nextDiceCount>1&&e.nextDiceCount--}}angular.module("sksouza").controller("DiceController",e)}(),function(){"use strict";function e(){var e=this;e.count=0,e.counterMode="basic",e.countIncr=function(){e.count++},e.countDecr=function(){e.count--}}angular.module("sksouza").controller("CountController",e)}(),function(){"use strict";function e(){}angular.module("sksouza").controller("MainController",e)}(),function(){"use strict";function e(){var e=this;e.activeTool=""}angular.module("sksouza").controller("ToolsController",e)}(),function(){"use strict";angular.module("sksouza").service("tiles",["$http",function(e){return{getPuzzles:function(){return e.get("assets/resources/puzzles.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e,s,i,l){function t(){for(g.tiles=g.puzzleData[g.puzzleIndex].tiles,b=0;b<g.tiles.length;b++)g.xPoints.push(g.tiles[b].x),g.yPoints.push(g.tiles[b].y);for(g.context.fillStyle=g.baseColor,g.context.strokeStyle="black",b=0;b<g.tiles.length;b++)g.context.fillRect(g.tiles[b].x,g.tiles[b].y,g.squareSize,g.squareSize),g.context.fill(),g.context.strokeRect(g.tiles[b].x,g.tiles[b].y,g.squareSize,g.squareSize),g.context.stroke()}function n(e,s){a(e,s)&&(g.curr=o(e,s),c()||r()&&d()&&(g.visited.push(g.curr),g.prev=g.curr,g.validTile=!0,p(),g.validTile=!1),u())}function a(e,s){for(b=0;b<g.xPoints.length;b++)if(e>g.xPoints[b]&&e<g.xPoints[b]+g.squareSize&&s>g.yPoints[b]&&s<g.yPoints[b]+g.squareSize)return!0;return!1}function o(e,s){for(b=0;b<g.xPoints.length;b++)if(e>g.xPoints[b]&&e<g.xPoints[b]+g.squareSize&&s>g.yPoints[b]&&s<g.yPoints[b]+g.squareSize)return{x:g.xPoints[b],y:g.yPoints[b]};return{}}function c(){if(0===g.visited.length)return!1;for(m=0;m<g.visited.length;m++)if(g.visited[m].x===g.curr.x&&g.visited[m].y===g.curr.y)return!0;return!1}function r(){return 0!==g.visited.length&&(Math.abs(g.curr.x-g.prev.x)>g.squareSize||Math.abs(g.curr.y-g.prev.y)>g.squareSize)?!1:!0}function d(){return 0!==g.visited.length?Math.abs(g.curr.x-g.prev.x)===g.squareSize^Math.abs(g.curr.y-g.prev.y)===g.squareSize:!0}function u(){g.context.fillStyle=g.activeColor,""!==g.prev.x&&(g.context.fillRect(g.prev.x,g.prev.y,g.squareSize,g.squareSize),g.context.fill(),g.context.strokeRect(g.prev.x,g.prev.y,g.squareSize,g.squareSize),g.context.stroke())}function p(){g.visited.length===g.tiles.length&&1==g.validTile&&(l.debug("Puzzle Complete!"),g.wonRound=!0),g.wonRound&&(f(),g.puzzleIndex++,l.debug(g.alerts.length),g.puzzleIndex<g.puzzleData.length&&(g.redraw(),g.clearPuzzle()))}function v(){for(;g.visited.length>0;)g.visited.pop();for(;g.xPoints.length>0;)g.xPoints.pop(),g.yPoints.pop(),g.tiles.pop();g.clearCanv()}function f(){g.alerts.push({msg:"Puzzle complete!"})}var m,g=this,b=0,x=60,h=30;g.xPoints=[],g.yPoints=[],g.visited=[],g.curr={x:0,y:0},g.prev,g.squareSize=x,g.puzzleIndex=0,g.validTile=!1,g.alerts=[],g.useSmall=i.matchMedia("(max-width: 767px)").matches;var z=s[0].getElementById("canv");g.useSmall&&(z=s[0].getElementById("canvSml"),g.squareSize=h),g.context=z.getContext("2d"),g.mouseY=0,g.mouseX=0,g.baseColor="#0E6791",g.activeColor="#70C9E3",g.wonRound=!1,g.puzzleData={},g.canvasSize=z.width,g.init=function(){e.getPuzzles().then(function(e){g.puzzleData=e.data.puzzles,angular.isDefined(g.puzzleData)&&(g.squareSize===h?g.puzzleData=g.puzzleData.small:g.puzzleData=g.puzzleData.big,t())})},g.clearPuzzle=function(){for(g.puzzleIndex<g.puzzleData.length&&g.clearCanv();g.visited.length>0;)g.visited.pop();g.visited=[],g.xPoints=[],g.yPoints=[],t(),g.wonRound=!1,g.curr={x:"",y:""},g.prev={x:"",y:""}},g.redraw=function(){g.wonRound&&g.puzzleIndex<g.puzzleData.length-1&&(g.wonRound=!1,v())},g.clearCanv=function(){g.context.clearRect(0,0,z.width,z.height)},g.closeAlert=function(){g.alerts.splice(0)},g.clickedCanvas=function(e){var t=s[0].getElementById("allContent");g.mouseX=Number(e.pageX-z.getBoundingClientRect().left+i.pageXOffset),g.mouseY=Number(e.pageY-z.getBoundingClientRect().top+i.pageYOffset),l.debug("initially: "+g.mouseX+", "+g.mouseY),t.scrollTop?l.debug("using canvasContainer: "+t.scrollTop):s[0].documentElement&&s[0].documentElement.scrollTop?(l.debug("using documentElement.scrollTop: "+s[0].documentElement.scrollTop),g.mouseY-=2*s[0].documentElement.scrollTop,l.debug("recalc'd: "+g.mouseX+", "+g.mouseY)):s[0].body&&s[0].body.scrollTop&&(l.debug("using document.body.scrollTop: "+s[0].body.scrollTop),g.mouseY-=2*s[0].body.scrollTop,l.debug("recalc'd: "+g.mouseX+", "+g.mouseY)),n(g.mouseX,g.mouseY)},g.init()}e.$inject=["tiles","$document","$window","$log"],angular.module("sksouza").controller("TilesController",e)}(),function(){"use strict";angular.module("sksouza").service("resume",["$http",function(e){return{getResume:function(){return e.get("assets/resources/resume.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e){var s=this;s.resumeFilter="CS",e.getResume().then(function(e){s.resume=e.data.RESUME,angular.isDefined(s.resume)&&(s.education=s.resume.EDUCATION,s.header=s.resume.HEADER,s.xp=s.resume.XP,s.exposed=s.resume.EXPOSEDTO,s.skills=s.resume.SKILLS,s.projects=s.resume.PROJECTS,s.other=s.resume.OTHERSKILLS,s.volunteer=s.resume.VOLUNTEER)}),s.toggleProj=function(){s.toggleProjects===!1?s.toggleProjects=!0:s.toggleProjects=!1},s.toggleExp=function(){s.toggleXP===!1?s.toggleXP=!0:s.toggleXP=!1}}e.$inject=["resume"],angular.module("sksouza").controller("ResumeController",e)}(),function(){"use strict";angular.module("sksouza").service("folio",["$http",function(e){return{getFolio:function(){return e.get("assets/resources/projects.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e){var s=this;s.folioFilter="CS",e.getFolio().then(function(e){s.folio=e.data.PROJECTS,angular.isDefined(s.folio)&&(s.projects=s.folio)})}e.$inject=["folio"],angular.module("sksouza").controller("FolioController",e)}(),function(){"use strict";function e(e,s){function i(){for(o.clearCanv(),o.canClickTiles=!1,t.fillStyle=o.inactive,t.strokeStyle=o.bkg,o.drawBase(),t.fillStyle=o.active,t.strokeStyle=o.movingStroke,n=0;n<o.tiles.length;n++)t.fillRect(o.tiles[n].x,o.tiles[n].y,o.squareSize,o.squareSize),t.strokeRect(o.tiles[n].x,o.tiles[n].y,o.squareSize,o.squareSize),t.fill(),t.stroke()}var l,t,n,a,o=this;switch(o.whichCanv="large",o.max=9,o.squareSize=60,o.xPoints=[],o.yPoints=[],o.tiles=[],o.mouseX=0,o.mouseY=0,o.coordTile={x:"",y:""},o.noFill=!0,o.inactive="#010E16",o.active="#70C9E3",o.normal="#A6C9E3",o.bkg="gray",o.movingStroke="#010E16",o.canClickTiles=!0,o.uhOh=!1,o.whichCanv){case"large":l=s[0].getElementById("canvEd"),o.squareSize=60;break;case"small":l=s[0].getElementById("canvSmlEd"),o.squareSize=30}o.drawBase=function(){for(n=0;n<o.xPoints.length;n++)t.fillRect(o.xPoints[n],o.yPoints[n],o.squareSize,o.squareSize),t.strokeRect(o.xPoints[n],o.yPoints[n],o.squareSize,o.squareSize),t.fill(),t.stroke()},o.init=function(){for(t=l.getContext("2d"),t.fillStyle=o.inactive,t.strokeStyle=o.normal,n=0;n<o.max;n++)for(a=0;a<o.max;a++)o.xPoints.push(n*o.squareSize+o.squareSize/2),o.yPoints.push(a*o.squareSize+o.squareSize/2);o.drawBase()},o.switchCanv=function(){switch(o.whichCanv){case"large":l=s[0].getElementById("canvEd"),o.squareSize=60;break;case"small":l=s[0].getElementById("canvSmlEd"),o.squareSize=30}o.xPoints.splice(0,o.xPoints.length),o.yPoints.splice(0,o.yPoints.length),o.tiles.splice(0,o.tiles.length),o.init()},o.dealWithClicks=function(e,s){for(o.coordTile={x:"",y:""},n=0;n<o.xPoints.length;n++)if(o.noFill=!0,e>o.xPoints[n]&&e<o.xPoints[n]+o.squareSize&&s>o.yPoints[n]&&s<o.yPoints[n]+o.squareSize){if(o.coordTile.x=o.xPoints[n],o.coordTile.y=o.yPoints[n],0===o.tiles.length)o.tiles.push(o.coordTile),t.fillStyle=o.active,t.strokeStyle=o.movingStroke,o.noFill=!1;else{for(a=0;a<o.tiles.length;a++)o.coordTile.x===o.tiles[a].x&&o.coordTile.y===o.tiles[a].y&&(o.tiles.splice(a,1),t.fillStyle=o.inactive,t.strokeStyle=o.normal,o.noFill=!1);o.noFill&&(o.tiles.push(o.coordTile),t.fillStyle=o.active,t.strokeStyle=o.movingStroke,o.noFill=!1)}t.fillRect(o.xPoints[n],o.yPoints[n],o.squareSize,o.squareSize),t.strokeRect(o.xPoints[n],o.yPoints[n],o.squareSize,o.squareSize),t.fill(),t.stroke()}},o.clearCanv=function(){t.clearRect(0,0,l.width,l.height)},o.left=function(){for(n=0;n<o.tiles.length;n++)o.tiles[n].x-=5,o.tiles[n].x<o.squareSize/2&&(o.uhOh=!0);if(o.uhOh){for(n=0;n<o.tiles.length;n++)o.tiles[n].x+=5;o.uhOh=!1}i()},o.right=function(){for(n=0;n<o.tiles.length;n++)o.tiles[n].x+=5,o.tiles[n].x>l.width-3*o.squareSize/2&&(o.uhOh=!0);if(o.uhOh){for(n=0;n<o.tiles.length;n++)o.tiles[n].x-=5;o.uhOh=!1}i()},o.up=function(){for(n=0;n<o.tiles.length;n++)o.tiles[n].y-=5,o.tiles[n].y<o.squareSize/2&&(o.uhOh=!0);if(o.uhOh){for(n=0;n<o.tiles.length;n++)o.tiles[n].y+=5;o.uhOh=!1}i()},o.down=function(){for(n=0;n<o.tiles.length;n++)o.tiles[n].y+=5,o.tiles[n].y>l.height-3*o.squareSize/2&&(o.uhOh=!0);if(o.uhOh){for(n=0;n<o.tiles.length;n++)o.tiles[n].y-=5;o.uhOh=!1}i()},o.tileReset=function(){o.tiles.length>0&&(o.tiles.splice(0,o.tiles.length),o.clearCanv()),o.canClickTiles=!0,t.strokeStyle=o.normal,t.fillStyle=o.inactive,o.drawBase()},o.recieveClicks=function(s){o.mouseX=Number(s.pageX-l.getBoundingClientRect().left+e.pageXOffset),o.mouseY=Number(s.pageY-l.getBoundingClientRect().top+e.pageYOffset),o.canClickTiles&&o.dealWithClicks(o.mouseX,o.mouseY)},o.init()}e.$inject=["$window","$document"],angular.module("sksouza").controller("EditorController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("sksouza").run(e)}(),function(){"use strict";function e(e,s){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("resume",{url:"/resume",templateUrl:"app/resume/resume.html",controller:"ResumeController",controllerAs:"resume"}).state("folio",{url:"/folio",templateUrl:"app/folio/folio.html",controller:"FolioController",controllerAs:"folio"}).state("tiles",{url:"/tiles",templateUrl:"app/tiles/tiles.html",controller:"TilesController",controllerAs:"puzz"}).state("editor",{url:"/editor",templateUrl:"app/editor/tileEditor.html",controller:"EditorController",controllerAs:"editor"}).state("tools",{url:"/tools",templateUrl:"app/tableTools/tableTools.html",controller:"ToolsController",controllerAs:"tool"}).state("tools.counter",{url:"/counter",templateUrl:"app/components/counter/counter.tpl.html",controller:"CountController",controllerAs:"counter"}).state("tools.dice",{url:"/dice",templateUrl:"app/components/diceSim/diceSim.tpl.html",controller:"DiceController",controllerAs:"dice"}),s.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("sksouza").config(e)}(),function(){"use strict";angular.module("sksouza").constant("moment",moment)}(),function(){"use strict";function e(e){e.debugEnabled(!0)}e.$inject=["$logProvider"],angular.module("sksouza").config(e)}(),angular.module("sksouza").run(["$templateCache",function(e){e.put("app/editor/tileEditor.html",'<div class=inner><!--\n      THIS PAGE BEST VIEWED ON A LARGE SCREEN\n--><div class="row editor"><div class="col-xs-3 col-xs-offset-1"><canvas id=canvSmlEd width=300 height=300 style="border:solid 1px gray" ng-click=editor.recieveClicks($event)></canvas></div><div class=col-xs-4><canvas id=canvEd width=600 height=600 style="border:solid 1px gray" ng-click=editor.recieveClicks($event)></canvas></div><div class=col-xs-4><div class=row><div class=btn-group><label class="btn btn-primary" ng-model=editor.whichCanv ng-change=editor.switchCanv() uib-btn-radio="\'large\'">Large Canvas</label><label class="btn btn-primary" ng-model=editor.whichCanv ng-change=editor.switchCanv() uib-btn-radio="\'small\'">Small Canvas</label></div></div><div class=row><div class="col-xs-3 col-xs-offset-1"><button type=button class="btn btn-primary" id=upBtn ng-click=editor.up()>Nudge Up</button></div></div><div class=row><div class=btn-group><label type=button class="btn btn-primary" id=leftBtn ng-click=editor.left()>Nudge Left</label><label type=button class="btn btn-primary" id=righttBtn ng-click=editor.right()>Nudge Right</label></div></div><div class=row><div class="col-xs-3 col-xs-offset-1"><button type=button class="btn btn-primary" id=downBtn ng-click=editor.down()>Nudge Down</button></div></div><div class=row><div class="col-xs-3 col-xs-offset-1"><button type=button class="btn btn-primary" id=resetBtn ng-click=editor.tileReset()>Reset</button></div></div><div class=row><div class="col-xs-6 col-xs-offset-1"><ul class="list-unstyled outputBlock"><li ng-if="editor.tiles.length > 0">[</li><li ng-repeat="tile in editor.tiles track by $index">{{tile|json}}<span ng-if="$index !== editor.tiles.length -1">,</span></li><li ng-if="editor.tiles.length > 0">]</li></ul></div></div></div></div></div>'),e.put("app/folio/folio.html",'<div class="container inner"><div class=row><!-- big fat row for all content --><div class=col-xs-12><!-- margin tweaking div inside inner--><div class="row proj"><div class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-0"><!--PROJECTS--><div class=row ng-repeat="pro in folio.projects"><p class="text-center projSectionHeading">{{pro.sectName}} <i></i></p><div class="panel panel-default col-sm-11 col-sm-offset-1"><div class=panel-body><!-- repeat here --><div class="row projContent" ng-repeat="p in pro.projects"><div class="titleRow col-xs-10"><a class=projLink target=_blank rel=noopener href=http://{{p.projURL}} ng-show="p.projURL!== \'\'">{{p.name}}<i class="fa fa-external-link"></i></a><span ng-show="p.projURL=== \'\'">{{p.name}}</span></div><div class=col-xs-10 ng-show="p.projRepo!== \'\'"><a class=projLink target=_blank rel=noopener href=http://{{p.projRepo}}><i class="fa fa-github fa-lg"></i> View this repository on Github <i class="fa fa-external-link"></i> </a></div><div class="col-xs-12 subTitle">{{p.projDate}}</div><div class=col-xs-12>{{p.desc}}</div></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end PROJECTS--></div><!-- end folioContent innter column adjustment block --></div><!-- end FOLIO CONTENT --><!-- resume download link for extra small screens, replaced with option in dropdown near top *\n       <div class="row visible-xs">\n         <div class="col-xs-1 col-xs-offset-5 pdfSpecial">\n            <a target="_blank" rel="noopener" href="assets/resources/uSouza_resume.pdf">\n                <i class=" fa fa-file-pdf-o fa-3x"></i>\n            </a>\n         </div>\n         </div>\n         <div class="row visible-xs">\n            <p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p>\n         </div>\n       * end resume download for small screens --></div><!-- end margin tweaking div inside inner --></div><!-- end big fat row for all content --></div><!-- end .inner container -->'),e.put("app/main/main.html",'<div class="container inner"><div class=row><div class=col-xs-12><div class="row landingHeader landingHeaderFirst"><div class="col-xs-2 col-sm-1 col-sm-offset-1"><a target=_blank rel=noopener href=mailto:sksouza.art@gmail.com><i class="fa fa-envelope fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://github.com/TycheLaughs><i class="fa fa-github fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://linkedin.com/in/uzisusansouza><i class="fa fa-linkedin-square fa-3x"></i></a></div><div class="col-sm-offset-2 col-sm-1 hidden-xs hidden-sm"><div class=pdfSpecialRev><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div><p>R&Eacute;SUM&Eacute;</p></div></div><p class=text-center>I want to use my programming and interactive design skills to build fantastic, engaging and exciting user experiences.</p><p class=text-center>I\'ve worked on front-end design, implementation and testing and on multiple game projects in art, writing, design and testing roles.</p><p class=text-center>My best languages are C, C++ and JavaScript.</p><p class=text-center>I am currently looking for full-time opportunities.</p></div><div class="row visible-xs"><div class="col-xs-1 col-xs-offset-5 pdfSpecial"><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div></div><div class="row visible-xs"><p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p></div></div></div>'),e.put("app/resume/resume.html",'<div class="container inner"><div class=row><!-- big fat row for all content --><div class=col-xs-12><!-- margin tweaking div inside inner--><div class="row landingHeader"><!-- SUBHEADER LINKS --><div class="col-xs-2 col-sm-1 col-sm-offset-1"><a href=mailto:sksouza.art@gmail.com><i class="fa fa-envelope fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://github.com/TycheLaughs><i class="fa fa-github fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://linkedin.com/in/uzisusansouza><i class="fa fa-linkedin-square fa-3x"></i></a></div><div class="col-sm-offset-2 col-sm-1 hidden-xs hidden-sm"><div class=pdfSpecialRev><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div><p>R&Eacute;SUM&Eacute;</p></div></div><!-- end SUBHEADER LINKS --><!-- RESUME OPTIONS --><div class="row hidden-xs"><div class="col-xs-7 col-xs-offset-5 col-md-6 col-md-offset-6 col-lg-5 col-lg-offset-7"><span class=sectionHeading>VIEW:</span><div class=btn-group><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'All\'">ALL</label><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'CS\'">COMPUTER SCIENCE</label><!--<label class="btn  btn-uzi" ng-model="resume.resumeFilter" uib-btn-radio="\'WebDev\'">FRONT END</label>--><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'Interactive\'">GAME &amp; FRONT END</label></div></div></div><div class="row visible-xs"><div class="btn-group pull-right col-xs-3" uib-dropdown is-open=status.isopen><button id=single-button type=button class="btn btn-uzi pull-right" uib-dropdown-toggle ng-disabled=disabled>VIEW <span class=caret></span></button><ul class=dropdown-menu uib-dropdown-menu role=menu aria-labelledby=single-button><li role=menuitem><a ng-click="resume.resumeFilter = \'All\'">ALL</a></li><li role=menuitem><a ng-click="resume.resumeFilter = \'CS\'">COMPUTER SCIENCE</a></li><!--<li role="menuitem"><a ng-click="resume.resumeFilter = \'WebDev\'">FRONT END</a></li>--><li role=menuitem><a ng-click="resume.resumeFilter = \'Interactive\'">GAME &amp; FRONT END</a></li><li role=menuitem><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o dropPDF"></i> PDF DOWNLOAD</a></li></ul></div></div><!-- end RESUME OPTIONS --><div class="row resumeContent"><!-- TODO:add links --><div class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-0"><!-- EDUCATION--><div class=row id=Education><p class="text-center sectionHeading"><i class="fa fa-graduation-cap"></i> EDUCATION</p><div class="panel panel-default col-sm-5 col-sm-offset-1 col-xs-12" ng-repeat="ed in resume.education track by $index"><div class=panel-body><div class=row><div class=titleRow>{{ed.degree}}</div><div>{{ed.degreeDate}}</div></div><div class=row><div>{{ed.school}}</div><div>GPA: {{ed.gpa}}</div></div><div class=row><div class=hon><span class=honors>Honors: </span>{{ed.honors}}</div></div></div></div></div><!-- end EDUCATION --><!-- SKILLS, TOOLS, SOFTWARE and FRAMEWORKS --><div id=Skills class=row><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><!--<i class="fa fa-code hidden-sm hidden-md"></i>--> <span class=keepTog><span>LANGUAGES <i class="fa fa-code"></i> LIBRARIES </span><i class="fa fa-caret-down visible-xs" ng-show=isLangCollapsed ng-click="isLangCollapsed = !isLangCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isLangCollapsed ng-click="isLangCollapsed = !isLangCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isLangCollapsed><div class=panel-body><!--<div class="row>">\n                           <i class="fa fa-bar-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                        </div>--><div class=animate-show ng-repeat="skill in resume.skills.LANG track by $index" ng-show="skill.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'">{{skill.name}}</div></div></div></div><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><!--<i class="fa fa-wrench hidden-sm"></i>--> <span class=keepTog><span>TOOLS <i class="fa fa-wrench"></i> SOFTWARE</span> <i class="fa fa-caret-down visible-xs" ng-show=isSoftCollapsed ng-click="isSoftCollapsed = !isSoftCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isSoftCollapsed ng-click="isSoftCollapsed = !isSoftCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isSoftCollapsed><div class=panel-body><!--<div class="row>">\n                        <i class="fa fa-bar-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                     </div>--><div class=animate-show ng-repeat="skill in resume.skills.TOOLS track by $index" ng-show="skill.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' ">{{skill.name}}</div></div></div></div><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><span class=keepTog><span>EXPOSED T<i class="fa fa-cog fa-spin"></i></span> <i class="fa fa-caret-down visible-xs" ng-show=isExpCollapsed ng-click="isExpCollapsed = !isExpCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isExpCollapsed ng-click="isExpCollapsed = !isExpCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isExpCollapsed><div class=panel-body><!--<div class="row>">\n                        <i class="fa fa-pie-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                     </div>--><!-- repeat here --><div class=animate-show ng-repeat="exp in resume.exposed track by $index" ng-show="exp.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' ">{{exp.name}}</div></div></div></div></div><!-- end SKILLS, TOOLS, SOFTWARE and FRAMEWORKS --><!--EXPERIENCE--><div id=xp class=row><p class="text-center sectionHeading"><i class="fa fa-briefcase"></i> EXPERIENCE</p><div class="panel panel-default animate-show col-sm-11 col-sm-offset-1" ng-repeat="x in resume.xp | orderBy: \'xId\'" ng-show="x.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' "><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-11">{{x.title}}</div></div><div class=row><div class="subTitle col-xs-11">{{x.employer}}</div></div><div class=row><div class=col-xs-10>{{x.startDate}}-{{x.endDate}}&nbsp;&nbsp;|&nbsp;&nbsp;{{x.location}}</div></div><div class=row><ul class=fa-ul><li ng-repeat="y in x.desc" class=col-xs-12><i class="fa fa-li fa-circle"></i> {{y}}</li></ul></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end EXPERIENCE--><!--PROJECTS--><div id=proj class=row><p class="text-center sectionHeading">PROJECTS <i class="fa fa-pencil"></i></p><div class="panel panel-default animate-show col-sm-11 col-sm-offset-1" ng-repeat="pro in resume.projects | orderBy: \'pId\'" ng-show="pro.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' "><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-10">{{pro.projectTitle}}</div></div><div class=row><div class=col-xs-10>{{pro.date}} <span ng-if="pro.hasDateRange == \'true\'">-{{pro.endDate}}</span></div></div><div class=row><div class=col-xs-12><em>{{pro.projectDesc}}</em></div></div><div class=row><div class=col-xs-9>{{pro.title}}</div></div><div class=row><ul class=fa-ul><li ng-repeat="desc in pro.desc" class=col-xs-11><i class="fa fa-li fa-circle"></i> {{desc}}</li></ul></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end PROJECTS--><div id=volunteer class=row><!-- VOLUNTEER--><p class="text-center sectionHeading"><i></i> VOLUNTEER EXPERIENCE</p><div class="panel panel-default col-sm-11 col-sm-offset-1" ng-repeat="vol in resume.volunteer | orderBy: \'vId\'"><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-11">{{vol.place}}</div></div><div class=row><div class=col-xs-11>{{vol.startDate}}-{{vol.endDate}}</div></div></div><!-- end panel body--></div><!-- end panel--></div><!--end VOLUNTEER --></div><!-- end resumeContent innter column adjustment block --></div><!-- end RESUME CONTENT --><!-- resume download link for extra small screens, replaced with option in dropdown near top *\n       <div class="row visible-xs">\n         <div class="col-xs-1 col-xs-offset-5 pdfSpecial">\n            <a target="_blank" rel="noopener" href="assets/resources/uSouza_resume.pdf">\n                <i class=" fa fa-file-pdf-o fa-3x"></i>\n            </a>\n         </div>\n         </div>\n         <div class="row visible-xs">\n            <p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p>\n         </div>\n       * end resume download for small screens --></div><!-- end margin tweaking div inside inner --></div><!-- end big fat row for all content --></div><!-- end .inner container -->'),e.put("app/tableTools/tableTools.html",'<div class=inner><div class=text-center><div class=btn-group><label class="btn btn-uzi" ng-model=tool.activeTool uib-btn-radio="\'dice\'" ui-sref=.dice>Dice Simulator</label><label class="btn btn-uzi" ng-model=tool.activeTool uib-btn-radio="\'counter\'" ui-sref=.counter>Counter</label></div></div><div ui-view></div></div>'),e.put("app/tiles/tiles.html",'<div class=inner id=allContent><div class="row puzz"><div class="col-xs-10 col-sm-offset-1"><div class=row><div class="col-xs-12 col-sm-7 col-sm-offset-2 col-xs-offset-0 text-center"><canvas id=canv class="canv hidden-xs" width=600 height=600 ng-click=puzz.clickedCanvas($event)></canvas><canvas id=canvSml class="canv visible-xs" width=300 height=300 ng-click=puzz.clickedCanvas($event)></canvas></div><div class="col-sm-3 puzzInstructions hidden-xs"><div class="panel panel-default"><div class="panel-body text-center"><button type=button class="btn btn-primary uziPuzzReset" aria-label=Reset ng-click=puzz.clearPuzzle()>Reset Puzzle</button><p>Select all tiles via click or tap without re-crossing your path or using diagonals.</p></div></div><uib-alert class=alert-uzi ng-repeat="alert in puzz.alerts" close=puzz.closeAlert() dismiss-on-timeout=3000>{{alert.msg}}</uib-alert></div></div><div class="row visible-xs puzzInstructions"><div class="col-xs-11 col-xs-offset-1"><uib-alert class=alert-uzi ng-repeat="alert in puzz.alerts" close=puzz.closeAlert() dismiss-on-timeout=3000>{{alert.msg}}</uib-alert><div class="panel panel-default"><div class="panel-body text-center panelText"><button type=button class="btn btn-primary uziPuzzReset" aria-label=Reset ng-click=puzz.clearPuzzle()>Reset Puzzle</button><p class=instrText>Select all tiles via click or tap without re-crossing your path or using diagonals.</p></div></div></div></div></div></div></div>'),e.put("app/components/counter/counter.tpl.html",'<!--<div class="row">\n   <div class="col-xs-12 text-center">\n         <div class="btn btn-uzi" ng-model="counter.counterMode" uib-btn-radio="\'basic\'">Basic</div>\n         <span class="input-group">\n           <span class="input-group-btn btn btn-uzi"  ng-model="counter.counterMode" uib-btn-radio="\'countUp\'">Up To</span>\n           <input type="text" class="form-control counterInput" placeholder="0" aria-describedby="count up to">\n        </span>\n         <span class="input-group">\n           <span class="input-group-btn btn btn-uzi"  ng-model="counter.counterMode" uib-btn-radio="\'countDown\'">Down From</span>\n           <input type="text" class="form-control counterInput" placeholder="0" aria-describedby="count up to">\n        </span>\n   </div>\n</div>--><div class=row><div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 text-center panel panel-default"><div class=panel-body><p class=bigText>{{counter.count}}</p><div class="btn btn-lg" ng-click=counter.countDecr()><i class="fa fa-minus fa-3x"></i></div><div class="btn btn-lg" ng-click=counter.countIncr()><i class="fa fa-plus fa-3x"></i></div></div></div></div>'),e.put("app/components/diceSim/diceSim.tpl.html",'<div class=row><div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 text-center panel panel-default"><div class=panel-body><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=4>d4</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=6>d6</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=8>d8</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=10>d10</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=12>d12</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=20>d20</div><div class="btn btn-lg btn-uzi" ng-model=dice.nextDiceDenom uib-btn-radio=100>d100</div><div class=row><p>Number of dice: &nbsp;<span class=diceCount>{{dice.nextDiceCount}}</span> <span class="btn btn-lg" ng-click=dice.countDecr()><i class="fa fa-minus"></i></span> <span class="btn btn-lg" ng-click=dice.countIncr()><i class="fa fa-plus"></i></span></p></div><div class=row><div class="btn btn-lg btn-dice" ng-click=dice.rollDice()>Roll</div><div class="btn btn-lg btn-dice" ng-click=dice.clearRecord()>Clear</div></div></div></div><div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 text-center panel panel-default" ng-show="dice.diceRolls.length > 0"><div class=panel-body><p>Rolled {{dice.diceCount}} d{{dice.diceDenomination}}:</p><ul class="list-unstyled text-center" ng-repeat="roll in dice.diceRolls track by $index"><li class=diceRolls>{{roll}}</li></ul></div></div></div>'),e.put("app/components/navbar/uziNav.directive.tpl.html",'<nav class="navbar navbar-default navbar-fixed-top barMod" role=navigation ng-class="{\'barMod\': !isNavCollapsed}"><div class=container-fluid ng-class="{\'barMod\': !isNavCollapsed}"><div class=navbar-header><span class=hidden-xs ui-sref=home><img src=assets/images/logo01.svg class="myLogo img-fluid" alt="sksouza logo" aria-label="Susan Souza Logo"></span></div><!-- /.navbar-header --> <span class=navbar-left><div><h2 ui-sref=home class=myName>Susan Souza</h2><button type=button class=navbar-toggle ng-click="isNavCollapsed = !isNavCollapsed"><span class=sr-only>Toggle navigation</span> <i class="fa fa-bars fa-3x"></i></button><!-- /.navbar-toggle --></div></span><!-- /.navbar-left --><div class="collapse navbar-collapse navbar-right" uib-collapse=!isNavCollapsed><ul class="nav navbar-nav"><li ui-sref-active=activeNav ng-click="isNavCollapsed = !isNavCollapsed"><a ui-sref=folio><span>CODE</span></a></li><li ui-sref-active=activeNav ng-click="isNavCollapsed = !isNavCollapsed"><a ui-sref=resume><span>R&Eacute;SUM&Eacute;</span></a></li><li ui-sref-active=activeNav ng-click="isNavCollapsed = !isNavCollapsed"><a ui-sref=tiles><span>PUZZLES</span></a></li></ul></div><!-- /. navbar-collapse --></div><!-- /.container-fluid --></nav>');
}]);
//# sourceMappingURL=../maps/scripts/app-9189d15c37.js.map
