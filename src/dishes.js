const dishes = [
  // Indian Vegetarian
  {
    name: "Paneer Butter Masala",
    type: "veg",
    cuisine: "indian",
    flavor: "savory",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Creamy tomato-based curry with soft paneer cubes, perfect with naan or rice.",
    isPopular: true
  },
  {
    name: "Veg Biryani",
    type: "veg",
    cuisine: "indian",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Aromatic basmati rice layered with mixed vegetables and Indian spices.",
    isPopular: true
  },
  {
    name: "Palak Paneer",
    type: "veg",
    cuisine: "indian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Nutritious spinach curry with paneer cubes in a mildly spiced gravy."
  },
  {
    name: "Chole Bhature",
    type: "veg",
    cuisine: "indian",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "breakfast",
    description: "Spicy chickpea curry served with fluffy deep-fried bread."
  },
  {
    name: "Masala Dosa",
    type: "veg",
    cuisine: "indian",
    flavor: "savory",
    spiceLevel: "medium",
    mealType: "breakfast",
    description: "Crispy rice crepe filled with spiced potato filling, served with chutneys.",
    isPopular: true
  },
  {
    name: "Dal Makhani",
    type: "veg",
    cuisine: "indian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Creamy black lentils slow-cooked with butter and cream."
  },

  // Indian Non-Vegetarian
  {
    name: "Chicken Biryani",
    type: "nonveg",
    cuisine: "indian",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "lunch",
    description: "Fragrant basmati rice layered with tender chicken in aromatic spices.",
    isPopular: true
  },
  {
    name: "Butter Chicken",
    type: "nonveg",
    cuisine: "indian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Tender chicken in a rich, creamy tomato-based gravy with a hint of sweetness.",
    isPopular: true
  },
  {
    name: "Tandoori Chicken",
    type: "nonveg",
    cuisine: "indian",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "snack",
    description: "Marinated chicken grilled to perfection with Indian spices."
  },
  {
    name: "Mutton Rogan Josh",
    type: "nonveg",
    cuisine: "indian",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "dinner",
    description: "Aromatic lamb curry with Kashmiri spices and rich gravy."
  },
  {
    name: "Fish Curry",
    type: "nonveg",
    cuisine: "indian",
    flavor: "tangy",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Coastal-style fish curry with coconut milk and tangy tamarind."
  },

  // Chinese Vegetarian
  {
    name: "Veg Manchurian",
    type: "veg",
    cuisine: "chinese",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "snack",
    description: "Crispy vegetable balls in a tangy Indo-Chinese sauce.",
    isPopular: true
  },
  {
    name: "Veg Fried Rice",
    type: "veg",
    cuisine: "chinese",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Stir-fried rice with mixed vegetables and soy sauce."
  },
  {
    name: "Hakka Noodles",
    type: "veg",
    cuisine: "chinese",
    flavor: "savory",
    spiceLevel: "medium",
    mealType: "dinner",
    description: "Stir-fried noodles with vegetables in a savory sauce."
  },
  {
    name: "Spring Rolls",
    type: "veg",
    cuisine: "chinese",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "snack",
    description: "Crispy rolls filled with seasoned vegetables."
  },
  {
    name: "Sweet and Sour Vegetables",
    type: "veg",
    cuisine: "chinese",
    flavor: "sweet",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Mixed vegetables in a tangy-sweet sauce."
  },

  // Chinese Non-Vegetarian
  {
    name: "Chicken Manchurian",
    type: "nonveg",
    cuisine: "chinese",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "snack",
    description: "Crispy chicken pieces in a spicy Indo-Chinese gravy."
  },
  {
    name: "Szechuan Chicken",
    type: "nonveg",
    cuisine: "chinese",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "dinner",
    description: "Fiery chicken dish with Szechuan peppers and chilies.",
    isPopular: true
  },
  {
    name: "Sweet and Sour Chicken",
    type: "nonveg",
    cuisine: "chinese",
    flavor: "sweet",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Crispy chicken in a tangy-sweet pineapple sauce."
  },
  {
    name: "Chili Chicken",
    type: "nonveg",
    cuisine: "chinese",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "snack",
    description: "Spicy chicken stir-fry with bell peppers and onions."
  },
  {
    name: "Chicken Fried Rice",
    type: "nonveg",
    cuisine: "chinese",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Flavorful fried rice with chicken pieces and vegetables."
  },

  // Italian Vegetarian
  {
    name: "Margherita Pizza",
    type: "veg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
    isPopular: true
  },
  {
    name: "Penne Arrabbiata",
    type: "veg",
    cuisine: "italian",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Pasta in a spicy tomato sauce with garlic and red chilies."
  },
  {
    name: "Mushroom Risotto",
    type: "veg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Creamy Italian rice with mushrooms and parmesan cheese."
  },
  {
    name: "Caprese Salad",
    type: "veg",
    cuisine: "italian",
    flavor: "tangy",
    spiceLevel: "low",
    mealType: "snack",
    description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze."
  },
  {
    name: "Veggie Pasta Primavera",
    type: "veg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Pasta tossed with fresh seasonal vegetables in olive oil."
  },

  // Italian Non-Vegetarian
  {
    name: "Chicken Alfredo Pasta",
    type: "nonveg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Creamy fettuccine with grilled chicken in rich Alfredo sauce.",
    isPopular: true
  },
  {
    name: "Pepperoni Pizza",
    type: "nonveg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Classic pizza topped with pepperoni and melted cheese."
  },
  {
    name: "Spaghetti Bolognese",
    type: "nonveg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Traditional pasta with rich meat sauce."
  },
  {
    name: "Chicken Parmigiana",
    type: "nonveg",
    cuisine: "italian",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Breaded chicken breast with marinara sauce and melted cheese."
  },
  {
    name: "Seafood Pasta",
    type: "nonveg",
    cuisine: "italian",
    flavor: "tangy",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Linguine with mixed seafood in a light tomato or white wine sauce."
  },

  // Mexican Vegetarian
  {
    name: "Veggie Burrito Bowl",
    type: "veg",
    cuisine: "mexican",
    flavor: "savory",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Rice bowl with black beans, peppers, corn, salsa, and guacamole."
  },
  {
    name: "Cheese Quesadilla",
    type: "veg",
    cuisine: "mexican",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "snack",
    description: "Grilled tortilla filled with melted cheese and served with salsa."
  },
  {
    name: "Bean Tacos",
    type: "veg",
    cuisine: "mexican",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "dinner",
    description: "Soft tacos filled with seasoned black beans and toppings."
  },
  {
    name: "Veggie Nachos",
    type: "veg",
    cuisine: "mexican",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "snack",
    description: "Crispy tortilla chips topped with cheese, beans, and fresh veggies.",
    isPopular: true
  },

  // Mexican Non-Vegetarian
  {
    name: "Chicken Tacos",
    type: "nonveg",
    cuisine: "mexican",
    flavor: "spicy",
    spiceLevel: "medium",
    mealType: "dinner",
    description: "Soft tacos with seasoned grilled chicken and fresh toppings.",
    isPopular: true
  },
  {
    name: "Beef Burrito",
    type: "nonveg",
    cuisine: "mexican",
    flavor: "savory",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Large flour tortilla filled with seasoned beef, rice, and beans."
  },
  {
    name: "Chicken Enchiladas",
    type: "nonveg",
    cuisine: "mexican",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "dinner",
    description: "Rolled tortillas with chicken filling in spicy enchilada sauce."
  },
  {
    name: "Fish Tacos",
    type: "nonveg",
    cuisine: "mexican",
    flavor: "tangy",
    spiceLevel: "low",
    mealType: "lunch",
    description: "Soft tacos with grilled or fried fish and tangy coleslaw."
  },

  // Thai Vegetarian
  {
    name: "Pad Thai (Veg)",
    type: "veg",
    cuisine: "thai",
    flavor: "tangy",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Stir-fried rice noodles with tofu, vegetables, and tangy tamarind sauce.",
    isPopular: true
  },
  {
    name: "Green Curry with Vegetables",
    type: "veg",
    cuisine: "thai",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "dinner",
    description: "Spicy coconut-based curry with mixed vegetables and Thai herbs."
  },
  {
    name: "Tom Yum Soup (Veg)",
    type: "veg",
    cuisine: "thai",
    flavor: "tangy",
    spiceLevel: "medium",
    mealType: "snack",
    description: "Hot and sour soup with mushrooms, lemongrass, and lime."
  },

  // Thai Non-Vegetarian
  {
    name: "Thai Basil Chicken",
    type: "nonveg",
    cuisine: "thai",
    flavor: "spicy",
    spiceLevel: "high",
    mealType: "dinner",
    description: "Stir-fried chicken with Thai basil, chilies, and garlic.",
    isPopular: true
  },
  {
    name: "Pad Thai with Shrimp",
    type: "nonveg",
    cuisine: "thai",
    flavor: "tangy",
    spiceLevel: "medium",
    mealType: "lunch",
    description: "Classic Thai noodles with shrimp, peanuts, and tamarind sauce."
  },
  {
    name: "Massaman Curry",
    type: "nonveg",
    cuisine: "thai",
    flavor: "savory",
    spiceLevel: "low",
    mealType: "dinner",
    description: "Mild curry with chicken, potatoes, and roasted peanuts."
  },
  {
    name: "Tom Yum Goong",
    type: "nonveg",
    cuisine: "thai",
    flavor: "tangy",
    spiceLevel: "high",
    mealType: "snack",
    description: "Spicy and sour shrimp soup with lemongrass and lime."
  }
];

export default dishes;