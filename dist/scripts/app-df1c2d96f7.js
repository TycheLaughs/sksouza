!function(){"use strict";angular.module("sksouza",["ngAnimate","ngTouch","ngSanitize","ui.router","ngMaterial","ngFitText"])}(),function(){"use strict";angular.module("sksouza").directive("uziXp",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeXP/resumeXp.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziVol",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeVolunteer/resumeVolunteer.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziSkills",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeSkills/uziSkills.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziProj",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeProjects/resumeProjects.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziOther",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeOther/uziOther.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziResFoot",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeFooter/resumeFoot.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziHeader",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeHeader/resumeHead.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziExposedTo",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeExposedTo/uziExposedTo.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";angular.module("sksouza").directive("uziEducation",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resumeEdu/uziEducation.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=e}angular.module("sksouza").service("webDevTec",e)}(),function(){"use strict";angular.module("sksouza").controller("resumeCtrl",["$scope","resume",function(e,t){e.toggleProjects=!1,e.toggleXP=!1,t.getResume().then(function(t){e.resume=t.data.RESUME,void 0!==e.resume&&(e.education=e.resume.EDUCATION,e.header=e.resume.HEADER,e.xp=e.resume.XP,e.exposed=e.resume.EXPOSEDTO,e.skills=e.resume.SKILLS,e.projects=e.resume.PROJECTS,e.other=e.resume.OTHERSKILLS,e.volunteer=e.resume.VOLUNTEER)}),e.toggleProj=function(){e.toggleProjects=e.toggleProjects===!1?!0:!1},e.toggleExp=function(){e.toggleXP=e.toggleXP===!1?!0:!1}}])}(),function(){"use strict";angular.module("sksouza").service("resume",["$http","$q",function(e,t){var s={};return{getResume:function(){return e.get("assets/resources/resume.json").then(function(e){return s=e.data.RESUME,e},function(e){return s={HEADER:{email:"WHOOPS",gitHub:"GOT BACK AN ERROR",website:"TIME TO DEBUG"}},e})}}}])}(),function(){"use strict";angular.module("sksouza").directive("uziResume",function(){var e={restrict:"E",templateUrl:"app/components/resumeBits/resume.directive.tpl.html",controller:"resumeCtrl"};return e})}(),function(){"use strict";function e(){function e(e){var t=this;t.relativeDate=e(t.creationDate).fromNow()}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment"],t}angular.module("sksouza").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function t(t,s,o,i){var l,a=e(s[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});s.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){a.type(e).pause()["delete"]()}),l=t.$watch("vm.contributors",function(){angular.forEach(i.contributors,function(e){a.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){l()})}function s(e,t){function s(){return o().then(function(){e.info("Activated Contributors View")})}function o(){return t.getContributors(10).then(function(e){return i.contributors=e,i.contributors})}var i=this;i.contributors=[],s()}var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:s,controllerAs:"vm"};return s.$inject=["$log","githubContributor"],o}angular.module("sksouza").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),function(){"use strict";function e(e,t){function s(s){function i(e){return e.data}function l(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return s||(s=30),t.get(o+"/contributors?per_page="+s).then(i)["catch"](l)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",i={apiHost:o,getContributors:s};return i}angular.module("sksouza").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";angular.module("sksouza").controller("tileCtrl",["$scope","$mdMedia","$mdDialog","$http",function(e,t,s,o){function i(t,s){var o={x:"",y:""};for(o.x=e.curr.x,o.y=e.curr.y,u=0;u<e.xPoints.length;u++)if(t>e.xPoints[u]&&t<e.xPoints[u]+e.squareSize&&s>e.yPoints[u]&&s<e.yPoints[u]+e.squareSize&&(e.xPoints[u]!==e.curr.x||e.yPoints[u]!==e.curr.y))if(e.curr.x=e.xPoints[u],e.curr.y=e.yPoints[u],""!==o.x)if(l(e.curr,o,e.squareSize)&&a(e.curr,o,e.squareSize)){if(0===e.visited.length)e.visited.push(o),e.visited[0].x=o.x,e.visited[0].y=o.y;else{for(r=0;r<e.visited.length;r++)e.visited[r].x===o.x&&e.visited[r].y===o.y&&(c=r,console.log("tile already in visited array"));0>c&&(e.visited.push(o),c=-1)}e.context.fillStyle=e.activeColor,e.context.fillRect(e.xPoints[u],e.yPoints[u],e.squareSize,e.squareSize),e.context.fill(),e.context.strokeRect(e.xPoints[u],e.yPoints[u],e.squareSize,e.squareSize),e.context.stroke()}else e.curr.x=o.x,e.curr.y=o.y;else e.context.fillStyle=e.activeColor,e.context.fillRect(e.xPoints[u],e.yPoints[u],e.squareSize,e.squareSize),e.context.fill(),e.context.strokeRect(e.xPoints[u],e.yPoints[u],e.squareSize,e.squareSize),e.context.stroke()}function l(e,t,s){return!!(Math.abs(e.x-t.x)===s^Math.abs(e.y-t.y)===s)}function a(e,t,s){return Math.abs(e.x-t.x)>s||Math.abs(e.y-t.y)>s?!1:!0}var r,n,u=0,c=-1,d=60,f=30;e.sml=t("max-width: 700px"),e.lrg=t("min-width: 701px"),e.xPoints=[],e.yPoints=[],e.visited=[],e.curr={x:"",y:""},e.squareSize=d,e.puzzleIndex=0;var m;e.sml&&(m=document.getElementsByClassName("canv").namedItem("canvSml"),e.squareSize=f,n=document.getElementsByClassName("canv").namedItem("canv"),n.getContext("2d").height=0,n.getContext("2d").width=0),e.lrg&&(m=document.getElementsByClassName("canv").namedItem("canv"),n=document.getElementsByClassName("canv").namedItem("canvSml"),n.getContext("2d").height=0,n.getContext("2d").width=0),e.context=m.getContext("2d"),e.mouseY=0,e.mouseX=0,e.baseColor="#A6C9E3",e.activeColor="#70C9E3",e.wonRound=!1,e.puzzleData={},e.canvasSize=m.width,e.init=function(){o.get("assets/resources/puzzles.json").then(function(t){e.puzzleData=t.data.puzzles,e.puzzleData=e.sml?e.puzzleData.small:e.puzzleData.big,e.draw()})},e.draw=function(){for(e.tiles=e.puzzleData[e.puzzleIndex].tiles,u=0;u<e.tiles.length;u++)e.xPoints.push(e.tiles[u].x),e.yPoints.push(e.tiles[u].y);for(console.log("~Drawing puzzle~"),console.log("There are "+e.tiles.length+" tiles in this puzzle."),e.context.fillStyle=e.baseColor,e.context.strokeStyle="black",u=0;u<e.tiles.length;u++)e.context.fillRect(e.tiles[u].x,e.tiles[u].y,e.squareSize,e.squareSize),e.context.fill(),e.context.strokeRect(e.tiles[u].x,e.tiles[u].y,e.squareSize,e.squareSize),e.context.stroke()},e.clearPuzzle=function(){for(console.log("Clearing puzzle"),e.clearCanv();e.visited.length>0;)e.visited.pop();e.visited=[],e.xPoints=[],e.yPoints=[],e.draw(),e.wonRound=!1,e.curr={x:"",y:""}},e.showDeny=function(e){s.show(s.alert().parent(angular.element(document.querySelector(".inner"))).clickOutsideToClose(!0).title("Complete this puzzle first.").ariaLabel("No-go").targetEvent(e))},e.redraw=function(){if(e.wonRound){for(e.puzzleIndex++,e.wonRound=!1;e.visited.length>0;)e.visited.pop(),e.tiles.pop(),e.xPoints.pop(),e.yPoints.pop();e.curr={x:"",y:""},e.clearCanv(),e.draw()}else e.showDeny()},e.clearCanv=function(){e.context.clearRect(0,0,m.width,m.height)},e.showAlert=function(e){s.show(s.alert().parent(angular.element(document.querySelector(".inner"))).clickOutsideToClose(!0).title("Puzzle Complete!").ariaLabel("Puzzle Complete").targetEvent(e))},m.addEventListener("click",function(t){e.mouseX=Number(t.pageX-this.offsetLeft),e.mouseY=Number(t.pageY-this.offsetTop),i(e.mouseX,e.mouseY),console.log(e.visited.length),e.visited.length===e.tiles.length-1&&(console.log("Puzzle Complete!"),e.wonRound=!0,e.showAlert(t))}),e.init()}])}(),function(){"use strict";angular.module("sksouza").service("projects",["$http","$q",function(e,t){var s={};return{getProjects:function(){return e.get("assets/resources/projects.json").then(function(e){return s=e.data.PROJECTS,e},function(e){return s={HEADER:{email:"WHOOPS",gitHub:"GOT BACK AN ERROR",website:"TIME TO DEBUG"}},e})}}}])}(),function(){"use strict";function e(e,t){e.showTab=0,e.projects={},t.getProjects().then(function(t){e.projects=t.data.PROJECTS}),e.rightArrow=function(){e.showTab===e.projects.length-1?e.showTab=0:e.showTab++},e.leftArrow=function(){0===e.showTab?e.showTab=e.projects.length-1:e.showTab--}}angular.module("sksouza").controller("projCtrl",e),e.$inject=["$scope","projects"]}(),function(){"use strict";function e(e,t,s){function o(){l(),e(function(){a.classAnimation="rubberBand"},4e3)}function i(){s.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),a.classAnimation=""}function l(){a.awesomeThings=t.getTec(),angular.forEach(a.awesomeThings,function(e){e.rank=Math.random()})}var a=this;a.awesomeThings=[],a.classAnimation="",a.creationDate=1438439230816,a.showToastr=i,o()}angular.module("sksouza").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function e(e){}angular.module("sksouza").controller("codeCtrl",e),e.$inject=["$scope"]}(),function(){"use strict";function e(e){e.debug("runBlock end")}angular.module("sksouza").run(e),e.$inject=["$log"]}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("tiles",{url:"/tiles",templateUrl:"app/tilePuzzles/tiles.html",controller:"tileCtrl",controllerAs:"tiles"}),t.otherwise("/")}angular.module("sksouza").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e,t){e.isOpen=!1,e.state=t,e.isSafari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0}angular.module("sksouza").controller("indexCtrl",e),e.$inject=["$scope","$state"]}(),function(){"use strict";angular.module("sksouza").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e){e.debugEnabled(!0)}angular.module("sksouza").config(e),e.$inject=["$logProvider"]}(),angular.module("sksouza").run(["$templateCache",function(e){e.put("app/code/code.html",'<div layout-align="center center" flex="80" offset="10" class="inner"><div layout="column" layout-align="center center"><p>Projects and Code sections of this site are currently under construction.</p><p>You can find my Github <a href="https://github.com/TycheLaughs">here</a>.</p><p>You can find a number of quick practice projects I\'ve done <a href="https://github.com/TycheLaughs/uzi-exercises">here</a>, and you can find my very old portfolio website <a href="http://sksdigitalart.com">here</a>.</p></div></div>'),e.put("app/main/main.html",'<div layout="row" layout-padding="" layout-margin="" layout-fill="" layout-align="center center" class="inner"><uzi-resume></uzi-resume></div>'),e.put("app/projects/projects.html",'<div layout="row" class="inner projects"><div flex-sm="5" flex-md="5" flex-gt-md="10"><a ng-click="leftArrow()"><i class="fa fa-chevron-left nvLft"></i></a></div><div flex-sm="90" flex-md="90" flex-gt-md="80"><md-tabs md-no-ink-bar="" md-no-ink="" md-selected="showTab"><md-tab ng-repeat="p in projects track by p.pid"><md-tab-label class="md-primary">{{p.pid}}</md-tab-label><md-tab-body><div layout="column" class="project-sheet" flex="" ng-swipe-left="rightArrow()" ng-swipe-right="leftArrow()"><div flex-gt-sm="30" flex-sm="85" class="projectTitleContainer" layout="column"><div data-fittext="" data-fittext-max="20" data-fittext-load-delay="500" class="projectTitle">{{p.projectTitle}}</div></div><div layout="row" data-fittext="" data-fittext-max="14" data-fittext-load-delay="500" flex-gt-sm="40" flex-sm="90" class="subtitle">{{p.subtitle}}</div><div layout="row" data-fittext="" data-fittext-max="14" data-fittext-load-delay="500" flex-gt-sm="40" flex-sm="90" class="subtitle">Role: {{p.title}}</div><div><hr></div><div layout="row" layout-align="space-around center"><span></span><span><a><i class="fa fa-github fa-2x"></i></a></span><span>&nbsp;<a>[ link here if applicable ]</a></span><span></span></div><div layout="row" layout-align="space-around center">[ Overview here ]</div></div></md-tab-body></md-tab></md-tabs></div><div flex-sm="5" flex-md="5" flex-gt-md="10"><a ng-click="rightArrow()"><i class="fa fa-chevron-right nvRgt"></i></a></div></div>'),e.put("app/tilePuzzles/tiles.html",'<div class="inner puzz"><div layout="row" layout-align="center start" layout-margin=""><canvas id="canv" class="canv" width="600" height="600" ng-show="lrg"></canvas><canvas id="canvSml" class="canv" width="300" height="300" ng-show="sml"></canvas></div><div layout="column" layout-align="start center"><md-button class="md-raised puzzleBtn" aria-label="Reset" ng-click="clearPuzzle()">Reset</md-button><div><p class="md-body-3">Select all tiles in one continuous path via click or tap without crossing your path again or using diagonals.</p></div><md-button class="md-raised puzzleBtn" aria-label="Next" ng-click="redraw()" ng-show="puzzleIndex < 4">Next</md-button><div><p class="md-body-3" ng-show="puzzleIndex === 4 && wonRound">Check back soon for more puzzles!</p></div></div></div>'),e.put("app/components/navbar/navbar.html",""),e.put("app/components/resumeBits/resume.directive.tpl.html",'<div class="resume"><uzi-header></uzi-header><uzi-education></uzi-education><uzi-skills></uzi-skills><uzi-exposed-to></uzi-exposed-to><uzi-xp></uzi-xp><uzi-proj></uzi-proj><uzi-vol></uzi-vol><uzi-other></uzi-other><uzi-res-foot></uzi-res-foot></div>'),e.put("app/components/resumeBits/resumeEdu/uziEducation.html",'<div layout-fill="" class="education"><div ng-repeat="ed in education track by ed.edId" layout-margin=""><div layout="row" hide-gt-sm="" ng-if="$index === 0" class="sectionHeading" flex="5">EDUCATION</div><div layout="row"><div ng-if="$index === 0" class="sectionHeading" flex="5" hide-sm="">EDUCATION</div><div ng-if="$index !== 0" flex-gt-sm="50" flex-sm="60" flex-offset-gt-sm="15" flex-offset-sm="10" class="titleRow">{{ed.degree}}</div><div ng-if="$index === 0" flex-gt-sm="50" flex-sm="60" flex-offset="10" class="titleRow">{{ed.degree}}</div><div flex="" flex-offset-gt-sm="10" flex-offset-sm="5" class="titleRow">{{ed.degreeDate}}</div></div><div layout="column"><div layout="row"><div flex-gt-sm="40" flex-sm="55" flex-offset-gt-sm="20" flex-offset-sm="15">{{ed.school}}</div><div flex="">GPA: {{ed.gpa}}</div></div><div layout="row" hide-sm=""><div layout="row" flex-gt-sm="80" flex-sm="85" flex-offset-gt-sm="20" flex-offset-sm="15" class="hon"><span class="honors">Honors:</span> <span ng-repeat="hon in ed.honors track by $index">{{hon}} <span class="comma" ng-if="$index < ed.honors.length-1">,&nbsp;</span></span></div></div></div></div></div>'),e.put("app/components/resumeBits/resumeFooter/resumeFoot.tpl.html",'<div layout-fill="" layout-align="center center" class="resumeFoot"><div layout="row"><div flex-offset="33">References available on request.</div></div></div>'),e.put("app/components/resumeBits/resumeExposedTo/uziExposedTo.html",'<div layout-fill="" class="exposedTo"><div layout="row" class="sectionHeading" flex="25">EXPOSED TO</div><div layout="row" flex-gt-sm="55" flex-offset-gt-sm="15" flex-sm="60" flex-offset-sm="10" layout-wrap=""><div ng-repeat="exp in exposed track by $index" class="skList">{{exp}} <span class="comma" ng-if="$index < exposed.length-1">, &nbsp;</span></div></div></div>'),e.put("app/components/resumeBits/resumeHeader/resumeHead.tpl.html",'<div layout-fill="" layout-align="center center" class="resumeHead"><div layout="row">&nbsp;</div><div layout="row" layout-align="space-around center"><div flex-gt-sm="20" flex-offset-gt-sm="15" flex-offset="5"><a href="mailto:{{header.email}}">{{header.email}}</a></div><div flex-gt-sm="25" flex-offset="10"><a href="http://{{header.gitHub}}">{{header.gitHub}}</a></div><div flex-gt-sm="33" flex-offset="5"><a href="assets/resources/usouza_resume2015.pdf"><i class="fa fa-download"></i></a></div></div></div>'),e.put("app/components/resumeBits/resumeProjects/resumeProjects.tpl.html",'<div layout-fill="" class="resumeProjects"><div layout="row"><div class="sectionHeading" flex-gt-sm="15" flex-sm="50" flex-offset="0">PROJECT EXPERIENCE</div></div><div ng-repeat="pro in projects track by pro.pId" layout-margin="" ng-if="pro.showDefault==\'true\'"><div layout="row"><div flex-gt-sm="55" flex-sm="70" flex-offset-gt-sm="15" flex-offset-sm="5" class="titleRow">{{pro.projectTitle}} ({{pro.projectDesc}})</div><div flex="" flex-offset-gt-sm="10" flex-offset-sm="5" class="titleRow">{{pro.date}} <span ng-if="pro.hasDateRange == \'true\'">-{{pro.endDate}}</span></div></div><div layout="column"><div layout="row"><div flex="" flex-offset-gt-sm="20" flex-offset-sm="10" class="myTitle">{{pro.title}}</div></div><div layout="column"><ul class="xpDesc fa-ul"><li flex-offset="20" flex="50" ng-repeat="desc in pro.desc" layout="row"><i class="fa fa-li fa-circle"></i> {{desc}}</li></ul></div></div></div><div layout="row"><span class="toggler" flex-offset="15"><a ng-click="toggleProj()" ng-if="!toggleProjects">Show More Projects <i class="fa fa-angle-down"></i></a> <a ng-click="toggleProj()" ng-if="toggleProjects">Hide More <i class="fa fa-angle-up"></i></a></span></div><div ng-repeat="pro in projects track by pro.pId" layout-margin="" ng-if="pro.showDefault==\'false\' && toggleProjects"><div layout="row"><div flex-gt-sm="55" flex-sm="70" flex-offset-gt-sm="15" flex-offset-sm="5" class="titleRow">{{pro.projectTitle}} ({{pro.projectDesc}})</div><div flex="" flex-offset-gt-sm="10" flex-offset-sm="5" class="titleRow">{{pro.date}} <span ng-if="pro.hasDateRange == \'true\'">-{{pro.endDate}}</span></div></div><div layout="column"><div layout="row"><div flex="" flex-offset-gt-sm="20" flex-offset-sm="10" class="myTitle">{{pro.title}}</div></div><div layout="column"><ul class="xpDesc fa-ul"><li flex-offset="20" flex="50" ng-repeat="desc in pro.desc" layout="row"><i class="fa fa-li fa-circle"></i> {{desc}}</li></ul></div></div></div></div>'),e.put("app/components/resumeBits/resumeOther/uziOther.html",'<div layout-fill="" class="resumeOther"><div layout="row" class="sectionHeading" flex="80" hide-gt-sm="">OTHER SKILLS</div><div layout="row"><div class="sectionHeading" flex="10" hide-sm="">OTHER SKILLS</div><div flex="80" flex-offset="10"><span ng-repeat="o in other track by $index">{{o}} <span class="comma" ng-if="$index < other.length-1">,&nbsp;</span></span></div></div></div>'),e.put("app/components/resumeBits/resumeSkills/uziSkills.html",'<div layout-fill="" class="skills"><div layout="row" class="sectionHeading" flex="90">TECHNICAL SKILLS &amp; SOFTWARE</div><div layout="row" flex-gt-sm="55" flex-sm="60" flex-offset-gt-sm="15" flex-offset-sm="10" layout-wrap=""><div ng-repeat="skill in skills track by $index" class="skList">{{skill}} <span class="comma" ng-if="$index < skills.length-1">, &nbsp;</span></div></div></div>'),e.put("app/components/resumeBits/resumeVolunteer/resumeVolunteer.tpl.html",'<div layout-fill="" class="resumeVolunteer"><div layout="row"><div class="sectionHeading" flex-gt-sm="15" flex-sm="80" flex-offset="0">VOLUNTEER EXPERIENCE</div></div><div ng-repeat="vol in volunteer track by vol.vId" layout-margin=""><div layout="row"><div flex="60" flex-offset="15" class="titleRow">{{vol.place}} - {{vol.location}}</div><div flex="" flex-offset="5" class="titleRow">{{vol.startDate}}-{{vol.endDate}}</div></div><div layout="column"><div layout="row"><div flex="" flex-offset="20" class="myTitle">{{vol.title}}</div></div><div layout="column" class="other" flex-offset="15">{{vol.other}}</div></div></div></div>'),e.put("app/components/resumeBits/resumeXP/resumeXp.tpl.html",'<div layout-fill="" class="resumeXp"><div layout="row"><div class="sectionHeading" flex-gt-sm="15" flex-sm="50" flex-offset="0">TECHNICAL EXPERIENCE</div></div><div ng-repeat="x in xp track by x.xId" layout-margin="" ng-if="x.irrelevant == \'false\'"><div layout="row"><div flex-gt-sm="55" flex-sm="65" flex-offset-gt-sm="15" flex-offset-sm="10" class="titleRow">{{x.employer}} - {{x.location}}</div><div flex="" flex-offset-gt-sm="10" flex-offset-sm="5" class="titleRow">{{x.startDate}}-{{x.endDate}}</div></div><div layout="column"><div layout="row"><div flex="" flex-offset="20" class="myTitle">{{x.title}}</div></div><div layout="column"><ul class="xpDesc fa-ul"><li flex-offset="20" flex="50" ng-repeat="y in x.desc" layout="row"><i class="fa fa-li fa-circle"></i> {{y}}</li></ul></div></div></div><div layout="row"><div class="sectionHeading" flex-gt-sm="15" flex-sm="50" flex-offset="0">OTHER EXPERIENCE</div><span class="toggler"><a ng-click="toggleExp()" ng-if="!toggleXP">Show <i class="fa fa-angle-down"></i></a> <a ng-click="toggleExp()" ng-if="toggleXP">Hide <i class="fa fa-angle-up"></i></a></span></div><div ng-repeat="x in xp track by x.xId" layout-margin="" ng-if="x.irrelevant == \'true\' && toggleXP"><div layout="row"><div flex="55" flex-offset="15" class="titleRow">{{x.employer}} - {{x.location}}</div><div flex="" flex-offset-gt-sm="10" flex-offset-sm="5" class="titleRow">{{x.startDate}}-{{x.endDate}}</div></div><div layout="column"><div layout="row"><div flex="" flex-offset="20" class="myTitle">{{x.title}}</div></div><div layout="column"><ul class="xpDesc fa-ul"><li flex-offset="20" flex="50" ng-repeat="y in x.desc" layout="row"><i class="fa fa-li fa-circle"></i> {{y}}</li></ul></div></div></div></div>')}]);