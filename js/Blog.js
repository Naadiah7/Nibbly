// Scroll-to-top function
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
    recipeId: "10",
    content: `
      <p>Calling all coffee lovers! Have you ever wished you could eat your morning cappuccino? Well, consider this your wake-up call. The cappuccino muffin is here to transform your coffee break into a truly immersive experience.

      This isn't a cloyingly sweet, cake-disguised-as-a-muffin situation. This is a sophisticated bake, designed for those who appreciate the rich, robust depth of a good espresso. The base is tender and moist, infused with a generous dose of coffee that ensures the flavor is in every single bite. You'll even see the beautiful specks of espresso grounds throughout, a promise of the genuine article.

      And what's a cappuccino without its foam? We achieve that with a generous scattering of buttery cinnamon streusel on top. It bakes up into a crunchy, crumbly, sweet crust that perfectly mimics the frothy top of your favorite coffeehouse drink.

      It's the ultimate grab-and-go breakfast that doesn't compromise on flavor. Pair it with your morning cup for a double dose of coziness, or enjoy it as the perfect afternoon perk-me-up. It's a little bit indulgent, a whole lot satisfying, and entirely for you.</p>

      <h3>Some Tips:</h3>
      <p>For an extra coffee kick, dissolve the instant coffee in 1 tablespoon of hot water before adding to the wet ingredients. You can also add chocolate chips or nuts for texture variation.</p>
    `
  },
  blog2: {
    title: "Classic Indulgence",
    date: "8 September 2025",
    recipe: "Red Velvet Cupcakes with Cream Cheese Frosting Recipe",
    image: "../Images/redvelvet.png",
    alt: "Red Velvet Cupcakes",
    recipeId: "3",
    content: `
      <p>There are desserts that you eat, and then there are desserts that you experience. The red velvet cupcake sits firmly in the latter category. It's more than just a treat; it's a tiny, edible declaration of love and celebration.

      What I've always found so captivating about red velvet isn't just its bold, dramatic color. It's the subtlety of its flavor—a whisper of cocoa, a tang from the buttermilk, and that uniquely soft, "velvet" crumb that feels luxurious on the tongue. It's a complex dance of flavors that a standard chocolate cake can't quite replicate.

      But let's be real: the true soulmate to this scarlet cake is its flawless partner, the cream cheese frosting. That cool, tangy, impossibly creamy topping is the perfect counterpoint to the cake's gentle sweetness. The visual contrast alone—snow-white frosting against a passionate red backdrop—is enough to make your heart skip a beat.

      Baking these is like creating little masterpieces. They're for the moments that matter, the days that need a splash of joy, or when you simply want to say "you are special" in the most delicious way possible.</p>
      
      <h3>Some Tips:</h3>
      <p>For the best red color, use gel food coloring rather than liquid. Don't overmix the batter once the dry ingredients are added to maintain the tender texture.</p>
    `
  },
  blog3: {
    title: "A Slice of Berry Bliss",
    date: "15 September 2025",
    recipe: "Creamy Berry Cheesecake Recipe",
    image: "../Images/Cheesecake.png",
    alt: "Berry Cheesecake",
    recipeId: "1",
    content: `
      <p>When the sun is high and the air is warm, the last thing anyone wants to do is heat up the kitchen. But that doesn't mean you have to sacrifice a spectacular dessert. Enter the hero of the summer: the no-bake berry cheesecake.

      This dessert is a dream of contrasts. It starts with a simple, crisp biscuit base that provides the essential crunch. Then, the filling—oh, the filling! It's a cloud of creamy, tangy, velvety smooth cheesecake that sets perfectly in the chill of the fridge, no oven required. It's rich, yet somehow feels light and refreshing.

      The real showstopper, though, is the glistening, jewel-toned berry topping. A vibrant mix of raspberries, blueberries, and blackberries, artfully arranged and often glazed with a shiny finish, creates a mosaic that looks almost too beautiful to eat. It's a burst of fresh, bright flavor that cuts through the richness of the cream cheese filling in the most perfect way.

      This cheesecake is your secret weapon for effortless entertaining. It's cool, stunning, and can be made ahead of time, taking the stress out of hosting. It's the taste of summer on a fork—pure, simple, and utterly delightful.</p>
      
      <h3>Some Tips:</h3>
      <p>Make sure all ingredients are at room temperature before mixing to prevent lumps in the filling. For the best texture and stability, it is recommended to chill it for at least 6-8 hours or overnight before serving. </p>
    `
  }
};

// Function to navigate to recipe from blog
window.viewRecipeFromBlog = function(recipeId) {
    console.log('View Recipe from Blog clicked:', recipeId);
    
    // Store the recipe ID and source for the recipe details page
    sessionStorage.setItem('currentRecipeId', recipeId.toString());
    sessionStorage.setItem('recipeSource', 'local');
    
    // Navigate to recipe details page
    window.location.href = 'recipedetails.html';
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
  

  const readMoreBtn = document.createElement('a');
  readMoreBtn.className = 'read-more-recipe-btn';
  readMoreBtn.textContent = 'Read Recipe';
  readMoreBtn.onclick = function() {
    viewRecipeFromBlog(blogData.recipeId);
  };
  
  article.appendChild(date);
  article.appendChild(recipe);
  article.appendChild(textContent);
  article.appendChild(readMoreBtn);
  
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

// Function to get URL parameters - BlogDetails Page
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
  }
});