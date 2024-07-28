import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const fulfilledRadioButton = document.querySelector('input[name="state"][value="fulfilled"]');
const rejectedRadioButton = document.querySelector('input[name="state"][value="rejected"]');
const delayInput = document.querySelector('input[name="delay"]');
const createNotificationButton = document.querySelector('button[type="submit"]');

const createPromise = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledRadioButton.checked) {
        resolve(delay);
      } else if (rejectedRadioButton.checked) {
        reject(delay);
      }
    }, delay);
  });
};

createNotificationButton.addEventListener("click", (event) => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  createPromise(delay)
    .then((data) => {
      iziToast.success({message: `Fulfilled promise in ${data}ms` });
    })
    .catch((err) => {
      iziToast.error({message: `Rejected promise in ${err}ms` });
    });
});
