document.addEventListener('DOMContentLoaded', function() {
    // header
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (window.scrollY > 0) {                    
            header.classList.add('is-visible');
            header.classList.add('is-scrolled');
        }

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }
            lastScrollY = currentScrollY;
        });
    });
    const hamburger = document.querySelector('.header__hamburger');
    const mobileNav = document.querySelector('.header__nav--mobile');
    const body = document.querySelector('body');
    hamburger.addEventListener('click', () => {
        header.classList.toggle('is-menu-open');
        body.classList.toggle('no-scroll'); 
    });
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('is-menu-open');
            body.classList.remove('no-scroll');
        });
    });

    gsap.registerPlugin(TextPlugin, ScrollTrigger);

    // --- visual 섹션 ---
    gsap.to("#typing-text", {
        duration: 3,
        text: "기업과 인재를 연결하는 일자리통합플랫폼",
        ease: "none",
        onComplete: () => {
            document.querySelector('.typing-cursor').style.display = 'none';
            gsap.to(".visual__title", { duration: 1, opacity: 1, y: 0, delay: 0.5 });

            header.classList.add('is-visible');
        }
    });
    const video = document.querySelector('.visual__video');
    if (video) {
        video.classList.add('visual__video--loading');
        video.addEventListener('canplay', function() {
            video.classList.remove('visual__video--loading');
        }, { once: true });

        video.playbackRate = 0.8;
    }

    // --- cont02 섹션 ---    
    const titleLines = document.querySelectorAll("#animated-title > span");
    if (titleLines.length > 0) {
        titleLines.forEach(line => {
            const text = line.textContent;
            line.innerHTML = '';
            for (const char of text) {
                if (char.trim() !== '') {
                    line.innerHTML += `<div class="char-wrapper"><span class="char">${char}</span></div>`;
                } else {
                    line.innerHTML += ' ';
                }
            }
        });
        gsap.to("#animated-title .char", {
            y: 0, stagger: 0.05, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: "#animated-title",
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    }

    gsap.from(".intro__text", {
        opacity: 0, x: 50, duration: 1,
        scrollTrigger: {
            trigger: ".intro",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });

    const performanceElements = gsap.utils.toArray('.performance__title, .performance__desc, .performance__list');
    performanceElements.forEach((el, index) => {
        gsap.from(el, {
            opacity: 0, y: 50, duration: 1, delay: index * 0.2,
            scrollTrigger: {
                trigger: ".performance",
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    });

    const counters = gsap.utils.toArray(".performance__item-count");
    counters.forEach(counter => {
        const targetCount = +counter.dataset.count;
        const counterObject = { value: 0 };
        gsap.to(counterObject, {
            value: targetCount,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            onUpdate: () => {
                counter.innerHTML = `<span>+</span> ${Math.round(counterObject.value).toLocaleString()}<span>건</span>`;
            }
        });
    });

    // --- cont03 섹션 ---
    const cont03 = gsap.timeline({
        scrollTrigger: {
            trigger: ".cont03",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: ".cont03 .pinInner",
            pinSpacing: false
        }
    });
    cont03.to(".cont03 .cont03__item", { scale: 1, opacity: 0, duration: 1 });
    cont03.to(".overlay.item01", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"});        
    cont03.to(".overlay.item01 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5");
    cont03.to(".overlay.item01 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
    cont03.to(".overlay.item01 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7");
    cont03.to({}, { duration: 1 });

    cont03.to(".overlay.item02", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"});        
    cont03.to(".overlay.item02 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5");
    cont03.to(".overlay.item02 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
    cont03.to(".overlay.item02 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7");
    cont03.to({}, { duration: 1 });

    cont03.to(".overlay.item03", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"});        
    cont03.to(".overlay.item03 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5");
    cont03.to(".overlay.item03 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
    cont03.to(".overlay.item03 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7");
    cont03.to({}, { duration: 1 });

    let mm = gsap.matchMedia();
    mm.add({
        isAboveMobile: "(min-width: 480px)",
        isSmallMobile: "(max-width: 479px)"

    }, (context) => {
        let { isAboveMobile, isSmallMobile } = context.conditions;

        if (isAboveMobile) {
        }
        if (isSmallMobile) {

        }

        return () => { 
 
        };
    });



    let resizeTimer;
    let lastWidth = window.innerWidth; 
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newWidth = window.innerWidth;
            if (newWidth !== lastWidth) {
                location.reload();
            }
        }, 250); 
    });


});
