import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
};

refs.inputEl.disabled = false;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();

    if (selectedDates[0] - startTime < 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }

    refs.btnStart.disabled = false;
    refs.btnStart.addEventListener('click', startTimer);

    function startTimer() {
      refs.inputEl.disabled = true;
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = selectedDates[0] - currentTime;
        if (timeLeft === 0) {
          clearInterval(timer);
          return;
        }
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        refs.spanDays.innerHTML = addLeadingZero(days);
        refs.spanHours.innerHTML = addLeadingZero(hours);
        refs.spanMinutes.innerHTML = addLeadingZero(minutes);
        refs.spanSeconds.innerHTML = addLeadingZero(seconds);
      }, 1000);
    }
  },
};

flatpickr('input#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
