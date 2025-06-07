document.addEventListener('astro:page-load', () => {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  const steps = quizContainer.querySelectorAll('.quiz-step');
  const options = quizContainer.querySelectorAll('.quiz-option');

  function goToStep(stepNumber) {
    steps.forEach(step => {
      step.classList.remove('active');
      if (step.getAttribute('data-step') === stepNumber) {
        step.classList.add('active');
      }
    });
  }

  options.forEach(option => {
    option.addEventListener('click', () => {
      const nextStep = option.getAttribute('data-next-step');
      if (nextStep) {
        goToStep(nextStep);
      }
    });
  });
});
