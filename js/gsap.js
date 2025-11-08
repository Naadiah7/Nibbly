// ===== GSAP ANIMATIONS FOR ALL PAGES =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize common animations
        initializeCommonAnimations();
        
        // Page-specific animations based on current page
        initializePageSpecificAnimations();
    }
});

// ===== COMMON ANIMATIONS =====
function initializeCommonAnimations() {
    // Floating cookies animation 
    createFloatingCookies();
    
    // Navigation animation 
    gsap.from('#Navtop li', {
        duration: 0.6,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.3
    });

    // Logo animation
    gsap.from('#logo', {
        duration: 0.8,
        rotation: 360,
        scale: 0,
        ease: "back.out(1.7)",
        delay: 0.2
    });

    // Social media icons hover animations 
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                y: -5,
                scale: 1.1,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
}

// ===== PAGE DETECTION =====
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('blog.html')) return 'blog';
    if (path.includes('blogdetails.html')) return 'blog-details';
    if (path.includes('recipebook.html')) return 'recipe-book';
    if (path.includes('myfavourites.html')) return 'my-favourites';
    if (path.includes('recipedetails.html')) return 'recipe-details';
    if (path.includes('search.html')) return 'search';
    return 'home';
}

// ===== PAGE-SPECIFIC ANIMATIONS =====
function initializePageSpecificAnimations() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'about':
            initializeAboutPageAnimations();
            break;
        case 'home':
            initializeHomePageAnimations();
            break;
        case 'blog':
            initializeBlogPageAnimations();
            break;
        case 'blog-details':
            initializeBlogDetailsAnimations();
            break;
        case 'recipe-book':
            initializeRecipeBookAnimations();
            break;
        case 'my-favourites':
            initializeMyFavouritesAnimations();
            break;
        case 'recipe-details':
            initializeRecipeDetailsAnimations();
            break;
        case 'search':
            initializeSearchAnimations();
            break;
        default:
            initializeHomePageAnimations();
    }
}

