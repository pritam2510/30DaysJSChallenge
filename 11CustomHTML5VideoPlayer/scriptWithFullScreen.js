/* List of all the elements that we require */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(`#btnFullScreen`);

/* List of all the variables that we require */
let isMouseDown = false;
let isFullScreen = false;

/* List of all the event methods that we require */
function togglePlay(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused
    ? `<i class="fa fa-play" style="color: #ffffff"></i>`
    : `<i class="fa fa-pause" style="color: #ffffff"></i>`;
  playButton.innerHTML = icon;
}

function skipButton() {
  video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate(e) {
  video[this.name] = this.value;
}

function handleProgressBar(e) {
  videoPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${videoPercentage}%`;
}

function scrub(e) {
  let clickedTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = clickedTime;
}

function handleFullScreenClick() {
  let iconStyle = isFullScreen ? "fa fa-expand" : "fa fa-compress";
  fullScreen.innerHTML = `<i class="${iconStyle}" style="color: #ffffff"></i>`;
  if (!document.fullscreenElement) {
    player?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  isFullScreen =!isFullScreen;
}

/* List of all the event listener that we require */
playButton.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgressBar);

skipButtons.forEach((button) => {
  button.addEventListener("click", skipButton);
});

ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isMouseDown && scrub(e));
progress.addEventListener("mousedown", (e) => (isMouseDown = true));
progress.addEventListener("mouseup", (e) => (isMouseDown = false));

fullScreen.addEventListener("click", handleFullScreenClick);
