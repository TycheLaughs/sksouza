!function(){"use strict";angular.module("sksouza",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";angular.module("sksouza").directive("uziNav",function(){var e={restrict:"E",templateUrl:"app/components/navbar/uziNav.directive.tpl.html",controller:"NavController"};return e})}(),function(){"use strict";function e(){}angular.module("sksouza").controller("NavController",e)}(),function(){"use strict";angular.module("sksouza").service("tiles",["$http",function(e){return{getPuzzles:function(){return e.get("assets/resources/puzzles.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e,s,a,i){function l(){for(m.tiles=m.puzzleData[m.puzzleIndex].tiles,g=0;g<m.tiles.length;g++)m.xPoints.push(m.tiles[g].x),m.yPoints.push(m.tiles[g].y);for(m.context.fillStyle=m.baseColor,m.context.strokeStyle="black",g=0;g<m.tiles.length;g++)m.context.fillRect(m.tiles[g].x,m.tiles[g].y,m.squareSize,m.squareSize),m.context.fill(),m.context.strokeRect(m.tiles[g].x,m.tiles[g].y,m.squareSize,m.squareSize),m.context.stroke()}function t(e,s){n(e,s)&&(m.curr=o(e,s),r()||c()&&d()&&(m.visited.push(m.curr),m.prev=m.curr,m.validTile=!0),u(),p(),m.validTile=!1)}function n(e,s){for(g=0;g<m.xPoints.length;g++)if(e>m.xPoints[g]&&e<m.xPoints[g]+m.squareSize&&s>m.yPoints[g]&&s<m.yPoints[g]+m.squareSize)return!0;return!1}function o(e,s){for(g=0;g<m.xPoints.length;g++)if(e>m.xPoints[g]&&e<m.xPoints[g]+m.squareSize&&s>m.yPoints[g]&&s<m.yPoints[g]+m.squareSize)return{x:m.xPoints[g],y:m.yPoints[g]};return{}}function r(){if(0===m.visited.length)return!1;for(f=0;f<m.visited.length;f++)if(m.visited[f].x===m.curr.x&&m.visited[f].y===m.curr.y)return!0;return!1}function c(){return 0!==m.visited.length&&(Math.abs(m.curr.x-m.prev.x)>m.squareSize||Math.abs(m.curr.y-m.prev.y)>m.squareSize)?!1:!0}function d(){return 0!==m.visited.length?Math.abs(m.curr.x-m.prev.x)===m.squareSize^Math.abs(m.curr.y-m.prev.y)===m.squareSize:!0}function u(){m.context.fillStyle=m.activeColor,""!==m.prev.x&&(m.context.fillRect(m.prev.x,m.prev.y,m.squareSize,m.squareSize),m.context.fill(),m.context.strokeRect(m.prev.x,m.prev.y,m.squareSize,m.squareSize),m.context.stroke())}function p(){m.visited.length===m.tiles.length&&1==m.validTile&&(i.debug("Puzzle Complete!"),m.wonRound=!0,m.puzzleIndex++),m.wonRound&&m.puzzleIndex<m.puzzleData.length&&(m.redraw(),m.clearPuzzle())}function v(){for(;m.visited.length>0;)m.visited.pop();for(;m.xPoints.length>0;)m.xPoints.pop(),m.yPoints.pop(),m.tiles.pop();m.clearCanv()}var f,m=this,g=0,x=60,b=30;m.xPoints=[],m.yPoints=[],m.visited=[],m.curr={x:0,y:0},m.prev,m.squareSize=x,m.puzzleIndex=0,m.validTile=!1,m.alerts=[],m.useSmall=a.matchMedia("(max-width: 767px)").matches;var h=s[0].getElementById("canv");m.useSmall&&(h=s[0].getElementById("canvSml"),m.squareSize=b),m.context=h.getContext("2d"),m.mouseY=0,m.mouseX=0,m.baseColor="#0E6791",m.activeColor="#70C9E3",m.wonRound=!1,m.puzzleData={},m.canvasSize=h.width,m.init=function(){e.getPuzzles().then(function(e){m.puzzleData=e.data.puzzles,angular.isDefined(m.puzzleData)&&(m.squareSize===b?m.puzzleData=m.puzzleData.small:m.puzzleData=m.puzzleData.big,l())})},m.clearPuzzle=function(){for(m.puzzleIndex<m.puzzleData.length&&m.clearCanv();m.visited.length>0;)m.visited.pop();m.visited=[],m.xPoints=[],m.yPoints=[],l(),m.wonRound=!1,m.curr={x:"",y:""},m.prev={x:"",y:""}},m.redraw=function(){m.wonRound&&m.puzzleIndex<m.puzzleData.length-1&&(m.wonRound=!1,v())},m.clearCanv=function(){m.context.clearRect(0,0,h.width,h.height)},m.winMessage=function(){m.alerts.push({msg:"Puzzle complete!"})},m.closeAlert=function(){m.alerts.splice(0)},h.addEventListener("click",function(e){m.mouseX=Number(e.pageX-this.getBoundingClientRect().left+a.pageXOffset),m.mouseY=Number(e.pageY-this.getBoundingClientRect().top+a.pageYOffset),t(m.mouseX,m.mouseY)}),m.init()}e.$inject=["tiles","$document","$window","$log"],angular.module("sksouza").controller("TilesController",e)}(),function(){"use strict";angular.module("sksouza").service("resume",["$http",function(e){return{getResume:function(){return e.get("assets/resources/resume.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e){var s=this;s.resumeFilter="CS",e.getResume().then(function(e){s.resume=e.data.RESUME,angular.isDefined(s.resume)&&(s.education=s.resume.EDUCATION,s.header=s.resume.HEADER,s.xp=s.resume.XP,s.exposed=s.resume.EXPOSEDTO,s.skills=s.resume.SKILLS,s.projects=s.resume.PROJECTS,s.other=s.resume.OTHERSKILLS,s.volunteer=s.resume.VOLUNTEER)}),s.toggleProj=function(){s.toggleProjects===!1?s.toggleProjects=!0:s.toggleProjects=!1},s.toggleExp=function(){s.toggleXP===!1?s.toggleXP=!0:s.toggleXP=!1}}e.$inject=["resume"],angular.module("sksouza").controller("ResumeController",e)}(),function(){"use strict";function e(){}angular.module("sksouza").controller("MainController",e)}(),function(){"use strict";angular.module("sksouza").service("folio",["$http",function(e){return{getFolio:function(){return e.get("assets/resources/projects.json").then(function(e){return e},function(e){return e})}}}])}(),function(){"use strict";function e(e){var s=this;s.folioFilter="CS",e.getFolio().then(function(e){s.folio=e.data.PROJECTS,angular.isDefined(s.folio)&&(s.projects=s.folio)})}e.$inject=["folio"],angular.module("sksouza").controller("FolioController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("sksouza").run(e)}(),function(){"use strict";function e(e,s){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("resume",{url:"/resume",templateUrl:"app/resume/resume.html",controller:"ResumeController",controllerAs:"resume"}).state("folio",{url:"/folio",templateUrl:"app/folio/folio.html",controller:"FolioController",controllerAs:"folio"}).state("tiles",{url:"/tiles",templateUrl:"app/tiles/tiles.html",controller:"TilesController",controllerAs:"puzz"}).state("editor",{url:"/editor",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"editor"}),s.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("sksouza").config(e)}(),function(){"use strict";angular.module("sksouza").constant("moment",moment)}(),function(){"use strict";function e(e){e.debugEnabled(!0)}e.$inject=["$logProvider"],angular.module("sksouza").config(e)}(),angular.module("sksouza").run(["$templateCache",function(e){e.put("app/folio/folio.html",'<div class="container inner"><div class=row><!-- big fat row for all content --><div class=col-xs-12><!-- margin tweaking div inside inner--><div class="row proj"><div class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-0"><!--PROJECTS--><div class=row ng-repeat="pro in folio.projects"><p class="text-center projSectionHeading">{{pro.sectName}} <i></i></p><div class="panel panel-default col-sm-11 col-sm-offset-1"><div class=panel-body><!-- repeat here --><div class="row projContent" ng-repeat="p in pro.projects"><div class="titleRow col-xs-10"><a class=projLink target=_blank rel=noopener href=http://{{p.projURL}} ng-show="p.projURL!== \'\'">{{p.name}}<i class="fa fa-external-link"></i></a><span ng-show="p.projURL=== \'\'">{{p.name}}</span></div><div class=col-xs-10 ng-show="p.projRepo!== \'\'"><a class=projLink target=_blank rel=noopener href=http://{{p.projRepo}}><i class="fa fa-github fa-lg"></i> View this repository on Github <i class="fa fa-external-link"></i> </a></div><div class="col-xs-12 subTitle">{{p.projDate}}</div><div class=col-xs-12>{{p.desc}}</div></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end PROJECTS--></div><!-- end folioContent innter column adjustment block --></div><!-- end FOLIO CONTENT --><!-- resume download link for extra small screens, replaced with option in dropdown near top *\n       <div class="row visible-xs">\n         <div class="col-xs-1 col-xs-offset-5 pdfSpecial">\n            <a target="_blank" rel="noopener" href="assets/resources/uSouza_resume.pdf">\n                <i class=" fa fa-file-pdf-o fa-3x"></i>\n            </a>\n         </div>\n         </div>\n         <div class="row visible-xs">\n            <p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p>\n         </div>\n       * end resume download for small screens --></div><!-- end margin tweaking div inside inner --></div><!-- end big fat row for all content --></div><!-- end .inner container -->'),e.put("app/main/main.html",'<div class="container inner"><div class=row><div class=col-xs-12><div class="row landingHeader"><div class="col-xs-2 col-sm-1 col-sm-offset-1"><a href=mailto:sksouza.art@gmail.com><i class="fa fa-envelope fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://github.com/TycheLaughs><i class="fa fa-github fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://linkedin.com/in/uzisusansouza><i class="fa fa-linkedin-square fa-3x"></i></a></div><div class="col-sm-offset-2 col-sm-1 hidden-xs hidden-sm"><div class=pdfSpecialRev><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div><p>R&Eacute;SUM&Eacute;</p></div></div><p class=text-center>I want to use my programming and interactive design skills to build fantastic, engaging and exciting user experiences.</p><p class=text-center>I\'ve worked on front-end design, implementation and testing and on multiple game projects in art, writing, design and testing roles.</p><p class=text-center>My best languages are C, C++ and JavaScript.</p><p class=text-center>I am currently looking for full-time opportunities.</p></div><div class="row visible-xs"><div class="col-xs-1 col-xs-offset-5 pdfSpecial"><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div></div><div class="row visible-xs"><p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p></div></div></div>'),e.put("app/resume/resume.html",'<div class="container inner"><div class=row><!-- big fat row for all content --><div class=col-xs-12><!-- margin tweaking div inside inner--><div class="row landingHeader"><!-- SUBHEADER LINKS --><div class="col-xs-2 col-sm-1 col-sm-offset-1"><a href=mailto:sksouza.art@gmail.com><i class="fa fa-envelope fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://github.com/TycheLaughs><i class="fa fa-github fa-3x"></i></a></div><div class="col-xs-2 col-xs-offset-3 col-sm-1 col-sm-offset-2"><a target=_blank rel=noopener href=http://linkedin.com/in/uzisusansouza><i class="fa fa-linkedin-square fa-3x"></i></a></div><div class="col-sm-offset-2 col-sm-1 hidden-xs hidden-sm"><div class=pdfSpecialRev><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o fa-3x"></i></a></div><p>R&Eacute;SUM&Eacute;</p></div></div><!-- end SUBHEADER LINKS --><!-- RESUME OPTIONS --><div class="row hidden-xs"><div class="col-xs-5 col-xs-offset-7"><span class=sectionHeading>VIEW:</span><div class=btn-group><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'All\'">ALL</label><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'CS\'">COMPUTER SCIENCE</label><!--<label class="btn  btn-uzi" ng-model="resume.resumeFilter" uib-btn-radio="\'WebDev\'">FRONT END</label>--><label class="btn btn-uzi" ng-model=resume.resumeFilter uib-btn-radio="\'Interactive\'">GAME &amp; FRONT END</label></div></div></div><div class="row visible-xs"><div class="btn-group pull-right" uib-dropdown is-open=status.isopen><button id=single-button type=button class="btn btn-uzi pull-right" uib-dropdown-toggle ng-disabled=disabled>VIEW <span class=caret></span></button><ul class=dropdown-menu uib-dropdown-menu role=menu aria-labelledby=single-button><li role=menuitem><a ng-click="resume.resumeFilter = \'All\'">ALL</a></li><li role=menuitem><a ng-click="resume.resumeFilter = \'CS\'">COMPUTER SCIENCE</a></li><!--<li role="menuitem"><a ng-click="resume.resumeFilter = \'WebDev\'">FRONT END</a></li>--><li role=menuitem><a ng-click="resume.resumeFilter = \'Interactive\'">GAME &amp; FRONT END</a></li><li role=menuitem><a target=_blank rel=noopener href=assets/resources/uSouza_resume.pdf><i class="fa fa-file-pdf-o dropPDF"></i> PDF DOWNLOAD</a></li></ul></div></div><!-- end RESUME OPTIONS --><div class="row resumeContent"><!-- TODO:add links --><div class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-0"><!-- EDUCATION--><div class=row id=Education><p class="text-center sectionHeading"><i class="fa fa-graduation-cap"></i> EDUCATION</p><div class="panel panel-default col-sm-5 col-sm-offset-1 col-xs-12" ng-repeat="ed in resume.education track by $index"><div class=panel-body><div class=row><div class=titleRow>{{ed.degree}}</div><div>{{ed.degreeDate}}</div></div><div class=row><div>{{ed.school}}</div><div>GPA: {{ed.gpa}}</div></div><div class=row><div class=hon><span class=honors>Honors: </span>{{ed.honors}}</div></div></div></div></div><!-- end EDUCATION --><!-- SKILLS, TOOLS, SOFTWARE and FRAMEWORKS --><div id=Skills class=row><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><i class="fa fa-code"></i> <span class=keepTog>LANGUAGES &amp; LIBRARIES <i class="fa fa-caret-down visible-xs" ng-show=isLangCollapsed ng-click="isLangCollapsed = !isLangCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isLangCollapsed ng-click="isLangCollapsed = !isLangCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isLangCollapsed><div class=panel-body><!--<div class="row>">\n                           <i class="fa fa-bar-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                        </div>--><div class=animate-show ng-repeat="skill in resume.skills.LANG track by $index" ng-show="skill.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'">{{skill.name}}</div></div></div></div><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><i class="fa fa-wrench"></i> <span class=keepTog>TOOLS &amp; SOFTWARE <i class="fa fa-caret-down visible-xs" ng-show=isSoftCollapsed ng-click="isSoftCollapsed = !isSoftCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isSoftCollapsed ng-click="isSoftCollapsed = !isSoftCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isSoftCollapsed><div class=panel-body><!--<div class="row>">\n                        <i class="fa fa-bar-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                     </div>--><div class=animate-show ng-repeat="skill in resume.skills.TOOLS track by $index" ng-show="skill.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' ">{{skill.name}}</div></div></div></div><div class="col-xs-12 col-sm-3 col-sm-offset-1"><p class="text-center sectionHeading"><span class=keepTog>LIMITED EXPOSURE TO <i class="fa fa-caret-down visible-xs" ng-show=isExpCollapsed ng-click="isExpCollapsed = !isExpCollapsed"></i> <i class="fa fa-caret-up visible-xs" ng-show=!isExpCollapsed ng-click="isExpCollapsed = !isExpCollapsed"></i></span></p><div class="panel panel-default collapse" uib-collapse=isExpCollapsed><div class=panel-body><!--<div class="row>">\n                        <i class="fa fa-pie-chart fa-lg col-xs-1 pull-right chartBtn"></i>\n                     </div>--><!-- repeat here --><div class=animate-show ng-repeat="exp in resume.exposed track by $index" ng-show="exp.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' ">{{exp.name}}</div></div></div></div></div><!-- end SKILLS, TOOLS, SOFTWARE and FRAMEWORKS --><!--EXPERIENCE--><div id=xp class=row><p class="text-center sectionHeading"><i class="fa fa-briefcase"></i> EXPERIENCE</p><div class="panel panel-default animate-show col-sm-11 col-sm-offset-1" ng-repeat="x in resume.xp | orderBy: \'xId\'" ng-show="x.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' "><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-11">{{x.title}}</div></div><div class=row><div class="subTitle col-xs-11">{{x.employer}}</div></div><div class=row><div class=col-xs-10>{{x.startDate}}-{{x.endDate}}&nbsp;&nbsp;|&nbsp;&nbsp;{{x.location}}</div></div><div class=row><ul class=fa-ul><li ng-repeat="y in x.desc" class=col-xs-11><i class="fa fa-li fa-circle"></i> {{y}}</li></ul></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end EXPERIENCE--><!--PROJECTS--><div id=proj class=row><p class="text-center sectionHeading">PROJECTS <i class="fa fa-pencil"></i></p><div class="panel panel-default animate-show col-sm-11 col-sm-offset-1" ng-repeat="pro in resume.projects | orderBy: \'pId\'" ng-show="pro.cat.indexOf(resume.resumeFilter) >= 0 || resume.resumeFilter ===\'All\'" ng-animate=" \'animate\' "><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-10">{{pro.projectTitle}}</div></div><div class=row><div class=col-xs-10>{{pro.date}} <span ng-if="pro.hasDateRange == \'true\'">-{{pro.endDate}}</span></div></div><div class=row><div class=col-xs-12><em>{{pro.projectDesc}}</em></div></div><div class=row><div class=col-xs-9>{{pro.title}}</div></div><div class=row><ul class=fa-ul><li ng-repeat="desc in pro.desc" class=col-xs-11><i class="fa fa-li fa-circle"></i> {{desc}}</li></ul></div></div><!-- end panel body --></div><!-- end panel --></div><!-- end PROJECTS--><div id=volunteer class=row><!-- VOLUNTEER--><p class="text-center sectionHeading"><i></i> VOLUNTEER EXPERIENCE</p><div class="panel panel-default col-sm-11 col-sm-offset-1" ng-repeat="vol in resume.volunteer | orderBy: \'vId\'"><div class=panel-body><!-- repeat here --><div class=row><div class="titleRow col-xs-11">{{vol.place}}</div></div><div class=row><div class=col-xs-11>{{vol.startDate}}-{{vol.endDate}}</div></div></div><!-- end panel body--></div><!-- end panel--></div><!--end VOLUNTEER --></div><!-- end resumeContent innter column adjustment block --></div><!-- end RESUME CONTENT --><!-- resume download link for extra small screens, replaced with option in dropdown near top *\n       <div class="row visible-xs">\n         <div class="col-xs-1 col-xs-offset-5 pdfSpecial">\n            <a target="_blank" rel="noopener" href="assets/resources/uSouza_resume.pdf">\n                <i class=" fa fa-file-pdf-o fa-3x"></i>\n            </a>\n         </div>\n         </div>\n         <div class="row visible-xs">\n            <p class="col-xs-1 col-xs-offset-4">R&Eacute;SUM&Eacute;</p>\n         </div>\n       * end resume download for small screens --></div><!-- end margin tweaking div inside inner --></div><!-- end big fat row for all content --></div><!-- end .inner container -->'),e.put("app/tiles/tiles.html",'<div class=inner><div class="row puzz"><div class="col-xs-10 col-sm-offset-1"><uib-alert ng-repeat="alert in puzz.alerts" class=alert-info close=puzz.closeAlert() dismiss-on-timeout=2000>{{alert.msg}}</uib-alert><div class=row><div class="col-xs-12 col-sm-7 col-sm-offset-2 text-center"><canvas id=canv class="canv hidden-xs" width=600 height=600></canvas><canvas id=canvSml class="canv visible-xs" width=300 height=300></canvas></div><div class="col-sm-3 puzzInstructions hidden-xs"><div class="panel panel-default"><div class="panel-body text-center"><button type=button class="btn btn-primary uziPuzzReset" aria-label=Reset ng-click=puzz.clearPuzzle()>Reset Puzzle</button><p>Select all tiles via click or tap without crossing your own path or using diagonals.</p></div></div></div></div><div class="row visible-xs"><div class="col-xs-11 col-xs-offset-1 puzzInstructions"><div class="panel panel-default"><div class="panel-body text-center panelText"><button type=button class="btn btn-primary uziPuzzReset" aria-label=Reset ng-click=puzz.clearPuzzle()>Reset Puzzle</button><p class=instrText>Select all tiles via click or tap without crossing your own path or using diagonals.</p></div></div></div></div></div></div></div>'),e.put("app/components/navbar/uziNav.directive.tpl.html",'<nav class="navbar navbar-default navbar-fixed-top barMod" role=navigation ng-class="{\'barMod\': !isNavCollapsed}"><div class=container-fluid><div class=navbar-header><span class=hidden-xs ui-sref=home><img src=assets/images/logo01.svg class="myLogo img-fluid" alt="sksouza logo" aria-label="Susan Souza Logo"></span></div><!-- /.navbar-header --> <span class=navbar-left><div><h2 ui-sref=home class=myName>Susan Souza</h2><button type=button class=navbar-toggle ng-click="isNavCollapsed = !isNavCollapsed"><span class=sr-only>Toggle navigation</span> <i class="fa fa-bars fa-3x"></i></button><!-- /.navbar-toggle --></div></span><!-- /.navbar-left --><div class="collapse navbar-collapse navbar-right" uib-collapse=!isNavCollapsed><ul class="nav navbar-nav"><li ui-sref-active=activeNav><a ui-sref=folio><span>CODE</span></a></li><li ui-sref-active=activeNav><a ui-sref=resume><span>R&Eacute;SUM&Eacute;</span></a></li><li ui-sref-active=activeNav><a ui-sref=tiles><span>PUZZLES</span></a></li></ul></div><!-- /. navbar-collapse --></div><!-- /.container-fluid --></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-d511a3d632.js.map