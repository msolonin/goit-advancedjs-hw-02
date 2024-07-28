import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let countdownInterval;
const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById("datetime-picker");

const timerElements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            startButton.disabled = true;
            iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
        } else {
            startButton.disabled = false;
        }
    },
};

startButton.disabled = true;
flatpickr(dateTimePicker, options);

startButton.addEventListener("click", () => {
    // startButton.disabled = true;
    dateTimePicker.disabled = true;
    countdownInterval = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        startButton.disabled = true;
        dateTimePicker.disabled = false;
        iziToast.success({ title: 'Completed', message: 'Countdown finished!' });
    } else {
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        timerElements.days.textContent = padValue(days);
        timerElements.hours.textContent = padValue(hours);
        timerElements.minutes.textContent = padValue(minutes);
        timerElements.seconds.textContent = padValue(seconds);
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

function padValue(value) {
    return String(value).padStart(2, '0');
}
