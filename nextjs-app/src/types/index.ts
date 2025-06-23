export interface Nutrient {
  name: string;
  amount: number;
  unitName: string | null; // Based on fallbackNutrient in model.js
  amountPerGram?: number; // Optional as it's added in Food.js
  rank?: number; // Present in Food.js sort
}

export interface Portion {
  // From model.js reduceProperties, it seems portion can be complex.
  // For now, let's assume it has at least gramWeight.
  // We might need to expand this based on how it's used in the original app.
  [key: string]: any; // Allows for other properties if they exist
  gramWeight: number;
  description?: string; // Often portions have descriptions like "1 cup"
}

export interface Food {
  fdcId: number | string; // fdcId type consistency check needed
  description: string;
  portions: Portion[];
  nutrients: Nutrient[];
  // Macronutrients, as derived in Food.js and model.js
  calories: Nutrient;
  protein: Nutrient;
  carbohydrate: Nutrient;
  fat: Nutrient;
  fiber?: Nutrient; // Fiber is in Food.js model but not root model.js
  // Properties from client/src/js/models/Food.js
  quantity?: number;
  selectedPortionIndex?: number;
}

// Interface for the search results from model.js getResultsFromSearch
export interface ReducedFood {
  fdcId: number | string;
  description: string;
  portion: Portion; // The first portion or a default one
  calories: Nutrient;
  protein: Nutrient;
  carbohydrate: Nutrient;
  fat: Nutrient;
}

// Interface for the data structure used in the root model.js
export interface ModelFoodData {
  fdcId: number | string;
  description: string;
  portions: Portion[]; // Or a more specific type if available from data source
  nutrients: Nutrient[];
  // Other properties from the original data source might be here
  [key: string]: any;
}
