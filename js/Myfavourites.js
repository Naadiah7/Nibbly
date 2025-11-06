// Scroll-to-top function
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

// Initialize favorites when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadFavorites();
});

// Complete recipe data with full details
const completeRecipeData = {
    1: {
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
    2: {
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
    3: {
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
    },
    4: {
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
    5: {
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
    },
    6: {
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
    7: {
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
    8: {
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
    },
    9: {
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
    10: {
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
};

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('nibblyFavorites')) || [];
    const favoritesContainer = document.getElementById('favoritesContainer');
    const emptyState = document.getElementById('emptyState');
    
    //console.log('Loading favorites:', favorites);  Debug log
    
    if (favorites.length === 0) {
        if (favoritesContainer) favoritesContainer.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        
        // Animate empty state
        if (typeof gsap !== 'undefined') {
            gsap.from('.empty-state', {
                duration: 0.8,
                opacity: 0,
                scale: 0.8,
                ease: "back.out(1.5)",
                delay: 0.6
            });
        }
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (favoritesContainer) favoritesContainer.style.display = 'grid';
    
    // Clear container
    if (favoritesContainer) {
        favoritesContainer.innerHTML = '';
        
        // Add favorite recipes
        favorites.forEach(recipeId => {
            const numericRecipeId = parseInt(recipeId);
            const recipe = completeRecipeData[numericRecipeId];
            
            if (recipe) {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='../Images/placeholder.jpg'">
                    <div class="recipe-info">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description}</p>
                        <div class="recipe-meta">
                            <span class="prep-time">${recipe.prepTime}</span>
                            <span class="servings">${recipe.servings} servings</span>
                        </div>
                        <button class="view-recipe-btn" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                    </div>
                `;
                favoritesContainer.appendChild(recipeCard);
            } else {
                console.warn('Recipe not found for ID:', recipeId, 'Available IDs:', Object.keys(completeRecipeData));
            }
        });
        
        // Animate recipe cards
        if (typeof gsap !== 'undefined') {
            gsap.from('.recipe-card', {
                duration: 0.6,
                opacity: 0,
                y: 30,
                stagger: 0.1,
                ease: "back.out(1.2)",
                delay: 0.5
            });
        }
    }
}

function viewRecipe(recipeId) {
    sessionStorage.setItem('currentRecipeId', recipeId);
    sessionStorage.setItem('recipeSource', 'local'); 
    window.location.href = '../pages/Recipedetails.html';
}

// Debug function to check what's in localStorage
function debugLocalStorage() {
    console.log('nibblyFavorites:', JSON.parse(localStorage.getItem('nibblyFavorites')));
    console.log('All localStorage:', { ...localStorage });
}

// Make it available globally for debugging
window.debugLocalStorage = debugLocalStorage;