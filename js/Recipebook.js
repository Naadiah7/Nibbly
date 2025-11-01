// Recipe Book - Combined JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollToTop();
    initializeRecipeSearch();
    initializeGSAPAnimations();
});

// Scroll-to-top functionality
function initializeScrollToTop() {
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
}

// Recipe Search and Filtering Functionality
function initializeRecipeSearch() {
    // Recipe data with enhanced metadata for filtering
    const recipes = {
        cakes: [
            {
                id: 1,
                title: "Classic Vanilla Cake",
                description: "A light and fluffy vanilla cake perfect for any celebration.",
                image: "../Images/vanilla-cake.jpg",
                prepTime: "30 mins",
                cookTime: "35 mins",
                totalTime: 65,
                category: "cakes",
                diet: ["vegetarian"],
                ingredients: ["flour", "sugar", "eggs", "vanilla", "butter", "milk", "baking powder"]
            },
            {
                id: 2,
                title: "Chocolate Fudge Cake",
                description: "Rich and decadent chocolate cake with fudge frosting.",
                image: "../Images/chocolate-cake.jpg",
                prepTime: "25 mins",
                cookTime: "40 mins",
                totalTime: 65,
                category: "cakes",
                diet: ["vegetarian"],
                ingredients: ["flour", "sugar", "cocoa", "eggs", "butter", "chocolate", "vanilla"]
            }
        ],
        cheesecakes: [
            {
                id: 3,
                title: "New York Cheesecake",
                description: "Creamy and dense classic New York style cheesecake.",
                image: "../Images/ny-cheesecake.jpg",
                prepTime: "20 mins",
                cookTime: "60 mins",
                totalTime: 80,
                category: "cheesecakes",
                diet: ["vegetarian"],
                ingredients: ["cream cheese", "sugar", "eggs", "sour cream", "graham crackers", "butter", "vanilla"]
            },
            {
                id: 4,
                title: "Blueberry Cheesecake",
                description: "Smooth cheesecake with a fresh blueberry topping.",
                image: "../Images/blueberry-cheesecake.jpg",
                prepTime: "25 mins",
                cookTime: "55 mins",
                totalTime: 80,
                category: "cheesecakes",
                diet: ["vegetarian"],
                ingredients: ["cream cheese", "sugar", "blueberries", "eggs", "butter", "lemon juice", "cornstarch"]
            }
        ],
        cookies: [
            {
                id: 5,
                title: "Chocolate Chip Cookies",
                description: "Classic cookies with melty chocolate chips.",
                image: "../Images/choc-chip-cookies.jpg",
                prepTime: "15 mins",
                cookTime: "12 mins",
                totalTime: 27,
                category: "cookies",
                diet: ["vegetarian"],
                ingredients: ["flour", "sugar", "chocolate chips", "butter", "eggs", "vanilla", "baking soda"]
            },
            {
                id: 6,
                title: "Oatmeal Raisin Cookies",
                description: "Hearty cookies with oats and sweet raisins.",
                image: "../Images/oatmeal-cookies.jpg",
                prepTime: "20 mins",
                cookTime: "15 mins",
                totalTime: 35,
                category: "cookies",
                diet: ["vegetarian"],
                ingredients: ["oats", "flour", "raisins", "cinnamon", "butter", "brown sugar", "eggs"]
            }
        ],
        pastries: [
            {
                id: 7,
                title: "Apple Turnovers",
                description: "Flaky pastry filled with spiced apple filling.",
                image: "../Images/apple-turnovers.jpg",
                prepTime: "30 mins",
                cookTime: "25 mins",
                totalTime: 55,
                category: "pastries",
                diet: ["vegetarian"],
                ingredients: ["apples", "puff pastry", "sugar", "cinnamon", "butter", "lemon juice", "nutmeg"]
            },
            {
                id: 8,
                title: "Cream Puffs",
                description: "Light choux pastry filled with vanilla cream.",
                image: "../Images/cream-puffs.jpg",
                prepTime: "40 mins",
                cookTime: "30 mins",
                totalTime: 70,
                category: "pastries",
                diet: ["vegetarian"],
                ingredients: ["flour", "eggs", "butter", "cream", "vanilla", "sugar", "milk"]
            }
        ],
        breakfast: [
            {
                id: 9,
                title: "Blueberry Pancakes",
                description: "Fluffy pancakes bursting with fresh blueberries.",
                image: "../Images/blueberry-pancakes.jpg",
                prepTime: "10 mins",
                cookTime: "15 mins",
                totalTime: 25,
                category: "breakfast",
                diet: ["vegetarian"],
                ingredients: ["flour", "blueberries", "milk", "eggs", "baking powder", "sugar", "butter"]
            },
            {
                id: 10,
                title: "Cinnamon Rolls",
                description: "Soft rolls with cinnamon sugar and cream cheese frosting.",
                image: "../Images/cinnamon-rolls.jpg",
                prepTime: "25 mins",
                cookTime: "25 mins",
                totalTime: 50,
                category: "breakfast",
                diet: ["vegetarian"],
                ingredients: ["flour", "cinnamon", "sugar", "yeast", "cream cheese", "butter", "milk"]
            }
        ],
        cupcakes: [
            {
                id: 11,
                title: "Red Velvet Cupcakes",
                description: "Moist red velvet cupcakes with cream cheese frosting.",
                image: "../Images/red-velvet-cupcakes.jpg",
                prepTime: "20 mins",
                cookTime: "20 mins",
                totalTime: 40,
                category: "cupcakes",
                diet: ["vegetarian"],
                ingredients: ["flour", "cocoa", "buttermilk", "red food coloring", "cream cheese", "sugar", "vanilla"]
            },
            {
                id: 12,
                title: "Lemon Cupcakes",
                description: "Zesty lemon cupcakes with tangy lemon buttercream.",
                image: "../Images/lemon-cupcakes.jpg",
                prepTime: "25 mins",
                cookTime: "18 mins",
                totalTime: 43,
                category: "cupcakes",
                diet: ["vegetarian"],
                ingredients: ["flour", "lemon", "sugar", "eggs", "butter", "baking powder", "milk"]
            }
        ]
    };

    // Favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];

    // DOM Elements
    const categoryCards = document.querySelectorAll('.category-card');
    const recipeSearch = document.getElementById('recipeSearch');
    const searchBtn = document.getElementById('searchBtn');
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    const recipeGrid = document.getElementById('recipeGrid');
    const resultsTitle = document.getElementById('results-title');

    // Initialize event listeners
    initializeEventListeners();

    // Display featured recipes on load
    displayFeaturedRecipes();

    function initializeEventListeners() {
        // Category card click event
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            });
        });

        // Basic search functionality
        if (searchBtn) {
            searchBtn.addEventListener('click', performBasicSearch);
        }

        if (recipeSearch) {
            recipeSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performBasicSearch();
                }
            });
        }

        // Advanced search functionality
        if (advancedSearchBtn) {
            advancedSearchBtn.addEventListener('click', performAdvancedSearch);
        }

        // Auto-apply filters when they change
        const dietFilter = document.getElementById('dietFilter');
        const typeFilter = document.getElementById('typeFilter');
        const timeFilter = document.getElementById('timeFilter');
        const ingredientFilter = document.getElementById('ingredientFilter');

        [dietFilter, typeFilter, timeFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => performAdvancedSearch());
            }
        });

        if (ingredientFilter) {
            ingredientFilter.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performAdvancedSearch();
                }
            });
        }
    }

    function getAllRecipesFlat() {
        const allRecipes = [];
        Object.values(recipes).forEach(category => {
            allRecipes.push(...category);
        });
        return allRecipes;
    }

    function displayFeaturedRecipes() {
        if (!resultsTitle || !recipeGrid) return;
        
        resultsTitle.textContent = "Featured Recipes";
        const allRecipes = getAllRecipesFlat();
        displayRecipes(allRecipes.slice(0, 8), recipeGrid);
        animateRecipeCards();
    }

    function filterByCategory(category) {
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.value = category;
            performAdvancedSearch();
        }
    }

    function performBasicSearch() {
        const searchTerm = recipeSearch.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all recipes
            document.getElementById('dietFilter').value = '';
            document.getElementById('typeFilter').value = '';
            document.getElementById('ingredientFilter').value = '';
            document.getElementById('timeFilter').value = '';
            performAdvancedSearch();
            return;
        }
        
        // Use the advanced search with just the search term
        performAdvancedSearch();
    }

    function performAdvancedSearch() {
        const searchTerm = document.getElementById('recipeSearch')?.value.toLowerCase().trim() || '';
        const diet = document.getElementById('dietFilter')?.value || '';
        const type = document.getElementById('typeFilter')?.value || '';
        const ingredient = document.getElementById('ingredientFilter')?.value.toLowerCase().trim() || '';
        const maxTime = document.getElementById('timeFilter')?.value || '';

        if (!resultsTitle || !recipeGrid) return;

        // Show loading state
        showLoading(recipeGrid);

        // Filter recipes
        const filteredRecipes = filterRecipes(searchTerm, diet, type, ingredient, maxTime);

        // Update results title
        updateResultsTitle(resultsTitle, searchTerm, diet, type, ingredient, maxTime, filteredRecipes.length);

        // Display results
        displayRecipes(filteredRecipes, recipeGrid);

        // Animate results
        animateRecipeCards();
    }

    function filterRecipes(searchTerm, diet, type, ingredient, maxTime) {
        const allRecipes = getAllRecipesFlat();

        return allRecipes.filter(recipe => {
            // Search term filter
            if (searchTerm && 
                !recipe.title.toLowerCase().includes(searchTerm) && 
                !recipe.description.toLowerCase().includes(searchTerm)) {
                return false;
            }

            // Diet filter
            if (diet && !recipe.diet.includes(diet)) {
                return false;
            }

            // Type filter
            if (type && recipe.category !== type) {
                return false;
            }

            // Ingredient filter
            if (ingredient && !recipe.ingredients.some(ing => ing.includes(ingredient))) {
                return false;
            }

            // Time filter
            if (maxTime && recipe.totalTime > parseInt(maxTime)) {
                return false;
            }

            return true;
        });
    }

    function updateResultsTitle(resultsTitle, searchTerm, diet, type, ingredient, maxTime, resultCount) {
        let title = '';

        if (searchTerm || diet || type || ingredient || maxTime) {
            title = `Search Results (${resultCount} recipes found)`;
            
            const filters = [];
            if (searchTerm) filters.push(`"${searchTerm}"`);
            if (diet) filters.push(`${diet} diet`);
            if (type) filters.push(type);
            if (ingredient) filters.push(`with ${ingredient}`);
            if (maxTime) filters.push(`under ${maxTime}min`);

            if (filters.length > 0) {
                title += `: ${filters.join(', ')}`;
            }
        } else {
            title = 'Featured Recipes';
        }

        resultsTitle.textContent = title;
    }

    function displayRecipes(recipes, container) {
        if (!recipes || recipes.length === 0) {
            container.innerHTML = '<div class="no-results">No recipes found. Try adjusting your filters.</div>';
            return;
        }

        container.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>Prep: ${recipe.prepTime}</span>
                        <span>Cook: ${recipe.cookTime}</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}" 
                                data-id="${recipe.id}">
                            <i class="${favorites.includes(recipe.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <a href="recipe-details.html?id=${recipe.id}" class="view-recipe-btn">View Recipe</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to favorite buttons
        attachFavoriteEventListeners();
    }

    function showLoading(container) {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching recipes...</div>';
    }

    function attachFavoriteEventListeners() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                toggleFavorite(e);
            });
        });
    }

    function toggleFavorite(e) {
        const recipeId = parseInt(e.currentTarget.getAttribute('data-id'));
        const index = favorites.indexOf(recipeId);
        
        if (index === -1) {
            // Add to favorites
            favorites.push(recipeId);
            e.currentTarget.classList.add('active');
            e.currentTarget.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            e.currentTarget.classList.remove('active');
            e.currentTarget.innerHTML = '<i class="far fa-heart"></i>';
        }
        
        // Save to localStorage
        localStorage.setItem('nibblyFavorites', JSON.stringify(favorites));
    }

    function animateRecipeCards() {
        if (typeof gsap !== 'undefined') {
            gsap.from('.recipe-card', {
                duration: 0.5,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }
}

// Recipe Details Data
const recipeDetails = {
  1: {
    title: "Classic Vanilla Cake",
    description: "A light and fluffy vanilla cake perfect for any celebration. This classic recipe yields a moist, tender crumb with a delicate vanilla flavor that pairs beautifully with any frosting.",
    image: "../Images/vanilla-cake.jpg",
    prepTime: "30 mins",
    cookTime: "35 mins",
    servings: "8-10",
    difficulty: "Easy",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "2 1/2 tsp baking powder",
      "1/2 tsp salt",
      "1 cup unsalted butter, softened",
      "1 3/4 cups granulated sugar",
      "4 large eggs, room temperature",
      "1 tbsp vanilla extract",
      "1 cup whole milk, room temperature"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
      "In a medium bowl, whisk together flour, baking powder, and salt.",
      "In a large bowl, cream butter and sugar until light and fluffy, about 3-4 minutes.",
      "Add eggs one at a time, beating well after each addition. Mix in vanilla.",
      "Alternately add flour mixture and milk, beginning and ending with flour mixture.",
      "Divide batter evenly between prepared pans and smooth tops.",
      "Bake for 30-35 minutes or until a toothpick inserted in center comes out clean.",
      "Cool in pans for 10 minutes, then remove to wire racks to cool completely."
    ]
  },
  2: {
    title: "Chocolate Fudge Cake",
    description: "Rich and decadent chocolate cake with fudge frosting. This intensely chocolatey cake is moist, fudgy, and perfect for chocolate lovers.",
    image: "../Images/chocolate-cake.jpg",
    prepTime: "25 mins",
    cookTime: "40 mins",
    servings: "10-12",
    difficulty: "Medium",
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups granulated sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 tsp baking soda",
      "1 tsp baking powder",
      "1 tsp salt",
      "1 cup buttermilk",
      "1/2 cup vegetable oil",
      "2 large eggs",
      "1 tsp vanilla extract",
      "1 cup hot coffee"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round pans.",
      "In a large bowl, sift together flour, sugar, cocoa, baking soda, baking powder, and salt.",
      "Add buttermilk, oil, eggs, and vanilla. Beat on medium speed for 2 minutes.",
      "Stir in hot coffee until batter is smooth (batter will be thin).",
      "Pour batter into prepared pans.",
      "Bake for 35-40 minutes or until a toothpick comes out clean.",
      "Cool in pans for 10 minutes, then remove to wire racks to cool completely.",
      "Frost with chocolate fudge frosting when completely cool."
    ]
  }
  // Add more recipe details as needed
};

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

