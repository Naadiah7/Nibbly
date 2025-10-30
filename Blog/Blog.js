// Scroll-to-top button functionality
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

  // Create floating elements for background animation
  createFloatingElements();

  // Main animation timeline
  const mainTimeline = gsap.timeline();

  // Header animations
  mainTimeline
    .fromTo('.blog-main-title', 
      {
        opacity: 0,
        y: -50,
        rotationX: 90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }
    )
    .fromTo('.blog-subtitle',
      {
        opacity: 0,
        y: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    );

  // Blog cards animations with ScrollTrigger
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
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );

    // Staggered animation for inner elements of each blog post
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
      .fromTo(post.querySelector('.blog-title'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.3"
      )
      .fromTo(post.querySelector('.blog-recipe'),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.4"
      )
      .fromTo(post.querySelector('.blog-content'),
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

  // Hover animations for blog posts
  document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('mouseenter', () => {
      gsap.to(post, {
        duration: 0.3,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        ease: "power2.out"
      });

      // Bounce the read more button on hover
      gsap.to(post.querySelector('.read-more-btn'), {
        duration: 0.3,
        scale: 1.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    });

    post.addEventListener('mouseleave', () => {
      gsap.to(post, {
        duration: 0.3,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        ease: "power2.out"
      });
    });
  });

  // Floating elements animation
  function createFloatingElements() {
    const header = document.querySelector('.blog-header');
    const floatingElements = ['cookie', 'muffin', 'cookie', 'muffin'];
    
    floatingElements.forEach((type, index) => {
      const element = document.createElement('div');
      element.className = `floating-element ${type}`;
      header.appendChild(element);

      // Random positions
      const x = 10 + (Math.random() * 80);
      const y = 20 + (Math.random() * 60);

      gsap.set(element, {
        left: `${x}%`,
        top: `${y}%`
      });

      // Floating animation
      gsap.to(element, {
        opacity: 0.3,
        duration: 2,
        delay: index * 0.5,
        yoyo: true,
        repeat: -1,
        y: -20,
        rotation: 360,
        ease: "sine.inOut"
      });
    });
  }

  // Page load animation for navigation items
  gsap.from('#Navtop li', {
    duration: 0.6,
    opacity: 0,
    y: -20,
    stagger: 0.1,
    ease: "back.out(1.2)",
    delay: 0.5
  });

  // Logo animation
  gsap.from('#logo', {
    duration: 0.8,
    rotation: 360,
    scale: 0,
    ease: "back.out(1.7)",
    delay: 0.3
  });
});