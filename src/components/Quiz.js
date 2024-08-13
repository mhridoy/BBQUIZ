// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What will be the layout of these boxes with this CSS?",
      code: `
.container {
  display: flex;
  justify-content: space-between;
}
.box {
  width: 50px;
  height: 50px;
  background-color: #3498db;
}
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
      `,
      options: [
        "Three boxes stacked vertically",
        "Three boxes side by side with space between them",
        "Three boxes overlapping each other",
        "One large box"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "How will this heading appear on the webpage?",
      code: `
<h1 style="color: #ff6b6b; text-shadow: 2px 2px #4ecdc4; font-family: 'Comic Sans MS', cursive;">
  Welcome to My Website!
</h1>
      `,
      options: [
        "Black text with no shadow",
        "Red text with a teal shadow and a serious font",
        "Teal text with a red shadow and a fun font",
        "Red text with a teal shadow and a fun font"
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      question: "What will this JavaScript code output?",
      code: `
const fruits = ['🍎', '🍌', '🍊', '🍇', '🍓'];
console.log(fruits.slice(1, 4).join(' '));
      `,
      options: [
        "🍎 🍌 🍊 🍇",
        "🍌 🍊 🍇",
        "🍌 🍊 🍇 🍓",
        "🍎 🍓"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "How will this button appear and behave?",
      code: `
<button style="
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.3s ease;
">
  Hover me!
</button>

<style>
button:hover {
  background-color: #45a049;
  transform: scale(1.1);
}
</style>
      `,
      options: [
        "A green button that enlarges on hover",
        "A white button that changes to green on hover",
        "A green button that shrinks on hover",
        "A button that doesn't change on hover"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "What will be the result of this CSS grid layout?",
      code: `
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.item {
  background-color: #3498db;
  color: white;
  padding: 20px;
  text-align: center;
}
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
      `,
      options: [
        "A single column of 5 items",
        "Two rows with 3 items in the first row and 2 in the second",
        "Three columns with items stacked vertically",
        "Five items in a single row"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "What will this animation do to the box?",
      code: `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.box {
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
  animation: pulse 2s infinite;
}

<div class="box"></div>
      `,
      options: [
        "The box will rotate continuously",
        "The box will change colors",
        "The box will pulse in and out",
        "The box will move left and right"
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "What will be the output of this JavaScript code?",
      code: `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
      `,
      options: [
        "[1, 2, 3, 4, 5]",
        "[2, 4, 6, 8, 10]",
        "[1, 4, 9, 16, 25]",
        "Error"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "How will this responsive design behave on different screen sizes?",
      code: `
.container {
  display: flex;
  flex-wrap: wrap;
}
.box {
  flex: 1;
  min-width: 200px;
  height: 200px;
  margin: 10px;
  background-color: #3498db;
}
@media (max-width: 600px) {
  .box {
    flex: 100%;
  }
}
      `,
      options: [
        "Boxes will always be in a single column",
        "Boxes will always be in a single row",
        "Boxes will be in a row on large screens and a column on small screens",
        "Boxes will not be visible on small screens"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: "What will this CSS selector target?",
      code: `
.post:nth-child(odd) {
  background-color: #f1f1f1;
}
      `,
      options: [
        "All post elements",
        "The first post element",
        "Even-numbered post elements",
        "Odd-numbered post elements"
      ],
      correctAnswer: 3
    },
    {
      id: 10,
      question: "What will be the result of this JavaScript code?",
      code: `
const result = [1, 2, 3, 4, 5].reduce((sum, num) => sum + num, 0);
console.log(result);
      `,
      options: [
        "15",
        "[1, 2, 3, 4, 5]",
        "5",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 11,
      question: "What will this CSS flexbox code do?",
      code: `
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 50px;
  height: 50px;
  background-color: #3498db;
}
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
      `,
      options: [
        "Align boxes to the left",
        "Align boxes to the right",
        "Center the boxes vertically and horizontally",
        "Space boxes evenly apart"
      ],
      correctAnswer: 2
    },
    {
      id: 12,
      question: "How will this CSS transform the button?",
      code: `
button {
  transform: rotate(45deg);
}
<button>Click Me!</button>
      `,
      options: [
        "Button will rotate 45 degrees",
        "Button will change color",
        "Button will increase size",
        "Button will become transparent"
      ],
      correctAnswer: 0
    },
    {
      id: 13,
      question: "What will this JavaScript code return?",
      code: `
const words = ['apple', 'banana', 'cherry'];
const result = words.map(word => word.length);
console.log(result);
      `,
      options: [
        "[5, 6, 6]",
        "[5, 6, 7]",
        "[6, 6, 7]",
        "[5, 7, 6]"
      ],
      correctAnswer: 0
    },
    {
      id: 14,
      question: "What will this CSS media query do?",
      code: `
@media (max-width: 600px) {
  body {
    background-color: #f0f0f0;
  }
}
      `,
      options: [
        "Change background color on screens larger than 600px",
        "Change background color on screens smaller than 600px",
        "Always change background color",
        "Never change background color"
      ],
      correctAnswer: 1
    },
    {
      id: 15,
      question: "What will this CSS flexbox property do?",
      code: `
.container {
  display: flex;
  flex-direction: column;
}
      `,
      options: [
        "Display items in a row",
        "Display items in a column",
        "Align items to the left",
        "Align items to the right"
      ],
      correctAnswer: 1
    },
    {
      id: 16,
      question: "What will be the result of this JavaScript code?",
      code: `
const animals = ['🐶', '🐱', '🐭'];
const result = animals.includes('🐱');
console.log(result);
      `,
      options: [
        "true",
        "false",
        "undefined",
        "null"
      ],
      correctAnswer: 0
    },
    {
      id: 17,
      question: "How will this CSS pseudo-class affect the button?",
      code: `
button:hover {
  background-color: #3498db;
}
<button>Hover over me!</button>
      `,
      options: [
        "Change background color when clicked",
        "Change background color when hovered",
        "Change text color when hovered",
        "No effect"
      ],
      correctAnswer: 1
    },
    {
      id: 18,
      question: "What will this JavaScript code do?",
      code: `
const x = 5;
const y = 10;
console.log(x > y ? 'x is greater' : 'y is greater');
      `,
      options: [
        "x is greater",
        "y is greater",
        "Error",
        "undefined"
      ],
      correctAnswer: 1
    },
    {
      id: 19,
      question: "What will this CSS rule do?",
      code: `
.container > .item {
  color: red;
}
      `,
      options: [
        "Select all items",
        "Select items that are direct children of container",
        "Select first item",
        "Select last item"
      ],
      correctAnswer: 1
    },
    {
      id: 20,
      question: "What will this JavaScript array method return?",
      code: `
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter(num => num > 3);
console.log(filtered);
      `,
      options: [
        "[4, 5]",
        "[1, 2, 3]",
        "[3, 4, 5]",
        "[]"
      ],
      correctAnswer: 0
    },
    {
      id: 21,
      question: "What does this CSS selector target?",
      code: `
.container .item {
  color: blue;
}
      `,
      options: [
        "All items inside container",
        "All containers",
        "First item inside container",
        "Last item inside container"
      ],
      correctAnswer: 0
    },
    {
      id: 22,
      question: "What will this JavaScript function return?",
      code: `
function add(a, b) {
  return a + b;
}
console.log(add(3, 4));
      `,
      options: [
        "7",
        "34",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 23,
      question: "What will this CSS display property do?",
      code: `
.item {
  display: none;
}
      `,
      options: [
        "Hide the item",
        "Show the item",
        "Make the item transparent",
        "Enlarge the item"
      ],
      correctAnswer: 0
    },
    {
      id: 24,
      question: "What will this JavaScript code output?",
      code: `
const fruit = 'apple';
console.log(fruit.toUpperCase());
      `,
      options: [
        "APPLE",
        "apple",
        "Apple",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 25,
      question: "How will this CSS border-radius affect the element?",
      code: `
.box {
  border-radius: 50%;
}
      `,
      options: [
        "Make the element circular",
        "Square the element",
        "Remove the border",
        "Change border color"
      ],
      correctAnswer: 0
    },
    {
      id: 26,
      question: "What will this JavaScript array method do?",
      code: `
const numbers = [5, 3, 8, 1];
numbers.sort();
console.log(numbers);
      `,
      options: [
        "[1, 3, 5, 8]",
        "[5, 3, 8, 1]",
        "[8, 5, 3, 1]",
        "[1, 8, 3, 5]"
      ],
      correctAnswer: 0
    },
    {
      id: 27,
      question: "What will this CSS property do to the text?",
      code: `
p {
  text-transform: uppercase;
}
      `,
      options: [
        "Make text lowercase",
        "Capitalize each word",
        "Make text uppercase",
        "Italicize text"
      ],
      correctAnswer: 2
    },
    {
      id: 28,
      question: "What will this JavaScript code output?",
      code: `
console.log(typeof 'hello');
      `,
      options: [
        "string",
        "object",
        "number",
        "boolean"
      ],
      correctAnswer: 0
    },
    {
      id: 29,
      question: "What will this CSS flex property do?",
      code: `
.container {
  display: flex;
  justify-content: space-around;
}
      `,
      options: [
        "Center items horizontally",
        "Align items to the left",
        "Space items evenly with space around them",
        "Space items evenly with space between them"
      ],
      correctAnswer: 2
    },
    {
      id: 30,
      question: "What will this JavaScript code return?",
      code: `
const numbers = [1, 2, 3];
const squared = numbers.map(num => num * num);
console.log(squared);
      `,
      options: [
        "[1, 4, 9]",
        "[1, 2, 3]",
        "[2, 3, 4]",
        "[3, 4, 5]"
      ],
      correctAnswer: 0
    },
    {
      id: 31,
      question: "What will this CSS text-align property do?",
      code: `
p {
  text-align: center;
}
      `,
      options: [
        "Align text to the left",
        "Align text to the right",
        "Center the text",
        "Justify the text"
      ],
      correctAnswer: 2
    },
    {
      id: 32,
      question: "What will this JavaScript code output?",
      code: `
const value = null;
console.log(value ? 'Has value' : 'No value');
      `,
      options: [
        "Has value",
        "No value",
        "undefined",
        "Error"
      ],
      correctAnswer: 1
    },
    {
      id: 33,
      question: "How will this CSS property affect the image?",
      code: `
img {
  width: 100px;
  height: auto;
}
      `,
      options: [
        "Stretch the image",
        "Keep the aspect ratio and set width to 100px",
        "Keep the aspect ratio and set height to 100px",
        "Shrink the image"
      ],
      correctAnswer: 1
    },
    {
      id: 34,
      question: "What will this JavaScript code return?",
      code: `
const isEven = num => num % 2 === 0;
console.log(isEven(4));
      `,
      options: [
        "true",
        "false",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 35,
      question: "What will this CSS margin property do?",
      code: `
.container {
  margin: 0 auto;
}
      `,
      options: [
        "Center the container horizontally",
        "Align the container to the left",
        "Align the container to the right",
        "Add space around the container"
      ],
      correctAnswer: 0
    },
    {
      id: 36,
      question: "What will this JavaScript code output?",
      code: `
console.log('5' + 5);
      `,
      options: [
        "55",
        "10",
        "5",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 37,
      question: "How will this CSS display property affect the element?",
      code: `
.box {
  display: inline-block;
}
      `,
      options: [
        "Display as block-level element",
        "Display as inline element",
        "Display as inline-block element",
        "Hide the element"
      ],
      correctAnswer: 2
    },
    {
      id: 38,
      question: "What will this JavaScript code output?",
      code: `
const numbers = [1, 2, 3];
const first = numbers.shift();
console.log(first);
      `,
      options: [
        "1",
        "2",
        "3",
        "undefined"
      ],
      correctAnswer: 0
    },
    {
      id: 39,
      question: "What will this CSS float property do?",
      code: `
.box {
  float: right;
}
      `,
      options: [
        "Float the box to the left",
        "Float the box to the right",
        "Center the box",
        "Hide the box"
      ],
      correctAnswer: 1
    },
    {
      id: 40,
      question: "What will this JavaScript code return?",
      code: `
const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits.indexOf('banana'));
      `,
      options: [
        "1",
        "0",
        "2",
        "-1"
      ],
      correctAnswer: 0
    },
    {
      id: 41,
      question: "What will this CSS opacity property do?",
      code: `
.box {
  opacity: 0.5;
}
      `,
      options: [
        "Make the box fully opaque",
        "Make the box fully transparent",
        "Make the box half-transparent",
        "Hide the box"
      ],
      correctAnswer: 2
    },
    {
      id: 42,
      question: "What will this JavaScript code output?",
      code: `
console.log(typeof null);
      `,
      options: [
        "object",
        "null",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 43,
      question: "What will this CSS property do to the background?",
      code: `
body {
  background-repeat: no-repeat;
}
      `,
      options: [
        "Repeat the background image",
        "Do not repeat the background image",
        "Center the background image",
        "Stretch the background image"
      ],
      correctAnswer: 1
    },
    {
      id: 44,
      question: "What will this JavaScript code return?",
      code: `
const x = 10;
const y = 5;
console.log(x >= y);
      `,
      options: [
        "true",
        "false",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 45,
      question: "What will this CSS padding property do?",
      code: `
.container {
  padding: 20px;
}
      `,
      options: [
        "Add space inside the container",
        "Add space outside the container",
        "Remove space inside the container",
        "Remove space outside the container"
      ],
      correctAnswer: 0
    },
    {
      id: 46,
      question: "What will this JavaScript code output?",
      code: `
console.log(2 ** 3);
      `,
      options: [
        "6",
        "8",
        "9",
        "Error"
      ],
      correctAnswer: 1
    },
    {
      id: 47,
      question: "How will this CSS property affect the text?",
      code: `
p {
  font-weight: bold;
}
      `,
      options: [
        "Italicize the text",
        "Make the text bold",
        "Underline the text",
        "Change text color"
      ],
      correctAnswer: 1
    },
    {
      id: 48,
      question: "What will this JavaScript code output?",
      code: `
const numbers = [10, 20, 30];
numbers.push(40);
console.log(numbers);
      `,
      options: [
        "[10, 20, 30, 40]",
        "[10, 20, 30]",
        "[40, 30, 20, 10]",
        "[40]"
      ],
      correctAnswer: 0
    },
    {
      id: 49,
      question: "What will this CSS text-decoration property do?",
      code: `
a {
  text-decoration: underline;
}
      `,
      options: [
        "Remove underline from links",
        "Underline the links",
        "Make links bold",
        "Italicize links"
      ],
      correctAnswer: 1
    },
    {
      id: 50,
      question: "What will this JavaScript code output?",
      code: `
const isAdult = age => age >= 18;
console.log(isAdult(21));
      `,
      options: [
        "true",
        "false",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 51,
      question: "What will this CSS max-width property do?",
      code: `
.container {
  max-width: 600px;
}
      `,
      options: [
        "Limit the width to 600px",
        "Expand the width beyond 600px",
        "Fix the width at 600px",
        "Remove width limits"
      ],
      correctAnswer: 0
    },
    {
      id: 52,
      question: "What will this JavaScript code output?",
      code: `
const name = 'Alice';
console.log(name.charAt(0));
      `,
      options: [
        "A",
        "a",
        "Alice",
        "Error"
      ],
      correctAnswer: 0
    },
    {
      id: 53,
      question: "What will this CSS border property do?",
      code: `
.box {
  border: 1px solid black;
}
      `,
      options: [
        "Add a dotted border",
        "Add a solid border",
        "Remove the border",
        "Change the border color"
      ],
      correctAnswer: 1
    },
    {
      id: 54,
      question: "What will this JavaScript code output?",
      code: `
console.log(Math.max(1, 3, 2));
      `,
      options: [
        "1",
        "2",
        "3",
        "Error"
      ],
      correctAnswer: 2
    },
    {
      id: 55,
      question: "What will this CSS overflow property do?",
      code: `
.container {
  overflow: hidden;
}
      `,
      options: [
        "Display overflowing content",
        "Hide overflowing content",
        "Scroll overflowing content",
        "Stretch overflowing content"
      ],
      correctAnswer: 1
    },
    {
      id: 56,
      question: "What will this JavaScript code return?",
      code: `
const greet = name => \`Hello, \${name}!\`;
console.log(greet('Bob'));
      `,
      options: [
        "Hello, Bob!",
        "Hello, Alice!",
        "Error",
        "undefined"
      ],
      correctAnswer: 0
    },
    {
      id: 57,
      question: "What will this CSS position property do?",
      code: `
.box {
  position: absolute;
  top: 50px;
  left: 100px;
}
      `,
      options: [
        "Position the box relative to the document",
        "Position the box relative to its parent",
        "Position the box relative to the viewport",
        "Hide the box"
      ],
      correctAnswer: 2
    },
    {
      id: 58,
      question: "What will this JavaScript code output?",
      code: `
console.log(Boolean(''));
      `,
      options: [
        "true",
        "false",
        "undefined",
        "Error"
      ],
      correctAnswer: 1
    },
    {
      id: 59,
      question: "What will this CSS font-style property do?",
      code: `
p {
  font-style: italic;
}
      `,
      options: [
        "Make text bold",
        "Underline text",
        "Make text italic",
        "Change text color"
      ],
      correctAnswer: 2
    },
    {
      id: 60,
      question: "What will this JavaScript code return?",
      code: `
const sum = (a, b) => a + b;
console.log(sum(5, 10));
      `,
      options: [
        "15",
        "510",
        "undefined",
        "Error"
      ],
      correctAnswer: 0
    }
  ];
  const correctAnswers = {
    1: 1, // Three boxes side by side with space between them
    2: 3, // Red text with a teal shadow and a fun font
    3: 1, // 🍌 🍊 🍇
    4: 0, // A green button that enlarges on hover
    5: 1, // Two rows with 3 items in the first row and 2 in the second
    6: 2, // The box will pulse in and out
    7: 1, // [2, 4, 6, 8, 10]
    8: 2, // Boxes will be in a row on large screens and a column on small screens
    9: 3, // Odd-numbered post elements
    10: 0, // 15
    11: 2, // Center the boxes vertically and horizontally
    12: 0, // Button will rotate 45 degrees
    13: 0, // [5, 6, 6]
    14: 1, // Change background color on screens smaller than 600px
    15: 1, // Display items in a column
    16: 0, // true
    17: 1, // Change background color when hovered
    18: 1, // y is greater
    19: 1, // Select items that are direct children of container
    20: 0, // [4, 5]
    21: 0, // All items inside container
    22: 0, // 7
    23: 0, // Hide the item
    24: 0, // APPLE
    25: 0, // Make the element circular
    26: 0, // [1, 3, 5, 8]
    27: 2, // Make text uppercase
    28: 0, // string
    29: 2, // Space items evenly with space around them
    30: 0, // [1, 4, 9]
    31: 2, // Center the text
    32: 1, // No value
    33: 1, // Keep the aspect ratio and set width to 100px
    34: 0, // true
    35: 0, // Center the container horizontally
    36: 0, // 55
    37: 2, // Display as inline-block element
    38: 0, // 1
    39: 1, // Float the box to the right
    40: 0, // 1
    41: 2, // Make the box half-transparent
    42: 0, // object
    43: 1, // Do not repeat the background image
    44: 0, // true
    45: 0, // Add space inside the container
    46: 1, // 8
    47: 1, // Make the text bold
    48: 0, // [10, 20, 30, 40]
    49: 1, // Underline the links
    50: 0, // true
    51: 0, // Limit the width to 600px
    52: 0, // A
    53: 1, // Add a solid border
    54: 2, // 3
    55: 1, // Hide overflowing content
    56: 0, // Hello, Bob!
    57: 2, // Position the box relative to the viewport
    58: 1, // false
    59: 2, // Make text italic
    60: 0  // 15
  };

  const handleFinishQuiz = async () => {
    const student = JSON.parse(localStorage.getItem('student'));
    const correctCount = Object.keys(answers).reduce((count, key) => {
      return count + (answers[key] === correctAnswers[key] ? 1 : 0);
    }, 0);

    const result = {
      name: student.name,
      batch: student.batch,
      correctCount,
      totalQuestions: questions.length,
    };

    try {
      await addDoc(collection(db, 'quizResults'), result);
      console.log('Quiz results saved successfully');
    } catch (e) {
      console.error('Error saving quiz results: ', e);
    }

    navigate('/confirmation');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz();
    }
  }, [timeLeft]);

  const handleChange = (option) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <div key={question.id}>
        <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
        <pre className="bg-gray-100 p-3 rounded mb-4 overflow-x-auto">{question.code}</pre>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${question.id}`}
                value={index}
                checked={answers[currentQuestion] === index}
                onChange={() => handleChange(index)}
                className="form-radio text-blue-600"
              />
              <label htmlFor={`option-${index}`} className="ml-2 text-gray-700">{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-12 max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Web Development Quiz</h2>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-lg font-semibold">
            Time Left: <span className="text-red-500">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </span>
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full mb-6">
          <div
            className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
          >
            {Math.round((currentQuestion + 1) / questions.length * 100)}%
          </div>
        </div>
        <div className="mb-8">
          {renderQuestion()}
        </div>
        <button
          onClick={handleNext}
          className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;