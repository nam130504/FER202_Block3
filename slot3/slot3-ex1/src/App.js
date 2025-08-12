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

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  useEffect(() => {
    let filtered = companies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    switch (sortType) {
      case "asc":
        filtered.sort((a, b) => a.start - b.start);
        break;
      case "desc":
        filtered.sort((a, b) => b.start - a.start);
        break;
      case "range":
        filtered.sort((a, b) => (a.end - a.start) - (b.end - b.start));
        break;
      default:
        break;
    }

    setResult(filtered);
  }, [search, sortType, categoryFilter]); // Tự chạy khi giá trị thay đổi

  return (
    <div className="App">
      <h1>Company List</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={e => setSearch(toTitleCase(e.target.value))}
        />

        <select value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="">-- Sort by --</option>
          <option value="asc">Year Start ↑</option>
          <option value="desc">Year Start ↓</option>
          <option value="range">Duration (Short → Long)</option>
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
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {result.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
                <td>{c.end - c.start} years</td>
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
