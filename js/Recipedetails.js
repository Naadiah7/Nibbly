//Recipe Details
// To share the link of the website
function copyPageLink() {
    // Get the current page URL
    const pageUrl = window.location.href;
    
    // Copy to clipboard
    navigator.clipboard.writeText(pageUrl).then(() => {
        // Show success message
        alert('Link copied to clipboard! You can now share it with friends.');
    });
}

// Recipe Details Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeRecipeDetails();
    initializeScrollToTop();
    setupFavoriteButton();
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

async function initializeRecipeDetails() {
    // Get recipe ID and source from sessionStorage
    const recipeId = sessionStorage.getItem('currentRecipeId');
    const recipeSource = sessionStorage.getItem('recipeSource') || 'local';
    
    if (!recipeId) {
        showErrorMessage("No recipe selected. Please select a recipe.");
        return;
    }

    showLoading();

    try {
        let recipe;
        
        if (recipeSource === 'spoonacular') {
            // Fetch recipe details from Spoonacular API
            recipe = await RecipeAPIService.getRecipeDetails(recipeId, 'spoonacular');
        } else if (recipeSource === 'edamam') {
            // For Edamam, they don't have a direct details endpoint
            showErrorMessage("Detailed recipe information not available for this recipe.");
            return;
        } else {
            // Use local recipe data
            recipe = completeRecipeData[recipeId];
        }
        
        if (!recipe) {
            showErrorMessage("Recipe not found. Please select a valid recipe.");
            return;
        }

        // Display recipe details
        displayRecipeDetails(recipe);

    } catch (error) {
        console.error('Error loading recipe details:', error);
        showErrorMessage("Failed to load recipe details. Please try again.");
    }
}

// function to show loading state
function showLoading() {
    const recipeDetails = document.getElementById('recipeDetails');
    if (recipeDetails) {
        recipeDetails.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading recipe details...</p>
            </div>
        `;
    }
}

// Complete recipe data with full details
const completeRecipeData = {
    1: {
        id: 1,
        title: "Classic Cheesecake",
        description: "Creamy and rich cheesecake with a buttery biscuit base.",
        image: "../Images/Cheesecake.png",
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
    2: {
        id: 2,
        title: "Chocolate Brownie",
        description: "Fudgy, decadent chocolate brownies with a crackly top.",
        image: "../Images/Brownie.png",
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
    3: {
        id: 3,
        title: "Red Velvet Cake",
        description: "Stunning red velvet cake with cream cheese frosting.",
        image: "../Images/redvelvet.png",
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
    },
    4: {
        id: 4,
        title: "Lemon Meringue",
        description: "Tangy lemon curd topped with fluffy toasted meringue.",
        image: "../Images/LMeringue.png",
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
    5: {
        id: 5,
        title: "Pavlova",
        description: "Crisp meringue shell with soft center, topped with cream and fruit.",
        image: "../Images/Pavlova.png",
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
    },
    6: {
        id: 6,
        title: "Gulab Jamun",
        description: "Soft, melt-in-your-mouth milk balls in fragrant sugar syrup.",
        image: "../Images/Gulab.png",
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
    7: {
        id: 7,
        title: "Burfee",
        description: "Rich, fudge-like sweet made with milk and sugar.",
        image: "../Images/Burfee.png",
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
    8: {
        id: 8,
        title: "Chana Magaj",
        description: "Traditional gram flour sweet with ghee and sugar.",
        image: "../Images/Magaj.png",
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
    },
    9: {
        id: 9,
        title: "Classic Pancakes",
        description: "Fluffy, golden pancakes perfect for weekend breakfast.",
        image: "../Images/Pancakes2.png",
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
    10: {
        id: 10,
        title: "Cappuccino Muffins",
        description: "Coffee-flavored muffins with a sweet streusel topping.",
        image: "../Images/capmuffin.png",
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
};

function initializeRecipeDetails() {
    // Get recipe ID from sessionStorage
    const recipeId = sessionStorage.getItem('currentRecipeId');
    
    if (!recipeId) {
        showErrorMessage("No recipe selected. Please select a recipe.");
        return;
    }

    // Get recipe data
    const recipe = completeRecipeData[recipeId];
    
    if (!recipe) {
        showErrorMessage("Recipe not found. Please select a valid recipe.");
        return;
    }

    // Display recipe details
    displayRecipeDetails(recipe);
}

function displayRecipeDetails(recipe) {
    // Update page title
    document.title = `${recipe.title} - Nibbly`;
    
    // Update banner
    const bannerImage = document.getElementById('banner-recipe-image');
    const bannerTitle = document.getElementById('banner-recipe-title');
    
    if (bannerImage) {
        bannerImage.src = recipe.image;
        bannerImage.alt = recipe.title;
    }
    
    if (bannerTitle) {
        bannerTitle.textContent = recipe.title;
    }

    // Update recipe details section
    const recipeDetails = document.getElementById('recipeDetails');
    
    if (recipeDetails) {
        recipeDetails.innerHTML = `
            <div class="recipe-header">
                <div class="recipe-image">
                    <img src="${recipe.image}" alt="${recipe.title}" />
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
                            <span class="meta-label">Difficulty</span>
                            <span class="meta-value">${recipe.difficulty}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Servings</span>
                            <span class="meta-value">${recipe.servings}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span class="meta-value">${recipe.category.replace('-', ' ')}</span>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="printRecipe()">
                            <i class="fas fa-print"></i> Print Recipe
                        </button>
                        <button class="action-btn" onclick="shareRecipe()">
                            <i class="fas fa-share"></i> Share Recipe
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
                    <ol id="instructionsList" style="counter-reset: step;">
                        ${recipe.instructions.map((instruction, index) => 
                            `<li><strong>Step ${index + 1}:</strong> ${instruction}</li>`
                        ).join('')}
                    </ol>
                </div>
            </div>
        `;
    }
    
    // Update favorite button state
    updateFavoriteButton(recipe.id);
}

function setupFavoriteButton() {
    const favoriteBtn = document.getElementById('favourite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }
}

function updateFavoriteButton(recipeId) {
    const favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const isFavorite = favorites.includes(parseInt(recipeId));
    
    const emptyHeart = document.getElementById('empty-heart');
    const fullHeart = document.getElementById('full-heart');
    
    if (isFavorite) {
        emptyHeart.style.display = 'none';
        fullHeart.style.display = 'block';
    } else {
        emptyHeart.style.display = 'block';
        fullHeart.style.display = 'none';
    }
}

function toggleFavorite() {
    const recipeId = sessionStorage.getItem('currentRecipeId');
    if (!recipeId) return;
    
    let favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const isFavorite = favorites.includes(parseInt(recipeId));
    
    if (isFavorite) {
        favorites = favorites.filter(id => id !== parseInt(recipeId));
    } else {
        favorites.push(parseInt(recipeId));
    }
    
    localStorage.setItem('nibblyFavorites', JSON.stringify(favorites));
    updateFavoriteButton(parseInt(recipeId));
}


function showErrorMessage(message) {
    const recipeDetails = document.querySelector('.recipe-details');
    
    if (recipeDetails) {
        recipeDetails.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>${message}</h3>
                <button class="view-recipe-btn" onclick="window.history.back()">Go Back</button>
            </div>
        `;
    }
}

// Global functions for recipe details page
window.printRecipe = function() {
    window.print();
};

window.shareRecipe = function() {
    copyPageLink();
};