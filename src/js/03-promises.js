import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitForm);

const formData = {};

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  formData.delay = Number(delay.value);
  formData.step = Number(step.value);
  formData.amount = Number(amount.value);

  for (let i = 1; i <= formData.amount; i++) {
    createPromise(i, formData.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    formData.delay += formData.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promisData = {
        position,
        delay,
      };
      if (shouldResolve) {
        // Fulfill
        resolve(promisData);
      } else {
        // Reject
        reject(promisData);
      }
    }, delay);
  });
}
