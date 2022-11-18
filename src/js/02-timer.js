import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputElem = document.querySelector('#datetime-picker');
const startTimerBtnElem = document.querySelector('[data-start]');
const secondsValueElem = document.querySelector('[data-seconds]');
const minutesValueElem = document.querySelector('[data-minutes]');
const hoursValueElem = document.querySelector('[data-hours]');
const daysValueElem = document.querySelector('[data-days]');

startTimerBtnElem.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - new Date() <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      // console.log(selectedDates[0] - new Date() > 0);

      startTimerBtnElem.removeAttribute('disabled');
    }
  },
};

flatpickr(inputElem, options);

const countdownTimer = {
  isActive: false,
  intervalId: null,
  start(date) {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      startTimerBtnElem.setAttribute('disabled', true);
      this.isActive = true;
      const startTime = date;
      const currentTime = Date.now();
      // console.log(currentTime);
      const deltaTime = startTime - currentTime;
      const timeConverted = convertMs(deltaTime);
      // console.log(timeConverted);

      renderDate(timeConverted);
      // console.log(deltaTime);

      if (deltaTime <= 1000) {
        Notiflix.Notify.success('Time is up');
        clearInterval(this.intervalId);
        this.isActive = false;
        return;
      }
    }, 1000);
  },
};

startTimerBtnElem.addEventListener('click', handelTimerStart);

function handelTimerStart(event) {
  event.preventDefault();
  const date = new Date(inputElem.value);
  // console.log(date);

  countdownTimer.start(date);
}
function renderDate({ days, hours, minutes, seconds }) {
  daysValueElem.textContent = days;
  hoursValueElem.textContent = hours;
  minutesValueElem.textContent = minutes;
  secondsValueElem.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