// ===== HOME PAGE ANIMATIONS =====
function initializeHomePageAnimations() {
    const mainTimeline = gsap.timeline();

    // Banner animation
    mainTimeline
        .from('.banner', {
            duration: 0.7,
            opacity: 0,
            y: -30,
            ease: "power2.out"
        })
        .from('.banner h2', {
            opacity: 0,
            x: -50,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.3");

    // Recipe cards animation 
    gsap.fromTo('.recipe-card', 
        {
            opacity: 0,
            y: 80
        },
        {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.featured',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Recipe content animation 
    gsap.fromTo('.recipe-content', 
        {
            opacity: 0,
            y: 30
        },
        {
            duration: 0.6,
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: "power1.out",
            scrollTrigger: {
                trigger: '.recipe-container',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Featured section title animation
    gsap.fromTo('.featured h3', 
        {
            opacity: 0,
            scale: 0.5,
            y: -30
        },
        {
            duration: 0.8,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.featured',
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===== ABOUT PAGE ANIMATIONS =====
function initializeAboutPageAnimations() {
    const mainTimeline = gsap.timeline();

    // Banner animations
    mainTimeline
        .fromTo('.banner h2', 
            {
                opacity: 0,
                x: -50,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        )
        .fromTo('.banner img',
            {
                opacity: 0,
                rotation: -180,
                scale: 0
            },
            {
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.5)"
            },
            "-=0.4"
        )
        .fromTo('.social-links a',
            {
                opacity: 0,
                y: 30,
                stagger: 0.1
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            },
            "-=0.3"
        );

    // Banner container animation
    gsap.from('.banner', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4
    });

    // About content animations
    gsap.fromTo('.about-heading',
        {
            opacity: 0,
            y: -30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.about-text',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.offer-heading',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: '.offer-heading',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Subscribe section animations
    gsap.fromTo('.subscribe-heading',
        {
            opacity: 0,
            y: -30,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: '.subscribe-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.subscribe-text',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.subscribe-content',
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.form-group',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.subscribe-form',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.join-btn',
        {
            opacity: 0,
            scale: 0.8
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.join-btn',
                start: "top 90%",
                toggleActions: "play none none none"
            }
        }
    );

    // Form input focus animations
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: "0 0 15px rgba(113, 201, 255, 0.5)",
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1,
                boxShadow: "none",
                ease: "power2.out"
            });
        });
    });
}

// ===== BLOG PAGE ANIMATIONS =====
function initializeBlogPageAnimations() {
    if (!document.querySelector('.banner')) return;

    // Blog content animations
    gsap.fromTo('.banner h2', 
        {
            opacity: 0,
            x: -50,
            scale: 0.8
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }
    );

    gsap.fromTo('.banner img', 
        {
            opacity: 0,
            rotation: -180,
            scale: 0
        },
        {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)"
        },
        "-=0.4"
    );
    
    gsap.fromTo('.blog-heading',
        {
            opacity: 0,
            y: -30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.blog-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo('.blog-intro',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.blog-content',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        }
    );

    // Blog posts animations 
    gsap.utils.toArray('.blog-post').forEach((post, index) => {
        gsap.fromTo(post,
            {
                opacity: 0,
                y: 60,
                rotationY: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "back.out(1.2)",
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: post,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Inner elements animation
        const postTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: post,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        postTimeline
            .fromTo(post.querySelector('.post-date'),
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            )
            .fromTo(post.querySelector('.post-title'),
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" },
                "-=0.3"
            )
            .fromTo(post.querySelector('.post-recipe'),
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" },
                "-=0.4"
            )
            .fromTo(post.querySelector('.post-content'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(post.querySelector('.read-more-btn'),
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
                "-=0.2"
            );
    });

    // Hover animations
    document.querySelectorAll('.blog-post').forEach(post => {
        post.addEventListener('mouseenter', () => {
            gsap.to(post, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                ease: "power2.out"
            });
        });

        post.addEventListener('mouseleave', () => {
            gsap.to(post, {
                duration: 0.3,
                scale: 1,
                boxShadow: "none",
                ease: "power2.out"
            });
        });
    });

    // Banner container animation
    gsap.from('.banner', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4
    });
}

// ===== BLOG DETAILS PAGE ANIMATIONS =====
function initializeBlogDetailsAnimations() {
    if (!document.querySelector('.blog-banner')) return;

    // Blog content animation
    const activeBlog = document.querySelector('.blog-details-content:not(.hidden)');
    if (activeBlog) {
        gsap.fromTo('.blog-details-container',
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.5
            }
        );
        
        // Share link animation
        gsap.fromTo('.share',
            {
                opacity: 0,
                scale: 0.5,
                rotation: -180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.7)",
                delay: 1.0
            }
        );

        // Share button hover animation
        const shareButton = document.querySelector('.share');
        if (shareButton) {
            shareButton.addEventListener('mouseenter', () => {
                gsap.to(shareButton, {
                    duration: 0.3,
                    scale: 1.1,
                    y: -5,
                    ease: "power2.out"
                });
            });
            
            shareButton.addEventListener('mouseleave', () => {
                gsap.to(shareButton, {
                    duration: 0.3,
                    scale: 1,
                    y: 0,
                    ease: "power2.out"
                });
            });
        }

        // Stagger animation for blog content
        const blogElements = activeBlog.querySelectorAll('h2, .blog-details-date, .blog-details-recipe, .blog-details-text p, .blog-details-text h3, .blog-details-text ul, .blog-details-text ol, .blog-details-text h4, .read-more-recipe-btn');
        
        gsap.fromTo(blogElements,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.8,
                scrollTrigger: {
                    trigger: '.blog-details-container',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    // Banner container animation
    gsap.from('.blog-banner', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4
    });
}

// ===== RECIPE BOOK PAGE ANIMATIONS =====
function initializeRecipeBookAnimations() {
    // Animate category cards on load
    gsap.fromTo('.category-card', 
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out" 
        }
    );

    // Animate banner
    gsap.fromTo('.banner h2', 
        {
            opacity: 0,
            x: -50,
            scale: 0.8
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }
    );

    gsap.fromTo('.banner img', 
        {
            opacity: 0,
            rotation: -180,
            scale: 0
        },
        {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)"
        },
        "-=0.4"
    );

    // Animate filter section
    gsap.fromTo('.filter-section', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.2, ease: "power2.out" }
    );

    // Floating animation for category cards on hover
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Animate filter buttons on hover
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.2 });
        });
    });
}

