// Scroll-to-top functionality
/*const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});*/


//GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  createFloatingCookies();

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
    }, "-=0.3")

  // Navigation animations
  mainTimeline.from('#Navtop li', {
    duration: 0.6,
    opacity: 0,
    y: -20,
    stagger: 0.1,
    ease: "back.out(1.2)"
  }, "-=0.5")

  // Logo animation
  mainTimeline.from('#logo', {
    duration: 0.8,
    rotation: 360,
    scale: 0,
    ease: "back.out(1.7)"
  }, "-=0.4")

  // To initialize the recipe cards visibility
  gsap.set('.recipe-card', {
    opacity: 1,
    y: 0,
    visibility: 'visible'
  });

  gsap.set('.recipe-content', {
    opacity: 1,
    y: 0,
    visibility: 'visible'
  });

  gsap.set('.featured h3', {
    opacity: 1,
    scale: 1,
    y: 0,
    visibility: 'visible'
  });

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
});

  // Floating cookies animation
  function createFloatingCookies() {
    const banner = document.querySelector('.banner-title');
    
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


