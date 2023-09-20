/* List of all the elements that we require */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
let mouseDown = false;

/* List of all the event methods that we require */
function togglePlay(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

function skipButton() {
  video.currentTime += +(this.dataset.skip);
}

function handleRangeUpdate(e) {
  video[this.name] = this.value;
}

function handleProgressBar(e) {
    videoPercentage = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis  = `${videoPercentage}%`;
};

function scrub(e) {
    let clickedTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = clickedTime;
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

progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",(e) => mouseDown && scrub(e));
progress.addEventListener("mousedown",(e) => mouseDown = true);
progress.addEventListener("mouseup",(e) => mouseDown = false);