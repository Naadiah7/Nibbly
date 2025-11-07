// search.js - Handles search functionality and recent viewed recipes

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeScrollToTop();
    initializeRecipeSearch();
    initializeFilterSystem();
    initializeRecentViewedRecipes();
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

// API Configuration
const API_CONFIG = {
    spoonacular: {
        apiKey: 'e9838f3986ce447287b5664a1145662a',
        baseUrl: 'https://api.spoonacular.com/recipes'
    },
    edamam: {
        appId: 'bd468936',
        appKey: 'ced607f266208284ce22f426737dc243',
        baseUrl: 'https://api.edamam.com/api/recipes/v2'
    }
};

// Enhanced recipe data with basic info only (fallback data)
const enhancedLocalRecipes = {
    cakes: [
        {
            id: 1,
            title: "Classic Cheesecake",
            description: "Creamy and rich cheesecake with a buttery biscuit base.",
            image: "../images/cheesecake.png",
            totalTime: 90,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8,
            source: "local"
        },
        {
            id: 2,
            title: "Chocolate Brownie",
            description: "Fudgy, decadent chocolate brownies with a crackly top.",
            image: "../images/brownie.png",
            totalTime: 40,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12,
            source: "local"
        },
        {
            id: 3,
            title: "Red Velvet Cake",
            description: "Stunning red velvet cake with cream cheese frosting.",
            image: "../images/redvelvet.png",
            totalTime: 65,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 10,
            source: "local"
        }
    ],
    meringues: [
        {
            id: 4,
            title: "Lemon Meringue",
            description: "Tangy lemon curd topped with fluffy toasted meringue.",
            image: "../images/lMeringue.png",
            totalTime: 65,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 8,
            source: "local"
        },
        {
            id: 5,
            title: "Pavlova",
            description: "Crisp meringue shell with soft center, topped with cream and fruit.",
            image: "../images/pavlova.png",
            totalTime: 115,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8,
            source: "local"
        }
    ],
    "indian-sweets": [
        {
            id: 6,
            title: "Gulab Jamun",
            description: "Soft, melt-in-your-mouth milk balls in fragrant sugar syrup.",
            image: "../images/gulab.png",
            totalTime: 55,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 15,
            source: "local"
        },
        {
            id: 7,
            title: "Burfee",
            description: "Rich, fudge-like sweet made with milk and sugar.",
            image: "../images/burfee.png",
            totalTime: 45,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 12,
            source: "local"
        },
        {
            id: 8,
            title: "Chana Magaj",
            description: "Traditional gram flour sweet with ghee and sugar.",
            image: "../images/magaj.png",
            totalTime: 60,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 10,
            source: "local"
        }
    ],
    breakfast: [
        {
            id: 9,
            title: "Classic Pancakes",
            description: "Fluffy, golden pancakes perfect for weekend breakfast.",
            image: "../images/pancakes2.png",
            totalTime: 25,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 4,
            source: "local"
        },
        {
            id: 10,
            title: "Cappuccino Muffins",
            description: "Coffee-flavored muffins with a sweet streusel topping.",
            image: "../images/capmuffin.png",
            totalTime: 35,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12,
            source: "local"
        }
    ]
};

// Recent Viewed Recipes functionality
class RecentViewedRecipes {
    constructor() {
        this.storageKey = 'nibbly_recent_viewed';
        this.maxRecent = 5; // Maximum number of recent recipes to store
        this.recentRecipes = this.loadRecentRecipes();
    }

