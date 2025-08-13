import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from "react-bootstrap";
import RecipeRequestForm from "./page/RecipeRequestForm";

const RECIPES = [
  {
    "title": "Mediterranean Chickpea Salad",
    "description": "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    "servings": 2,
    "prep": 10,
    "cook": 0,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    "steps": [
      "Drain and rinse 1 can of chickpeas.",
      "Chop cucumber, tomatoes, red onion, and parsley.",
      "Mix chickpeas and veggies in a bowl.",
      "Whisk together olive oil, lemon juice, salt, and pepper.",
      "Pour dressing over salad and toss to combine.",
      "Serve immediately or chill for 30 minutes."
    ]
  },
  {
    "title": "Avocado & Tomato Wholegrain Toast",
    "description": "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    "servings": 1,
    "prep": 5,
    "cook": 5,
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    "steps": [
      "Toast a slice of wholegrain bread until golden.",
      "Mash 1/2 avocado with a pinch of salt and pepper.",
      "Spread avocado on toast evenly.",
      "Top with sliced tomatoes.",
      "Drizzle with olive oil and sprinkle chili flakes if desired.",
      "Serve immediately."
    ]
  },
  {
    "title": "One-Pan Lemon Garlic Salmon",
    "description": "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    "servings": 2,
    "prep": 5,
    "cook": 12,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    "steps": [
      "Preheat oven to 200°C (400°F).",
      "Place salmon fillets and asparagus on a baking sheet.",
      "Drizzle with olive oil, lemon juice, minced garlic, salt, and pepper.",
      "Bake for 12 minutes until salmon is cooked through.",
      "Garnish with fresh parsley and lemon slices.",
      "Serve warm."
    ]
  },
  {
    "title": "Quinoa Veggie Power Bowl",
    "description": "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    "servings": 2,
    "prep": 10,
    "cook": 15,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    "steps": [
      "Cook 1 cup quinoa according to package instructions.",
      "Roast diced veggies (bell peppers, zucchini, carrots) at 200°C for 15 minutes.",
      "Prepare dressing: olive oil, lemon juice, salt, pepper.",
      "Assemble bowl: quinoa at bottom, veggies on top.",
      "Add avocado slices and drizzle with dressing.",
      "Sprinkle seeds or nuts if desired, then serve."
    ]
  },
  {
    "title": "Sweet Potato Black Bean Tacos",
    "description": "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    "servings": 3,
    "prep": 10,
    "cook": 15,
    "image": "https://plus.unsplash.com/premium_photo-1664648234285-3b238ab7f17b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    "steps": [
      "Peel and dice sweet potatoes, toss with olive oil, salt, paprika.",
      "Roast at 200°C (400°F) for 15 minutes until tender.",
      "Warm black beans in a pan with cumin and garlic.",
      "Heat tortillas in oven or skillet.",
      "Assemble tacos: tortilla, sweet potatoes, black beans.",
      "Top with salsa, avocado, and fresh cilantro."
    ]
  },
  {
    "title": "Greek Yogurt Berry Parfait",
    "description": "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    "servings": 1,
    "prep": 5,
    "cook": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    "steps": [
      "Spoon Greek yogurt into a glass or bowl.",
      "Add a layer of fresh berries (strawberries, blueberries, raspberries).",
      "Sprinkle with oats or granola.",
      "Repeat layers as desired.",
      "Drizzle honey on top.",
      "Serve immediately."
    ]
  },
  {
    "title": "Lentil & Spinach Soup",
    "description": "A hearty 30-minute soup rich in plant protein and iron.",
    "servings": 4,
    "prep": 10,
    "cook": 20,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    "steps": [
      "Heat olive oil in a pot, sauté onion, garlic, carrots, and celery until soft.",
      "Add rinsed lentils and vegetable broth.",
      "Bring to a boil, then simmer for 20 minutes.",
      "Add spinach and cook until wilted.",
      "Season with salt, pepper, and cumin.",
      "Serve hot with crusty bread."
    ]
  },
  {
    "title": "Banana Oat Pancakes",
    "description": "Flour-free pancakes sweetened naturally with ripe bananas.",
    "servings": 2,
    "prep": 5,
    "cook": 10,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
    "steps": [
      "Mash 2 ripe bananas in a bowl.",
      "Mix in 2 eggs and 1/2 cup oats.",
      "Heat a non-stick skillet over medium heat.",
      "Pour batter to form small pancakes.",
      "Cook 2-3 minutes per side until golden.",
      "Serve with berries or maple syrup."
    ]
  }
];



