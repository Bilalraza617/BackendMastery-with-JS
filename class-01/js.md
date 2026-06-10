# JavaScript Basics

JavaScript is a programming language used to make web pages interactive. It can run in the browser and with Node.js.

---

## 1. What is JavaScript?

JavaScript helps you add behavior to a page.

Examples:

- show or hide content
- validate forms
- change text on a page
- handle button clicks

### Simple example

```js
console.log("Hello, JavaScript!");
```

**Explanation:**

- `console.log()` prints a message in the console.
- This is often the first line people use when learning JavaScript.

---

## 2. Variables

Variables store data.

### Using `let`

```js
let name = "Ali";
console.log(name);
```

**Explanation:**

- `let` is used when a value can change later.
- `name` is the variable name.
- `"Ali"` is the value.

### Using `const`

```js
const age = 20;
console.log(age);
```

**Explanation:**

- `const` is used when the value should not change.
- Use `const` by default if the value stays the same.

### Using `var`

```js
var city = "Lahore";
console.log(city);
```

**Explanation:**

- `var` is the old way to declare variables.
- In modern JavaScript, prefer `let` and `const`.

---

## 3. Data Types

JavaScript has different types of values.

```js
let fullName = "Ahmed"; // string
let marks = 95; // number
let isPassed = true; // boolean
let nothing = null; // null
let notDefined; // undefined
```

**Explanation:**

- `string` is text.
- `number` is a numeric value.
- `boolean` is `true` or `false`.
- `null` means empty value.
- `undefined` means a variable has no value yet.

---

## 4. Arrays

Arrays store multiple values in one variable.

```js
let fruits = ["apple", "banana", "mango"];
console.log(fruits[0]);
console.log(fruits[2]);
```

**Explanation:**

- Arrays use square brackets `[]`.
- The first item is at index `0`.
- `fruits[0]` gives `apple`.

### Array methods

```js
let colors = ["red", "green"];
colors.push("blue");
console.log(colors);
```

**Explanation:**

- `push()` adds a new item at the end of the array.

---

## 5. Objects

Objects store related data as key-value pairs.

```js
let student = {
  name: "Sara",
  age: 18,
  grade: "A",
};

console.log(student.name);
console.log(student.age);
```

**Explanation:**

- Objects use curly braces `{}`.
- Each item has a key and a value.
- Access object values with dot notation.

---

## 6. Conditions

Conditions help you make decisions.

```js
let marks = 80;

if (marks >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

**Explanation:**

- `if` runs when the condition is true.
- `else` runs when the condition is false.

### Comparison operators

- `==` equal to
- `===` strictly equal to
- `!=` not equal to
- `>` greater than
- `<` less than
- `>=` greater than or equal to
- `<=` less than or equal to

### Best practice

Use `===` instead of `==` because it checks value and type both.

```js
console.log(5 === "5"); // false
```

---

## 7. Loops

Loops repeat code.

### `for` loop

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

**Explanation:**

- `let i = 1` starts the counter.
- `i <= 5` is the condition.
- `i++` increases the counter by 1.

### `while` loop

```js
let count = 1;

while (count <= 3) {
  console.log(count);
  count++;
}
```

**Explanation:**

- The loop keeps running while the condition is true.
- Always update the counter, or the loop may run forever.

---

## 8. Functions

Functions are reusable blocks of code.

```js
function greet(name) {
  console.log("Hello, " + name);
}

greet("Usman");
```

**Explanation:**

- `function` defines a function.
- `name` is the parameter.
- `greet("Usman")` calls the function.

### Function with return

```js
function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result);
```

**Explanation:**

- `return` sends the result back from the function.
- Here the function returns the sum of two numbers.

---

## 9. Arrow Functions

Arrow functions are a shorter way to write functions.

```js
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(4, 2));
```

**Explanation:**

- Arrow functions are commonly used in modern JavaScript.
- They are shorter and cleaner for simple logic.

---

## 10. Basic DOM Example

The DOM lets JavaScript interact with HTML.

```html
<button onclick="changeText()">Click Me</button>
<p id="message">Hello</p>

<script>
  function changeText() {
    document.getElementById("message").innerText = "Text changed!";
  }
</script>
```

**Explanation:**

- `document.getElementById()` selects an HTML element.
- `innerText` changes the visible text.
- `onclick` runs the function when the button is clicked.

---

## 11. Practice Example

```js
let number = 10;

if (number % 2 === 0) {
  console.log("Even number");
} else {
  console.log("Odd number");
}
```

**Explanation:**

- `%` gives the remainder after division.
- If the remainder is `0`, the number is even.

---

## 12. Quick Tips

- Use `const` when the value does not change.
- Use `let` when the value can change.
- Prefer `===` over `==`.
- Keep your code small and readable.
- Practice by writing small examples every day.

---

## 13. Next Step

After learning basics, practice:

- variables
- conditions
- loops
- functions
- arrays and objects
- DOM manipulation

This is the foundation for more advanced JavaScript topics.