    // Load recent recipes from localStorage
    loadRecentRecipes() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading recent recipes:', error);
            return [];
        }
    }

    // Save recent recipes to localStorage
    saveRecentRecipes() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.recentRecipes));
        } catch (error) {
            console.error('Error saving recent recipes:', error);
        }
    }

    // Add a recipe to recent viewed
    addRecipe(recipe) {
        // Remove if already exists (to avoid duplicates)
        this.recentRecipes = this.recentRecipes.filter(r => r.id !== recipe.id);
        
        // Add to beginning of array
        this.recentRecipes.unshift(recipe);
        
        // Keep only the most recent ones
        if (this.recentRecipes.length > this.maxRecent) {
            this.recentRecipes = this.recentRecipes.slice(0, this.maxRecent);
        }
        
        this.saveRecentRecipes();
        this.displayRecentRecipes();
    }

    // Display recent recipes in the UI
    displayRecentRecipes() {
        const recentContainer = document.getElementById('recentRecipesContainer');
        if (!recentContainer) return;

        if (this.recentRecipes.length === 0) {
            recentContainer.innerHTML = '<p class="no-recent">No recently viewed recipes</p>';
            return;
        }

        recentContainer.innerHTML = this.recentRecipes.map(recipe => `
            <div class="recent-recipe-item" data-id="${recipe.id}" data-source="${recipe.source || 'local'}">
                <img src="${recipe.image}" alt="${recipe.title}" class="recent-recipe-img" onerror="this.src='../images/placeholder-recipe.png'">
                <div class="recent-recipe-info">
                    <h4 class="recent-recipe-title">${recipe.title}</h4>
                    <p class="recent-recipe-time">${recipe.totalTime} min</p>
                </div>
            </div>
        `).join('');

        // Add click event listeners to recent recipe items
        recentContainer.querySelectorAll('.recent-recipe-item').forEach(item => {
            item.addEventListener('click', () => {
                const recipeId = parseInt(item.getAttribute('data-id'));
                const source = item.getAttribute('data-source');
                const allRecipes = getAllRecipesFlat();
                let recipe = allRecipes.find(r => r.id === recipeId && r.source === source);
                
                if (!recipe) {
                    // Try to find by ID only if source doesn't match
                    recipe = allRecipes.find(r => r.id === recipeId);
                }
                
                if (recipe) {
                    this.viewRecipeDetails(recipe);
                }
            });
        });
    }

    // View recipe details
    viewRecipeDetails(recipe) {
        // Add to recent viewed
        this.addRecipe(recipe);
        
        // Navigate to recipe details page
        window.viewRecipe(recipe.id, recipe.source || 'local');
    }
}

// Initialize Recent Viewed Recipes
function initializeRecentViewedRecipes() {
    window.recentViewed = new RecentViewedRecipes();
    
    // Create recent recipes section if it doesn't exist
    const mainElement = document.querySelector('main');
    const existingSearchContainer = document.querySelector('.search-container');
    
    if (mainElement && existingSearchContainer) {
        // Check if recent section already exists
        let recentSection = document.querySelector('.recent-recipes-section');
        
        if (!recentSection) {
            // Create recent recipes section
            recentSection = document.createElement('section');
            recentSection.className = 'recent-recipes-section';
            recentSection.innerHTML = `
                <div class="recent-recipes-header">
                    <h2>Recently Viewed Recipes</h2>
                </div>
                <div id="recentRecipesContainer" class="recent-recipes-container">
                    <!-- Recent recipes will be loaded here -->
                </div>
            `;

            // Insert recent section before the search container
            mainElement.insertBefore(recentSection, existingSearchContainer);
        }
        
        // Display initial recent recipes
        window.recentViewed.displayRecentRecipes();
    }
}

