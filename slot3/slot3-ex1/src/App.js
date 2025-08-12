import React, { useState, useMemo } from "react";
import { persons } from "./personlist.js";

export default function App() {
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skill, setSkill] = useState("");
  const [search, setSearch] = useState("");

  // Danh sách skills unique
  const allSkills = useMemo(() => {
    return [...new Set(persons.flatMap(p => p.skills))];
  }, []);

  // 1️⃣ Sort firstName
  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      if (sortOrder === "asc") return a.firstName.localeCompare(b.firstName);
      return b.firstName.localeCompare(a.firstName);
    });
  }, [sortOrder]);

  // 2️⃣ Lọc theo tuổi + skill
  const filteredByAgeSkill = useMemo(() => {
    return persons.filter(({ age, skills }) => {
      const inAgeRange =
        (!minAge || age >= Number(minAge)) &&
        (!maxAge || age <= Number(maxAge));
      const hasSkill = !skill || skills.includes(skill);
      return inAgeRange && hasSkill;
    });
  }, [minAge, maxAge, skill]);

  // 3️⃣ Ranking skill bằng reduce
  const skillRanking = useMemo(() => {
    const count = persons.reduce((acc, { skills }) => {
      skills.forEach(s => {
        acc[s] = (acc[s] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1]); // sort giảm dần
  }, []);

  const topCount = skillRanking[0]?.[1];

  // 4️⃣ Search + Sort đa tiêu chí
  const multiSortResult = useMemo(() => {
    return persons
      .filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        // Ưu tiên isActive
        if (a.isActive !== b.isActive) return b.isActive - a.isActive;
        // Sau đó age tăng dần
        if (a.age !== b.age) return a.age - b.age;
        // Cuối cùng lastName A→Z
        return a.lastName.localeCompare(b.lastName);
      });
  }, [search]);

  const statistics = useMemo(() => {
    const total = persons.length;
    const avgAge = (persons.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1);
    const activeCount = persons.filter(p => p.isActive).length;
    return { total, avgAge, activeCount };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>1️⃣ Sort First Name</h2>
      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort First Name: {sortOrder === "asc" ? "A→Z" : "Z→A"}
      </button>
      <ul>
        {sortedPersons.map(p => (
          <li key={p.id}>
            {p.firstName} {p.lastName} - {p.age} - {p.city} - {p.skills.join(", ")}
          </li>
        ))}
      </ul>

      <h2>2️⃣ Filter by Age & Skill</h2>
      <input
        type="number"
        placeholder="Min age"
        value={minAge}
        onChange={e => setMinAge(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max age"
        value={maxAge}
        onChange={e => setMaxAge(e.target.value)}
      />
      <select value={skill} onChange={e => setSkill(e.target.value)}>
        <option value="">-- Select skill --</option>
        {allSkills.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <ul>
        {filteredByAgeSkill.length > 0 ? (
          filteredByAgeSkill.map(p => (
            <li key={p.id}>
              {p.firstName} - {p.lastName} - {p.skills.join(", ")}
            </li>
          ))
        ) : (
          <li>No found</li>
        )}
      </ul>

      <h2>3️⃣ Skill Ranking</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {skillRanking.map(([s, c]) => (
            <tr key={s} style={{ fontWeight: c === topCount ? "bold" : "normal" }}>
              <td>{s}</td>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>4️⃣ Multi-criteria Sort + Statistics</h2>
      <input
        type="text"
        placeholder="Search name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {multiSortResult.map(p => (
          <li key={p.id}>
            {p.firstName} {p.lastName} - Age: {p.age} - Active: {p.isActive ? "Yes" : "No"}
          </li>
        ))}
      </ul>
      <div style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
        <h4>Statistics</h4>
        <p>Total persons: {statistics.total}</p>
        <p>Average age: {statistics.avgAge}</p>
        <p>Active count: {statistics.activeCount}</p>
      </div>
    </div>
  );
}
