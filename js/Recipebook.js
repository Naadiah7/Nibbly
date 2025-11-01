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

// Recipe Book Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize recipe data
  const recipes = {
    cakes: [
      {
        id: 1,
        title: "Classic Vanilla Cake",
        description: "A light and fluffy vanilla cake perfect for any celebration.",
        image: "../Images/vanilla-cake.jpg",
        prepTime: "30 mins",
        cookTime: "35 mins"
      },
      {
        id: 2,
        title: "Chocolate Fudge Cake",
        description: "Rich and decadent chocolate cake with fudge frosting.",
        image: "../Images/chocolate-cake.jpg",
        prepTime: "25 mins",
        cookTime: "40 mins"
      }
    ],
    cheesecakes: [
      {
        id: 3,
        title: "New York Cheesecake",
        description: "Creamy and dense classic New York style cheesecake.",
        image: "../Images/ny-cheesecake.jpg",
        prepTime: "20 mins",
        cookTime: "60 mins"
      },
      {
        id: 4,
        title: "Blueberry Cheesecake",
        description: "Smooth cheesecake with a fresh blueberry topping.",
        image: "../Images/blueberry-cheesecake.jpg",
        prepTime: "25 mins",
        cookTime: "55 mins"
      }
    ],
    cookies: [
      {
        id: 5,
        title: "Chocolate Chip Cookies",
        description: "Classic cookies with melty chocolate chips.",
        image: "../Images/choc-chip-cookies.jpg",
        prepTime: "15 mins",
        cookTime: "12 mins"
      },
      {
        id: 6,
        title: "Oatmeal Raisin Cookies",
        description: "Hearty cookies with oats and sweet raisins.",
        image: "../Images/oatmeal-cookies.jpg",
        prepTime: "20 mins",
        cookTime: "15 mins"
      }
    ],
    pastries: [
      {
        id: 7,
        title: "Apple Turnovers",
        description: "Flaky pastry filled with spiced apple filling.",
        image: "../Images/apple-turnovers.jpg",
        prepTime: "30 mins",
        cookTime: "25 mins"
      },
      {
        id: 8,
        title: "Cream Puffs",
        description: "Light choux pastry filled with vanilla cream.",
        image: "../Images/cream-puffs.jpg",
        prepTime: "40 mins",
        cookTime: "30 mins"
      }
    ],
    breakfast: [
      {
        id: 9,
        title: "Blueberry Pancakes",
        description: "Fluffy pancakes bursting with fresh blueberries.",
        image: "../Images/blueberry-pancakes.jpg",
        prepTime: "10 mins",
        cookTime: "15 mins"
      },
      {
        id: 10,
        title: "Cinnamon Rolls",
        description: "Soft rolls with cinnamon sugar and cream cheese frosting.",
        image: "../Images/cinnamon-rolls.jpg",
        prepTime: "25 mins",
        cookTime: "25 mins"
      }
    ],
    cupcakes: [
      {
        id: 11,
        title: "Red Velvet Cupcakes",
        description: "Moist red velvet cupcakes with cream cheese frosting.",
        image: "../Images/red-velvet-cupcakes.jpg",
        prepTime: "20 mins",
        cookTime: "20 mins"
      },
      {
        id: 12,
        title: "Lemon Cupcakes",
        description: "Zesty lemon cupcakes with tangy lemon buttercream.",
        image: "../Images/lemon-cupcakes.jpg",
        prepTime: "25 mins",
        cookTime: "18 mins"
      }
    ]
  };

  // DOM Elements
  const categoryCards = document.querySelectorAll('.category-card');
  const recipeGrid = document.getElementById('recipeGrid');
  const recipeSearch = document.getElementById('recipeSearch');
  const searchBtn = document.getElementById('searchBtn');
  const resultsTitle = document.getElementById('results-title');

  // Display featured recipes on load
  displayFeaturedRecipes();

  // Category card click event
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      displayRecipesByCategory(category);
    });
  });

  // Search functionality
  searchBtn.addEventListener('click', performSearch);
  recipeSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Function to display featured recipes
  function displayFeaturedRecipes() {
    resultsTitle.textContent = "Featured Recipes";
    recipeGrid.innerHTML = '';
    
    // Get a mix of recipes from different categories
    const featuredRecipes = [];
    Object.keys(recipes).forEach(category => {
      if (recipes[category].length > 0) {
        featuredRecipes.push(recipes[category][0]);
      }
    });
    
    featuredRecipes.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      recipeGrid.appendChild(recipeCard);
    });
  }

  // Function to display recipes by category
  function displayRecipesByCategory(category) {
    resultsTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`;
    recipeGrid.innerHTML = '';
    
    if (recipes[category]) {
      recipes[category].forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
      });
    }
  }

  // Function to perform search
  function performSearch() {
    const searchTerm = recipeSearch.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      displayFeaturedRecipes();
      return;
    }
    
    resultsTitle.textContent = `Search Results for "${searchTerm}"`;
    recipeGrid.innerHTML = '';
    
    let foundRecipes = [];
    
    // Search through all recipes
    Object.keys(recipes).forEach(category => {
      recipes[category].forEach(recipe => {
        if (recipe.title.toLowerCase().includes(searchTerm) || 
            recipe.description.toLowerCase().includes(searchTerm)) {
          foundRecipes.push(recipe);
        }
      });
    });
    
    if (foundRecipes.length === 0) {
      recipeGrid.innerHTML = '<p class="no-results">No recipes found. Try a different search term.</p>';
    } else {
      foundRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
      });
    }
  }

  // Function to create a recipe card
  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
      <div class="recipe-info">
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-meta">
          <span>Prep: ${recipe.prepTime}</span>
          <span>Cook: ${recipe.cookTime}</span>
        </div>
        <a href="recipe-details.html?id=${recipe.id}" class="view-recipe-btn">View Recipe</a>
      </div>
    `;
    
    return card;
  }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  createFloatingCookies();

  const mainTimeline = gsap.timeline();

  // Banner animations
  mainTimeline
    .fromTo('.banner h2', 
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
    
    // Banner animation
    gsap.from('.banner', {
      duration: 0.7,
      opacity: 0,
      y: -30,
      ease: "power2.out",
      delay: 0.4
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