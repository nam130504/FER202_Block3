import React, { useState } from "react";
import "./App.css";

// -------------------- DATA --------------------
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

// -------------------- OOP CLASSES --------------------
class Shape {
  constructor(color) {
    this.color = color;
  }
  getArea() {
    throw new Error("getArea() must be implemented in subclass");
  }
  toString() {
    return `Shape color: ${this.color}`;
  }
}

class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
  toString() {
    return `Rectangle (${this.color}) - Length: ${this.length}, Width: ${this.width}, Area: ${this.getArea()}`;
  }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }
  getArea() {
    return 0.5 * this.base * this.height;
  }
  toString() {
    return `Triangle (${this.color}) - Base: ${this.base}, Height: ${this.height}, Area: ${this.getArea()}`;
  }
}

// -------------------- PROMISE FUNCTION --------------------
const randomNumberPromise = () => {
  return new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      if (number > 5) {
        resolve(number);
      } else {
        reject("Error");
      }
    }, 500);
  });
};

function App() {
  const [companyResult, setCompanyResult] = useState([]);
  const [oopResult, setOopResult] = useState([]);
  const [promiseResult, setPromiseResult] = useState("");

  // ----------- Companies Filters -----------
  const showCompanies = () => {
    const retailCompanies = companies
      .filter(c => c.category === "Retail")
      .map(c => ({ ...c, start: c.start + 1 }));
    setCompanyResult(retailCompanies);
  };

  // ----------- OOP Example -----------
  const handleOOP = () => {
    const shapes = [
      new Rectangle("Red", 10, 5),
      new Triangle("Blue", 8, 6)
    ];
    setOopResult(shapes.map(shape => shape.toString()));
  };

  // ----------- Promise Example -----------
  const handlePromise = () => {
    randomNumberPromise()
      .then(num => setPromiseResult(`✅ Number is ${num}`))
      .catch(err => setPromiseResult(`❌ ${err}`));
  };

  return (
    <div className="App">
      <h1>ES6 & JSX Demo</h1>

      {/* Companies Example */}
      <div className="section">
        <h2>Companies Filter</h2>
        <button onClick={showCompanies}>Show Retail Companies (+1 year start)</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {companyResult.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OOP Example */}
      <div className="section">
        <h2>OOP Example</h2>
        <button onClick={handleOOP}>Show Shapes</button>
        <ul>
          {oopResult.map((res, idx) => (
            <li key={idx}>{res}</li>
          ))}
        </ul>
      </div>

      {/* Promise Example */}
      <div className="section">
        <h2>Promise Example</h2>
        <button onClick={handlePromise}>Get Random Number</button>
        {promiseResult && <p>{promiseResult}</p>}
      </div>
    </div>
  );
}

export default App;
