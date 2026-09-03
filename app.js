// === PWA Install Prompt ===
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

if (installBtn) {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.add('show');
    });

    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Install outcome: ${outcome}`);
            deferredPrompt = null;
            installBtn.classList.remove('show');
        }
    });

    window.addEventListener('appinstalled', () => {
        installBtn.classList.remove('show');
        deferredPrompt = null;
    });
}

// === Service Worker Registration ===
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.error('SW registration failed:', err));
}
