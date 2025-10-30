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


//GSAP Animations
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
