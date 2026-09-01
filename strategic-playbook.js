
        const toggleBtn = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');

        // Initialize theme from localStorage or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        updateIcons(savedTheme);

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            updateIcons(newTheme);
        });

        function updateIcons(theme) {
            if (theme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Navigation Drawer
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navLinksEl = document.getElementById('nav-links');
        const navOverlay = document.getElementById('nav-overlay');

        function openMobileNav() {
            navLinksEl.classList.add('open');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileNav() {
            navLinksEl.classList.remove('open');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', () => {
            if (navLinksEl.classList.contains('open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        navOverlay.addEventListener('click', closeMobileNav);

        navLinksEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });


// Extracted Inline Event Handlers
document.addEventListener('DOMContentLoaded', () => {

    const img0 = document.getElementById('fallback-img-0');
    if (img0) {
        const fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgZmlsbD0iI2E4YzdmYSI+PGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiLz48L3N2Zz4=';
        img0.addEventListener('error', function() {
            this.src = fallbackSrc;
        });
        // Check if the image has already errored before the listener was attached
        if (img0.complete && img0.naturalWidth === 0) {
            img0.src = fallbackSrc;
        }
    }
});
