import { elements } from "./views/base";
import DailyActivity from "./models/DailyActivity";
import * as activityView from "./views/dailyActivityView";
import { changeCurrentSectionTo } from "./views/navigationView";

const loadDailyActivity = event => {
  const todayDate = new Date().toDateString();
  setupDailyActivity(todayDate);
};

const setupDailyActivity = date => {
  globals.state.dailyActivity = new DailyActivity(date);
  displayActivityMeals();
  updateDailyActivity();
};

const displayActivityMeals = () => {
  const { dailyActivity } = globals.state;
  dailyActivity.retrieveActivity();
  activityView.clearMeals();
  if (!dailyActivity.isEmpty()) renderFoodsAte();
};

const renderFoodsAte = () => {
  const { meals } = globals.state.dailyActivity;
  Object.entries(meals).forEach(renderMealFoods);
};

const renderMealFoods = ([meal, foods]) => {
  foods.forEach(food => activityView.renderFood(food, meal));
};

const updateDailyActivity = () => {
  updateCaloriesMeter();
  updateMacronutrientsTotals();
};

const updateCaloriesMeter = () => {
  updateTotalCalories();
  updateActivityGraph();
};

const updateTotalCalories = () => {
  const caloriesAmount = globals.state.dailyActivity.getCaloriesAmount();
  activityView.changeTotalCalories(caloriesAmount);
};

const updateActivityGraph = () => {
  const graphValues = getGraphValues();
  activityView.changeActivityGraph(graphValues);
};

const getGraphValues = () => {
  const mealsPercentages = globals.state.dailyActivity.getPercentagesPerMeal();
  return getGraphValuesFromMealsPercentages(mealsPercentages);
}

const getGraphValuesFromMealsPercentages = mealsPercentages => {
  const initialGraphValues = {};
  return Object.entries(mealsPercentages).reduce(
    toGraphValues,
    initialGraphValues
  );
};

const toGraphValues = (graphValues, [meal, percentage]) => {
  const color = getMealColor(meal);
  graphValues[meal] = { color, percentage };
  return graphValues;
};

const getMealColor = meal => {
  const colors = {
    breakfast: "rgb(106, 184, 255)", // blue
    lunch: "rgb(255, 181, 72)", // orange
    dinner: "rgb(255, 119, 226)", // pink
    snack: "rgb(130, 106, 249)" // purple
  };
  return colors[meal];
};

const updateMacronutrientsTotals = () => {
  const macronutrientsTotals = globals.state.dailyActivity.getMacronutrientsTotals();
  activityView.changeMacronutrientsTotals(macronutrientsTotals);
};

const addFood = event => {
  const { target } = event;
  if (!activityView.isMealSelector(target)) return;
  const mealName = activityView.getMealName(target);
  addFoodToActivityMeal(globals.state.food, mealName);
  showMealChanges(mealName);
};

const addFoodToActivityMeal = (food, mealName) => {
  globals.state.dailyActivity.addFood(food, mealName);
  activityView.renderFood(food, mealName);
};

const showMealChanges = mealName => {
  updateDailyActivity();
  activityView.changeActivityFoodList(mealName);
  changeCurrentSectionTo("activitySection");
};

const changeDailyActivity = event => {
  const activityDate = getActivityDate();
  setupDailyActivity(activityDate);
};

function getActivityDate() {
  const inputDate = activityView.getInputDate();
  return getFixedDate(inputDate);
}

const getFixedDate = inputDate => {
  const date = new Date(inputDate);
  date.setHours(24);
  return date.toDateString();
};

const toggleMealsList = event => {
  const { target } = event;
  if (!activityView.isMealSwapperButton(target)) return;
  const mealName = activityView.getMealName(target);
  activityView.changeActivityFoodList(mealName);
};

window.addEventListener("load", loadDailyActivity);
elements.foodAddSwapper.addEventListener("click", addFood);
elements.activityDateInput.addEventListener("change", changeDailyActivity);
elements.activityMealsSwapper.addEventListener("click", toggleMealsList);