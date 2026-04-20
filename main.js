/**
 * Fermentation Studio - Main JS
 * Handles Theme, RTL, Mobile Menu, and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons (Lucide)
    const initIcons = () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    };
    initIcons();
    // Re-run after a short delay just in case
    setTimeout(initIcons, 500);

    // 2. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
        themeBtn?.classList.add('active'); // Highlight icon in dark mode
    }

    const handleThemeToggle = () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        themeBtn?.classList.toggle('active', theme === 'dark');
    };

    themeBtn?.addEventListener('click', handleThemeToggle);
    themeBtn?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleThemeToggle();
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn?.querySelector('i');
        if (icon && window.lucide) {
            icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }

    // 3. RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    const isRtl = localStorage.getItem('rtl') === 'true';

    if (isRtl) {
        document.body.classList.add('rtl');
        rtlBtn?.classList.add('active'); // Highlight icon in RTL mode
    }

    const handleRtlToggle = () => {
        const active = document.body.classList.toggle('rtl');
        localStorage.setItem('rtl', active);
        rtlBtn?.classList.toggle('active', active);
    };

    rtlBtn?.addEventListener('click', handleRtlToggle);
    rtlBtn?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRtlToggle();
        }
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-menu');

    const toggleMenu = () => {
        drawer?.classList.toggle('open');
        overlay?.classList.toggle('open');
        document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
    };

    menuBtn?.addEventListener('click', toggleMenu);
    closeBtn?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    // 5. Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // 6. Reveal Scroll Animations
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 7. Password Visibility Toggle
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const icon = btn.querySelector('i');
            if (icon && window.lucide) {
                icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
                lucide.createIcons();
            }
        });
    });

    // 8. Dashboard Sidebar Collapse (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    sidebarToggle?.addEventListener('click', () => {
        sidebar?.classList.toggle('active');
    });

    // 9. 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 10. Back to Top Functionality
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