// Load recipe details
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get('id'));
  
  if (recipeId && recipeDetails[recipeId]) {
    displayRecipeDetails(recipeDetails[recipeId]);
  } else {
    // Redirect to recipe book if recipe not found
    window.location.href = 'Recipebook.html';
  }
  
  // Save to favorites functionality
  document.getElementById('saveRecipe').addEventListener('click', function() {
    const recipeTitle = document.getElementById('detailTitle').textContent;
    alert(`"${recipeTitle}" has been saved to your favorites!`);
    
    // Add to favorites logic would go here
    // This would typically save to localStorage or send to a backend
  });
  
  // Print recipe functionality
  document.getElementById('printRecipe').addEventListener('click', function() {
    window.print();
  });
});

function displayRecipeDetails(recipe) {
  document.getElementById('detailTitle').textContent = recipe.title;
  document.getElementById('detailDescription').textContent = recipe.description;
  document.getElementById('detailImage').src = recipe.image;
  document.getElementById('detailImage').alt = recipe.title;
  document.getElementById('prepTime').textContent = recipe.prepTime;
  document.getElementById('cookTime').textContent = recipe.cookTime;
  document.getElementById('servings').textContent = recipe.servings;
  document.getElementById('difficulty').textContent = recipe.difficulty;
  
  // Populate ingredients
  const ingredientsList = document.getElementById('ingredientsList');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
  
  // Populate instructions
  const instructionsList = document.getElementById('instructionsList');
  instructionsList.innerHTML = '';
  recipe.instructions.forEach(instruction => {
    const li = document.createElement('li');
    li.textContent = instruction;
    instructionsList.appendChild(li);
  });
  
  // Update page title
  document.title = `${recipe.title} - Nibbly`;
}

// GSAP Animations for Recipe Details
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  // Recipe header animation
  gsap.from('.recipe-header', {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: "power2.out"
  });
  
  // Ingredients animation
  gsap.from('#ingredientsList li', {
    duration: 0.5,
    opacity: 0,
    x: -20,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.ingredients-section',
      start: 'top 80%'
    }
  });
  
  // Instructions animation
  gsap.from('#instructionsList li', {
    duration: 0.6,
    opacity: 0,
    x: 20,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.instructions-section',
      start: 'top 80%'
    }
  });
});

// GSAP Animations
function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

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
        );

    // Filter section animation
    gsap.from('.filter-section', {
        duration: 0.7,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        delay: 0.6
    });
    
    // Category grid animation
    gsap.from('.category-card', {
        duration: 0.5,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.8,
        scrollTrigger: {
            trigger: '.categories',
            start: 'top 80%'
        }
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

    // Floating cookies animation
    function createFloatingCookies() {
        const banner = document.querySelector('.banner');
        if (!banner) return;
        
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
}