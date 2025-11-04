// Scroll-to-top functionality
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
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
}

// Function to get URL parameters (for BlogDetails.html)
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Blog Details function
function initializeBlogDetails() {
  const blogId = getUrlParameter('id');
  
  // Hide all blog content sections
  const allBlogs = document.querySelectorAll('.blog-details-content');
  allBlogs.forEach(blog => {
    blog.classList.add('hidden');
  });
  
  // Hide all banner content
  const allBanners = document.querySelectorAll('.blog-banner-content');
  allBanners.forEach(banner => {
    banner.classList.add('hidden');
  });
  
  // Show the requested blog and its banner
  if (blogId) {
    if (document.getElementById(blogId)) {
      document.getElementById(blogId).classList.remove('hidden');
    }
    if (document.getElementById(blogId + '-banner')) {
      document.getElementById(blogId + '-banner').classList.remove('hidden');
    }
  } else {
    // Default to first blog if no valid ID is provided
    if (document.getElementById('blog1')) {
      document.getElementById('blog1').classList.remove('hidden');
    }
    if (document.getElementById('blog1-banner')) {
      document.getElementById('blog1-banner').classList.remove('hidden');
    }
  }
}

// Floating cookies animation function for both pages
function createFloatingCookies() {
  const banner = document.querySelector('.banner, .blog-banner');
  if (!banner) return;
  
  // Clear existing floating cookies
  const existingCookies = document.querySelectorAll('.floating-cookie');
  existingCookies.forEach(cookie => cookie.remove());
  
  for (let i = 0; i < 8; i++) {
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
      y: -20,
      rotation: 180,
      ease: "sine.inOut"
    });
  }
}

// Banner animation function for both pages
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

// GSAP Animations for Blog.html
function initializeBlogAnimations() {
  if (!document.querySelector('.banner')) return; // Only run if on blog main page

  gsap.registerPlugin(ScrollTrigger);

  createFloatingCookies();
  animateBanner();

  const mainTimeline = gsap.timeline();

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

  // Banner container animation
  gsap.from('.banner', {
    duration: 0.7,
    opacity: 0,
    y: -30,
    ease: "power2.out",
    delay: 0.4
  });
}

// GSAP Animations for BlogDetails.html
function initializeBlogDetailsAnimations() {
  if (!document.querySelector('.blog-banner')) return; // Only run if on blog details page

  gsap.registerPlugin(ScrollTrigger);

  createFloatingCookies();
  animateBanner();

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
    const blogElements = activeBlog.querySelectorAll('h2, .blog-details-date, .blog-details-recipe, .blog-details-text p, .blog-details-text h3, .blog-details-text ul, .blog-details-text ol, .blog-details-text h4');
    
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

  // Banner container animation
  gsap.from('.blog-banner', {
    duration: 0.7,
    opacity: 0,
    y: -30,
    ease: "power2.out",
    delay: 0.4
  });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll-to-top functionality
  if (scrollBtn) {
    window.onscroll();
  }
  
  // if we're on BlogDetails.html and initialize blog details
  if (document.querySelector('.blog-details-content')) {
    initializeBlogDetails();
    
    // Initialize animations for blog details page
    if (typeof gsap !== 'undefined') {
      initializeBlogDetailsAnimations();
    }
  }
  
  // if we're on Blog.html and initialize animations
  if (document.querySelector('.banner') && typeof gsap !== 'undefined') {
    initializeBlogAnimations();
  }
});