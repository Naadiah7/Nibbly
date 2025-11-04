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

// Blog data object containing all blog details
const blogData = {
  blog1: {
    title: "Wake Up to Flavor",
    date: "1 September 2025",
    recipe: "Easy Cappuccino Muffins Recipe",
    image: "../Images/capmuffin.png",
    alt: "Cappuccino Muffins",
    content: `
      <p>Start your morning with these delightful cappuccino muffins that combine the rich flavor of coffee with soft, moist muffin texture. Perfect for breakfast or as an afternoon pick-me-up.</p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>2 cups all-purpose flour</li>
        <li>1/2 cup granulated sugar</li>
        <li>1/4 cup brown sugar</li>
        <li>2 tsp baking powder</li>
        <li>1/2 tsp salt</li>
        <li>1 tbsp instant coffee granules</li>
        <li>1 cup milk</li>
        <li>1/2 cup unsalted butter, melted</li>
        <li>1 large egg</li>
        <li>1 tsp vanilla extract</li>
      </ul>
      
      <h3>Instructions:</h3>
      <ol>
        <li>Preheat oven to 375°F (190°C) and line a muffin tin with paper liners.</li>
        <li>In a large bowl, whisk together flour, sugars, baking powder, salt, and instant coffee.</li>
        <li>In another bowl, mix milk, melted butter, egg, and vanilla extract.</li>
        <li>Combine wet and dry ingredients, stirring until just mixed (do not overmix).</li>
        <li>Divide batter evenly among muffin cups, filling each about 2/3 full.</li>
        <li>Bake for 18-20 minutes or until a toothpick inserted comes out clean.</li>
        <li>Cool in pan for 5 minutes, then transfer to a wire rack to cool completely.</li>
      </ol>
      
      <h3>Tips:</h3>
      <p>For an extra coffee kick, dissolve the instant coffee in 1 tablespoon of hot water before adding to the wet ingredients. You can also add chocolate chips or nuts for texture variation.</p>
    `
  },
  blog2: {
    title: "Classic Indulgence",
    date: "8 September 2025",
    recipe: "Red Velvet Cupcakes with Cream Cheese Frosting Recipe",
    image: "../Images/redvelvet.png",
    alt: "Red Velvet Cupcakes",
    content: `
      <p>Discover the secrets to creating perfect red velvet cupcakes with our step-by-step guide. Learn how to achieve that signature velvety texture and rich color.</p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>2 1/2 cups all-purpose flour</li>
        <li>1 1/2 cups granulated sugar</li>
        <li>1 tsp baking soda</li>
        <li>1 tsp salt</li>
        <li>1 tsp cocoa powder</li>
        <li>1 1/2 cups vegetable oil</li>
        <li>1 cup buttermilk</li>
        <li>2 large eggs</li>
        <li>2 tbsp red food coloring</li>
        <li>1 tsp white vinegar</li>
        <li>1 tsp vanilla extract</li>
      </ul>
      
      <h3>Cream Cheese Frosting:</h3>
      <ul>
        <li>8 oz cream cheese, softened</li>
        <li>1/2 cup unsalted butter, softened</li>
        <li>4 cups powdered sugar</li>
        <li>1 tsp vanilla extract</li>
      </ul>
      
      <h3>Instructions:</h3>
      <ol>
        <li>Preheat oven to 350°F (175°C) and line a muffin tin with paper liners.</li>
        <li>In a medium bowl, whisk together flour, sugar, baking soda, salt, and cocoa powder.</li>
        <li>In a large bowl, mix oil, buttermilk, eggs, food coloring, vinegar, and vanilla.</li>
        <li>Gradually add dry ingredients to wet ingredients, mixing until smooth.</li>
        <li>Divide batter evenly among muffin cups, filling each about 2/3 full.</li>
        <li>Bake for 18-20 minutes or until a toothpick inserted comes out clean.</li>
        <li>Cool completely before frosting.</li>
      </ol>
      
      <h3>For the Frosting:</h3>
      <ol>
        <li>Beat cream cheese and butter until smooth and creamy.</li>
        <li>Gradually add powdered sugar and vanilla, beating until light and fluffy.</li>
        <li>Frost cooled cupcakes and enjoy!</li>
      </ol>
      
      <h3>Tips:</h3>
      <p>For the best red color, use gel food coloring rather than liquid. Don't overmix the batter once the dry ingredients are added to maintain the tender texture.</p>
    `
  },
  blog3: {
    title: "A Slice of Berry Bliss",
    date: "15 September 2025",
    recipe: "Creamy Berry Cheesecake Recipe",
    image: "../Images/Cheesecake.png",
    alt: "Berry Cheesecake",
    content: `
      <p>Indulge in this creamy berry cheesecake that combines a buttery biscuit base with smooth cream cheese filling and fresh blueberry topping. A true crowd-pleaser!</p>
      
      <h3>Ingredients:</h3>
      
      <h4>Crust:</h4>
      <ul>
        <li>2 cups graham cracker crumbs</li>
        <li>1/2 cup unsalted butter, melted</li>
        <li>1/4 cup granulated sugar</li>
      </ul>
      
      <h4>Filling:</h4>
      <ul>
        <li>24 oz cream cheese, softened</li>
        <li>1 cup granulated sugar</li>
        <li>1 cup sour cream</li>
        <li>3 large eggs</li>
        <li>1 tsp vanilla extract</li>
        <li>2 tbsp all-purpose flour</li>
      </ul>
      
      <h4>Blueberry Topping:</h4>
      <ul>
        <li>2 cups fresh blueberries</li>
        <li>1/4 cup granulated sugar</li>
        <li>1 tbsp cornstarch</li>
        <li>1 tbsp lemon juice</li>
        <li>1/4 cup water</li>
      </ul>
      
      <h3>Instructions:</h3>
      <ol>
        <li>Preheat oven to 325°F (160°C).</li>
        <li>Mix graham cracker crumbs, melted butter, and sugar. Press into the bottom of a 9-inch springform pan.</li>
        <li>Bake crust for 10 minutes, then remove from oven and let cool.</li>
        <li>In a large bowl, beat cream cheese and sugar until smooth.</li>
        <li>Add sour cream, eggs (one at a time), vanilla, and flour, mixing until just combined.</li>
        <li>Pour filling over the crust and smooth the top.</li>
        <li>Bake for 50-60 minutes or until the center is almost set.</li>
        <li>Turn off the oven and let the cheesecake cool in the oven with the door slightly ajar for 1 hour.</li>
        <li>Refrigerate for at least 4 hours or overnight.</li>
      </ol>
      
      <h3>For the Blueberry Topping:</h3>
      <ol>
        <li>In a saucepan, combine blueberries, sugar, cornstarch, lemon juice, and water.</li>
        <li>Cook over medium heat, stirring constantly, until the mixture thickens and blueberries release their juices.</li>
        <li>Cool completely before spreading over the chilled cheesecake.</li>
      </ol>
      
      <h3>Tips:</h3>
      <p>Make sure all ingredients are at room temperature before mixing to prevent lumps in the filling. For a perfectly smooth top, run a knife around the edge of the cheesecake after baking before cooling.</p>
    `
  }
};

