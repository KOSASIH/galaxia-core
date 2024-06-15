const launchButton = document.getElementById('launch-button');

launchButton.addEventListener('click', () => {
  // Launch into space animation
  document.body.classList.add('launching');
  setTimeout(() => {
    document.body.classList.remove('launching');
  }, 3000);
});