function HomePage({
  recipes,
  query,
  setQuery,
  maxPrep,
  setMaxPrep,
  maxCook,
  setMaxCook,
  onView,
  onAddFavourite
}) {
  const [sortBy, setSortBy] = useState("");

  // Sắp xếp danh sách theo sortBy
  const sortedRecipes = useMemo(() => {
    const r = [...recipes];
    switch (sortBy) {
      case "name-asc": return r.sort((a,b) => a.title.localeCompare(b.title));
      case "name-desc": return r.sort((a,b) => b.title.localeCompare(a.title));
      case "prep-asc": return r.sort((a,b) => a.prep - b.prep);
      case "prep-desc": return r.sort((a,b) => b.prep - a.prep);
      case "cook-asc": return r.sort((a,b) => a.cook - b.cook);
      case "cook-desc": return r.sort((a,b) => b.cook - a.cook);
      default: return r;
    }
  }, [recipes, sortBy]);

  // Top 5 món ăn để hiển thị carousel
  const topRecipes = recipes.slice(0, 5);

  return (
    <main className="container">
      {/* Carousel */}
      <Carousel className="mb-4">
        {topRecipes.map((r, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={r.image}
              alt={r.title}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Controls */}
      <section className="hero mb-4">
        <h1>Explore our simple, healthy recipes</h1>
        <p>Use the search bar to find a recipe and filter by prep/cook time.</p>

        <div className="controls d-flex flex-wrap gap-3">
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

          <div className="control">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Default</option>
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
              <option value="prep-asc">Prep ↑</option>
              <option value="prep-desc">Prep ↓</option>
              <option value="cook-asc">Cook ↑</option>
              <option value="cook-desc">Cook ↓</option>
            </select>
          </div>
        </div>
      </section>

      {/* Recipe List */}
      <RecipeList
        recipes={sortedRecipes}
        onView={onView}
        onAddFavourite={onAddFavourite}
      />
    </main>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [maxPrep, setMaxPrep] = useState("all");
  const [maxCook, setMaxCook] = useState("all");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      const okSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const okPrep = maxPrep === "all" || r.prep <= Number(maxPrep);
      const okCook = maxCook === "all" || r.cook <= Number(maxCook);
      return okSearch && okPrep && okCook;
    });
  }, [query, maxPrep, maxCook]);

  const handleAddToCart = (recipe) => setCart((prev) => [...prev, recipe.title]);

  const handleAddToFavourite = (recipe) => {
    setFavourites((prev) => (prev.includes(recipe.title) ? prev : [...prev, recipe.title]));
  };

  return (
    <Router>
      <Header cartCount={cart.length} favCount={favourites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              recipes={filtered}
              query={query}
              setQuery={setQuery}
              maxPrep={maxPrep}
              setMaxPrep={setMaxPrep}
              maxCook={maxCook}
              setMaxCook={setMaxCook}
              onView={(r) => setSelected(r)}
              onAddFavourite={handleAddToFavourite}
            />
          }
        />
        <Route path="/request" element={<RecipeRequestForm />} />
      </Routes>

      <Footer />

      {selected && (
        <RecipeModal
          recipe={selected}
          onClose={() => setSelected(null)}
          onAdd={() => handleAddToCart(selected)}
          onAddFavourite={() => handleAddToFavourite(selected)}
        />
      )}
    </Router>
  );
}