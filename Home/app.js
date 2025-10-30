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

// GSAP Animations with MotionPath
document.addEventListener('DOMContentLoaded', function() {
  // Register MotionPath plugin
  gsap.registerPlugin(MotionPathPlugin);

  // Split text into characters for animation
  const titleElement = document.querySelector('.banner-title');
  const text = titleElement.textContent;
  titleElement.textContent = '';
  
  // Create characters with spans
  for (let i = 0; i < text.length; i++) {
    const char = document.createElement('span');
    char.className = 'char';
    char.textContent = text[i];
    char.style.display = 'inline-block';
    titleElement.appendChild(char);
  }

  // Create bite marks SVG
  createBiteMarks();

  // Main title animation timeline
  const mainTimeline = gsap.timeline();

  // Motion Path animation for the title
  mainTimeline
    // Initial motion path entrance
    .fromTo('.banner-title', 
      {
        opacity: 0,
        scale: 0.5,
        rotation: -5
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }
    )
    // Letter-by-letter animation
    .fromTo('.banner-title .char',
      {
        opacity: 0,
        y: 20,
        rotationY: 90
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      },
      "-=0.5" // Overlap with previous animation
    )
    // Bounce effect
    .to('.banner-title', {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    })
    .to('.banner-title', {
      y: 0,
      duration: 0.3,
      ease: "bounce.out"
    })
    // Add floating class for continuous animation
    .add(() => {
      titleElement.classList.add('floating');
    })
    // Sparkle effects
    .add(createSparkles, "-=0.5");

  // Create bite marks around the title
  function createBiteMarks() {
    const banner = document.querySelector('.banner');
    const biteMarksContainer = document.createElement('div');
    biteMarksContainer.className = 'bite-marks';
    banner.appendChild(biteMarksContainer);

    // Create multiple bite mark SVGs
    for (let i = 0; i < 8; i++) {
      const biteMark = document.createElement('div');
      biteMark.className = 'bite-mark';
      biteMark.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M10,2 Q12,0 14,2 Q16,4 14,6 Q12,8 10,6 Q8,4 10,2 Z" 
                fill="#FF6B6B" stroke="#FF8E8E" stroke-width="0.5"/>
        </svg>
      `;
      biteMarksContainer.appendChild(biteMark);

      // Random positions around the title
      const angle = (i / 8) * Math.PI * 2;
      const radius = 60;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;

      gsap.set(biteMark, {
        left: `${x}%`,
        top: `${y}%`,
        rotation: Math.random() * 360
      });

      // Animate bite marks appearing
      mainTimeline.to(biteMark, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: 0.8 + (i * 0.1),
        ease: "back.out(1.5)"
      }, "-=0.5");
    }
  }

  // Create sparkling effects
  function createSparkles() {
    const banner = document.querySelector('.banner');
    
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      banner.appendChild(sparkle);


      const x = Math.random() * 100;
      const y = Math.random() * 100;

      gsap.set(sparkle, {
        left: `${x}%`,
        top: `${y}%`
      });

      gsap.to(sparkle, {
        opacity: 1,
        scale: 1.5,
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        repeatDelay: Math.random() * 2,
        ease: "power2.inOut"
      });
    }
  }

  // Additional motion path animation on hover
  titleElement.addEventListener('mouseenter', () => {
    gsap.to('.banner-title', {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    createSparkles();
  });

  // Animate recipe cards
  gsap.from('.recipe-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "back.out(1.7)",
    delay: 2.5, 
    scrollTrigger: {
      trigger: '.featured',
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

window.addEventListener('resize', function() {
  const title = document.querySelector('.banner-title');
  if (title && window.innerWidth < 768) {
    gsap.set(title, { fontSize: '16px' });
  }
});