// API Keys
const SPOONACULAR_API_KEY = 'e983813986ce447287b5664a1l45662a';
const EDAMAM_APP_ID = 'ced607f2';
const EDAMAM_APP_KEY = '66208284ce22f426737dc243';

// Local recipe data as fallback
const localRecipes = {
    1: {
        id: 1,
        title: "Classic Vanilla Cake",
        description: "A light and fluffy vanilla cake perfect for any celebration.",
        image: "../Images/vanilla-cake.jpg",
        prepTime: "30 mins",
        cookTime: "35 mins",
        totalTime: 65,
        servings: 8,
        difficulty: "Easy",
        category: "cakes",
        diet: ["vegetarian"],
        ingredients: [
            "2 cups all-purpose flour",
            "1 1/2 cups granulated sugar",
            "1/2 cup unsalted butter, softened",
            "3 large eggs",
            "1 cup milk",
            "2 tsp vanilla extract",
            "2 tsp baking powder",
            "1/2 tsp salt"
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
        id: 2,
        title: "Chocolate Fudge Cake",
        description: "Rich and decadent chocolate cake with fudge frosting.",
        image: "../Images/chocolate-cake.jpg",
        prepTime: "25 mins",
        cookTime: "40 mins",
        totalTime: 65,
        servings: 10,
        difficulty: "Medium",
        category: "cakes",
        diet: ["vegetarian"],
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
    },
    3: {
        id: 3,
        title: "Gulab Jamun",
        description: "Soft, melt-in-your-mouth Indian sweet in rose-flavored syrup.",
        image: "../Images/gulab-jamun.jpg",
        prepTime: "20 mins",
        cookTime: "25 mins",
        totalTime: 45,
        servings: 6,
        difficulty: "Medium",
        category: "indian-sweets",
        diet: ["vegetarian"],
        ingredients: [
            "1 cup milk powder",
            "1/4 cup all-purpose flour",
            "1/4 tsp baking powder",
            "2 tbsp ghee",
            "3-4 tbsp milk",
            "1 cup sugar",
            "1 cup water",
            "1/2 tsp cardamom powder",
            "1 tsp rose water",
            "Oil for frying"
        ],
        instructions: [
            "Mix milk powder, flour, and baking powder in a bowl.",
            "Add ghee and rub into the flour mixture.",
            "Gradually add milk to form a soft dough.",
            "Shape into small smooth balls.",
            "Heat oil on medium heat and fry until golden brown.",
            "Prepare sugar syrup with rose water and cardamom.",
            "Soak fried balls in warm syrup for 2-3 hours."
        ]
    },
    4: {
        id: 4,
        title: "Rasgulla",
        description: "Soft, spongy cheese balls in light sugar syrup.",
        image: "../Images/rasgulla.jpg",
        prepTime: "30 mins",
        cookTime: "20 mins",
        totalTime: 50,
        servings: 8,
        difficulty: "Medium",
        category: "indian-sweets",
        diet: ["vegetarian"],
        ingredients: [
            "1 liter full-fat milk",
            "2 tbsp lemon juice",
            "1 cup sugar",
            "4 cups water",
            "1/2 tsp cardamom powder",
            "1 tsp rose water"
        ],
        instructions: [
            "Boil milk and add lemon juice to curdle.",
            "Strain through muslin cloth to get chenna.",
            "Knead chenna until smooth and form small balls.",
            "Prepare sugar syrup with cardamom and rose water.",
            "Boil the balls in syrup for 15-20 minutes.",
            "Cool and serve chilled."
        ]
    },
    5: {
        id: 5,
        title: "Classic French Meringue",
        description: "Light and airy meringue cookies with crisp exterior.",
        image: "../Images/meringue.jpg",
        prepTime: "20 mins",
        cookTime: "90 mins",
        totalTime: 110,
        servings: 12,
        difficulty: "Easy",
        category: "meringues",
        diet: ["vegetarian"],
        ingredients: [
            "4 large egg whites",
            "1 cup granulated sugar",
            "1/4 tsp cream of tartar",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 200°F (95°C). Line baking sheets with parchment.",
            "Beat egg whites with cream of tartar until soft peaks form.",
            "Gradually add sugar, beating until stiff glossy peaks.",
            "Fold in vanilla.",
            "Pipe or spoon meringue onto prepared sheets.",
            "Bake for 90 minutes, then turn off oven and leave meringues inside for 1 hour."
        ]
    },
    6: {
        id: 6,
        title: "Pavlova",
        description: "Crisp meringue shell with soft marshmallow center.",
        image: "../Images/pavlova.jpg",
        prepTime: "25 mins",
        cookTime: "60 mins",
        totalTime: 85,
        servings: 8,
        difficulty: "Medium",
        category: "meringues",
        diet: ["vegetarian"],
        ingredients: [
            "4 large egg whites",
            "1 cup granulated sugar",
            "1 tsp cornstarch",
            "1 tsp white vinegar",
            "1 tsp vanilla extract",
            "1 cup heavy cream",
            "2 cups mixed fresh fruits",
            "2 tbsp powdered sugar"
        ],
        instructions: [
            "Preheat oven to 300°F (150°C). Line baking sheet with parchment.",
            "Beat egg whites until stiff peaks form.",
            "Gradually add sugar, then cornstarch, vinegar, and vanilla.",
            "Shape into a circle on baking sheet.",
            "Bake for 60 minutes, then cool in oven.",
            "Whip cream with powdered sugar and spread over meringue.",
            "Top with fresh fruits and serve immediately."
        ]
    },
    7: {
        id: 7,
        title: "Blueberry Pancakes",
        description: "Fluffy pancakes bursting with fresh blueberries.",
        image: "../Images/blueberry-pancakes.jpg",
        prepTime: "10 mins",
        cookTime: "15 mins",
        totalTime: 25,
        servings: 4,
        difficulty: "Easy",
        category: "breakfast",
        diet: ["vegetarian"],
        ingredients: [
            "1 cup all-purpose flour",
            "2 tbsp sugar",
            "2 tsp baking powder",
            "1/2 tsp salt",
            "1 cup milk",
            "1 large egg",
            "2 tbsp melted butter",
            "1 cup fresh blueberries",
            "Maple syrup for serving"
        ],
        instructions: [
            "Mix dry ingredients in a bowl.",
            "In another bowl, mix milk, egg, and melted butter.",
            "Combine wet and dry ingredients, fold in blueberries.",
            "Heat griddle over medium heat and lightly grease.",
            "Pour 1/4 cup batter for each pancake.",
            "Cook until bubbles form, then flip and cook until golden.",
            "Serve with maple syrup and butter."
        ]
    },
    8: {
        id: 8,
        title: "Cinnamon Rolls",
        description: "Soft rolls with cinnamon sugar and cream cheese frosting.",
        image: "../Images/cinnamon-rolls.jpg",
        prepTime: "25 mins",
        cookTime: "25 mins",
        totalTime: 50,
        servings: 12,
        difficulty: "Medium",
        category: "breakfast",
        diet: ["vegetarian"],
        ingredients: [
            "2 3/4 cups all-purpose flour",
            "1/4 cup sugar",
            "1 packet instant yeast",
            "1/2 cup milk",
            "1/4 cup water",
            "1/4 cup butter",
            "1 large egg",
            "1/2 cup brown sugar",
            "1 1/2 tbsp cinnamon",
            "1/4 cup butter, softened"
        ],
        instructions: [
            "Prepare dough and let rise for 1 hour.",
            "Roll out dough into a rectangle.",
            "Spread with softened butter, then cinnamon-sugar mixture.",
            "Roll up tightly and cut into 12 slices.",
            "Place in baking pan and let rise for 30 minutes.",
            "Bake at 375°F (190°C) for 25 minutes.",
            "Frost with cream cheese icing while warm."
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const recipeData = JSON.parse(sessionStorage.getItem('currentRecipe'));
    const recipeDetails = document.getElementById('recipeDetails');
    
    if (!recipeData || !recipeDetails) {
        recipeDetails.innerHTML = '<div class="error-message">Recipe not found. Please go back and select a recipe.</div>';
        return;
    }
    
    // Show loading state
    recipeDetails.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading recipe details...</div>';
    
    // Fetch recipe details based on source
    fetchRecipeDetails(recipeData.id, recipeData.source)
        .then(recipe => {
            displayRecipeDetails(recipe);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            recipeDetails.innerHTML = '<div class="error-message">Failed to load recipe details. Please try again.</div>';
        });
});

async function fetchRecipeDetails(recipeId, source) {
    switch (source) {
        case 'spoonacular':
            return await fetchSpoonacularRecipeDetails(recipeId);
        case 'edamam':
            return await fetchEdamamRecipeDetails(recipeId);
        case 'local':
        default:
            return getLocalRecipeDetails(recipeId);
    }
}

async function fetchSpoonacularRecipeDetails(recipeId) {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('Failed to fetch recipe details from Spoonacular');
    }
    
    const data = await response.json();
    
    return {
        id: data.id,
        title: data.title,
        description: data.summary ? data.summary.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 'No description available.',
        image: data.image,
        prepTime: data.readyInMinutes ? `${data.readyInMinutes} mins` : "N/A",
        cookTime: data.readyInMinutes ? `${data.readyInMinutes} mins` : "N/A",
        totalTime: data.readyInMinutes || 0,
        servings: data.servings || 4,
        difficulty: "Medium", // Spoonacular doesn't provide difficulty
        category: data.dishTypes ? data.dishTypes[0] : "Dessert",
        diet: data.diets || [],
        ingredients: data.extendedIngredients ? data.extendedIngredients.map(ing => ing.original) : [],
        instructions: data.analyzedInstructions && data.analyzedInstructions[0] 
            ? data.analyzedInstructions[0].steps.map(step => step.step)
            : ['No instructions available.'],
        source: 'spoonacular'
    };
}

async function fetchEdamamRecipeDetails(recipeId) {
    // Note: Edamam API doesn't have a direct endpoint for recipe details by ID
    // We'll need to search again and find the specific recipe
    const response = await fetch(
        `https://api.edamam.com/search?r=${encodeURIComponent(recipeId)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('Failed to fetch recipe details from Edamam');
    }
    
    const data = await response.json();
    
    if (!data[0]) {
        throw new Error('Recipe not found in Edamam');
    }
    
    const recipe = data[0];
    
    return {
        id: recipe.uri.split('#')[1],
        title: recipe.label,
        description: recipe.source,
        image: recipe.image,
        prepTime: "N/A",
        cookTime: recipe.totalTime ? `${recipe.totalTime} mins` : "N/A",
        totalTime: recipe.totalTime || 0,
        servings: recipe.yield || 4,
        difficulty: "Medium",
        category: recipe.mealType ? recipe.mealType[0] : "Dessert",
        diet: recipe.healthLabels || [],
        ingredients: recipe.ingredientLines || [],
        instructions: recipe.ingredientLines, // Use ingredients as basic instructions
        source: 'edamam'
    };
}

function getLocalRecipeDetails(recipeId) {
    const recipe = localRecipes[recipeId];
    if (!recipe) {
        throw new Error('Local recipe not found');
    }
    return {
        ...recipe,
        source: 'local'
    };
}

function displayRecipeDetails(recipe) {
    const recipeDetails = document.getElementById('recipeDetails');
    
    recipeDetails.innerHTML = `
        <div class="recipe-header">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='../Images/placeholder-recipe.jpg'">
            </div>
            <div class="recipe-info">
                <h1>${recipe.title}</h1>
                <p>${recipe.description}</p>
                
                <div class="recipe-meta-details">
                    <div class="meta-item">
                        <span class="meta-label">Prep Time</span>
                        <span class="meta-value">${recipe.prepTime}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Cook Time</span>
                        <span class="meta-value">${recipe.cookTime}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Total Time</span>
                        <span class="meta-value">${recipe.totalTime} mins</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Servings</span>
                        <span class="meta-value">${recipe.servings}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Difficulty</span>
                        <span class="meta-value">${recipe.difficulty}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Category</span>
                        <span class="meta-value">${recipe.category}</span>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="action-btn" onclick="printRecipe()">
                        <i class="fas fa-print"></i> Print Recipe
                    </button>
                    <button class="action-btn" onclick="shareRecipe('${recipe.title}', '${window.location.href}')">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                    <button class="action-btn" id="favoriteBtn" onclick="toggleFavoriteDetail('${recipe.id}', '${recipe.source}')">
                        <i class="fas fa-heart"></i> Favorite
                    </button>
                </div>
            </div>
        </div>
        
        <div class="recipe-content">
            <div class="ingredients-section">
                <h2>Ingredients</h2>
                <ul id="ingredientsList">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="instructions-section">
                <h2>Instructions</h2>
                <ol id="instructionsList">
                    ${recipe.instructions.map((instruction, index) => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;
    
    // Update favorite button state
    updateFavoriteButton(recipe.id, recipe.source);
    
    // Animate the recipe details
    animateRecipeDetails();
}

function updateFavoriteButton(recipeId, source) {
    const favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favoriteKey = `${source}_${recipeId}`;
    
    if (favorites.includes(favoriteKey)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: #FFC9E2;"></i> Favorited';
        favoriteBtn.classList.add('active');
    }
}

function toggleFavoriteDetail(recipeId, source) {
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favoriteKey = `${source}_${recipeId}`;
    
    if (favorites.includes(favoriteKey)) {
        favorites = favorites.filter(id => id !== favoriteKey);
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorite';
        favoriteBtn.classList.remove('active');
    } else {
        favorites.push(favoriteKey);
        favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: #FFC9E2;"></i> Favorited';
        favoriteBtn.classList.add('active');
    }
    
    localStorage.setItem('nibblyFavorites', JSON.stringify(favorites));
}

function printRecipe() {
    window.print();
}

function shareRecipe(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this amazing recipe: ${title}`,
            url: url
        }).catch(err => {
            console.log('Error sharing:', err);
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Recipe link copied to clipboard!');
    }).catch(err => {
        console.log('Failed to copy: ', err);
        alert('Please copy the URL manually: ' + text);
    });
}

function animateRecipeDetails() {
    if (typeof gsap !== 'undefined') {
        gsap.fromTo('.recipe-header', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }
        );
        
        gsap.fromTo('.ingredients-section, .instructions-section', 
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, delay: 0.3 }
        );
    }
}