const { useMemo, useState } = React;

const sampleExpenses = [
  { id: 1, name: "Groceries", amount: 76.45, category: "Food", date: "2026-03-05" },
  { id: 2, name: "Electric Bill", amount: 112.9, category: "Utilities", date: "2026-03-02" },
  { id: 3, name: "Bus Pass", amount: 30, category: "Transport", date: "2026-03-09" },
  { id: 4, name: "Internet", amount: 55, category: "Utilities", date: "2026-02-28" },
  { id: 5, name: "Movie Night", amount: 24.5, category: "Entertainment", date: "2026-03-18" },
];

const categories = ["Food", "Utilities", "Transport", "Entertainment", "Health", "Other"];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function App() {
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [filterCategory, setFilterCategory] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: categories[0],
    date: new Date().toISOString().slice(0, 10),
  });

  const filteredExpenses = useMemo(() => {
    if (filterCategory === "All") return expenses;
    return expenses.filter((expense) => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  const monthlyTotal = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(`${expense.date}T00:00:00`);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const allTimeTotal = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  const categoriesUsed = useMemo(() => {
    return ["All", ...new Set(expenses.map((expense) => expense.category))];
  }, [expenses]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddExpense(event) {
    event.preventDefault();
    const amountNumber = Number(formData.amount);

    if (!formData.name.trim() || amountNumber <= 0 || Number.isNaN(amountNumber)) {
      alert("Please enter a valid name and amount greater than 0.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: formData.name.trim(),
      amount: amountNumber,
      category: formData.category,
      date: formData.date,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setFormData((prev) => ({
      ...prev,
      name: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
    }));
  }

  return (
    <main className="container">
      <header className="header">
        <h1>Household Expense Tracker</h1>
        <p className="subtitle">Track spending with a simple dashboard, filters, and monthly total.</p>
      </header>

      <section className="dashboard">
        <article className="card">
          <h3>Monthly Total</h3>
          <p className="value green">{formatCurrency(monthlyTotal)}</p>
        </article>
        <article className="card">
          <h3>All-time Total</h3>
          <p className="value">{formatCurrency(allTimeTotal)}</p>
        </article>
        <article className="card">
          <h3>Expenses Count</h3>
          <p className="value">{expenses.length}</p>
        </article>
      </section>

      <section className="card" style={{ marginBottom: "16px" }}>
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense} className="form-grid">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="e.g., Water Bill" value={formData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="amount">Amount (USD)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
          </div>
          <div style={{ alignSelf: "end" }}>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="controls" style={{ marginBottom: "12px" }}>
          <div>
            <label htmlFor="filter">Filter by category</label>
            <select id="filter" value={filterCategory} onChange={(event) => setFilterCategory(event.target.value)}>
              {categoriesUsed.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td className="empty" colSpan="4">
                    No expenses found for this filter.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>{formatCurrency(expense.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
