
var creative = {};

/**
 * Window onload handler.
 */
function preInit() {
  setupDom();

  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Initializes the ad components
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.expandedExit = document.getElementById('expanded-exit');
  creative.dom.expandedContent = document.getElementById('expanded-state');
  creative.dom.collapsedExit = document.getElementById('collapsed-exit');
  creative.dom.collapsedContent = document.getElementById('collapsed-state');
  creative.dom.collapseButton = document.getElementById('collapse-button');
  creative.dom.expandButton = document.getElementById('expand-button');
  creative.dom.video0 = {};
  creative.dom.video0.vidContainer = document.getElementById('video-container-0');
  creative.dom.video0.vid          = document.getElementById('video-0');
  creative.dom.video0.vidPlayBtn   = document.getElementById('play-btn-0');
  creative.dom.video0.vidPauseBtn  = document.getElementById('pause-btn-0');
  creative.dom.video0.vidStopBtn   = document.getElementById('stop-btn-0');
  creative.dom.video0.vidReplayBtn = document.getElementById('replay-btn-0');
  //creative.dom.video0.vidUnmuteBtn = document.getElementById('unmute-btn-0');
  //creative.dom.video0.vidMuteBtn   = document.getElementById('mute-btn-0');
  creative.dom.video0.vidProgressBar   = document.getElementById('progress-bar-0');
  creative.dom.video0.firstframe   = document.getElementById('first-frame');
  creative.dom.video0.lastframe   = document.getElementById('last-frame');
  creative.dom.lastframeExpanded = document.getElementById('last-frame-expanded');
  creative.dom.replayytp = document.getElementById('replay-ytp');
}

/**
 * Ad initialisation.
 */
function init() {
  Enabler.setStartExpanded(false);
  // // You can update the autoplay flag to 'true' to enable muted
  // // autoplay although it won't work on iOS.
  // creative.autoplay0 = false;
  // creative.isClick0 = false;

  // // Hide mute / unmute on iOS.
  // if ((navigator.userAgent.match(/iPhone/i)) ||
  //   (navigator.userAgent.match(/iPad/i)) ||
  //   (navigator.userAgent.match(/iPod/i))) {
  //   // creative.dom.video0.vidUnmuteBtn.style.opacity = 0;
  //   // creative.dom.video0.vidMuteBtn.style.opacity = 0;
  // }

  // addVideoTracking0();
  // // You can update the autoplay flag to 'true' to enable muted
  // // autoplay although it won't work on iOS.
  // creative.autoplay1 = false;
  // creative.isClick1 = false;

  // addListeners();

  // Polite loading
  if (Enabler.isPageLoaded()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, show);
  }
}

/**
 * Adds appropriate listeners at initialization time
 */
function addListeners() {
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);
  creative.dom.expandButton.addEventListener('click', onExpandHandler, false);
  creative.dom.collapseButton.addEventListener('click', onCollapseClickHandler, false);
  creative.dom.expandedExit.addEventListener('click', exitClickHandler);
  creative.dom.collapsedExit.addEventListener('click', collapsedExitClickHandler);
  creative.dom.video0.vidPlayBtn.addEventListener('click', pausePlayHandler0, false);
  creative.dom.video0.vidPauseBtn.addEventListener('click', pausePlayHandler0, false);
  // creative.dom.video0.vidMuteBtn.addEventListener('click', muteUnmuteHandler0, false);
  // creative.dom.video0.vidUnmuteBtn.addEventListener('click', muteUnmuteHandler0, false);
  creative.dom.video0.vidReplayBtn.addEventListener('click', replayHandler0, false);
  creative.dom.video0.vidStopBtn.addEventListener('click', stopHandler0, false);
  creative.dom.video0.vid.addEventListener('ended', videoEndHandler0, false);
  creative.dom.video0.vid.addEventListener('timeupdate', videoTimeUpdateHandler0, false);
}

/**
 *  Shows the ad.
 */
