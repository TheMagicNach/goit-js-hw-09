import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();

  let delay = Number(evt.target.delay.value)
  const step = Number(evt.target.step.value);
  const amount = Number(evt.target.amount.value);

  for (let i = 1; i <= amount; i += 1) {
  createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delay += step;
  }
}