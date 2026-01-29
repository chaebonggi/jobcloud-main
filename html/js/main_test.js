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
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

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

    // --- cont03 ---
    const cont03 = gsap.timeline({
        scrollTrigger: {
            trigger: ".cont03",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: ".cont03 .pinInner",
        }
    });
    cont03.to(".cont03 .cont03__item", { scale: 1, opacity: 0, duration: 1 });
    cont03.to(".overlay.item01", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"}); cont03.to(".overlay.item01 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5"); cont03.to(".overlay.item01 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6"); cont03.to(".overlay.item01 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7"); cont03.to({}, { duration: 1 });
    cont03.to(".overlay.item02", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"}); cont03.to(".overlay.item02 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5"); cont03.to(".overlay.item02 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6"); cont03.to(".overlay.item02 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7"); cont03.to({}, { duration: 1 });
    cont03.to(".overlay.item03", { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out"}); cont03.to(".overlay.item03 .overlay__box-tit", { opacity: 1, x: 0, duration: 0.8 }, "-=0.5"); cont03.to(".overlay.item03 .overlay__box-txt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6"); cont03.to(".overlay.item03 .overlay__box-stxt", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7"); cont03.to({}, { duration: 1 });

    let mm = gsap.matchMedia();
    mm.add({
        isDesktop: "(min-width: 1025px)",
        isTablet: "(min-width: 640px) and (max-width: 1024px)",
        isMobile: "(max-width: 639px)" 
    }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;

        // =============================================================
        // ★ 640px 이상 (PC & 태블릿) 에서 실행될 모든 pin 애니메이션 ★
        // =============================================================
        if (isDesktop || isTablet) {
            
            // --- cont02 ---         
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont02",
                    start: "top top",
                    end: "+=500",
                    scrub: 1,
                    pin: true,
                    // pinSpacing은 기본값(true)을 사용하거나, 명시적으로 true로 설정합니다.
                }
            });            

            

            // --- cont05 ---
            const cont05 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont05",
                    start: "top 80%", 
                    endTrigger: ".cont06",
                    end: "top 20%",
                    scrub: 1,
                }
            });
            cont05.to(".cont05__bg", { opacity: 1, duration: 1 }).to(".cont05__left", { opacity: 1, y: 0, duration: 1 }, "-=0.8").to({}, { duration: 5 }).to([".cont05__bg", ".cont05__left"], { opacity: 0, duration: 1 });
                    
            gsap.utils.toArray(".cont05-card").forEach((card) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 50%", 
                        scrub: 1,
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1
                });
            });
        }

        // =============================================================
        // ★ 1025px 이상 (PC) 에서만 실행될 pin 애니메이션 ★
        // =============================================================
        if (isDesktop) {
            // --- cont04 ---
            const cont04 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont04",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: ".cont04 .pinInner",
                    // ★★★ pinSpacing: false 를 제거하여 GSAP이 공간을 만들게 합니다. ★★★
                }
            });
            // ... (cont04의 .to() 애니메이션 코드는 그대로 유지) ...
            cont04.to(".cont04__text", { scale: 0.8, opacity: 0.4, duration: 1 });
            const cardLayout = [ { el: ".card01", x: "-170%", y: "-160%", r: -8 }, { el: ".card02", x: "-50%",  y: "-180%", r: 0 },  { el: ".card03", x: "70%",   y: "-160%", r: 8 }, { el: ".card04", x: "-210%", y: "-50%",  r: -5 }, { el: ".card05", x: "110%",  y: "-50%",  r: 5 },  { el: ".card06", x: "-170%", y: "60%",   r: -8 }, { el: ".card07", x: "-50%",  y: "80%",   r: 0 },  { el: ".card08", x: "70%",   y: "60%",   r: 8 } ];
            cardLayout.forEach((card) => { cont04.fromTo(card.el, { opacity: 0, scale: 0.3, x: "-50%", y: "-50%", left: "50%", top: "50%", rotation: 0 }, { opacity: 1, scale: 1, x: card.x, y: card.y, rotation: card.r, duration: 3, ease: "power2.out" }, "-=2.8"); });
            cont04.to(".cont04__text", { opacity: 1, scale: 1, duration: 1.5 });
        }

        // =============================================================
        // ★ 1024px 이하 (태블릿 & 모바일) 에서 실행될 애니메이션 ★
        // =============================================================
        if (isTablet || isMobile) {
            // --- cont04 ---
            gsap.from(".cont04__text", {
                opacity: 0, y: 50, duration: 1,
                scrollTrigger: { trigger: ".cont04__text", start: "top 90%", end: "bottom 80%", scrub: 1 }
            });
            gsap.utils.toArray(".biz-card").forEach((card) => {
                gsap.from(card, {
                    opacity: 0, y: 100, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: card, start: "top 95%", end: "bottom 85%", scrub: 1 }
                });
            });
        }

        return () => { };
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
