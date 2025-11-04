// Recipe Book - Complete JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollToTop();
    initializeRecipeSearch();
    initializeGSAPAnimations();
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

// Enhanced recipe data with specified recipes
const enhancedLocalRecipes = {
    cakes: [
        {
            id: 1,
            title: "Classic Cheesecake",
            description: "Creamy and rich cheesecake with a buttery biscuit base.",
            image: "../Images/cheesecake.jpg",
            prepTime: "30 mins",
            cookTime: "60 mins",
            totalTime: 90,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8,
            ingredients: [
                "200g digestive biscuits",
                "100g butter, melted",
                "600g cream cheese",
                "200g caster sugar",
                "3 large eggs",
                "1 tsp vanilla extract",
                "200ml sour cream"
            ],
            instructions: [
                "Preheat oven to 160°C/140°C fan. Crush biscuits and mix with melted butter.",
                "Press mixture into a 20cm springform tin and chill for 30 minutes.",
                "Beat cream cheese and sugar until smooth. Add eggs one at a time.",
                "Mix in vanilla and sour cream until well combined.",
                "Pour filling over the biscuit base and smooth the top.",
                "Bake for 1 hour until set but still slightly wobbly in the center.",
                "Turn off oven and leave cheesecake inside for 1 hour to cool slowly.",
                "Chill in refrigerator for at least 4 hours before serving."
            ],
            tags: ["creamy", "classic", "rich"]
        },
        {
            id: 2,
            title: "Chocolate Brownie",
            description: "Fudgy, decadent chocolate brownies with a crackly top.",
            image: "../Images/brownie.jpg",
            prepTime: "15 mins",
            cookTime: "25 mins",
            totalTime: 40,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12,
            ingredients: [
                "200g dark chocolate",
                "150g butter",
                "3 large eggs",
                "250g caster sugar",
                "100g plain flour",
                "30g cocoa powder",
                "100g chocolate chips"
            ],
            instructions: [
                "Preheat oven to 180°C/160°C fan. Line a 20cm square tin with baking paper.",
                "Melt chocolate and butter together in a heatproof bowl over simmering water.",
                "Whisk eggs and sugar together until pale and thick.",
                "Fold in the melted chocolate mixture until combined.",
                "Sift in flour and cocoa powder, fold gently until just combined.",
                "Stir in chocolate chips and pour into prepared tin.",
                "Bake for 25-30 minutes until the top is crackly but the center is still slightly soft.",
                "Cool completely in the tin before cutting into squares."
            ],
            tags: ["chocolate", "fudgy", "decadent"]
        },
        {
            id: 3,
            title: "Red Velvet Cake",
            description: "Stunning red velvet cake with cream cheese frosting.",
            image: "../Images/red-velvet.jpg",
            prepTime: "30 mins",
            cookTime: "35 mins",
            totalTime: 65,
            category: "cakes",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 10,
            ingredients: [
                "250g plain flour",
                "2 tbsp cocoa powder",
                "1 tsp baking soda",
                "1 tsp baking powder",
                "1/2 tsp salt",
                "2 large eggs",
                "300g caster sugar",
                "250ml vegetable oil",
                "1 tsp vanilla extract",
                "1 tbsp red food coloring",
                "250ml buttermilk",
                "1 tbsp white vinegar"
            ],
            instructions: [
                "Preheat oven to 180°C/160°C fan. Grease and line two 20cm cake tins.",
                "Sift flour, cocoa, baking soda, baking powder and salt together.",
                "In a separate bowl, whisk eggs and sugar until pale and thick.",
                "Slowly add oil while whisking, then add vanilla and food coloring.",
                "Alternately add flour mixture and buttermilk, beginning and ending with flour.",
                "Mix in vinegar until just combined, then divide between tins.",
                "Bake for 30-35 minutes until a skewer comes out clean.",
                "Cool completely before frosting with cream cheese frosting."
            ],
            tags: ["velvety", "colorful", "celebratory"]
        }
    ],
    meringues: [
        {
            id: 4,
            title: "Lemon Meringue",
            description: "Tangy lemon curd topped with fluffy toasted meringue.",
            image: "../Images/lemon-meringue.jpg",
            prepTime: "45 mins",
            cookTime: "20 mins",
            totalTime: 65,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 8,
            ingredients: [
                "1 pre-baked pastry case",
                "4 lemons, zest and juice",
                "200g caster sugar",
                "4 large eggs, separated",
                "100g butter, cubed",
                "2 tbsp cornflour",
                "200g caster sugar (for meringue)",
                "1 tsp vanilla extract"
            ],
            instructions: [
                "Preheat oven to 180°C/160°C fan.",
                "Make lemon curd: whisk lemon juice, zest, sugar, egg yolks and cornflour in a pan.",
                "Cook over medium heat, stirring constantly until thickened.",
                "Remove from heat and whisk in butter until smooth. Pour into pastry case.",
                "Make meringue: whisk egg whites until stiff peaks form.",
                "Gradually add sugar and vanilla, whisking until glossy and thick.",
                "Spread meringue over lemon curd, making peaks with the back of a spoon.",
                "Bake for 15-20 minutes until meringue is golden. Cool completely."
            ],
            tags: ["tangy", "fluffy", "elegant"]
        },
        {
            id: 5,
            title: "Pavlova",
            description: "Crisp meringue shell with soft center, topped with cream and fruit.",
            image: "../Images/pavlova.jpg",
            prepTime: "25 mins",
            cookTime: "90 mins",
            totalTime: 115,
            category: "meringues",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 8,
            ingredients: [
                "6 large egg whites",
                "300g caster sugar",
                "2 tsp cornflour",
                "2 tsp white vinegar",
                "1 tsp vanilla extract",
                "300ml double cream",
                "2 tbsp icing sugar",
                "Mixed fresh fruits (berries, kiwi, passion fruit)"
            ],
            instructions: [
                "Preheat oven to 150°C/130°C fan. Line a baking tray with parchment.",
                "Whisk egg whites until stiff peaks form.",
                "Gradually add sugar, whisking until thick and glossy.",
                "Fold in cornflour, vinegar and vanilla extract.",
                "Spoon onto prepared tray, shaping into a 20cm circle with raised edges.",
                "Bake for 1½ hours, then turn off oven and leave inside to cool completely.",
                "Whip cream with icing sugar until soft peaks form.",
                "Top meringue with cream and arrange fresh fruits just before serving."
            ],
            tags: ["light", "fruity", "impressive"]
        }
    ],
    "indian-sweets": [
        {
            id: 6,
            title: "Gulab Jamun",
            description: "Soft, melt-in-your-mouth milk balls in fragrant sugar syrup.",
            image: "../Images/gulab-jamun.jpg",
            prepTime: "30 mins",
            cookTime: "25 mins",
            totalTime: 55,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 15,
            ingredients: [
                "1 cup milk powder",
                "1/4 cup plain flour",
                "1/4 tsp baking powder",
                "2 tbsp ghee",
                "4-5 tbsp milk",
                "2 cups sugar",
                "2 cups water",
                "4 cardamom pods, crushed",
                "1 tsp rose water",
                "Oil for deep frying"
            ],
            instructions: [
                "Make sugar syrup: boil sugar, water and cardamom for 10 minutes until slightly thick.",
                "Add rose water and set aside to cool.",
                "Mix milk powder, flour and baking powder in a bowl.",
                "Rub in ghee, then gradually add milk to form a soft dough.",
                "Shape into smooth, crack-free balls about 2cm in diameter.",
                "Heat oil on medium heat (160°C) and fry balls until golden brown.",
                "Drain and immediately soak in warm sugar syrup for 4-6 hours.",
                "Serve warm or at room temperature."
            ],
            tags: ["milky", "syrupy", "festive"]
        },
        {
            id: 7,
            title: "Burfee",
            description: "Rich, fudge-like sweet made with milk and sugar.",
            image: "../Images/burfee.jpg",
            prepTime: "15 mins",
            cookTime: "30 mins",
            totalTime: 45,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "medium",
            servings: 12,
            ingredients: [
                "4 cups full-fat milk powder",
                "1 cup sugar",
                "1/2 cup ghee",
                "1/2 cup milk",
                "1/4 tsp cardamom powder",
                "2 tbsp chopped pistachios",
                "1 tbsp chopped almonds"
            ],
            instructions: [
                "Grease a square tray and set aside.",
                "Heat ghee in a heavy-bottomed pan on medium heat.",
                "Add milk powder and roast for 5-7 minutes until fragrant.",
                "In a separate pan, heat milk and sugar until sugar dissolves.",
                "Add milk mixture to the roasted milk powder, stirring continuously.",
                "Cook for 10-15 minutes until the mixture thickens and leaves the sides of the pan.",
                "Add cardamom powder and mix well.",
                "Press into prepared tray, sprinkle with nuts and press down.",
                "Cool completely, then cut into squares or diamonds."
            ],
            tags: ["fudgy", "milky", "nutty"]
        },
        {
            id: 8,
            title: "Chana Magaj",
            description: "Traditional gram flour sweet with ghee and sugar.",
            image: "../Images/chana-magaj.jpg",
            prepTime: "20 mins",
            cookTime: "40 mins",
            totalTime: 60,
            category: "indian-sweets",
            diet: ["vegetarian"],
            difficulty: "hard",
            servings: 10,
            ingredients: [
                "2 cups chickpea flour (besan)",
                "1 cup ghee",
                "1 cup sugar",
                "1/2 cup water",
                "1/4 tsp cardamom powder",
                "2 tbsp chopped almonds",
                "2 tbsp chopped pistachios",
                "1 tsp rose water"
            ],
            instructions: [
                "Grease a square tray and set aside.",
                "Heat ghee in a heavy-bottomed pan, add chickpea flour.",
                "Roast on low heat for 20-25 minutes until golden and fragrant.",
                "Make sugar syrup: boil sugar and water until one-string consistency.",
                "Slowly add sugar syrup to the roasted flour, stirring continuously.",
                "Cook for 10 minutes until the mixture thickens and leaves the sides.",
                "Add cardamom powder and rose water, mix well.",
                "Pour into prepared tray, sprinkle with nuts and press down.",
                "Cool completely before cutting into pieces."
            ],
            tags: ["nutty", "traditional", "rich"]
        }
    ],
    breakfast: [
        {
            id: 9,
            title: "Classic Pancakes",
            description: "Fluffy, golden pancakes perfect for weekend breakfast.",
            image: "../Images/pancakes.jpg",
            prepTime: "10 mins",
            cookTime: "15 mins",
            totalTime: 25,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 4,
            ingredients: [
                "200g self-raising flour",
                "1 tsp baking powder",
                "2 tbsp caster sugar",
                "2 large eggs",
                "200ml milk",
                "2 tbsp melted butter",
                "1 tsp vanilla extract",
                "Maple syrup and butter to serve"
            ],
            instructions: [
                "Mix flour, baking powder and sugar in a large bowl.",
                "In another bowl, whisk eggs, milk, melted butter and vanilla.",
                "Make a well in the dry ingredients and pour in the wet mixture.",
                "Gently mix until just combined (do not overmix).",
                "Heat a non-stick pan over medium heat and lightly grease.",
                "Pour 1/4 cup batter for each pancake.",
                "Cook until bubbles appear on the surface, then flip.",
                "Cook until golden brown on both sides.",
                "Serve warm with maple syrup and butter."
            ],
            tags: ["fluffy", "quick", "classic"]
        },
        {
            id: 10,
            title: "Cappuccino Muffins",
            description: "Coffee-flavored muffins with a sweet streusel topping.",
            image: "../Images/cappuccino-muffins.jpg",
            prepTime: "15 mins",
            cookTime: "20 mins",
            totalTime: 35,
            category: "breakfast",
            diet: ["vegetarian"],
            difficulty: "easy",
            servings: 12,
            ingredients: [
                "280g plain flour",
                "2 tsp baking powder",
                "1/2 tsp baking soda",
                "1/2 tsp salt",
                "2 tbsp instant coffee",
                "120ml hot water",
                "120ml milk",
                "120g butter, melted",
                "2 large eggs",
                "200g light brown sugar",
                "1 tsp vanilla extract",
                "100g chocolate chips"
            ],
            instructions: [
                "Preheat oven to 200°C/180°C fan. Line a 12-hole muffin tin.",
                "Dissolve coffee in hot water and let cool slightly.",
                "Mix flour, baking powder, baking soda and salt in a large bowl.",
                "In another bowl, whisk coffee mixture, milk, melted butter, eggs, sugar and vanilla.",
                "Combine wet and dry ingredients, fold in chocolate chips.",
                "Divide batter among muffin cases, filling 3/4 full.",
                "Bake for 18-20 minutes until risen and golden.",
                "Cool in tin for 5 minutes, then transfer to a wire rack."
            ],
            tags: ["coffee", "chocolate", "morning"]
        }
    ]
};