// ===== RECIPE DETAILS PAGE ANIMATIONS =====
function initializeRecipeDetailsAnimations() {
    if (!document.querySelector('.recipe-banner')) return;

    const mainTimeline = gsap.timeline();

    // Banner animations
    mainTimeline
        .fromTo('.recipe-banner-content img',
            {
                opacity: 0,
                rotation: -180,
                scale: 0
            },
            {
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        )
        .fromTo('.recipe-banner-content h2',
            {
                opacity: 0,
                x: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.5)"
            },
            "-=0.4"
        );

    // Banner container animation
    gsap.from('.recipe-banner', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4
    });

    // Recipe metadata animations in banner
    gsap.fromTo('.recipe-meta-banner .meta-item',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.8
        }
    );

    // Action links animation
    gsap.fromTo('.links > div',
        {
            opacity: 0,
            scale: 0.5,
            rotation: -180
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 1.0
        }
    );

    // Recipe header animation
    gsap.fromTo('.recipe-header',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.recipe-header',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Recipe image animation
    gsap.fromTo('.recipe-image img',
        {
            opacity: 0,
            scale: 0.8,
            rotationY: 90
        },
        {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: '.recipe-image',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Recipe meta details animation
    gsap.fromTo('.recipe-meta-details .meta-item',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.recipe-meta-details',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Ingredients section animation
    gsap.fromTo('.ingredients-section',
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.ingredients-section',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Ingredients list animation
    gsap.fromTo('#ingredientsList li',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#ingredientsList',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Instructions section animation
    gsap.fromTo('.instructions-section',
        {
            opacity: 0,
            x: 50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.instructions-section',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Instructions list animation
    gsap.fromTo('#instructionsList li',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#instructionsList',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Go back button animation
    gsap.fromTo('.go-back',
        {
            opacity: 0,
            scale: 0,
            rotation: -180
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1.2
        }
    );

    // Scroll to top button animation
    gsap.fromTo('.scroll-top',
        {
            opacity: 0,
            scale: 0,
            rotation: 180
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1.4
        }
    );

    // Hover animations for action buttons
    document.querySelectorAll('.links > div').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.1,
                y: -5,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                y: 0,
                ease: "power2.out"
            });
        });
    });

    // Hover animation for go back button
    const goBackBtn = document.querySelector('.go-back');
    if (goBackBtn) {
        goBackBtn.addEventListener('mouseenter', () => {
            gsap.to(goBackBtn, {
                duration: 0.3,
                scale: 1.1,
                rotation: -10,
                ease: "power2.out"
            });
        });

        goBackBtn.addEventListener('mouseleave', () => {
            gsap.to(goBackBtn, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: "power2.out"
            });
        });
    }

    // Hover animation for scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('mouseenter', () => {
            gsap.to(scrollTopBtn, {
                duration: 0.3,
                scale: 1.1,
                rotation: 10,
                ease: "power2.out"
            });
        });

        scrollTopBtn.addEventListener('mouseleave', () => {
            gsap.to(scrollTopBtn, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: "power2.out"
            });
        });
    }

    createFloatingCookies();
}

// ===== MY FAVOURITES PAGE ANIMATIONS =====
function initializeMyFavouritesAnimations() {
    const mainTimeline = gsap.timeline();

    // Check if banner exists first
    const banner = document.querySelector('.banner');
    if (banner) {
        // Single banner animation to avoid conflicts
        mainTimeline
            .from(banner, {
                duration: 0.7,
                opacity: 0,
                y: -30,
                ease: "power2.out"
            })
            .fromTo('.banner h2', 
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                },
                "-=0.3"
            );

        // Only animate banner image if it exists
        const bannerImg = banner.querySelector('img');
        if (bannerImg) {
            mainTimeline.fromTo(bannerImg,
                {
                    opacity: 0,
                    rotation: -180,
                    scale: 0
                },
                {
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.5)"
                },
                "-=0.4"
            );
        }

        // Only animate subtitle if it exists
        const bannerSubtitle = document.querySelector('.banner-subtitle p');
        if (bannerSubtitle) {
            mainTimeline.fromTo(bannerSubtitle,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.3"
            );
        }
    }

    // Check if empty state exists
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        gsap.from(emptyState, {
            opacity: 0, scale: 0.8 },
            { 
                duration: 0.8, 
                opacity: 1, 
                scale: 1, 
                ease: "back.out(1.5)", 
                delay: 0.6 
            }
        );
    }

    // Check if recipe cards exist
    const recipeCards = document.querySelectorAll('.recipe-card');
    if (recipeCards.length > 0) {
        gsap.from(recipeCards, {
            duration: 0.6,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: "back.out(1.2)",
            delay: 0.5
        });
    }
}


// ===== SEARCH PAGE ANIMATIONS =====
function initializeSearchAnimations() {
    // Animate category cards on load
    gsap.fromTo('.category-card', 
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out" 
        }
    );

    // Animate banner
    gsap.fromTo('.banner h2', 
        {
            opacity: 0,
            x: -50,
            scale: 0.8
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }
    );

    gsap.fromTo('.banner img', 
        {
            opacity: 0,
            rotation: -180,
            scale: 0
        },
        {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)"
        },
        "-=0.4"
    );

    // Animate filter section
    gsap.fromTo('.filter-section', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.2, ease: "power2.out" }
    );

    // Floating animation for category cards on hover
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Animate filter buttons on hover
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.2 });
        });
    });
}

