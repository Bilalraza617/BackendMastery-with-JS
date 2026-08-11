const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;
const dataFile = path.join(__dirname, "data", "customers.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// -------------------------
// File Handling Functions
// -------------------------

function readData() {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");

    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

// -------------------------
// Home
// -------------------------

app.get("/", (req, res) => {
  const customers = readData();

  res.render("index", {
    customers,
  });
});

// -------------------------
// Add Customer
// -------------------------

app.post("/customers", (req, res) => {
  const customers = readData();

  const customer = {
    id: Date.now().toString(),
    name: req.body.name,
    phone: req.body.phone,
    entries: [],
  };

  customers.push(customer);

  writeData(customers);

  res.redirect("/");
});

// -------------------------
// Customer Page
// -------------------------

app.get("/customers/:id", (req, res) => {
  const customers = readData();

  const customer = customers.find((customer) => customer.id === req.params.id);

  if (!customer) {
    return res.status(404).send("Customer not found");
  }

  const total = customer.entries.reduce((sum, entry) => {
    if (entry.type === "udhaar") {
      return sum + entry.amount;
    }

    return sum - entry.amount;
  }, 0);

  res.render("customer", {
    customer,
    total,
  });
});

// -------------------------
// Add Transaction
// -------------------------

app.post("/customers/:id/entries", (req, res) => {
  const customers = readData();

  const customer = customers.find((customer) => customer.id === req.params.id);

  if (!customer) {
    return res.status(404).send("Customer not found");
  }

  const entry = {
    id: Date.now().toString(),
    type: req.body.type,
    amount: Number(req.body.amount),
    description: req.body.description,
    date: new Date().toLocaleDateString(),
  };

  customer.entries.push(entry);

  writeData(customers);

  res.redirect(`/customers/${customer.id}`);
});

// -------------------------
// Delete Transaction
// -------------------------

app.post("/customers/:customerId/entries/:entryId/delete", (req, res) => {
  const customers = readData();

  const customer = customers.find(
    (customer) => customer.id === req.params.customerId,
  );

  if (!customer) {
    return res.status(404).send("Customer not found");
  }

  customer.entries = customer.entries.filter(
    (entry) => entry.id !== req.params.entryId,
  );

  writeData(customers);

  res.redirect(`/customers/${customer.id}`);
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">

//   <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
//   >

//   <title>Hisab Book</title>

//   <link rel="stylesheet" href="/style.css">
// </head>

// <body>

//   <div class="container">

//     <header class="header">
//       <div>
//         <h1>📒 Hisab Book</h1>
//         <p>Manage your customer accounts</p>
//       </div>
//     </header>

//     <!-- Add Customer -->

//     <section class="card">

//       <h2>Add Customer</h2>

//       <form action="/customers" method="POST">

//         <div class="form-grid">

//           <input
//             type="text"
//             name="name"
//             placeholder="Customer name"
//             required
//           >

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone number"
//           >

//         </div>

//         <button type="submit">
//           + Add Customer
//         </button>

//       </form>

//     </section>

//     <!-- Customers -->

//     <section>

//       <h2 class="section-title">
//         Customers
//       </h2>

//       <% if (customers.length === 0) { %>

//         <div class="empty">
//           <div class="empty-icon">📒</div>

//           <h3>No customers yet</h3>

//           <p>
//             Add your first customer to start keeping hisab.
//           </p>
//         </div>

//       <% } %>

//       <div class="customers">

//         <% customers.forEach(customer => { %>

//           <a
//             href="/customers/<%= customer.id %>"
//             class="customer-card"
//           >

//             <div class="avatar">
//               <%= customer.name.charAt(0).toUpperCase() %>
//             </div>

//             <div class="customer-info">

//               <h3>
//                 <%= customer.name %>
//               </h3>

//               <p>
//                 <%= customer.phone || "No phone number" %>
//               </p>

//             </div>

//             <div class="arrow">
//               →
//             </div>

//           </a>

//         <% }) %>

//       </div>

//     </section>

//   </div>

// </body>
// </html>

// <!DOCTYPE html>
// <html lang="en">

// <head>

//   <meta charset="UTF-8">

//   <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
//   >

//   <title><%= customer.name %> - Hisab</title>

//   <link rel="stylesheet" href="/style.css">

// </head>

// <body>

// <div class="container">

//   <!-- Header -->

//   <div class="topbar">

//     <a href="/" class="back">
//       ← Back
//     </a>

//     <div>
//       <h1><%= customer.name %></h1>
//       <p><%= customer.phone || "" %></p>
//     </div>

//   </div>

//   <!-- Balance -->

//   <div class="balance-card">

//     <span>Current Balance</span>

//     <strong
//       class="<%= total > 0 ? 'debt' : 'paid' %>"
//     >

//       Rs. <%= Math.abs(total).toLocaleString() %>

//     </strong>

//     <small>

//       <%= total > 0
//         ? "Customer has to pay you"
//         : total < 0
//         ? "You have to pay customer"
//         : "Account settled"
//       %>

//     </small>

//   </div>

//   <!-- Add Entry -->

//   <div class="card">

//     <h2>New Entry</h2>

//     <form
//       action="/customers/<%= customer.id %>/entries"
//       method="POST"
//     >

//       <div class="type-buttons">

//         <label class="type-option udhaar">

//           <input
//             type="radio"
//             name="type"
//             value="udhaar"
//             checked
//           >

//           <span>
//             Udhaar Diya
//           </span>

//         </label>

//         <label class="type-option jama">

//           <input
//             type="radio"
//             name="type"
//             value="jama"
//           >

//           <span>
//             Jama Liya
//           </span>

//         </label>

//       </div>

//       <input
//         type="number"
//         name="amount"
//         placeholder="Amount (Rs.)"
//         min="1"
//         required
//       >

//       <input
//         type="text"
//         name="description"
//         placeholder="Description e.g. Grocery"
//       >

//       <button type="submit">
//         Add Entry
//       </button>

//     </form>

//   </div>

//   <!-- History -->

//   <section>

//     <h2 class="section-title">
//       Transaction History
//     </h2>

//     <% if (customer.entries.length === 0) { %>

//       <div class="empty">

//         <div class="empty-icon">
//           🧾
//         </div>

//         <h3>No transactions</h3>

//         <p>
//           Add an entry to start the hisab.
//         </p>

//       </div>

//     <% } %>

//     <div class="transactions">

//       <% customer.entries.slice().reverse().forEach(entry => { %>

//         <div class="transaction">

//           <div
//             class="transaction-icon
//             <%= entry.type === 'udhaar'
//               ? 'icon-red'
//               : 'icon-green' %>"
//           >

//             <%= entry.type === "udhaar" ? "↑" : "↓" %>

//           </div>

//           <div class="transaction-info">

//             <h3>
//               <%= entry.description || "Transaction" %>
//             </h3>

//             <p>
//               <%= entry.date %>
//             </p>

//           </div>

//           <div class="transaction-right">

//             <strong
//               class="<%= entry.type === 'udhaar'
//                 ? 'debt'
//                 : 'paid' %>"
//             >

//               <%= entry.type === "udhaar"
//                 ? "+"
//                 : "-"
//               %>

//               Rs. <%= entry.amount.toLocaleString() %>

//             </strong>

//             <form
//               action="/customers/<%= customer.id %>/entries/<%= entry.id %>/delete"
//               method="POST"
//             >

//               <button
//                 class="delete-btn"
//                 type="submit"
//               >
//                 Delete
//               </button>

//             </form>

//           </div>

//         </div>

//       <% }) %>

//     </div>

//   </section>

// </div>

// </body>
// </html>
