
document.addEventListener('DOMContentLoaded', function() {


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
    if (video) { video.playbackRate = 0.8; }

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
    ScrollTrigger.matchMedia({    
        "(min-width: 1025px)": function() {   
            // --- cont02 섹션 ---         
            const cont02Timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont02",
                    start: "top top",
                    end: "+=500",
                    scrub: 1,
                    pin: true,
                }
            });
            // --- cont04 섹션 ---
            const cont04 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont04",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: ".cont04 .pinInner",
                    pinSpacing: false
                }
            });

            cont04.to(".cont04__text", { scale: 0.8, opacity: 0.4, duration: 1 });
            const cardLayout = [
                { el: ".card01", x: "-170%", y: "-160%", r: -8 }, 
                { el: ".card02", x: "-50%",  y: "-180%", r: 0 },  
                { el: ".card03", x: "70%",   y: "-160%", r: 8 },  
                { el: ".card04", x: "-210%", y: "-50%",  r: -5 }, 
                { el: ".card05", x: "110%",  y: "-50%",  r: 5 },  
                { el: ".card06", x: "-170%", y: "60%",   r: -8 }, 
                { el: ".card07", x: "-50%",  y: "80%",   r: 0 },  
                { el: ".card08", x: "70%",   y: "60%",   r: 8 }   
            ];

            cardLayout.forEach((card, index) => {
                cont04.fromTo(card.el, 
                    { 
                        opacity: 0, 
                        scale: 0.3, 
                        x: "-50%",
                        y: "-50%",
                        left: "50%",
                        top: "50%",
                        rotation: 0
                    }, 
                    { 
                        opacity: 1, 
                        scale: 1, 
                        x: card.x, 
                        y: card.y, 
                        rotation: card.r, 
                        duration: 3, 
                        ease: "power2.out" 
                    }, 
                    "-=2.8"
                );
            });

            cont04.to(".cont04__text", { opacity: 1, scale: 1, duration: 1.5 });

            // --- cont06 섹션 ---
            if (window.innerWidth > 820) {
                gsap.to('.cont06 .pinInner', {
                    x: function() {
                        const listElement = document.querySelector('.cont06__list');
                        return -(listElement.scrollWidth - window.innerWidth + 200);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".cont06",
                        start: "top top",
                        end: "+=3000", 
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            }

            // --- cont07 섹션 ---
            const moduleTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont07",
                    start: "top top",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                }
            });

            const resetClasses = () => {
                document.querySelectorAll('.module__list-card').forEach(el => {
                    el.classList.remove('sp_on', 'cp_on', 'rc_on');
                });
            };

            moduleTL
                .to({}, { duration: 1.5, onStart: resetClasses, onReverseComplete: resetClasses })
                .to({}, {
                    duration: 1,
                    onStart: () => { 
                        resetClasses(); 
                        document.querySelectorAll('.module__list-card.sp').forEach(el => el.classList.add('sp_on')); 
                    },
                    onReverseComplete: () => { resetClasses(); }
                })
                .to({}, { duration: 1 })
                .to({}, {
                    duration: 1,
                    onStart: () => { 
                        resetClasses(); 
                        document.querySelectorAll('.module__list-card.cp').forEach(el => el.classList.add('cp_on')); 
                    },
                    onReverseComplete: () => { 
                        resetClasses(); 
                        document.querySelectorAll('.module__list-card.sp').forEach(el => el.classList.add('sp_on')); 
                    }
                })
                .to({}, { duration: 1 })
                .to({}, {
                    duration: 1,
                    onStart: () => { 
                        resetClasses(); 
                        document.querySelectorAll('.module__list-card.rc').forEach(el => el.classList.add('rc_on')); 
                    },
                    onReverseComplete: () => { 
                        resetClasses(); 
                        document.querySelectorAll('.module__list-card.cp').forEach(el => el.classList.add('cp_on')); 
                    }
                })
                .to({}, { duration: 1 });     
                
                // --- cont08 섹션 ---
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".cont08",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        pin: ".cont08 .pin-inner",
                    }
                })
                .fromTo(".cont08__title", 
                    { 
                        opacity: 0,
                        x: "-50%",
                    }, 
                    { 
                        opacity: 1,
                        x: 0,
                        left: "50%",
                        xPercent: -50,
                        ease: "power1.in",
                    }
                );
        },
        "(max-width: 1024px)": function() {
            gsap.from(".cont04__text", {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: ".cont04__text",
                    start: "top 90%",
                    end: "bottom 80%", // 애니메이션이 끝나는 지점 추가
                    scrub: 1, // ★★★ 스크롤과 연동시키는 scrub 옵션 ★★★
                }
            });

            // 각 biz-card에 개별적으로 애니메이션 적용
            gsap.utils.toArray(".biz-card").forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        end: "bottom 85%", // 애니메이션이 끝나는 지점 추가
                        scrub: 1, // ★★★ 스크롤과 연동시키는 scrub 옵션 ★★★
                    }
                });
            });
        },
        "(min-width: 769px)": function() {
            // --- cont05 섹션 ---
            const cont05 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cont05",
                    start: "top 80%", 
                    endTrigger: ".cont06",
                    end: "top 20%",
                    scrub: 1,
                }
            });

            cont05.to(".cont05__bg", { opacity: 1, duration: 1 })
                    .to(".cont05__left", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
                    .to({}, { duration: 5 }) 
                    .to([".cont05__bg", ".cont05__left"], { opacity: 0, duration: 1 });
        },
        "(max-width: 768px)": function() {
        }
        
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

    // --- cont05 섹션 ---
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

    

    

        // --- cont10 섹션 (아코디언) ---
        const accordionItems = document.querySelectorAll('.accordion__item');

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion__header');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion__content').style.maxHeight = null;
                });
                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion__content');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('active');
            const firstContent = accordionItems[0].querySelector('.accordion__content');
            firstContent.style.maxHeight = firstContent.scrollHeight + "px";
        }
        const track = document.querySelector('.cont11 .slide-track');

        // 리사이즈
        // let resizeTimer;
        // let lastWidth = window.innerWidth; 

        // window.addEventListener("resize", () => {
        //     clearTimeout(resizeTimer);
        //     resizeTimer = setTimeout(() => {
        //         const newWidth = window.innerWidth;
        //         if (newWidth !== lastWidth) {
        //             location.reload();
        //         }

        //     }, 250); 
        // });


});