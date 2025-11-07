// Scroll-to-top function
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

// Subscribe form function
document.addEventListener('DOMContentLoaded', function() {
  const subscribeForm = document.querySelector('.subscribe-form');
  
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = this.querySelector('input[type="text"]');
      const emailInput = this.querySelector('input[type="email"]');
      
      // Simple validation
      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Please fill in all fields before subscribing.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show success message
      alert('Thank you for subscribing to Nibbly! 🎉\n\nWelcome to the Nibblets community! You\'ll receive updates on new recipes and baking tips.');
      
      // Reset form
      this.reset();
    });
  }
});