function show() {

   // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  creative.autoplay0 = false;
  creative.isClick0 = false;

  // Hide mute / unmute on iOS.
  if ((navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/iPod/i))) {
    // creative.dom.video0.vidUnmuteBtn.style.opacity = 0;
    // creative.dom.video0.vidMuteBtn.style.opacity = 0;
  }

  addVideoTracking0();
  // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  creative.autoplay1 = false;
  creative.isClick1 = false;

  addListeners();
  
  creative.dom.expandedContent.style.display = 'none';
  creative.dom.expandedExit.style.display = 'none';
  creative.dom.collapseButton.style.display = 'none';

  creative.dom.collapsedContent.style.display = 'block';
  creative.dom.collapsedExit.style.display = 'block';
  creative.dom.expandButton.style.display = 'block';
  
  // creative.dom.video0.vidMuteBtn.style.visibility    = 'hidden';
  // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'visible';
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  creative.dom.video0.lastframe.style.visibility    = 'hidden';
  creative.dom.video0.firstframe.style.visibility  = 'visible';
  if (creative.autoplay0) {
    if (creative.dom.video0.vid.readyState >= 2) {
      startMuted0(null);
    }
    else {
      creative.dom.video0.hasCanPlay = true;
      creative.dom.video0.vid.addEventListener('canplay', startMuted0, false);

    }
    // HACK: Safari experiences video rendering issues, fixed by forcing a viewport refresh
    // creative.dom.video0.vidMuteBtn.style.visibility = 'visible';
      setTimeout(function() {
        // creative.dom.video0.vidMuteBtn.style.visibility = 'hidden';
      }, 200);
  }
  else {
    // creative.dom.video0.vidMuteBtn.style.visibility    = 'visible';
    // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'hidden';
    creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
    creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  }
  creative.dom.video0.vidContainer.style.visibility  = 'visible';
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function expandStartHandler() {
  // Show expanded content.
  creative.dom.expandedContent.style.display = 'block';
  creative.dom.expandedExit.style.display = 'block';
  creative.dom.collapseButton.style.display = 'block';
  creative.dom.collapsedContent.style.display = 'none';
  creative.dom.collapsedExit.style.display = 'none';
  creative.dom.expandButton.style.display = 'none';
  // creative.dom.video0.vidMuteBtn.style.visibility    = 'hidden';
  // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'visible';
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  creative.dom.video0.vid.pause();

  Enabler.finishExpand();
}

function expandFinishHandler() {
  showYTPlayer1('feature-expanded');
  creative.isExpanded = true;
  creative.dom.lastframeExpanded.style.visibility='hidden'; // lastFrameExpanded is always hidden when you expand the creative
  creative.dom.expandedExit.style.visibility = 'hidden';
  creative.dom.ytplayer1.play(); 
}

function collapseStartHandler() {
  // Perform collapse animation.
  creative.dom.expandedContent.style.display = 'none';
  creative.dom.expandedExit.style.display = 'none';
  creative.dom.collapseButton.style.display = 'none';
  creative.dom.collapsedContent.style.display = 'block';
  creative.dom.collapsedExit.style.display = 'block';
  creative.dom.expandButton.style.display = 'block';
  creative.dom.video0.firstframe.style.visibility    = 'visible';
  creative.dom.video0.lastframe.style.visibility    = 'hidden';

  hideYTPlayer1('feature-expanded');

  // When animation finished must call
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  // creative.dom.video0.vidMuteBtn.style.visibility    = 'hidden';
  // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'visible';
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  creative.dom.video0.lastframe.style.visibility    = 'visible';
  creative.dom.video0.firstframe.style.visibility    = 'hidden';
  
  if (creative.autoplay0) {
    if (creative.dom.video0.vid.readyState >= 2) {
      startMuted0(null);
    }
    else {
      creative.dom.video0.hasCanPlay = true;
      creative.dom.video0.vid.addEventListener('canplay', startMuted0, false);
    }
    // HACK: Safari experiences video rendering issues, fixed by forcing a viewport refresh
    // creative.dom.video0.vidMuteBtn.style.visibility = 'visible';
      setTimeout(function() {
        // creative.dom.video0.vidMuteBtn.style.visibility = 'hidden';
      }, 200);
  }
  else {
    // creative.dom.video0.vidMuteBtn.style.visibility    = 'visible';
    // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'hidden';
    creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
    creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  }
  creative.dom.video0.vidContainer.style.visibility  = 'visible';

  
  creative.isExpanded = false;
}

function onCollapseClickHandler(){
  Enabler.requestCollapse();
  Enabler.stopTimer('Panel Expansion');
}

function onExpandHandler(){
  Enabler.requestExpand();
  Enabler.startTimer('Panel Expansion');
}

function exitClickHandler() {
  // Reset video
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  //creative.dom.video0.lastframe.style.visibility  = 'visible';

  if (creative.dom.video0.vid.readyState > 0) {
    creative.dom.video0.vid.currentTime = 0;
  }

  Enabler.requestCollapse();
  Enabler.stopTimer('Panel Expansion');
  Enabler.exit('BackgroundExit');
}

