import React, { useState, useEffect } from "react";
import "./App.css";

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2003 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1980, end: 1989 }
];

function App() {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(""); 
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [result, setResult] = useState(companies);

  const categories = ["All", ...new Set(companies.map(c => c.category))];

  useEffect(() => {
    let filtered = companies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    if (sortType === "asc") {
      filtered.sort((a, b) => a.start - b.start);
    } else if (sortType === "desc") {
      filtered.sort((a, b) => b.start - a.start);
    } else if (sortType === "range") {
      filtered.sort((a, b) => (a.end - a.start) - (b.end - b.start));
    }

    setResult(filtered);
  }, [search, sortType, categoryFilter]);

  return (
    <div className="App">
      <h1>Company List</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="">-- Sort by --</option>
          <option value="asc">Start Year ↑</option>
          <option value="desc">Start Year ↓</option>
          <option value="range">Start-End Duration</option>
        </select>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {result.length > 0 ? (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {result.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No result</p>
      )}
    </div>
  );
}

export default App;
