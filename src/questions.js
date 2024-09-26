
const questions = [
  {
    id: 1,
    question: "Which tag is used to create the largest heading in HTML?",
    options: [
      "<h6>",
      "<h1>",
      "<header>",
      "<head>"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What does the `<p>` tag represent in HTML?",
    options: [
      "A paragraph",
      "A picture",
      "A heading",
      "A link"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Which tag is used to insert an image in an HTML page?",
    options: [
      "<image>",
      "<img>",
      "<pic>",
      "<src>"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "How do you add a horizontal line in HTML?",
    options: [
      "<line>",
      "<hr>",
      "<br>",
      "<hl>"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which tag creates a line break in HTML?",
    options: [
      "<break>",
      "<lb>",
      "<br>",
      "<bl>"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "How do you change the font size using inline CSS in HTML?",
    options: [
      `<p style="text-size:16px;">`,
      `<p style="font-size:16px;">`,
      `<p style="size-font:16px;">`,
      `<p style="font:16px;">`
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Which attribute is used with the `<img>` tag to specify the image source?",
    options: [
      "link",
      "href",
      "src",
      "source"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Which CSS property is used to change the background color?",
    options: [
      "color",
      "bgcolor",
      "background-color",
      "background"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "How do you center-align text using CSS?",
    options: [
      "text-align: center;",
      "align-text: center;",
      "horizontal-align: center;",
      "text-center: true;"
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "Which CSS property is used to change the font of an element?",
    options: [
      "font-family",
      "font-style",
      "text-font",
      "font-weight"
    ],
    correctAnswer: 0
  },
  {
    id: 12,
    question: "What does the 'float' property in CSS do?",
    options: [
      "Positions an element to the left or right",
      "Changes the opacity of an element",
      "Centers an element",
      "Creates a floating window"
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    question: "How do you add a comment in HTML?",
    options: [
      "`/* This is a comment */`",
      "`// This is a comment`",
      "`<!-- This is a comment -->`",
      "`** This is a comment **`"
    ],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "Which tag is used to link an external CSS file in HTML?",
    options: [
      "<style>",
      "<link>",
      "<css>",
      "<script>"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "What does 'border-radius' property do in CSS?",
    options: [
      "Sets the thickness of a border",
      "Rounds the corners of an element's border",
      "Defines the style of the border",
      "Sets the color of the border"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "How do you make a list that lists the items with numbers?",
    options: [
      "<ul>",
      "<ol>",
      "<li>",
      "<list>"
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "Which HTML tag is used to create a division or a section?",
    options: [
      "<span>",
      "<div>",
      "<section>",
      "<article>"
    ],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "In CSS, how do you select an element with class 'container'?",
    options: [
      "#container",
      ".container",
      "container",
      "*container"
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "What is the correct HTML for creating a hyperlink?",
    options: [
      `<a>http://www.example.com</a>`,
      `<a href="http://www.example.com">Link</a>`,
      `<link url="http://www.example.com">Link</link>`,
      `<a url="http://www.example.com">Link</a>`
    ],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Which CSS property controls the text size?",
    options: [
      "text-size",
      "font-size",
      "font-style",
      "size"
    ],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "How do you add a background image in CSS?",
    options: [
      `background-img: url('image.jpg');`,
      `background-image: url('image.jpg');`,
      `bg-image: url('image.jpg');`,
      `image-background: url('image.jpg');`
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "Which property is used to change the left margin of an element?",
    options: [
      "margin-left",
      "padding-left",
      "indent-left",
      "spacing-left"
    ],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "What is the correct way to write a JavaScript array?",
    options: [
      `let colors = "red", "green", "blue";`,
      `let colors = ["red", "green", "blue"];`,
      `let colors = (1:"red", 2:"green", 3:"blue");`,
      `let colors = {"red", "green", "blue"};`
    ],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: [
      `msgBox('Hello World');`,
      `alertBox('Hello World');`,
      `alert('Hello World');`,
      `msg('Hello World');`
    ],
    correctAnswer: 2
  },
  {
    id: 25,
    question: "Which event occurs when the user clicks on an HTML element?",
    options: [
      "onmouseclick",
      "onchange",
      "onclick",
      "onmouseover"
    ],
    correctAnswer: 2
  },
  {
    id: 26,
    question: "How do you declare a JavaScript variable?",
    options: [
      "variable carName;",
      "var carName;",
      "v carName;",
      "declare carName;"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    options: [
      "-",
      "*",
      "=",
      "/"
    ],
    correctAnswer: 2
  },
  {
    id: 28,
    question: "How do you create a function in JavaScript?",
    options: [
      "function = myFunction()",
      "function myFunction()",
      "function:myFunction()",
      "new function myFunction()"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "How do you call a function named 'myFunction'?",
    options: [
      "call myFunction()",
      "call function myFunction()",
      "myFunction()",
      "execute myFunction()"
    ],
    correctAnswer: 2
  },
  {
    id: 30,
    question: "Which built-in method combines the text of two strings and returns a new string?",
    options: [
      "append()",
      "concat()",
      "attach()",
      "combine()"
    ],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "How can you add a comment in JavaScript?",
    options: [
      "`<!-- This is a comment -->`",
      "`// This is a comment`",
      "`** This is a comment **`",
      "`\\ This is a comment`"
    ],
    correctAnswer: 1
  },
  {
    id: 32,
    question: "What is the correct way to write an array in JavaScript?",
    options: [
      "let colors = ['red', 'green', 'blue'];",
      "let colors = (1:'red', 2:'green', 3:'blue');",
      "let colors = {'red', 'green', 'blue'};",
      "let colors = 'red', 'green', 'blue';"
    ],
    correctAnswer: 0
  },
  {
    id: 33,
    question: "In JavaScript, which of the following is a logical operator?",
    options: [
      "+",
      "&&",
      "%",
      "="
    ],
    correctAnswer: 1
  },
  {
    id: 34,
    question: "What will the following code output? `console.log(typeof null);`",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'number'"
    ],
    correctAnswer: 2
  },
  {
    id: 35,
    question: "Which HTML attribute is used to define inline styles?",
    options: [
      "css",
      "style",
      "class",
      "styles"
    ],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "How do you select an element with id 'header' in CSS?",
    options: [
      ".header",
      "#header",
      "header",
      "*header"
    ],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "Which CSS property is used to change the text color of an element?",
    options: [
      "fgcolor",
      "text-color",
      "color",
      "font-color"
    ],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "Which property is used to change the font of an element in CSS?",
    options: [
      "font-weight",
      "font-style",
      "font-family",
      "font-display"
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    question: "Which of the following is the correct way to link an external JavaScript file?",
    options: [
      `<script href="script.js"></script>`,
      `<script name="script.js"></script>`,
      `<script src="script.js"></script>`,
      `<script link="script.js"></script>`
    ],
    correctAnswer: 2
  },
  {
    id: 40,
    question: "In CSS, 'flex' is a property of which layout module?",
    options: [
      "Grid Layout",
      "Flexbox",
      "Box Model",
      "Table Layout"
    ],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "Which HTML tag is used to create an unordered list?",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>"
    ],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "What does the 'position: absolute;' property do in CSS?",
    options: [
      "Positions an element relative to its normal position",
      "Positions an element relative to the nearest positioned ancestor",
      "Positions an element relative to the viewport",
      "Positions an element in the normal flow"
    ],
    correctAnswer: 1
  },
  {
    id: 43,
    question: "How do you make a text bold in HTML?",
    options: [
      "<bold>Text</bold>",
      "<b>Text</b>",
      "<strong>Text</strong>",
      "Both B and C"
    ],
    correctAnswer: 3
  },
  {
    id: 44,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: [
      "<script>",
      "<style>",
      "<css>",
      "<link>"
    ],
    correctAnswer: 1
  },
  {
    id: 45,
    question: "How do you write 'Hello World' in an alert box using JavaScript?",
    options: [
      `msg('Hello World');`,
      `alert('Hello World');`,
      `alertBox('Hello World');`,
      `console.log('Hello World');`
    ],
    correctAnswer: 1
  },
  {
    id: 46,
    question: "Which property is used to change the left margin of an element in CSS?",
    options: [
      "margin-left",
      "padding-left",
      "indent-left",
      "text-indent"
    ],
    correctAnswer: 0
  },
  {
    id: 47,
    question: "What does the 'display: flex;' property do in CSS?",
    options: [
      "Creates a grid layout",
      "Creates a flexible box layout",
      "Hides an element",
      "Fixes an element's position"
    ],
    correctAnswer: 1
  },
  {
    id: 48,
    question: "Which HTML tag is used to define a footer for a document or section?",
    options: [
      "<bottom>",
      "<footer>",
      "<foot>",
      "<section>"
    ],
    correctAnswer: 1
  },
  {
    id: 49,
    question: "In JavaScript, which symbol is used for comments?",
    options: [
      "// for single-line, /* */ for multi-line comments",
      "# for single-line comments",
      "` for comments",
      "<!-- for comments -->"
    ],
    correctAnswer: 0
  },
  {
    id: 50,
    question: "Which CSS property is used to change the background color of an element?",
    options: [
      "bgcolor",
      "background-color",
      "color-background",
      "bg-color"
    ],
    correctAnswer: 1
  }
];

export default questions;
