const express = require('express');
const router = express.Router();
const Recipe = require('../model/recipe');

// Helper function for error handling
const handleErrors = (res, err) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Server error occurred' });
};

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    handleErrors(res, err);
  }
});

// POST a new recipe
router.post('/', async (req, res) => {
  try {
    const { name, description, difficulty, ingredients, steps } = req.body;
    
    const newRecipe = new Recipe({
      name,
      description,
      difficulty,
      ingredients,
      steps
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET a specific recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }
    handleErrors(res, err);
  }
});

// PUT (update) a recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, difficulty, ingredients, steps } = req.body;
    
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        difficulty,
        ingredients,
        steps,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(updatedRecipe);
  } catch (err) {
    handleErrors(res, err);
  }
});

// DELETE a recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    handleErrors(res, err);
  }
});

module.exports = router;