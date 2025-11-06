document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeScrollToTop();
    initializeRecipeSearch();
    initializeFilterSystem();
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
            image: "../Images/Cheesecake.png",
            totalTime: 90,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8
        },
        {
            id: 2,
            title: "Chocolate Brownie",
            description: "Fudgy, decadent chocolate brownies with a crackly top.",
            image: "../Images/Brownie.png",
            totalTime: 40,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12
        },
        {
            id: 3,
            title: "Red Velvet Cake",
            description: "Stunning red velvet cake with cream cheese frosting.",
            image: "../Images/redvelvet.png",
            totalTime: 65,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 10
        }
    ],
    meringues: [
        {
            id: 4,
            title: "Lemon Meringue",
            description: "Tangy lemon curd topped with fluffy toasted meringue.",
            image: "../Images/LMeringue.png",
            totalTime: 65,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 8
        },
        {
            id: 5,
            title: "Pavlova",
            description: "Crisp meringue shell with soft center, topped with cream and fruit.",
            image: "../Images/Pavlova.png",
            totalTime: 115,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8
        }
    ],
    "indian-sweets": [
        {
            id: 6,
            title: "Gulab Jamun",
            description: "Soft, melt-in-your-mouth milk balls in fragrant sugar syrup.",
            image: "../Images/Gulab.png",
            totalTime: 55,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 15
        },
        {
            id: 7,
            title: "Burfee",
            description: "Rich, fudge-like sweet made with milk and sugar.",
            image: "../Images/Burfee.png",
            totalTime: 45,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 12
        },
        {
            id: 8,
            title: "Chana Magaj",
            description: "Traditional gram flour sweet with ghee and sugar.",
            image: "../Images/Magaj.png",
            totalTime: 60,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 10
        }
    ],
    breakfast: [
        {
            id: 9,
            title: "Classic Pancakes",
            description: "Fluffy, golden pancakes perfect for weekend breakfast.",
            image: "../Images/Pancakes2.png",
            totalTime: 25,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 4
        },
        {
            id: 10,
            title: "Cappuccino Muffins",
            description: "Coffee-flavored muffins with a sweet streusel topping.",
            image: "../Images/capmuffin.png",
            totalTime: 35,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12
        }
    ]
};

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
// Helper methods for mapping categories and diets
static mapSpoonacularCategory(dishTypes) {
    if (!dishTypes || dishTypes.length === 0) return 'cakes'; // Default to cakes for desserts
    
    const types = dishTypes.map(type => type.toLowerCase());
    
    // Expanded dessert category mapping
    if (types.some(type => 
        ['dessert', 'cake', 'pastry', 'pie', 'tart', 'cookie', 'biscuit', 
         'pudding', 'sweet', 'candy', 'chocolate', 'bakery', 'baking'].includes(type)
    )) {
        // More specific mapping
        if (types.some(t => ['cake', 'cupcake', 'cheesecake', 'sponge'].includes(t))) return 'cakes';
        if (types.some(t => ['cookie', 'biscuit', 'shortbread'].includes(t))) return 'cakes'; // Map to cakes since we don't have cookies category
        if (types.some(t => ['meringue', 'pavlova', 'souffle'].includes(t))) return 'meringues';
        if (types.some(t => ['indian', 'asian', 'middle eastern'].includes(t))) return 'indian-sweets';
        if (types.some(t => ['breakfast', 'pancake', 'waffle', 'muffin', 'doughnut'].includes(t))) return 'breakfast';
        
        return 'cakes'; // default to cakes for other desserts
    }
    
    if (types.some(t => ['breakfast', 'brunch', 'pancake', 'waffle', 'muffin'].includes(t))) return 'breakfast';
    
    return 'cakes'; // Default to cakes for unknown types
}

static mapEdamamCategory(mealType) {
    if (!mealType || mealType.length === 0) return 'cakes';
    
    const types = mealType.map(type => type.toLowerCase());
    
    if (types.some(t => ['breakfast', 'brunch'].includes(t))) return 'breakfast';
    if (types.some(t => ['dessert', 'snack', 'teatime'].includes(t))) return 'cakes';
    if (types.some(t => ['lunch', 'dinner'].includes(t))) return 'cakes'; // Map main meals to cakes for dessert search
    
    return 'cakes'; // Default to cakes
}

