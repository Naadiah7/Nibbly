# Nibbly
Dessert Recipe Webapp
by Naadirah Karim 2427389

# Changes made from the design document:
The following adjustments were made during development to improve the user experience, functionality, and feasibility of the project.

# Recipe Book Page: Consolidated Layout
The two separate wireframes for dessert categories were combined into a single, unified page. Whether a user searches for a dessert or clicks on a category, the results are displayed on the same page. This eliminates unnecessary navigation steps and creates a more efficient and intuitive browsing experience.

# Original Images & Recipes
The recipe images are original photographs taken. Furthermore, I provided 2-3 recipes added for each dessert category.Providing multiple recipes per category offers users genuine choice and utility, making the application a more valuable resource.

# Apis
Recipe Data: The Spoonacular and Edamam APIs were used for dessert information and recipes.

Text-to-Speech (TTS): The initial choice of Speechify was replaced with the ElevenLabs API.This change was made for practical implementation. The selected TTS APIs offered more accessible and developer-friendly integration processes.

# Gsap Animations
The initial plan to use the drawSVG plugin for the title banner animation was replaced with a "floating cookies" animation applied to SVG elements.The drawSVG effect presented unforeseen technical challenges. The "floating cookies" animation was a creative and effective alternative that maintained the intended visual appeal.

# Reviews & Profile Pic
The feature for users to submit reviews and upload profile pictures was not implemented.This functionality is inherently dependent on a robust backend database and user authentication system.