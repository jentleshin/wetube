import { timeToString, timeFormat } from "./config/time";

const videoPlayer = document.querySelector("#jsVideoPlayer");

//assign when videoPlayer exists
let video;
let playBtn;
let volumeBtn;
let fullscreenBtn;
let currentTimeDisplay;
let durationDisplay;
let timeLine;

//icons
const PLAY_ARROW_ICON = `<span class ="material-icons"> play_arrow </span>`;
const PAUSE_ICON = `<span class ="material-icons"> pause </span>`;
const VOLUME_UP_ICON = `<span class ="material-icons"> volume_up </span>`;
const VOLUME_OFF_ICON = `<span class ="material-icons"> volume_off </span>`;
const FULLSCREEN_ICON = `<span class ="material-icons"> fullscreen </span>`;
const FULLSCREEN_EXIT_ICON = `<span class ="material-icons"> fullscreen_exit </span>`;

//runTime
let savedTime = null;

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = PAUSE_ICON;
  } else {
    video.pause();
    playBtn.innerHTML = PLAY_ARROW_ICON;
  }
};

const toggleMute = () => {
  if (video.muted) {
    volumeBtn.innerHTML = VOLUME_UP_ICON;
  } else {
    volumeBtn.innerHTML = VOLUME_OFF_ICON;
  }
  video.muted = !video.muted;
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
    fullscreenBtn.innerHTML = FULLSCREEN_EXIT_ICON;
  } else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = FULLSCREEN_ICON;
  }
};

const resetVideo = () => {
  playBtn.innerHTML = PLAY_ARROW_ICON;
  timeLine.value = 0;
  video.currentTime = 0;
};

const displayCurrentTime = (timeFormat) => {
  const currentTime = Math.floor(video.currentTime);

  if (currentTime !== savedTime) {
    currentTimeDisplay.innerHTML = timeToString(currentTime, timeFormat);
    savedTime = currentTime;
  }
};

const displayDuration = (timeFormat) => {
  const duration = video.duration;
  durationDisplay.innerHTML = timeToString(duration, timeFormat);
};

const navigateTimeLine = () => {
  video.currentTime = timeLine.value;
  displayCurrentTime();
};

const setTimeLine = () => {
  timeLine.setAttribute("max", Math.floor(video.duration));
};

const updateTimeLine = () => {
  timeLine.value = Math.floor(video.currentTime);
};

const init = () => {
  playBtn = videoPlayer.querySelector("#jsPlayBtn");
  volumeBtn = videoPlayer.querySelector("#jsVolumeBtn");
  fullscreenBtn = videoPlayer.querySelector("#jsFullScreenBtn");
  video = videoPlayer.querySelector("#jsVideoContainer video");
  currentTimeDisplay = videoPlayer.querySelector("#jsCurrentTime");
  durationDisplay = videoPlayer.querySelector("#jsTotalTime");
  timeLine = videoPlayer.querySelector("#jsTimeLine");

  playBtn.addEventListener("click", togglePlay);
  volumeBtn.addEventListener("click", toggleMute);
  fullscreenBtn.addEventListener("click", toggleFullScreen);

  //video-time
  new Promise((resolve) => {
    video.addEventListener("loadedmetadata", () => {
      resolve(timeFormat(video.duration));
    });
  })
    .then((timeFormat) => {
      //default
      setTimeLine();
      displayDuration(timeFormat);
      displayCurrentTime(timeFormat);
      //time goes on
      video.addEventListener("timeupdate", () => {
        updateTimeLine();
        displayCurrentTime(timeFormat);
      });
      timeLine.addEventListener("input", () => {
        navigateTimeLine();
        displayCurrentTime(timeFormat);
      });
      video.addEventListener("ended", () => {
        resetVideo();
        updateTimeLine();
        displayCurrentTime(timeFormat);
      });
    })
    .catch((error) => console.log(error));
};

if (videoPlayer) {
  init();
}