static mapSpoonacularDiets(diets) {
    if (!diets) return ['vegetarian']; // Default to vegetarian for desserts
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
    // Favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];

    // DOM Elements
    const categoryCards = document.querySelectorAll('.category-card');
    const recipeSearch = document.getElementById('recipeSearch');
    const searchBtn = document.getElementById('searchBtn');
    const recipeGrid = document.getElementById('recipeGrid');
    const resultsTitle = document.getElementById('results-title');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const categoriesPage = document.getElementById('categories-page');
    const recipesPage = document.getElementById('recipes-page');

    // Pagination
    let currentPage = 1;
    const recipesPerPage = 8;
    let currentRecipes = [];
    let isCategoryView = false;
    let currentCategory = '';

    // Initialize event listeners
    initializeEventListeners();

    function initializeEventListeners() {
        // Category card click event
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            });
        });

        // Basic search function
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

        // Load more function
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreRecipes);
        }
    }

    function getAllRecipesFlat() {
        const allRecipes = [];
        Object.values(enhancedLocalRecipes).forEach(category => {
            allRecipes.push(...category);
        });
        return allRecipes;
    }

    function showRecipesPage() {
        if (categoriesPage) categoriesPage.style.display = 'none';
        if (recipesPage) recipesPage.style.display = 'block';
    }

    function showCategoriesPage() {
        if (categoriesPage) categoriesPage.style.display = 'block';
        if (recipesPage) recipesPage.style.display = 'none';
    }

    // filterByCategory function
    async function filterByCategory(category) {
        if (!resultsTitle || !recipeGrid) return;

        showLoading(recipeGrid);
        showRecipesPage();

        try {
            let categoryRecipes = [];
            
            // Use local data for category filtering
            categoryRecipes = enhancedLocalRecipes[category] || [];

            const categoryName = getCategoryDisplayName(category);
            
            resultsTitle.textContent = `${categoryName}`;
            currentRecipes = categoryRecipes;
            isCategoryView = true;
            currentCategory = category;

        displayRecipesPage(currentRecipes, 1);
        updateLoadMoreButton();
        
        // Show error message if no recipes in category
        if (categoryRecipes.length === 0) {
            showNoResultsMessage(`No ${categoryName} recipes found.`);
        }
    } catch (error) {
            console.error('Category filter error:', error);
            showNoResultsMessage('Failed to load recipes. Please try again.');
        }
    }

    function getCategorySearchQuery(category) {
        const queries = {
            'cakes': 'cake dessert sweet',
            'meringues': 'meringue dessert',
            'indian-sweets': 'indian dessert sweet',
            'breakfast': 'breakfast pancake muffin'
        };
        return queries[category] || category;
    }

    function getCategoryDisplayName(category) {
        const names = {
            'cakes': 'Cakes',
            'meringues': 'Meringues',
            'indian-sweets': 'Indian Sweets',
            'breakfast': 'Breakfast Desserts'
        };
        return names[category] || category;
    }

    async function performBasicSearch() {
        const searchTerm = recipeSearch.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            showCategoriesPage();
            return;
        }

        if (!resultsTitle || !recipeGrid) return;

        // Show loading state
        showLoading(recipeGrid);
        showRecipesPage();

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

        resultsTitle.textContent = `Search Results for "${searchTerm}"`;
        currentRecipes = searchResults;
        isCategoryView = false;
        currentCategory = '';
        displayRecipesPage(currentRecipes, 1);
        updateLoadMoreButton();

            // Show error if no results
            if (searchResults.length === 0) {
                showNoResultsMessage(`No recipes found for "${searchTerm}". Try different keywordslike "cake", "cookies", or "pudding".`);
            }

        } catch (error) {
            console.error('Search error:', error);
            // Fallback to local search
            const searchResults = searchLocalRecipes(searchTerm);
            if (searchResults.length === 0) {
            searchResults = broaderLocalSearch(searchTerm);
            }
            currentRecipes = searchResults;
            displayRecipesPage(currentRecipes, 1);
            
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

    function displayRecipesPage(recipes, page) {
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
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" onerror="this.src='../Images/placeholder-recipe.jpg'">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.totalTime} min</span>
                        <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                        <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                    </div>
                    <div class="recipe-actions">
                    <button class="view-recipe-btn" onclick="viewRecipe(${recipe.id}, '${recipe.source}')">
                        <i class="fas fa-eye"></i> View Recipe
                    </button>
                    </div>
                </div>
            </div>
        `).join('');

        // To update results count
        updateResultsCount(recipes.length, recipesToShow.length);
        
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
                <button onclick="clearAllFilters()" class="view-recipe-btn">Clear All Filters</button>
            </div>
        `;
        
        // Hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        
        // To update results count
        updateResultsCount(0, 0);
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

    function loadMoreRecipes() {
        currentPage++;
        displayRecipesPage(currentRecipes, currentPage);
        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const totalRecipes = currentRecipes.length;
        const displayedRecipes = Math.min(currentPage * recipesPerPage, totalRecipes);
        
        if (displayedRecipes >= totalRecipes) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
            loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Load More (${totalRecipes - displayedRecipes} remaining)`;
        }
    }

    function updateResultsCount(total, showing) {
        let resultsCount = document.getElementById('resultsCount');
        if (!resultsCount) {
            resultsCount = document.createElement('div');
            resultsCount.id = 'resultsCount';
            resultsCount.className = 'results-count';
            if (resultsTitle && resultsTitle.parentNode) {
                resultsTitle.parentNode.insertBefore(resultsCount, resultsTitle.nextSibling);
            }
        }

        if (total === 0) {
            resultsCount.textContent = 'No recipes found';
        } else if (showing < total) {
            resultsCount.textContent = `Showing ${showing} of ${total} recipes`;
        } else {
            resultsCount.textContent = `${total} recipe${total !== 1 ? 's' : ''}`;
        }
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

    // Make functions available globally for filter system
    window.getAllRecipesFlat = getAllRecipesFlat;
    window.displayRecipesPage = displayRecipesPage;
    window.currentRecipes = currentRecipes;
    window.isCategoryView = isCategoryView;
    window.currentCategory = currentCategory;
    window.filterByCategory = filterByCategory;
    window.showNoResultsMessage = showNoResultsMessage;
}


// --- Filter System Function ---
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

        // Show categories page when clearing filters
        const categoriesPage = document.getElementById('categories-page');
        const recipesPage = document.getElementById('recipes-page');
        if (categoriesPage) categoriesPage.style.display = 'block';
        if (recipesPage) recipesPage.style.display = 'none';
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

        // Show recipes page
        const categoriesPage = document.getElementById('categories-page');
        const recipesPage = document.getElementById('recipes-page');
        if (categoriesPage) categoriesPage.style.display = 'none';
        if (recipesPage) recipesPage.style.display = 'block';

        // Update to current recipes and display
        if (window.currentRecipes) {
            window.currentRecipes = filteredRecipes;
        }
        
        if (window.displayRecipesPage) {
            window.displayRecipesPage(filteredRecipes, 1);
        }

        // Update results title and show error if no results
        const resultsTitle = document.getElementById('results-title');
        if (resultsTitle) {
            if (filteredRecipes.length === 0) {
                resultsTitle.textContent = "No Recipes Found";
                if (window.showNoResultsMessage) {
                    window.showNoResultsMessage("No recipes match your current filters.");
                }
            } else if (Object.values(filters).some(val => val)) {
                resultsTitle.textContent = "Filtered Recipes";
            } else if (window.isCategoryView && window.currentCategory) {
                const categoryName = getCategoryDisplayName(window.currentCategory);
                resultsTitle.textContent = categoryName;
            } else {
                resultsTitle.textContent = "All Recipes";
            }
        }
    }

    function getCategoryDisplayName(category) {
        const names = {
            'cakes': 'Cakes',
            'meringues': 'Meringues',
            'indian-sweets': 'Indian Sweets',
            'breakfast': 'Breakfast Desserts'
        };
        return names[category] || category;
    }

    // Make functions globally available
    window.filterRecipes = filterRecipes;
    window.clearAllFilters = clearAllFilters;
};

// Global functions for recipe interaction
window.toggleFavorite = function(recipeId, button, source) {
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const favoriteKey = `${source}_${recipeId}`;
    
    if (favorites.includes(favoriteKey)) {
        favorites = favorites.filter(id => id !== favoriteKey);
        button.classList.remove('active');
    } else {
        favorites.push(favoriteKey);
        button.classList.add('active');
    }
    
    localStorage.setItem('nibblyFavorites', JSON.stringify(favorites));
};

    //viewRecipe function to handle API sources
    window.viewRecipe = function(recipeId, source = 'local') {
    console.log('View Recipe clicked:', { recipeId, source });
    
    // Store the recipe ID and source for the recipe details page
    sessionStorage.setItem('currentRecipeId', recipeId.toString());
    sessionStorage.setItem('recipeSource', source);
    
    // Navigate to recipe details page
    window.location.href = 'Recipedetails.html';
};


