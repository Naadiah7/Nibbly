// GSAP Animations for All Pages

document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize common animations
        initializeCommonAnimations();
        
        // Page-specific animations based on current page
        initializePageSpecificAnimations();
    }
});

// Common animations used across pages
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

// Page-specific animations
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
        default:
            initializeHomePageAnimations();
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('About.html')) return 'about';
    if (path.includes('Blog.html')) return 'blog';
    if (path.includes('BlogDetails.html')) return 'blog-details';
    if (path.includes('Recipebook.html')) return 'recipe-book';
    if (path.includes('Myfavourites.html')) return 'my-favourites';
    if (path.includes('Recipedetails.html')) return 'recipe-details';
    return 'home'; 
}

// --- Home Page Animations --- 
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
                toggleActions: 'play none none none', 
                markers: false 
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
                toggleActions: 'play none none none',
                markers: false
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
                toggleActions: 'play none none none',
                markers: false
            }
        }
    );
}

// --- About Page Animations ---
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

// --- Blog Page Animations --- 
function initializeBlogPageAnimations() {
    if (!document.querySelector('.banner')) return;

    // Blog content animations
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

// --- Blog Details Page Animations ---
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

// Banner Animations Functions used for blog pages 
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
    }
}

// --- Recipe Book Page Animations ---
function initializeRecipeBookAnimations() {
    // Animate category cards on load
    gsap.fromTo('.category-card', 
        { opacity: 0, 
            y: 30 
        },
        { opacity: 1, 
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

// My Favourites Page Animations
function initializeMyFavouritesAnimations() {
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
        .fromTo('.banner-subtitle p',
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

    // Banner animation
    gsap.from('.banner', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4
    });

    // Empty state animation
    gsap.from('.empty-state', {
        duration: 0.8,
        opacity: 0,
        scale: 0.8,
        ease: "back.out(1.5)",
        delay: 0.6
    });

    // Recipe cards animation
    gsap.from('.recipe-card', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.5
    });
}


// RECIPE DETAILS PAGE ANIMATIONS

function initializeRecipeDetailsAnimations() {

}

// --- Floating Cookies Animation ---
function createFloatingCookies() {
    const banner = document.querySelector('.banner, .blog-banner, .banner-title, .search-page');
    if (!banner) return;
    
    // Clear existing floating cookies
    const existingCookies = document.querySelectorAll('.floating-cookie');
    existingCookies.forEach(cookie => cookie.remove());
    
    const cookieCount = banner.classList.contains('blog-banner') ? 8 : 6;
    
    for (let i = 0; i < cookieCount; i++) {
        const cookie = document.createElement('div');
        cookie.className = 'floating-cookie';
        banner.appendChild(cookie);

        // Random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        gsap.set(cookie, {
            left: `${x}%`,
            top: `${y}%`
        });

        // Floating animation
        gsap.to(cookie, {
            opacity: 0.4,
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

// Utility function to animate new recipe cards
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

// globally available functions
window.createFloatingCookies = createFloatingCookies;
window.animateBanner = animateBanner;
window.animateNewRecipeCards = animateNewRecipeCards;