// Recipe Search and Filtering Function
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

    function filterByCategory(category) {
        if (!resultsTitle || !recipeGrid) return;

        const categoryRecipes = enhancedLocalRecipes[category] || [];
        const categoryName = getCategoryDisplayName(category);
        
        resultsTitle.textContent = `${categoryName}`;
        currentRecipes = categoryRecipes;
        isCategoryView = true;
        currentCategory = category;
        
        showRecipesPage();
        displayRecipesPage(currentRecipes, 1);
        updateLoadMoreButton();
        
        // Show error message if no recipes in category
        if (categoryRecipes.length === 0) {
            showNoResultsMessage(`No ${categoryName} recipes found.`);
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
            let searchResults = searchLocalRecipes(searchTerm);

            resultsTitle.textContent = `Search Results for "${searchTerm}"`;
            currentRecipes = searchResults;
            isCategoryView = false;
            currentCategory = '';
            displayRecipesPage(currentRecipes, 1);
            updateLoadMoreButton();

            // Show error if no results
            if (searchResults.length === 0) {
                showNoResultsMessage(`No recipes found for "${searchTerm}". Try different keywords.`);
            }

        } catch (error) {
            console.error('Search error:', error);
            showNoResultsMessage('Search failed. Please check your connection and try again.');
        }
    }

    function searchLocalRecipes(query) {
        const allRecipes = getAllRecipesFlat();
        return allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))) ||
            (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query)))
        );
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
            <div class="recipe-card" data-id="${recipe.id}">
                <div class="recipe-badges">
                    ${recipe.diet && recipe.diet.map(diet => `
                        <span class="recipe-badge badge-diet">${diet}</span>
                    `).join('')}
                    <span class="recipe-badge badge-time">${recipe.totalTime}min</span>
                    <span class="recipe-badge badge-difficulty">${recipe.difficulty}</span>
                </div>
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" onerror="this.src='../Images/placeholder-recipe.jpg'">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.totalTime} min</span>
                        <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}" 
                                onclick="toggleFavorite(${recipe.id}, this, 'local')">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="view-recipe-btn" onclick="viewRecipe(${recipe.id}, 'local')">
                            <i class="fas fa-eye"></i> View Recipe
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update results count
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
        
        // Update results count
        updateResultsCount(0, 0);
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
        // Create results count element if it doesn't exist
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

    function showLoading(container) {
        if (!container) return;
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching recipes...</div>';
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
}

// Filter System Functionality
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

        // Update active filters display
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
                cookies: 'Cookies',
                pastries: 'Pastries'
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

        // Update current recipes and display
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
}

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

window.viewRecipe = function(recipeId, source) {
    // Store the recipe data for the recipe details page
    const recipeData = {
        id: recipeId,
        source: source
    };
    
    sessionStorage.setItem('currentRecipe', JSON.stringify(recipeData));
    
    // Navigate to recipe details page
    window.location.href = 'recipedetails.html';
};

// GSAP Animations
function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Animate category cards on load
    gsap.fromTo('.category-card', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );

    // Animate banner
    gsap.fromTo('.banner h2', 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo('.banner img', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.8, ease: "back.out(1.7)" }
    );

    // Animate filter section
    gsap.fromTo('.filter-section', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.2, ease: "power2.out" }
    );

    // Floating animation for category cards on hover
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Animate filter buttons on hover
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.2 });
        });
    });
}

// Utility function to animate new recipe cards
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