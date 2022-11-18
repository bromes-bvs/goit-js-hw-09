const startBtnElem = document.querySelector('[data-start]');
const stopBtnElem = document.querySelector('[data-stop]');

startBtnElem.addEventListener('click', handleStartClick);
stopBtnElem.addEventListener('click', handleStopClick);

let intervalId;
stopBtnElem.setAttribute('disabled', true);

function handleStartClick(event) {
  event.preventDefault();

  //   if (intervalId >= 1) {
  //     return;
  //   }
  //   console.log(intervalId);

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnElem.setAttribute('disabled', true);
  stopBtnElem.removeAttribute('disabled');
}

function handleStopClick() {
  if (intervalId) {
    clearInterval(intervalId);
    startBtnElem.removeAttribute('disabled');
    stopBtnElem.setAttribute('disabled', true);
    intervalId = 0;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
