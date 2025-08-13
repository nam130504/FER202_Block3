import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import "./App.css";

const RECIPES = [
  {
    "title": "Mediterranean Chickpea Salad",
    "description": "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    "servings": 2,
    "prep": 10,
    "cook": 0,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
  },
  {
    "title": "Avocado & Tomato Wholegrain Toast",
    "description": "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    "servings": 1,
    "prep": 5,
    "cook": 5,
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"
  },
  {
    "title": "One-Pan Lemon Garlic Salmon",
    "description": "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    "servings": 2,
    "prep": 5,
    "cook": 12,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
  },
  {
    "title": "Quinoa Veggie Power Bowl",
    "description": "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    "servings": 2,
    "prep": 10,
    "cook": 15,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
  },
  {
    "title": "Sweet Potato Black Bean Tacos",
    "description": "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    "servings": 3,
    "prep": 10,
    "cook": 15,
    "image": "https://plus.unsplash.com/premium_photo-1664648234285-3b238ab7f17b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    "title": "Greek Yogurt Berry Parfait",
    "description": "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    "servings": 1,
    "prep": 5,
    "cook": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"
  },
  {
    "title": "Lentil & Spinach Soup",
    "description": "A hearty 30-minute soup rich in plant protein and iron.",
    "servings": 4,
    "prep": 10,
    "cook": 20,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
  },
  {
    "title": "Banana Oat Pancakes",
    "description": "Flour-free pancakes sweetened naturally with ripe bananas.",
    "servings": 2,
    "prep": 5,
    "cook": 10,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop"
  }
];

export default function App() {
  const [query, setQuery] = useState("");
  const [maxPrep, setMaxPrep] = useState("all");
  const [maxCook, setMaxCook] = useState("all");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter(r => {
      const okSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const okPrep = maxPrep === "all" || r.prep <= Number(maxPrep);
      const okCook = maxCook === "all" || r.cook <= Number(maxCook);
      return okSearch && okPrep && okCook;
    });
  }, [query, maxPrep, maxCook]);

  const handleAddToCart = (recipe) => {
    setCart(prev => [...prev, recipe.title]);
    alert(`Đã thêm "${recipe.title}" vào giỏ!`);
  };

  return (
    <div className="app">
      <Header cartCount={cart.length} />

      <main className="container">
        <section className="hero">
          <h1>Explore our simple, healthy recipes</h1>
          <p>
            Use the search bar to find a recipe by name or description,
            and filter by maximum prep/cook time.
          </p>

          <div className="controls">
            <div className="control">
              <label>Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or description…"
              />
            </div>

            <div className="control">
              <label>Max Prep Time</label>
              <select value={maxPrep} onChange={(e) => setMaxPrep(e.target.value)}>
                <option value="all">All</option>
                <option value="5">5 mins</option>
                <option value="10">10 mins</option>
                <option value="15">15 mins</option>
                <option value="20">20 mins</option>
              </select>
            </div>

            <div className="control">
              <label>Max Cook Time</label>
              <select value={maxCook} onChange={(e) => setMaxCook(e.target.value)}>
                <option value="all">All</option>
                <option value="5">5 mins</option>
                <option value="10">10 mins</option>
                <option value="12">12 mins</option>
                <option value="15">15 mins</option>
                <option value="20">20 mins</option>
              </select>
            </div>
          </div>
        </section>

        <RecipeList
          recipes={filtered}
          onView={(r) => setSelected(r)}
        />
      </main>

      <Footer />

      {selected && (
        <RecipeModal
          recipe={selected}
          onClose={() => setSelected(null)}
          onAdd={() => handleAddToCart(selected)}
        />
      )}
    </div>
  );
}