// function collapsedExitClickHandler() {
//   // if (creative.dom.ytplayer0 != null) {
//   //   creative.dom.ytplayer0.pause();
//   //   // creative.dom.ytplayer0.seek(0);
//   // }
//   if (creative.dom.ytplayer1 != null) {
//     creative.dom.ytplayer1.pause();
//     // creative.dom.ytplayer1.seek(0);
//   }
//   Enabler.exit('CollapsedExit');
// }

function collapsedExitClickHandler() {
  // Reset video
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  creative.dom.video0.lastframe.style.visibility = 'visible';
  creative.dom.video0.firstframe.style.visibility = 'hidden';
  if (creative.dom.video0.vid.readyState > 0) {
    creative.dom.video0.vid.currentTime = 0;
  }
 
  Enabler.exit('CollapsedExit');
}

// function collapsedExitClickHandler() {
//   // if (creative.dom.ytplayer0 != null) {
//   //   creative.dom.ytplayer0.pause();
//   //   // creative.dom.ytplayer0.seek(0);
//   // }
//   if (creative.dom.ytplayer1 != null) {
//     creative.dom.ytplayer1.pause();
//     // creative.dom.ytplayer1.seek(0);
//   }
//   Enabler.exit('CollapsedExit');
// }

/**
 * Triggered once the video player is ready to play the video on expansion.
 */
function startMuted0(e) {
  // Leaving the listener can cause issues on Chrome / Firefox
  if (creative.dom.video0.hasCanPlay) {
    creative.dom.video0.vid.removeEventListener('canplay', startMuted0);
    creative.dom.video0.hasCanPlay = false;
  }
  // If paused then play
  creative.dom.video0.vid.volume       = 0; // Muted by default
  creative.dom.video0.vid.currentTime  = 0;
  creative.dom.video0.vid.play();
  creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'hidden';

}

/**
 * Play pause toggle.
 */
function pausePlayHandler0(e) {
  // Under IE10, a video is not 'paused' after it ends.
  if (creative.dom.video0.vid.paused || creative.dom.video0.vid.ended) {
    if (creative.isClick0) {
      creative.dom.video0.vid.volume = 1.0;
      // creative.dom.video0.vidMuteBtn.style.visibility    = 'visible';
      // creative.dom.video0.vidUnmuteBtn.style.visibility  = 'hidden';
      creative.dom.expandButton.style.visibility  = 'visible';
      creative.isClick0 = false;
    }
    // If paused then play
    creative.dom.video0.vid.play();
    creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
    creative.dom.video0.vidPlayBtn.style.visibility  = 'hidden';
    creative.dom.video0.firstframe.style.visibility    = 'hidden';
    creative.dom.video0.lastframe.style.visibility    = 'hidden';
    creative.dom.expandButton.style.visibility  = 'visible';
  }
  else {
    creative.dom.video0.vid.pause();
    creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
    creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  }
}

/**
 * Mutes or unmute the video player.
 */
function muteUnmuteHandler0(e) {
  if (creative.dom.video0.vid.volume == 0.0) {
    Enabler.counter("Unmute video 0", true);
    creative.dom.video0.vid.volume = 1.0;
    // creative.dom.video0.vidMuteBtn.style.visibility   = 'visible';
    // creative.dom.video0.vidUnmuteBtn.style.visibility = 'hidden';
  } else {
    Enabler.counter("Mute video 0", true);
    creative.dom.video0.vid.volume = 0.0;
    // creative.dom.video0.vidMuteBtn.style.visibility   = 'hidden';
    // creative.dom.video0.vidUnmuteBtn.style.visibility = 'visible';
  }
}

/**
 * Stops the video.
 */
function stopHandler0(e) {
  Enabler.counter("Video 0 stopped", true);
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  creative.isClick0 = true;
}

/**
 * Relaunches the video from the beginning.
 */
function replayHandler0(e) {
  Enabler.counter("Replay video 0", true);
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.play();
  creative.dom.video0.vid.volume = 1.0;
  // creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
  // creative.dom.video0.vidMuteBtn.style.visibility  = 'visible';
  creative.dom.video0.lastframe.style.visibility  = 'hidden';
}

/**
 * Handler triggered when the video has finished playing.
 */