// API Functions
class RecipeAPIService {
    // Spoonacular API - Search recipes
    static async searchSpoonacularRecipes(query, filters = {}) {
        try {
            const params = new URLSearchParams({
                apiKey: API_CONFIG.spoonacular.apiKey,
                query: query,
                number: 12,
                addRecipeInformation: true,
                fillIngredients: true
            });

            // Add filters
            if (filters.diet) params.append('diet', filters.diet);
            if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime);
            if (filters.type) params.append('type', filters.type);

            const response = await fetch(`${API_CONFIG.spoonacular.baseUrl}/complexSearch?${params}`);
            
            if (!response.ok) throw new Error('Spoonacular API request failed');
            
            const data = await response.json();
            return this.formatSpoonacularRecipes(data.results);
        } catch (error) {
            console.error('Spoonacular API Error:', error);
            return [];
        }
    }

    // Edamam API - Search recipes
    static async searchEdamamRecipes(query, filters = {}) {
        try {
            const params = new URLSearchParams({
                app_id: API_CONFIG.edamam.appId,
                app_key: API_CONFIG.edamam.appKey,
                q: query,
                type: 'public',
                random: true
            });

            // Add filters
            if (filters.diet) params.append('health', filters.diet);
            if (filters.mealType) params.append('mealType', filters.mealType);

            const response = await fetch(`${API_CONFIG.edamam.baseUrl}?${params}`);
            
            if (!response.ok) throw new Error('Edamam API request failed');
            
            const data = await response.json();
            return this.formatEdamamRecipes(data.hits);
        } catch (error) {
            console.error('Edamam API Error:', error);
            return [];
        }
    }

    // Get recipe details from Spoonacular
    static async getRecipeDetails(recipeId, source) {
        try {
            if (source === 'spoonacular') {
                const response = await fetch(
                    `${API_CONFIG.spoonacular.baseUrl}/${recipeId}/information?apiKey=${API_CONFIG.spoonacular.apiKey}`
                );
                if (!response.ok) throw new Error('Failed to fetch recipe details');
                const data = await response.json();
                return this.formatSpoonacularRecipeDetails(data);
            }
            // For local recipes, use existing data
            return null;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            return null;
        }
    }

    // Format Spoonacular recipes
    static formatSpoonacularRecipes(recipes) {
        return recipes.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available',
            image: recipe.image,
            totalTime: recipe.readyInMinutes || 30,
            category: this.mapSpoonacularCategory(recipe.dishTypes),
            diet: this.mapSpoonacularDiets(recipe.diets),
            difficulty: this.mapDifficulty(recipe.readyInMinutes),
            servings: recipe.servings || 4,
            source: 'spoonacular',
            spoonacularId: recipe.id
        }));
    }

    // Format Edamam recipes 
    static formatEdamamRecipes(recipes) {
        return recipes.map(hit => {
            const recipe = hit.recipe;
            return {
                id: `edamam_${recipe.uri.split('_').pop()}`,
                title: recipe.label,
                description: recipe.ingredientLines ? `A delicious dessert with ${recipe.ingredientLines.length} ingredients` : 'A tasty dessert recipe',
                image: recipe.image,
                totalTime: recipe.totalTime || 30,
                category: this.mapEdamamCategory(recipe.mealType),
                diet: this.mapEdamamDiets(recipe.healthLabels),
                difficulty: this.mapDifficulty(recipe.totalTime),
                servings: recipe.yield || 4,
                source: 'edamam',
                edamamUri: recipe.uri
            };
        });
    }

    // Format detailed recipe from Spoonacular
    static formatSpoonacularRecipeDetails(recipe) {
        return {
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'No description available',
            image: recipe.image,
            prepTime: `${recipe.preparationMinutes || 15} mins`,
            cookTime: `${recipe.cookingMinutes || 15} mins`,
            totalTime: recipe.readyInMinutes,
            category: this.mapSpoonacularCategory(recipe.dishTypes),
            diet: this.mapSpoonacularDiets(recipe.diets),
            difficulty: this.mapDifficulty(recipe.readyInMinutes),
            servings: recipe.servings,
            ingredients: recipe.extendedIngredients?.map(ing => ing.original) || [],
            instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || ['No instructions available'],
            tags: recipe.dishTypes || [],
            source: 'spoonacular'
        };
    }

    // Helper methods for mapping categories and diets
    static mapSpoonacularCategory(dishTypes) {
        if (!dishTypes || dishTypes.length === 0) return 'cakes';
        
        const types = dishTypes.map(type => type.toLowerCase());
        
        if (types.some(type => 
            ['dessert', 'cake', 'pastry', 'pie', 'tart', 'cookie', 'biscuit', 
             'pudding', 'sweet', 'candy', 'chocolate', 'bakery', 'baking'].includes(type)
        )) {
            if (types.some(t => ['cake', 'cupcake', 'cheesecake', 'sponge'].includes(t))) return 'cakes';
            if (types.some(t => ['cookie', 'biscuit', 'shortbread'].includes(t))) return 'cakes';
            if (types.some(t => ['meringue', 'pavlova', 'souffle'].includes(t))) return 'meringues';
            if (types.some(t => ['indian', 'asian', 'middle eastern'].includes(t))) return 'indian-sweets';
            if (types.some(t => ['breakfast', 'pancake', 'waffle', 'muffin', 'doughnut'].includes(t))) return 'breakfast';
            
            return 'cakes';
        }
        
        if (types.some(t => ['breakfast', 'brunch', 'pancake', 'waffle', 'muffin'].includes(t))) return 'breakfast';
        
        return 'cakes';
    }

    static mapEdamamCategory(mealType) {
        if (!mealType || mealType.length === 0) return 'cakes';
        
        const types = mealType.map(type => type.toLowerCase());
        
        if (types.some(t => ['breakfast', 'brunch'].includes(t))) return 'breakfast';
        if (types.some(t => ['dessert', 'snack', 'teatime'].includes(t))) return 'cakes';
        if (types.some(t => ['lunch', 'dinner'].includes(t))) return 'cakes';
        
        return 'cakes';
    }

    static mapSpoonacularDiets(diets) {
        if (!diets) return ['vegetarian'];
        return diets.map(diet => diet.toLowerCase().replace(/ /g, ''));
    }

    static mapEdamamDiets(healthLabels) {
        if (!healthLabels) return ['vegetarian'];
        
        const dietMap = {
            'vegetarian': 'vegetarian',
            'vegan': 'vegan', 
            'gluten-free': 'glutenFree',
            'dairy-free': 'dairyFree',
            'nut-free': 'nutFree',
            'egg-free': 'eggFree'
        };
        
        const diets = [];
        healthLabels.forEach(label => {
            const normalizedLabel = label.toLowerCase().replace(/ /g, '');
            if (dietMap[normalizedLabel]) {
                diets.push(dietMap[normalizedLabel]);
            }
        });
        
        return diets.length > 0 ? diets : ['vegetarian'];
    }

    static mapDifficulty(totalTime) {
        if (!totalTime || totalTime <= 30) return 'easy';
        if (totalTime <= 60) return 'medium';
        return 'hard';
    }
}

