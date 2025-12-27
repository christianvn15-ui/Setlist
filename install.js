let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent automatic mini-infobar
  e.preventDefault();
  deferredPrompt = e;
  // Show our custom install button
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show native install prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  }
});