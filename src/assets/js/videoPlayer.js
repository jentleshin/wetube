import { timeToString, setTimeFormat } from "./config/time";

const videoPlayer = document.querySelector("#jsVideoPlayer");

//assign when videoPlayer exists
let video;
let playBtn;
let volumeBtn;
let fullscreenBtn;
let currentTimeDisplay;
let durationDisplay;
let timeLine;
let viewNum;

//icons
const PLAY_ARROW_ICON = `<span class ="material-icons"> play_arrow </span>`;
const PAUSE_ICON = `<span class ="material-icons"> pause </span>`;
const VOLUME_UP_ICON = `<span class ="material-icons"> volume_up </span>`;
const VOLUME_OFF_ICON = `<span class ="material-icons"> volume_off </span>`;
const FULLSCREEN_ICON = `<span class ="material-icons"> fullscreen </span>`;
const FULLSCREEN_EXIT_ICON = `<span class ="material-icons"> fullscreen_exit </span>`;

//api
const incrementView = () => {
  const url = window.location.href;
  const videoId = url.split("videos/")[1];
  fetch(`/api/${videoId}/increment-view`, { method: "POST" })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      viewNum.innerHTML = JSON.stringify(json);
    });
};

//runTime
let savedTime = null;

//play & pause//
const pauseVideo = () => {
  video.pause();
  playBtn.innerHTML = PLAY_ARROW_ICON;
};

const playVideo = () => {
  video.play();
  playBtn.innerHTML = PAUSE_ICON;
};

const togglePlay = () => {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
};

//mute//
const toggleMute = () => {
  if (video.muted) {
    volumeBtn.innerHTML = VOLUME_UP_ICON;
  } else {
    volumeBtn.innerHTML = VOLUME_OFF_ICON;
  }
  video.muted = !video.muted;
};

//FullScreen//
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

//time display//
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

//TimeLine//
const navigateTimeLine = () => {
  video.currentTime = timeLine.value;
  displayCurrentTime();
};

const setTimeLineMax = () => {
  timeLine.setAttribute("max", Math.floor(video.duration));
};

const updateTimeLine = () => {
  timeLine.value = Math.floor(video.currentTime);
};

//eventHandler//
const setupTimeControls = () => {
  const timeFormat = setTimeFormat(video.duration);

  setTimeLineMax();
  displayDuration(timeFormat);
  displayCurrentTime(timeFormat);

  video.addEventListener("timeupdate", () => {
    updateTimeLine();
    displayCurrentTime(timeFormat);
  });
  timeLine.addEventListener("input", () => {
    navigateTimeLine();
    displayCurrentTime(timeFormat);
  });
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    pauseVideo();
    updateTimeLine();
    displayCurrentTime(timeFormat);
    incrementView();
  });
  video.removeEventListener("loadedmetadata", setupTimeControls);
};

const handleDrag = () => {
  const wasPlaying = !video.paused;
  pauseVideo();
  timeLine.addEventListener("mouseup", function handleMouseup() {
    if (wasPlaying) {
      playVideo();
    }
    timeLine.removeEventListener("mouseup", handleMouseup);
  });
};

const init = () => {
  playBtn = videoPlayer.querySelector("#jsPlayBtn");
  volumeBtn = videoPlayer.querySelector("#jsVolumeBtn");
  fullscreenBtn = videoPlayer.querySelector("#jsFullScreenBtn");
  video = videoPlayer.querySelector("#jsVideoContainer video");
  currentTimeDisplay = videoPlayer.querySelector("#jsCurrentTime");
  durationDisplay = videoPlayer.querySelector("#jsTotalTime");
  timeLine = videoPlayer.querySelector("#jsTimeLine");
  viewNum = document.querySelector("#jsViewNum");

  video.addEventListener("loadedmetadata", setupTimeControls);
  playBtn.addEventListener("click", togglePlay);
  volumeBtn.addEventListener("click", toggleMute);
  fullscreenBtn.addEventListener("click", toggleFullScreen);
  timeLine.addEventListener("mousedown", handleDrag);
};

if (videoPlayer) {
  init();
}
