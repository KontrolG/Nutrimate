import { ModelFoodData, Nutrient, Portion, ReducedFood } from '@/types';

// Fallback nutrient if a specific one isn't found
const FALLBACK_NUTRIENT: Nutrient = {
  name: 'N/A',
  amount: 0,
  unitName: null,
};

class FoodDataModel {
  private foods: ModelFoodData[] = [];
  private static instance: FoodDataModel;

  private constructor() {
    // Private constructor to ensure singleton instance
    this.loadInitialData();
  }

  public static getInstance(): FoodDataModel {
    if (!FoodDataModel.instance) {
      FoodDataModel.instance = new FoodDataModel();
    }
    return FoodDataModel.instance;
  }

  private loadInitialData(): void {
    // In a real app, this would load from a database or a more robust data source.
    // For now, we'll keep the logic similar to the original, assuming data files are present.
    // This part needs to be adapted based on how data is actually provided/migrated.
    // For example, if data/foundationData.json, data/legacyData.json, data/surveyData.json exist.
    // const foundationData = getDataFromJSON('foundation');
    // const legacyData = getDataFromJSON('legacy');
    // const surveyData = getDataFromJSON('survey');
    // this.addData(foundationData);
    // this.addData(legacyData);
    // this.addData(surveyData);
    // console.log(`Loaded ${this.foods.length} food items into model.`);

    // Placeholder: If you have a combined data file, load it here.
    // Example: const allFoods = getDataFromJSON('allFoods'); this.addData(allFoods);
  }

  public addData(data: ModelFoodData[]): void {
    data.forEach(food => this.foods.push(food));
  }

  public getResultsFromSearch(searchPattern: string, start: number = 0, limit: number = 10): ReducedFood[] {
    if (!searchPattern && this.foods.length > 0) {
      // If no search pattern, return a slice of the first items
      return this.foods.slice(start, start + limit).map(food => this.reduceProperties(food));
    }
    const searchRegExp = new RegExp(searchPattern, 'gi');
    return this.foods
      .filter(food => searchRegExp.test(food.description))
      .slice(start, start + limit)
      .map(food => this.reduceProperties(food));
  }

  private reduceProperties(food: ModelFoodData): ReducedFood {
    const { fdcId, description, portions, nutrients } = food;
    const portion = portions && portions.length > 0 ? portions[0] : { gramWeight: 100, description: '100g' }; // Fallback portion

    const [calories, protein, carbohydrate, fat] = this.calculateMacroNutrients(
      nutrients,
      portion
    );

    return {
      fdcId,
      description,
      portion,
      calories,
      protein,
      carbohydrate,
      fat,
    };
  }

  private calculateMacroNutrients(nutrients: Nutrient[], portion: Portion): Nutrient[] {
    const gramWeight = portion.gramWeight || 100; // Default to 100g if not specified
    return this.getMacroNutrientsFrom(nutrients).map(macronutrient =>
      this.calculateAmount(macronutrient, gramWeight)
    );
  }

  private getMacroNutrientsFrom(nutrients: Nutrient[]): Nutrient[] {
    const calories = this.findNutrientBy('unitName', 'kcal', nutrients);
    const protein = this.findNutrientBy('name', 'Protein', nutrients);
    const carbohydrate = this.findNutrientBy('name', 'Carbohydrate, by difference', nutrients); // Exact name from sample data
    const fat = this.findNutrientBy('name', 'Total lipid (fat)', nutrients); // Exact name from sample data
    return [calories, protein, carbohydrate, fat];
  }

  private findNutrientBy(key: keyof Nutrient, value: string, nutrients: Nutrient[]): Nutrient {
    const regularExpression = new RegExp(value, 'gi');
    const foundNutrient = nutrients.find(nutrient => {
      const nutrientValue = nutrient[key];
      return typeof nutrientValue === 'string' && regularExpression.test(nutrientValue);
    });
    return foundNutrient || { ...FALLBACK_NUTRIENT, name: value.includes('kcal') ? 'Energy' : value };
  }

  private calculateAmount(nutrient: Nutrient, gramWeight: number): Nutrient {
    const { name, amount, unitName } = nutrient;
    // Ensure amount is a number, default to 0 if not
    const numericAmount = typeof amount === 'number' ? amount : 0;
    const calculatedAmount = (numericAmount / 100) * gramWeight;
    return {
      name: name || 'N/A',
      amount: parseFloat(calculatedAmount.toFixed(2)), // Keep a reasonable number of decimals
      unitName,
    };
  }

  public getFoodById(fdcId: number | string): ModelFoodData | undefined {
    const food = this.foods.find(f => f.fdcId == fdcId); // Use loose equality for mixed types if necessary
    if (food) {
      // Ensure nutrients is an array before filtering
      if (Array.isArray(food.nutrients)) {
        food.nutrients = food.nutrients.filter(nutrient => nutrient.unitName !== 'kJ');
      } else {
        food.nutrients = []; // Initialize as empty array if undefined
      }
    }
    return food;
  }
}

// Initialize and export the singleton instance
const foodDataModelInstance = FoodDataModel.getInstance();

// Function to explicitly load data if needed (e.g., from an admin panel or script)
// For now, we need to ensure data is loaded when the model is first instantiated.
// The original `index.js` loads data from JSON files. We need to replicate that.
// Let's assume the data files are in `data/` directory at the root of the monorepo.
import { getDataFromJSON } from '@/utils/server-utils';

const foundationData = getDataFromJSON('foundation');
const legacyData = getDataFromJSON('legacy');
const surveyData = getDataFromJSON('survey');

foodDataModelInstance.addData(foundationData);
foodDataModelInstance.addData(legacyData);
foodDataModelInstance.addData(surveyData);

console.log(`Loaded ${foundationData.length + legacyData.length + surveyData.length} food items into model.`);


export default foodDataModelInstance;