function videoEndHandler0(e) {
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  creative.dom.video0.lastframe.style.visibility  = 'visible';
  creative.dom.video0.firstframe.style.visibility  = 'hidden';
  //creative.dom.expandButton.style.visibility = 'hidden';

  creative.isClick0 = true;
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler0(e) {
 var perc = creative.dom.video0.vid.currentTime / creative.dom.video0.vid.duration;
 creative.dom.video0.vidProgressBar.style.width = Math.round(100*perc) + '%';
}

/**
 * Add video metrics to the HTML5 video elements by loading in video module, and assigning to videos.
 */
function addVideoTracking0() {
  // Add in the video files.
  // These are 3 different codecs due to different browser specifications ; we recommend you have all 3 filetypes.
  // var srcNode = document.createElement('source');
  // srcNode.setAttribute('type', 'video/webm');
  // srcNode.setAttribute('src', Enabler.getUrl('video1.webm'));
  // creative.dom.video0.vid.appendChild(srcNode);

  srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/mp4');
  srcNode.setAttribute('src', Enabler.getUrl('video1.mp4'));
  creative.dom.video0.vid.appendChild(srcNode);

  creative.dom.video0.vid.appendChild(srcNode);



  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('Video Report 0', creative.dom.video0.vid);
  }.bind(this));
}



/**
 * Shows the YT player.
 */



function showYTPlayer1(containerId) {
  if (!creative.dom.ytplayer1) {
    creative.ytplayer1Ended = false;
    creative.dom.ytplayer1 = document.createElement('gwd-youtube');
    var ytp = creative.dom.ytplayer1;
    ytp.setAttribute('id', 'ytp-1');
    ytp.setAttribute('video-url', 'https://www.youtube.com/watch?v=Krl6U15OERo?modestbranding=1&autoplay=2&rel=2&showinfo=1&adformat=1_5&widget_referrer=https%3A%2F%2Fstorage.googleapis.com%2Frich_media_gallery_public%2Fads%2FS6%252CLaunching%2520People%2Ftemplate.html&enablejsapi=1&origin=https%3A%2F%2Fs0.2mdn.net&widgetid=2');
    ytp.setAttribute('autoplay', 'standard'); // none, standard, preview, intro.
    // Adformat parameter required for any creative using a YouTube player.
    ytp.setAttribute('adformat', '1_5');
    ytp.setAttribute('controls', 'autohide'); // none, show, autohide.
    document.getElementById(containerId).appendChild(ytp);


    ytp.addEventListener('playpressed', function() {
      if (creative.ytplayer1Ended) {
        creative.ytplayer1Ended = false;
        Enabler.counter('YTP 1 replay', true);
      }
      Enabler.counter('YTP 1 play pressed', true);
    }, false);
    ytp.addEventListener('paused', function() {
      Enabler.counter('YTP 1 paused', true);
    }, false);
    ytp.addEventListener('ended', function() {
      Enabler.counter('YTP 1 ended', true);
      creative.ytplayer1Ended = true;
      creative.dom.lastframeExpanded.style.visibility    = 'visible';
      creative.dom.expandedExit.style.visibility    = 'visible';


    }, false);
    ytp.addEventListener('viewed0percent', function() {
      // Force unmute.
      if (ytp.a.isMuted()) {
        ytp.toggleMute();
      }
      Enabler.counter('YTP 1 viewed 0%');
    }, false);
    ytp.addEventListener('viewed25percent', function() {
      Enabler.counter('YTP 1 viewed 25%');
    }, false);
    ytp.addEventListener('viewed50percent', function() {
      Enabler.counter('YTP 1 viewed 50%');
    }, false);
    ytp.addEventListener('viewed75percent', function() {
      Enabler.counter('YTP 1 viewed 75%');
    }, false);
    ytp.addEventListener('viewed100percent', function() {
      Enabler.counter('YTP 1 viewed 100%');
    }, false);
    ytp.addEventListener('previewed0percent', function() {
      Enabler.counter('YTP 1 previewed 0%');
      if (!ytp.a.isMuted()) {
        ytp.toggleMute();
      }
    }, false);
    ytp.addEventListener('previewed25percent', function() {
      Enabler.counter('YTP 1 previewed 25%');
    }, false);
    ytp.addEventListener('previewed50percent', function() {
      Enabler.counter('YTP 1 previewed 50%');
    }, false);
    ytp.addEventListener('previewed75percent', function() {
      Enabler.counter('YTP 1 previewed 75%');
    }, false);
    ytp.addEventListener('previewed100percent', function() {
      Enabler.counter('YTP 1 previewed 100%');
      
    }, false);
  }
  else {
    creative.dom.ytplayer1.style.display = 'block';   
  }
}

/**
 * Removes the YTPlayer from the DOM.
 */
function hideYTPlayer1(containerId) {
  if (creative.dom.ytplayer1 != null) {
    creative.dom.ytplayer1.pause();
      creative.dom.ytplayer1.seek(0); // seeks the position 0 of the said video.
    creative.dom.ytplayer1.style.display = 'none';
  }
}

window.addEventListener('load', preInit);