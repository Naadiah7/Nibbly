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

// GSAP hover animation for the image
document.addEventListener('DOMContentLoaded', function() {
  scrollBtn.addEventListener('mouseenter', () => {
    gsap.to(scrollBtn, {
      duration: 0.3,
      scale: 1.1,
      rotation: 10,
      ease: "back.out(1.7)"
    });
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    gsap.to(scrollBtn, {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      ease: "power2.out"
    });
  });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Create floating cookies
  createFloatingCookies();

  // Main animation timeline
  const mainTimeline = gsap.timeline();

  // Banner animations
  mainTimeline
    .fromTo('.about-title', 
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
});