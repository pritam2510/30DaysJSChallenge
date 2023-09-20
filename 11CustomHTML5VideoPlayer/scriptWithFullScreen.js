/* List of all the elements that we require */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(`#btnFullScreen`);
const inputNode = document.querySelector('input[type="file"]');

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
  if (!document.fullscreenElement) {
    isFullScreen = true;
    player?.requestFullscreen();
  } else {
    isFullScreen = false;
    document.exitFullscreen();
  }
}

function handleFullScreenIcon() {
  let iconStyle = !isFullScreen ? "fa fa-expand" : "fa fa-compress";
  fullScreen.innerHTML = `<i class="${iconStyle}" style="color: #ffffff"></i>`;
  isFullScreen =!isFullScreen;
}

function playSelectedFile(event) {
    let file = this.files[0]
    let type = file.type
    let canPlay = video.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    let message = 'Can play type "' + type + '": ' + canPlay;
    console.log(message);
    let isError = canPlay === 'no'
    if (isError) {
      return
    }
    let fileURL = URL.createObjectURL(file)
    video.src = fileURL
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

player.addEventListener("fullscreenchange", handleFullScreenIcon);

inputNode.addEventListener('change', playSelectedFile);
