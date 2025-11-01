    // API Keys - In a real application, these should be stored securely
    const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';
    const EDAMAM_APP_ID = 'YOUR_EDAMAM_APP_ID';
    const EDAMAM_APP_KEY = 'YOUR_EDAMAM_APP_KEY';
    
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const dietFilter = document.getElementById('dietFilter');
    const typeFilter = document.getElementById('typeFilter');
    const ingredientFilter = document.getElementById('ingredientFilter');
    const timeFilter = document.getElementById('timeFilter');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    
    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
      // Load some initial recipes
      fetchInitialRecipes();
    });
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
    
    // Function to fetch initial recipes
    async function fetchInitialRecipes() {
      showLoading();
      
      try {
        // Using Spoonacular API for initial recipes
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=dessert&number=12&apiKey=${SPOONACULAR_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        displayRecipes(data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        showError('Failed to load recipes. Please try again later.');
      }
    }
    
    // Function to perform search with filters
    async function performSearch() {
      const query = searchInput.value.trim();
      const diet = dietFilter.value;
      const type = typeFilter.value;
      const ingredient = ingredientFilter.value.trim();
      const maxTime = timeFilter.value;
      
      showLoading();
      
      try {
        // Build query parameters
        let queryParams = `query=${query || 'dessert'}`;
        
        // Add filters
        if (diet) {
          queryParams += `&diet=${diet}`;
        }
        
        if (type) {
          queryParams += `&type=${type}`;
        }
        
        if (ingredient) {
          queryParams += `&includeIngredients=${ingredient}`;
        }
        
        if (maxTime) {
          queryParams += `&maxReadyTime=${maxTime}`;
        }
        
        // Add dessert-specific parameters
        queryParams += '&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true';
        
        // Using Spoonacular API for search
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?${queryParams}&number=12&apiKey=${SPOONACULAR_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to search recipes');
        }
        
        const data = await response.json();
        displayRecipes(data.results);
      } catch (error) {
        console.error('Error searching recipes:', error);
        showError('Failed to search recipes. Please try again later.');
      }
    }
    
    // Function to display recipes
    function displayRecipes(recipes) {
      if (!recipes || recipes.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No recipes found. Try adjusting your filters.</div>';
        return;
      }
      
      resultsContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
          <div class="recipe-info">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-details">
              ${recipe.readyInMinutes ? `<p><i class="far fa-clock"></i> ${recipe.readyInMinutes} min</p>` : ''}
              ${recipe.servings ? `<p><i class="fas fa-utensils"></i> Serves ${recipe.servings}</p>` : ''}
            </div>
            <div class="recipe-actions">
              <button class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}" 
                      data-id="${recipe.id}">
                <i class="${favorites.includes(recipe.id) ? 'fas' : 'far'} fa-heart"></i>
              </button>
              <button class="view-btn" data-id="${recipe.id}">
                <i class="fas fa-eye"></i> View Recipe
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      // Add event listeners to favorite buttons
      document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
      });
      
      // Add event listeners to view buttons
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', viewRecipe);
      });
    }
    
    // Function to toggle favorite status
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
    
    // Function to view recipe details
    function viewRecipe(e) {
      const recipeId = e.currentTarget.getAttribute('data-id');
      // In a real implementation, this would navigate to a recipe details page
      alert(`Viewing recipe with ID: ${recipeId}. In a complete implementation, this would show full recipe details.`);
    }
    
    // Function to show loading state
    function showLoading() {
      resultsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading recipes...</div>';
    }
    
    // Function to show error message
    function showError(message) {
      resultsContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }
    
    // GSAP animations for page elements
    document.addEventListener('DOMContentLoaded', () => {
      // Animate the search bar and filter section
      if (typeof gsap !== 'undefined') {
        gsap.from('.search-bar', { 
          duration: 0.5, 
          y: -20, 
          opacity: 0, 
          ease: "back.out(1.7)" 
        });
        
        gsap.from('.filter-section', { 
          duration: 0.7, 
          y: 20, 
          opacity: 0, 
          delay: 0.2,
          ease: "power2.out" 
        });
        
        // Stagger animation for recipe cards when they load
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
              const cards = document.querySelectorAll('.recipe-card');
              if (cards.length > 0) {
                gsap.from(cards, {
                  duration: 0.5,
                  y: 30,
                  opacity: 0,
                  stagger: 0.1,
                  ease: "power2.out"
                });
              }
            }
          });
        });
        
        observer.observe(resultsContainer, { childList: true, subtree: true });
      }
    });