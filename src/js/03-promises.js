import Notiflix from 'notiflix';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', handelFormSubmit);

function handelFormSubmit(event) {
  event.preventDefault();
  const inputDelay = event.target.elements.delay.value;
  const inputDelayStep = event.target.elements.step.value;
  const inputAmout = event.target.elements.amount.value;

  setTimeout(() => {
    let startPosition = 1;
    const intervalId = setInterval(() => {
      createPromise(startPosition, inputDelayStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${
              delay * (position - 1) + +inputDelay
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${
              delay * (position - 1) + +inputDelay
            }ms`
          );
        });
      startPosition += 1;
      if (startPosition > +inputAmout) {
        clearInterval(intervalId);
        return;
      }
    }, inputDelayStep);
  }, inputDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