// ===== BANNER ANIMATIONS =====
function animateBanner() {
    const banner = document.querySelector('.banner, .blog-banner');
    if (!banner) return;

    const bannerTimeline = gsap.timeline();

    // For main blog page banner
    const mainBannerTitle = banner.querySelector('.banner h2');
    const mainBannerImg = banner.querySelector('.banner img');
    const mainBannerSubtitle = banner.querySelector('.banner-subtitle p');
    
    // For blog details banner
    const detailsBannerImg = banner.querySelector('.blog-banner-content img');
    const detailsBannerTitle = banner.querySelector('.blog-banner-content h2');
    const shareButton = banner.querySelector('.share');

    if (mainBannerTitle && mainBannerImg) {
        // Main blog page banner animation
        bannerTimeline
            .fromTo(mainBannerTitle, 
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }
            )
            .fromTo(mainBannerImg,
                {
                    opacity: 0,
                    rotation: -180,
                    scale: 0
                },
                {
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.5)"
                },
                "-=0.4"
            );

        if (mainBannerSubtitle) {
            bannerTimeline.fromTo(mainBannerSubtitle,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.3"
            );
        }
    } else if (detailsBannerImg && detailsBannerTitle) {
        // Blog details page banner animation
        bannerTimeline
            .fromTo(detailsBannerImg,
                {
                    opacity: 0,
                    rotation: -180,
                    scale: 0
                },
                {
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }
            )
            .fromTo(detailsBannerTitle,
                {
                    opacity: 0,
                    x: 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.5)"
                },
                "-=0.4"
            );
            
        if (shareButton) {
            bannerTimeline.fromTo(shareButton,
                {
                    opacity: 0,
                    scale: 0,
                    rotation: -180,
                    x: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    x: 0,
                    duration: 0.7,
                    ease: "back.out(1.7)"
                },
                "-=0.3"
            );
        }
    }
}

// ===== FLOATING COOKIES ANIMATION =====
function createFloatingCookies() {
    const banner = document.querySelector('.banner, .blog-banner, .banner-title, .recipe-banner-content, .search-page');
    if (!banner) return;
    
    // Clear existing floating cookies
    const existingCookies = document.querySelectorAll('.floating-cookie');
    existingCookies.forEach(cookie => cookie.remove());
    
    const cookieCount = banner.classList.contains('blog-banner') ? 8 : 6;
    
    for (let i = 0; i < cookieCount; i++) {
        // Create SVG cookie element based on your design
        const cookieSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cookieSvg.setAttribute("class", "floating-cookie");
        cookieSvg.setAttribute("viewBox", "0 0 800 800");
        
        // Random size between 30px and 60px
        const size = 30 + Math.random() * 30;
        cookieSvg.setAttribute("width", size);
        cookieSvg.setAttribute("height", size);
        
        // Create circle based on your SVG structure
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "245");
        circle.setAttribute("cx", "400");
        circle.setAttribute("cy", "400");
        circle.setAttribute("stroke-width", "10");
        
        // Add circle to SVG
        cookieSvg.appendChild(circle);
        
        // Add SVG to banner
        banner.appendChild(cookieSvg);

        // Random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Set initial position
        gsap.set(cookieSvg, {
            left: `${x}%`,
            top: `${y}%`,
            rotation: Math.random() * 360,
            opacity: 0
        });

        // Floating animation
        gsap.to(cookieSvg, {
            opacity: 0.6,
            duration: 3,
            delay: i * 0.5,
            yoyo: true,
            repeat: -1,
            y: banner.classList.contains('blog-banner') ? -20 : -15,
            rotation: 180,
            ease: "sine.inOut"
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function animateNewRecipeCards(startIndex) {
    if (typeof gsap !== 'undefined') {
        const newCards = document.querySelectorAll('.recipe-card');
        const cardsToAnimate = Array.from(newCards).slice(startIndex);
        
        gsap.fromTo(cardsToAnimate, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
        );
    }
}

// ===== GLOBALLY AVAILABLE FUNCTIONS =====
window.createFloatingCookies = createFloatingCookies;
window.animateBanner = animateBanner;
window.animateNewRecipeCards = animateNewRecipeCards;