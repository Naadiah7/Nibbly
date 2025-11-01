// Scroll-to-top functionality
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {

  gsap.registerPlugin(ScrollTrigger);

  createFloatingCookies();

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

  // Floating cookies animation
  function createFloatingCookies() {
    const banner = document.querySelector('.banner');
    
    for (let i = 0; i < 6; i++) {
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
        y: -15,
        rotation: 180,
        ease: "sine.inOut"
      });
    }
  }
  
  // Navigation animations
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
});