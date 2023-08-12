const menuListItems = [
  {
    id: 1,
    name: "Personalized",
  },
  {
    id: 2,
    name: "Normal",
  },
  {
    id: 3,
    name: "Vegan",
  },
  {
    id: 4,
    name: "Vegetarian",
  },
  {
    id: 5,
    name: "Gluten-Free",
  },
  {
    id: 6,
    name: "Lactose-Free",
  },
];

const mealTypes = [
  { value: "main-course", name: "Main Course" },
  { value: "dessert", name: "Dessert" },
  { value: "soup", name: "Soup" },
  { value: "appetizer", name: "Appetizer" },
  { value: "salad", name: "Salad" },
  { value: "mignartise", name: "Mignartise" },
];
const allergyTypes = [
  { value: "gluten", name: "Gluten" },
  { value: "milk", name: "Milk" },
  { value: "peanuts", name: "Peanuts" },
  { value: "fish", name: "Fish" },
  { value: "soy", name: "Soy" },
  { value: "egg", name: "Egg" },
];
const priceRange = [
  { value: "0-100", name: "$0 - $100" },
  { value: "100-150", name: "$100 - $150" },
  { value: "150-200", name: "$150 - $200" },
  { value: "200-250", name: "$200 - $250" },
  { value: "250-999999", name: "$250+" },
];

const constants = {
  menuListItems,
  mealTypes,
  allergyTypes,
  priceRange,
};

export default constants;
