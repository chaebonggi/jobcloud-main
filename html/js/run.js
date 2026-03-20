// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile Menu Toggle
    initMobileMenu();

    // Vision Animation
    initVisionAnimation();

    // FAQ Accordion
    initFAQAccordion();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Initialize Swiper for cases
    initCasesSwiper();
});

// Mobile Menu Functions
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(0)';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(100%)';
        });
    }

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.transform = 'translateX(100%)';
            });
        });
    }
}

// Vision Animation Functions
function initVisionAnimation() {
    // CSS animations handle all vision animations smoothly
    // No JavaScript needed - pure CSS keyframes for smooth performance
}

// FAQ Accordion Functions - Using CSS Grid for smooth transitions
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const btn = item.querySelector('.faq-btn');

        if (btn) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                const currentlyActiveItem = document.querySelector('.faq-item.active');

                // Close other items and open this one simultaneously
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    if (currentlyActiveItem && currentlyActiveItem !== item) {
                        currentlyActiveItem.classList.remove('active');
                    }
                    item.classList.add('active');
                }

                // Refresh Lucide icons
                lucide.createIcons();
            });
        }
    });
}

// Smooth Scroll Functions
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Swiper Initialization for Cases
function initCasesSwiper() {
    const swiper = new Swiper('.cases-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
        speed: 500,
        loop: false,
        autoplay: false,
    });
}
