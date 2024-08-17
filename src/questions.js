// src/questions.js

const questions = [
  {
    id: 1,
    question: "What tag is used to define the largest heading in HTML?",
    options: [
      "<h1>",
      "<h6>",
      "<p>",
      "<div>"
    ],
    correctAnswer: 0  // Index of "<h1>"
  },
  {
    id: 2,
    question: "Which HTML tag is used to insert an image?",
    options: [
      "<img>",
      "<src>",
      "<image>",
      "<picture>"
    ],
    correctAnswer: 0  // Index of "<img>"
  },
  {
    id: 3,
    question: "Which CSS property is used to change the background color?",
    options: [
      "color",
      "background-color",
      "border-color",
      "text-color"
    ],
    correctAnswer: 1  // Index of "background-color"
  },
  {
    id: 4,
    question: "What is the default value of the CSS `position` property?",
    options: [
      "relative",
      "absolute",
      "fixed",
      "static"
    ],
    correctAnswer: 3  // Index of "static"
  },
  {
    id: 5,
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<hyperlink>"
    ],
    correctAnswer: 1  // Index of "<a>"
  },
  {
    id: 6,
    question: "What CSS property is used to control the spacing between elements' content and their border?",
    options: [
      "margin",
      "padding",
      "border-spacing",
      "gap"
    ],
    correctAnswer: 1  // Index of "padding"
  },
  {
    id: 7,
    question: "Which CSS property would you use to make the text bold?",
    options: [
      "font-style",
      "font-weight",
      "text-transform",
      "text-decoration"
    ],
    correctAnswer: 1  // Index of "font-weight"
  },
  {
    id: 8,
    question: "How do you add a comment in CSS?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
      "# This is a comment"
    ],
    correctAnswer: 2  // Index of "/* This is a comment */"
  },
  {
    id: 9,
    question: "In HTML, what does the `<br>` tag do?",
    options: [
      "Creates a horizontal line",
      "Breaks the line and moves to the next one",
      "Makes the text bold",
      "Inserts a blank space"
    ],
    correctAnswer: 1  // Index of "Breaks the line and moves to the next one"
  },
  {
    id: 10,
    question: "Which HTML tag is used to create a table?",
    options: [
      "<table>",
      "<td>",
      "<th>",
      "<tr>"
    ],
    correctAnswer: 0  // Index of "<table>"
  },
  {
    id: 11,
    question: "How do you create an ordered list in HTML?",
    options: [
      "<ul>",
      "<ol>",
      "<li>",
      "<dl>"
    ],
    correctAnswer: 1  // Index of "<ol>"
  },
  {
    id: 12,
    question: "Which CSS property is used to make the text italic?",
    options: [
      "font-style: italic;",
      "font-weight: italic;",
      "text-transform: italic;",
      "text-decoration: italic;"
    ],
    correctAnswer: 0  // Index of "font-style: italic;"
  },
  {
    id: 13,
    question: "Which JavaScript function is used to display data in the browser's console?",
    options: [
      "console.display()",
      "console.log()",
      "alert()",
      "document.write()"
    ],
    correctAnswer: 1  // Index of "console.log()"
  },
  {
    id: 14,
    question: "What does the `toUpperCase()` method do in JavaScript?",
    options: [
      "Converts a string to lowercase",
      "Converts a string to uppercase",
      "Capitalizes the first letter of a string",
      "Reverses the string"
    ],
    correctAnswer: 1  // Index of "Converts a string to uppercase"
  },
  {
    id: 15,
    question: "Which HTML element is used to specify a form field where the user can enter data?",
    options: [
      "<textarea>",
      "<form>",
      "<input>",
      "<button>"
    ],
    correctAnswer: 2  // Index of "<input>"
  },
  {
    id: 16,
    question: "What does the CSS property `text-align: center;` do to text inside a block element?",
    options: [
      "Aligns text to the left",
      "Aligns text to the right",
      "Justifies the text",
      "Centers the text"
    ],
    correctAnswer: 3  // Index of "Centers the text"
  },
  {
    id: 17,
    question: "In JavaScript, which method is used to join two or more strings?",
    options: [
      "concat()",
      "join()",
      "combine()",
      "append()"
    ],
    correctAnswer: 0  // Index of "concat()"
  },
  {
    id: 18,
    question: "What is the purpose of the `<select>` tag in HTML?",
    options: [
      "To create a dropdown list",
      "To create a radio button",
      "To create a checkbox",
      "To create a button"
    ],
    correctAnswer: 0  // Index of "To create a dropdown list"
  },
  {
    id: 19,
    question: "Which CSS property is used to set the space between letters in a text?",
    options: [
      "line-height",
      "letter-spacing",
      "word-spacing",
      "text-spacing"
    ],
    correctAnswer: 1  // Index of "letter-spacing"
  },
  {
    id: 20,
    question: "Which HTML attribute is used to define inline styles?",
    options: [
      "class",
      "id",
      "style",
      "inline"
    ],
    correctAnswer: 2  // Index of "style"
  }
];

export default questions;
