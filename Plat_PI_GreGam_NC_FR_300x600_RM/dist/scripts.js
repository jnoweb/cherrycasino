//getElementById shortcut
var El = function(a){
    return document.getElementById(a);
}
// Detecting IE
var div = document.createElement("div");
div.innerHTML = "<!--[if lt IE 10]><i></i><![endif]-->";
var isIeLessThan10 = (div.getElementsByTagName("i").length == 1);



// your greensock animation here
function yourAnim_unexpanded() {
	//set up your variables to be animated
	var wrapper = El("wrapper");
	var stage = El("stage");
	var unexpanded = El("unexpanded");
	var expandBtn = El("expandBtn");
	
	unexpanded.style.display = "block";
	unexpanded.style.opacity = "1";
	expanded.style.display = "block";
	expanded.style.opacity = "0";

	var stageHeight = El("unexpanded").offsetHeight;
	var stageWidth = El("unexpanded").offsetWidth;

	// pause, resume, restart buttons defined
    // var pauseBtn = El("pauseBtn");
    // var resumeBtn = El("resumeBtn");
    // var restartBtn = El("restartBtn");

	var tl = new TimelineMax();
	// set the stage and wrapper height and width
	tl.set(wrapper, {css: {width: stageWidth, height: stageHeight}});
	tl.set(stage, {css: {width: stageWidth, height: stageHeight, display: "block", alpha: 1}});
	tl.set(unexpanded, {css: {display: "block", alpha: 1}});
	tl.set(expanded, {css: {display: "none", alpha: 0}});
	var tween = tl.to(expandBtn, .5, {css:{display: "block", alpha: 1}, ease: Expo.easeInOut});

	// pause, resume, restart buttons actions
	// pauseBtn.onclick = function() {
 //        tween.pause();
 //    };
 //    resumeBtn.onclick = function() {
 //        tween.resume();
 //    };
 //    restartBtn.onclick = function() {
 //        tween.restart();
 //    };
}

// your greensock animation here
function yourAnim_expanded() {
	
	var stageHeight = El("expanded").offsetHeight;
	var stageWidth = El("expanded").offsetWidth;

	//set up your variables to be animated
	var wrapper = El("wrapper");
	var stage = El("stage");
	var unexpanded = El("unexpanded");
	var expanded = El("expanded");

	var tl = new TimelineMax();
	// set the stage and wrapper height and width
	tl.set(wrapper, {css: {width: stageWidth, height: stageHeight}});
	tl.set(stage, {css: {width: stageWidth, height: stageHeight}});
	tl.set(expanded, {css: {display: "block", alpha: 1}});
	tl.set(unexpanded, {css: {display: "none", alpha: 0}});
	var tween = tl.to(expandBtn, .5, {css:{display: "block", alpha: 1}, ease: Expo.easeInOut});


}
// optional extras / common scripts

// jQuery type has/add/remove class selectors
function hasClass(ele,cls) {
	return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += (ele.className==""?"":" ")+cls;
};	
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
};
function addCtaAnim() {
	var vxCtaAnim = El("cta_anim");//define element which needs class adding to it
	addClass(vxCtaAnim, "anim-bg");//add class to element
};

function removeCtaAnim() {
	var vxCtaAnim = El("cta_anim");//remove element which needs class adding to it
	removeClass(vxCtaAnim, "anim-bg");//remove class to element
};


//init animations when DOM content loaded
document.addEventListener("DOMContentLoaded", function(event) { 
	var stage = El("stage");
	stage.style.display = "block";
  	yourAnim_unexpanded();
});

function anim_expanded() {


    console.log("anim expand function");

    TweenLite.to(wrapperExpanded, 0.5, {autoAlpha: 1, ease: Power2.easeIn, delay:0});
    TweenLite.to(stageExpanded, 0.5, {autoAlpha: 1, ease: Power2.easeIn, delay:0});
    TweenLite.to(expandedBackground, 0.5, {autoAlpha: 1, ease: Power2.easeIn, delay:0});
    TweenLite.to(video, 0.5, {autoAlpha: 1, ease: Power2.easeIn, delay:0});
    TweenLite.to(closeButton, 0.5, {autoAlpha: 1, ease: Power2.easeIn, delay:0});


    //vid.video.play();
}
