import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

btnStart.disabled = true; 
let timer = null;
selectedDates = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    
    btnStart.disabled = false
    
    btnStart.addEventListener('click', () => {
      Notiflix.Notify.success('Good ♥');
      timer = setInterval(() => {
        const diffInDate = selectedDates[0] - new Date();

        if (diffInDate < 1000) {
          clearInterval(timer);
        }
        addInSpans(convertMs(diffInDate));
      }, 1000);
    });

  }
};

flatpickr(dateInput, options)

function addInSpans({ days, hours, minutes, seconds }) {
  daySpan.textContent = `${days}`;
  hourSpan.textContent = `${hours}`;
  minuteSpan.textContent = `${minutes}`;
  secondSpan.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}





