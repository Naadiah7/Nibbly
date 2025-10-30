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
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Create floating elements
  createFloatingElements();

  // Main animation timeline
  const mainTimeline = gsap.timeline();

  // Banner animations
  mainTimeline
    .fromTo('.blog-title', 
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

  // Blog content animations
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
      .fromTo(post.querySelector('.blog-date'),
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

  // Floating elements animation
  function createFloatingElements() {
    const banner = document.querySelector('.banner');
    
    for (let i = 0; i < 6; i++) {
      const element = document.createElement('div');
      element.className = `floating-element ${i % 2 === 0 ? 'cookie' : 'muffin'}`;
      banner.appendChild(element);

      // Random positions
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      gsap.set(element, {
        left: `${x}%`,
        top: `${y}%`
      });

      // Floating animation
      gsap.to(element, {
        opacity: 0.3,
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