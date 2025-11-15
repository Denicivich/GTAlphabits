// 1. Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE', // <-- REPLACE with your video ID
    playerVars: {
      'playsinline': 1, // Recommended for mobile
      'autoplay': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // Example: Auto-play the video (note: can be blocked by browsers)
  // event.target.playVideo(); 
}

// 4. The API calls this function whenever the player's state changes.
//    (e.g., Playing, Paused, Ended)
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    console.log('Video started playing!');
  }
}