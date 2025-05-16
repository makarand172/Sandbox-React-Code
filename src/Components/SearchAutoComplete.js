import { useEffect, useState } from "react";
import "../styles.css";

export default function SearchAutoComplete() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setRecipes(cache[input]);
      return;
    }
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const results = await response.json();
    setCache((prev) => ({ ...prev, [input]: results }));
    setRecipes(results.recipes);
  };

  useEffect(() => {
    let timer = setTimeout(fetchData, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="search-container">
      <h1>Auto Search Complete</h1>
      <input
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {recipes.length > 0 && input.length > 0 && (
        <div className="res-container">
          {recipes.map((res) => (
            <span key={res.id} className="search-results">
              {res.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