// Function to create blog banner content
function createBlogBanner(blogId, blogData) {
  const bannerContent = document.createElement('div');
  bannerContent.id = `${blogId}-banner`;
  bannerContent.className = 'blog-banner-content hidden';
  
  const img = document.createElement('img');
  img.src = blogData.image;
  img.alt = blogData.alt;
  
  const title = document.createElement('h2');
  title.textContent = blogData.title;
  
  bannerContent.appendChild(img);
  bannerContent.appendChild(title);
  
  return bannerContent;
}

// Function to create blog details content
function createBlogDetails(blogId, blogData) {
  const article = document.createElement('article');
  article.id = blogId;
  article.className = 'blog-details-content hidden';
  
  const date = document.createElement('div');
  date.className = 'blog-details-date';
  date.textContent = blogData.date;
  
  const recipe = document.createElement('p');
  recipe.className = 'blog-details-recipe';
  recipe.textContent = blogData.recipe;
  
  const textContent = document.createElement('div');
  textContent.className = 'blog-details-text';
  textContent.innerHTML = blogData.content;
  
  article.appendChild(date);
  article.appendChild(recipe);
  article.appendChild(textContent);
  
  return article;
}

// Blog Details function
function initializeBlogDetails() {
  const blogId = getUrlParameter('id');
  const blogBannerSection = document.querySelector('.blog-banner');
  const blogDetailsContainer = document.querySelector('.blog-details-container');
  
  // Clear existing content
  if (blogBannerSection) blogBannerSection.innerHTML = '';
  if (blogDetailsContainer) blogDetailsContainer.innerHTML = '';
  
  // Create and append all blog banners and details
  Object.keys(blogData).forEach(id => {
    const banner = createBlogBanner(id, blogData[id]);
    const details = createBlogDetails(id, blogData[id]);
    
    if (blogBannerSection) blogBannerSection.appendChild(banner);
    if (blogDetailsContainer) blogDetailsContainer.appendChild(details);
  });
  
  // Show the requested blog and its banner
  const selectedBlogId = blogId && blogData[blogId] ? blogId : 'blog1';
  
  if (document.getElementById(selectedBlogId)) {
    document.getElementById(selectedBlogId).classList.remove('hidden');
  }
  if (document.getElementById(selectedBlogId + '-banner')) {
    document.getElementById(selectedBlogId + '-banner').classList.remove('hidden');
  }
}

// Function to get URL parameters (for BlogDetails.html)
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
  
// If we're on BlogDetails.html by looking for the container
  if (document.querySelector('.blog-details-container')) {
    initializeBlogDetails();
    
    // Initialize animations for blog details page
    if (typeof gsap !== 'undefined') {
      // Add a small delay to ensure DOM is fully created before animating
      setTimeout(() => {
        initializeBlogDetailsAnimations();
      }, 100);
    }
  }
  
  // If we're on Blog.html and initialize animations
  if (document.querySelector('.banner') && typeof gsap !== 'undefined') {
    initializeBlogAnimations();
  }
});