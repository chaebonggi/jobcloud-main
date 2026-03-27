/**
 * Jobcloud UI Common Scripts
 * Optimized for Smooth Transitions and Swiper
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    initMobileMenu();

    // 2. FAQ Accordion (Smooth Parallel Transition)
    initFAQAccordion();

    // 3. Initialize Swiper for cases
    initCasesSwiper();

    // 4. Smooth Scroll for Anchor Links
    initSmoothScroll();

    // 5. Header scroll effect
    initHeaderScroll();
});

// Mobile Menu Functions
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(0)';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = ''; // Restore scroll
        });
    }

    // Close mobile menu on link click
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = '';
        });
    });
}

// FAQ Accordion Functions (Optimized for no-scroll-jump)
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                const currentlyActiveItem = document.querySelector('.faq-item.active');

                // Simultaneous open/close logic for smooth transition without height jump
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    // Close others
                    if (currentlyActiveItem && currentlyActiveItem !== item) {
                        currentlyActiveItem.classList.remove('active');
                    }
                    // Open this one
                    item.classList.add('active');
                }
            });
        }
    });
}

// Swiper Initialization for Cases
function initCasesSwiper() {
    const swiperEl = document.querySelector('.cases-swiper');
    if (swiperEl) {
        new Swiper('.cases-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            speed: 600,
            grabCursor: true,
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
}
