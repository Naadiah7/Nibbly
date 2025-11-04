// Recipe Book + Recipe Details Javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeScrollToTop();
    initializeRecipeSearch();
    initializeGSAPAnimations();
});

// Scroll-to-top function
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

// Recipe Search and Filtering Functions
function initializeRecipeSearch() {
    // API Keys
    const SPOONACULAR_API_KEY = 'e983813986ce447287b5664a1l45662a';
    const EDAMAM_APP_ID = 'ced607f2';
    const EDAMAM_APP_KEY = '66208284ce22f426737dc243';

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
                ingredients: ["flour", "sugar", "eggs", "vanilla", "butter", "milk", "baking powder"],
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
                ingredients: ["flour", "sugar", "cocoa", "eggs", "butter", "chocolate", "vanilla"],
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
        ],
        "indian-sweets": [
            {
                id: 3,
                title: "Gulab Jamun",
                description: "Soft, melt-in-your-mouth Indian sweet in rose-flavored syrup.",
                image: "../Images/gulab-jamun.jpg",
                prepTime: "20 mins",
                cookTime: "25 mins",
                totalTime: 45,
                category: "indian-sweets",
                diet: ["vegetarian"],
                ingredients: ["milk powder", "flour", "ghee", "milk", "sugar", "rose water", "cardamom"],
                instructions: [
                    "Mix milk powder, flour, and baking powder in a bowl.",
                    "Add ghee and rub into the flour mixture.",
                    "Gradually add milk to form a soft dough.",
                    "Shape into small smooth balls.",
                    "Heat oil/ghee on medium heat and fry until golden brown.",
                    "Prepare sugar syrup with rose water and cardamom.",
                    "Soak fried balls in warm syrup for 2-3 hours."
                ]
            },
            {
                id: 4,
                title: "Burfee",
                description: "Soft, spongy cheese balls in light sugar syrup.",
                image: "../Images/rasgulla.jpg",
                prepTime: "30 mins",
                cookTime: "20 mins",
                totalTime: 50,
                category: "indian-sweets",
                diet: ["vegetarian"],
                ingredients: ["milk", "lemon juice", "sugar", "water", "cardamom"],
                instructions: [
                    "Boil milk and add lemon juice to curdle.",
                    "Strain through muslin cloth to get chenna.",
                    "Knead chenna until smooth and form small balls.",
                    "Prepare sugar syrup with cardamom.",
                    "Boil the balls in syrup for 15-20 minutes.",
                    "Cool and serve chilled."
                ]
            }
        ],
        meringues: [
            {
                id: 5,
                title: "Classic French Meringue",
                description: "Light and airy meringue cookies with crisp exterior.",
                image: "../Images/meringue.jpg",
                prepTime: "20 mins",
                cookTime: "90 mins",
                totalTime: 110,
                category: "meringues",
                diet: ["vegetarian"],
                ingredients: ["egg whites", "sugar", "cream of tartar", "vanilla"],
                instructions: [
                    "Preheat oven to 200°F (95°C). Line baking sheets with parchment.",
                    "Beat egg whites with cream of tartar until soft peaks form.",
                    "Gradually add sugar, beating until stiff glossy peaks.",
                    "Fold in vanilla.",
                    "Pipe or spoon meringue onto prepared sheets.",
                    "Bake for 90 minutes, then turn off oven and leave meringues inside for 1 hour."
                ]
            },
            {
                id: 6,
                title: "Pavlova",
                description: "Crisp meringue shell with soft marshmallow center.",
                image: "../Images/Pavlova.png",
                prepTime: "25 mins",
                cookTime: "60 mins",
                totalTime: 85,
                category: "meringues",
                diet: ["vegetarian"],
                ingredients: ["egg whites", "sugar", "cornstarch", "vinegar", "vanilla", "cream", "fruit"],
                instructions: [
                    "Preheat oven to 300°F (150°C). Line baking sheet with parchment.",
                    "Beat egg whites until stiff peaks form.",
                    "Gradually add sugar, then cornstarch, vinegar, and vanilla.",
                    "Shape into a circle on baking sheet.",
                    "Bake for 60 minutes, then cool in oven.",
                    "Top with whipped cream and fresh fruit."
                ]
            }
        ],
        breakfast: [
            {
                id: 7,
                title: "Pancakes",
                description: "Fluffy pancakes bursting with fresh blueberries.",
                image: "../Images/Pancakes.jpg",
                prepTime: "10 mins",
                cookTime: "15 mins",
                totalTime: 25,
                category: "breakfast",
                diet: ["vegetarian"],
                ingredients: ["flour", "blueberries", "milk", "eggs", "baking powder", "sugar", "butter"],
                instructions: [
                    "Mix dry ingredients in a bowl.",
                    "In another bowl, mix wet ingredients.",
                    "Combine wet and dry ingredients, fold in blueberries.",
                    "Heat griddle and pour batter.",
                    "Cook until bubbles form, then flip.",
                    "Serve with maple syrup and butter."
                ]
            },
            {
                id: 8,
                title: "Cinnamon Rolls",
                description: "Soft rolls with cinnamon sugar and cream cheese frosting.",
                image: "../Images/cinnamon-rolls.jpg",
                prepTime: "25 mins",
                cookTime: "25 mins",
                totalTime: 50,
                category: "breakfast",
                diet: ["vegetarian"],
                ingredients: ["flour", "cinnamon", "sugar", "yeast", "cream cheese", "butter", "milk"],
                instructions: [
                    "Prepare dough and let rise for 1 hour.",
                    "Roll out dough and spread with cinnamon-sugar mixture.",
                    "Roll up tightly and cut into slices.",
                    "Place in baking pan and let rise again.",
                    "Bake at 375°F (190°C) for 25 minutes.",
                    "Frost with cream cheese icing while warm."
                ]
            },
            {
                id: 9,
                title: "French Toast",
                description: "Golden brown French toast with maple syrup.",
                image: "../Images/french-toast.jpg",
                prepTime: "10 mins",
                cookTime: "15 mins",
                totalTime: 25,
                category: "breakfast",
                diet: ["vegetarian"],
                ingredients: ["bread", "eggs", "milk", "cinnamon", "vanilla", "butter"],
                instructions: [
                    "Whisk eggs, milk, cinnamon, and vanilla in a bowl.",
                    "Dip bread slices in egg mixture.",
                    "Cook on buttered griddle until golden brown.",
                    "Flip and cook other side.",
                    "Serve with maple syrup and powdered sugar."
                ]
            }
        ]
    };

    // Favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];

    // DOM Elements
    const categoryCards = document.querySelectorAll('.category-card');
    const recipeSearch = document.getElementById('recipeSearch');
    const searchBtn = document.getElementById('searchBtn');
    const recipeGrid = document.getElementById('recipeGrid');
    const resultsTitle = document.getElementById('results-title');

    // Initialize event listeners
    initializeEventListeners();

    // Display recipes on load
    displayRecipes();

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
    }

    function getAllRecipesFlat() {
        const allRecipes = [];
        Object.values(recipes).forEach(category => {
            allRecipes.push(...category);
        });
        return allRecipes;
    }

    function displayRecipes() {
        if (!resultsTitle || !recipeGrid) return;
        
        resultsTitle.textContent = "Featured Recipes";
        const allRecipes = getAllRecipesFlat();
        displayRecipes(allRecipes.slice(0, 8), recipeGrid);
        animateRecipeCards();
    }

    function filterByCategory(category) {
        if (!resultsTitle || !recipeGrid) return;

        const categoryRecipes = recipes[category] || [];
        resultsTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Recipes`;
        displayRecipes(categoryRecipes, recipeGrid);
        animateRecipeCards();
    }

    async function performBasicSearch() {
        const searchTerm = recipeSearch.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayRecipes();
            return;
        }

        if (!resultsTitle || !recipeGrid) return;

        // Show loading state
        showLoading(recipeGrid);

        try {
            let searchResults = [];
            
            // Try Spoonacular API first
            try {
                const spoonacularResults = await searchSpoonacularAPI(searchTerm);
                searchResults = spoonacularResults;
            } catch (spoonacularError) {
                console.log('Spoonacular API failed, trying Edamam...');
                
                // Fallback to Edamam API
                try {
                    const edamamResults = await searchEdamamAPI(searchTerm);
                    searchResults = edamamResults;
                } catch (edamamError) {
                    console.log('Both APIs failed, using local data');
                    // Fallback to local search
                    searchResults = searchLocalRecipes(searchTerm);
                }
            }

            resultsTitle.textContent = `Search Results for "${searchTerm}" (${searchResults.length} found)`;
            displayRecipes(searchResults, recipeGrid);
            animateRecipeCards();

        } catch (error) {
            console.error('Search error:', error);
            recipeGrid.innerHTML = '<div class="error-message">Search failed. Please try again.</div>';
        }
    }

    async function searchSpoonacularAPI(query) {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&apiKey=${SPOONACULAR_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Spoonacular API request failed');
        }
        
        const data = await response.json();
        return data.results.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.title,
            image: recipe.image,
            prepTime: "N/A",
            cookTime: "N/A",
            totalTime: 0,
            category: "api",
            diet: [],
            ingredients: [],
            instructions: []
        }));
    }

    async function searchEdamamAPI(query) {
        const response = await fetch(
            `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&to=10`
        );
        
        if (!response.ok) {
            throw new Error('Edamam API request failed');
        }
        
        const data = await response.json();
        return data.hits.map(hit => ({
            id: hit.recipe.uri,
            title: hit.recipe.label,
            description: hit.recipe.source,
            image: hit.recipe.image,
            prepTime: "N/A",
            cookTime: Math.round(hit.recipe.totalTime) + " mins",
            totalTime: hit.recipe.totalTime,
            category: "api",
            diet: hit.recipe.healthLabels || [],
            ingredients: hit.recipe.ingredientLines || [],
            instructions: []
        }));
    }

    function searchLocalRecipes(query) {
        const allRecipes = getAllRecipesFlat();
        return allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
        );
    }

    function displayRecipes(recipesToDisplay, container) {
        if (!container) return;

        if (recipesToDisplay.length === 0) {
            container.innerHTML = '<div class="no-results">No recipes found. Try a different search term.</div>';
            return;
        }

        container.innerHTML = recipesToDisplay.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" onerror="this.src='../Images/placeholder-recipe.jpg'">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.totalTime || recipe.cookTime}</span>
                        <span><i class="fas fa-utensils"></i> ${recipe.category}</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}" 
                                onclick="toggleFavorite(${recipe.id}, this)">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="view-btn" onclick="viewRecipe(${recipe.id})">
                            <i class="fas fa-eye"></i> View Recipe
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function showLoading(container) {
        if (!container) return;
        container.innerHTML = '<div class="loading">Searching for recipes...</div>';
    }

    function animateRecipeCards() {
        gsap.fromTo('.recipe-card', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
        );
    }
}

// Global functions for recipe interaction
window.toggleFavorite = function(recipeId, button) {
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
        button.classList.remove('active');
    } else {
        favorites.push(recipeId);
        button.classList.add('active');
    }
    
    localStorage.setItem('nibblyFavorites', JSON.stringify(favorites));
};

window.viewRecipe = function(recipeId) {
    // Store the recipe ID in sessionStorage for the recipe details page
    sessionStorage.setItem('currentRecipeId', recipeId);
    
    // Navigate to recipe details page
    window.location.href = 'recipedetails.html';
};

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