// Recipe Search and Filtering Function with API 
function initializeRecipeSearch() {
    // DOM Elements
    const recipeSearch = document.getElementById('recipeSearch');
    const searchBtn = document.getElementById('searchBtn');
    const recipeGrid = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('results-title');

    // Current state
    let currentRecipes = [];
    let currentPage = 1;
    const recipesPerPage = 8;

    // Initialize event listeners
    initializeEventListeners();

    function initializeEventListeners() {
        // Basic search function
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        if (recipeSearch) {
            recipeSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    function getAllRecipesFlat() {
        const allRecipes = [];
        Object.values(enhancedLocalRecipes).forEach(category => {
            allRecipes.push(...category);
        });
        return allRecipes;
    }

    async function performSearch() {
        const searchTerm = recipeSearch.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all recipes
            currentRecipes = getAllRecipesFlat();
            displayRecipes(currentRecipes, 1);
            return;
        }

        if (!recipeGrid) return;

        // Show loading state
        showLoading(recipeGrid);

        try {
            let searchResults = [];

            const enhancedSearchTerm = searchTerm.includes('dessert') ? searchTerm : `${searchTerm} dessert`;

            // Use both APIs for better results
            const [spoonacularResults, edamamResults] = await Promise.all([
                RecipeAPIService.searchSpoonacularRecipes(enhancedSearchTerm),
                RecipeAPIService.searchEdamamRecipes(enhancedSearchTerm)
            ]);
            
            searchResults = [...spoonacularResults, ...edamamResults];

            // Fallback to local search if no API results
            if (searchResults.length === 0) {
                console.log('No API results, falling back to local search');
                searchResults = searchLocalRecipes(searchTerm);
                
                if (searchResults.length === 0) {
                    // Try broader local search
                    searchResults = broaderLocalSearch(searchTerm);
                }
            }

            currentRecipes = searchResults;
            displayRecipes(currentRecipes, 1);

            // Show error if no results
            if (searchResults.length === 0) {
                showNoResultsMessage(`No recipes found for "${searchTerm}". Try different keywords like "cake", "cookies", or "pudding".`);
            }

        } catch (error) {
            console.error('Search error:', error);
            // Fallback to local search
            const searchResults = searchLocalRecipes(searchTerm);
            if (searchResults.length === 0) {
                searchResults = broaderLocalSearch(searchTerm);
            }
            currentRecipes = searchResults;
            displayRecipes(currentRecipes, 1);
            
            if (searchResults.length === 0) {
                showNoResultsMessage(`No recipes found for "${searchTerm}". Try different keywords.`);
            }
        }
    }

    function searchLocalRecipes(query) {
        const allRecipes = getAllRecipesFlat();
        const searchTerms = query.toLowerCase().split(' ');

        return allRecipes.filter(recipe => {
            const recipeText = (recipe.title + ' ' + recipe.description + ' ' + recipe.category).toLowerCase();
            return searchTerms.some(term => recipeText.includes(term));
        });
    }

    function broaderLocalSearch(query) {
        const allRecipes = getAllRecipesFlat();
        const searchTerms = query.toLowerCase().split(' ');
        
        return allRecipes.filter(recipe => {
            const recipeText = (recipe.title + ' ' + recipe.description + ' ' + recipe.category).toLowerCase();
            return searchTerms.some(term => recipeText.includes(term));
        });
    }

    function displayRecipes(recipes, page) {
        if (!recipeGrid) return;

        const startIndex = (page - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        const recipesToShow = recipes.slice(0, endIndex);

        if (recipesToShow.length === 0) {
            showNoResultsMessage("No recipes found matching your criteria.");
            return;
        }

        recipeGrid.innerHTML = recipesToShow.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}" data-source="${recipe.source}">
                <div class="recipe-badges">
                    ${recipe.diet && recipe.diet.slice(0, 2).map(diet => `
                        <span class="recipe-badge badge-diet">${diet}</span>
                    `).join('')}
                    <span class="recipe-badge badge-time">${recipe.totalTime}min</span>
                    <span class="recipe-badge badge-difficulty">${recipe.difficulty}</span>
                    ${recipe.source !== 'local' ? `<span class="recipe-badge badge-api">API</span>` : ''}
                </div>
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" onerror="this.src='../images/placeholder-recipe.png'">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.totalTime} min</span>
                        <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                        <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="view-recipe-btn" onclick="handleViewRecipe(${recipe.id}, '${recipe.source}')">
                            <i class="fas fa-eye"></i> View Recipe
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Animate new cards
        animateNewRecipeCards(startIndex);
    }

    function showNoResultsMessage(message) {
        if (!recipeGrid) return;
        
        recipeGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${message}</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
    }

    function showLoading(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading recipes...</p>
            </div>
        `;
    }

    function animateNewRecipeCards(startIndex) {
        if (typeof gsap !== 'undefined') {
            const newCards = document.querySelectorAll('.recipe-card');
            const cardsToAnimate = Array.from(newCards).slice(startIndex);
            
            gsap.fromTo(cardsToAnimate, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
            );
        }
    }

    // Make functions available globally
    window.getAllRecipesFlat = getAllRecipesFlat;
    window.currentRecipes = currentRecipes;
}

// Handle view recipe with recent tracking
window.handleViewRecipe = function(recipeId, source = 'local') {
    const allRecipes = getAllRecipesFlat();
    let recipe = allRecipes.find(r => r.id === recipeId && r.source === source);
    
    if (!recipe) {
        // Try to find by ID only if source doesn't match
        recipe = allRecipes.find(r => r.id === recipeId);
    }
    
    if (recipe && window.recentViewed) {
        // Add to recent viewed before navigating
        window.recentViewed.addRecipe(recipe);
    }
    
    // Navigate to recipe details
    window.viewRecipe(recipeId, source);
};

// Global functions for recipe interaction
window.viewRecipe = function(recipeId, source = 'local') {
    console.log('View Recipe clicked:', { recipeId, source });
    
    // Store the recipe ID and source for the recipe details page
    sessionStorage.setItem('currentRecipeId', recipeId.toString());
    sessionStorage.setItem('recipeSource', source);
    
    // Navigate to recipe details page
    window.location.href = 'recipedetails.html';
};

// Filter System Function
function initializeFilterSystem() {
    // DOM Elements
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const activeFiltersContainer = document.getElementById('activeFilters');
    
    // Current filter state
    let currentFilters = {
        diet: '',
        type: '',
        time: ''
    };

    // Initialize event listeners
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Auto-apply filters when select changes
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });

    function applyFilters() {
        // Get current filter values
        currentFilters = {
            diet: document.getElementById('dietFilter').value,
            type: document.getElementById('typeFilter').value,
            time: document.getElementById('timeFilter').value
        };

        // Active filters display
        updateActiveFiltersDisplay();

        // Filter and display recipes
        filterRecipes(currentFilters);
    }

    function clearAllFilters() {
        // Reset all filter inputs
        document.getElementById('dietFilter').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('timeFilter').value = '';

        // Reset current filters
        currentFilters = {
            diet: '',
            type: '',
            time: ''
        };

        // Clear active filters display
        if (activeFiltersContainer) {
            activeFiltersContainer.innerHTML = '';
        }

        // Show all recipes when clearing filters
        const allRecipes = getAllRecipesFlat();
        if (window.displayRecipesPage) {
            window.displayRecipesPage(allRecipes, 1);
        }
    }

    function updateActiveFiltersDisplay() {
        if (!activeFiltersContainer) return;
        
        activeFiltersContainer.innerHTML = '';

        Object.entries(currentFilters).forEach(([key, value]) => {
            if (value) {
                const filterLabel = getFilterLabel(key, value);
                const filterTag = createFilterTag(key, value, filterLabel);
                activeFiltersContainer.appendChild(filterTag);
            }
        });
    }

    function getFilterLabel(filterKey, filterValue) {
        const labels = {
            diet: {
                vegetarian: 'Vegetarian',
                vegan: 'Vegan',
                glutenFree: 'Gluten Free',
                dairyFree: 'Dairy Free',
                nutFree: 'Nut Free'
            },
            type: {
                cakes: 'Cakes',
                'indian-sweets': 'Indian Sweets',
                meringues: 'Meringues',
                breakfast: 'Breakfast Desserts',
            },
            time: {
                '30': 'Under 30 min',
                '45': 'Under 45 min',
                '60': 'Under 60 min',
                '120': 'Under 2 hours'
            }
        };

        return labels[filterKey]?.[filterValue] || filterValue;
    }

    function createFilterTag(filterKey, filterValue, label) {
        const tag = document.createElement('div');
        tag.className = 'active-filter-tag';
        tag.innerHTML = `
            <span>${label}</span>
            <button class="remove-filter" data-key="${filterKey}" data-value="${filterValue}">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add remove functionality
        const removeBtn = tag.querySelector('.remove-filter');
        removeBtn.addEventListener('click', function() {
            removeFilter(filterKey, filterValue);
        });

        return tag;
    }

    function removeFilter(key, value) {
        // Reset the specific filter
        switch (key) {
            case 'diet':
                document.getElementById('dietFilter').value = '';
                break;
            case 'type':
                document.getElementById('typeFilter').value = '';
                break;
            case 'time':
                document.getElementById('timeFilter').value = '';
                break;
        }

        // Reapply filters
        applyFilters();
    }

    function filterRecipes(filters) {
        const allRecipes = window.getAllRecipesFlat ? window.getAllRecipesFlat() : [];
        
        let filteredRecipes = allRecipes.filter(recipe => {
            // Diet filter
            if (filters.diet && (!recipe.diet || !recipe.diet.includes(filters.diet))) {
                return false;
            }

            // Type filter
            if (filters.type && recipe.category !== filters.type) {
                return false;
            }

            // Time filter
            if (filters.time && recipe.totalTime > parseInt(filters.time)) {
                return false;
            }

            return true;
        });

        // Update to current recipes and display
        if (window.currentRecipes) {
            window.currentRecipes = filteredRecipes;
        }
        
        if (window.displayRecipesPage) {
            window.displayRecipesPage(filteredRecipes, 1);
        }

        // Show error if no results
        if (filteredRecipes.length === 0) {
            if (window.showNoResultsMessage) {
                window.showNoResultsMessage("No recipes match your current filters.");
            }
        }
    }

    // Make functions globally available
    window.filterRecipes = filterRecipes;
    window.clearAllFilters = clearAllFilters;
}

// Initialize with all recipes on load
document.addEventListener('DOMContentLoaded', function() {
    // Display all recipes initially
    const allRecipes = getAllRecipesFlat();
    if (window.displayRecipesPage) {
        window.displayRecipesPage(allRecipes, 1);
    }
});