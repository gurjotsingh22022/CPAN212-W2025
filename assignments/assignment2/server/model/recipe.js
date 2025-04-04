const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
    maxlength: [100, 'Recipe name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
  },
  ingredients: {
    type: [String],
    required: [true, 'At least one ingredient is required'],
    validate: {
      validator: function(value) {
        return value.length > 0;
      },
      message: 'At least one ingredient is required'
    }
  },
  steps: {
    type: [String],
    required: [true, 'At least one step is required'],
    validate: {
      validator: function(value) {
        return value.length > 0;
      },
      message: 'At least one step is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
recipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;