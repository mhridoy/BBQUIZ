const questions = [
  {
    id: 1,
    question: "What is the purpose of the `<h1>` tag in HTML?",
    options: [
      "To create a paragraph",
      "To create the largest heading",
      "To create a link",
      "To create a list item"
    ],
    correctAnswer: 1  // Index of "To create the largest heading"
  },
  {
    id: 2,
    question: "Which tag is used to insert an image in an HTML document?",
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
    question: "What does the `<p>` tag represent in HTML?",
    options: [
      "Paragraph",
      "Image",
      "Hyperlink",
      "Button"
    ],
    correctAnswer: 0  // Index of "Paragraph"
  },
  {
    id: 4,
    question: "Which tag is used to create a line break in HTML?",
    options: [
      "<break>",
      "<br>",
      "<lb>",
      "<line>"
    ],
    correctAnswer: 1  // Index of "<br>"
  },
  {
    id: 5,
    question: "What does the `<div>` tag do in HTML?",
    options: [
      "Creates a division or section",
      "Creates a list",
      "Creates a table",
      "Creates a hyperlink"
    ],
    correctAnswer: 0  // Index of "Creates a division or section"
  },
  {
    id: 6,
    question: "Which attribute is used to define the width of an image in HTML?",
    options: [
      "height",
      "src",
      "width",
      "size"
    ],
    correctAnswer: 2  // Index of "width"
  },
  {
    id: 7,
    question: "Which tag is used to create an unordered list in HTML?",
    options: [
      "<ul>",
      "<ol>",
      "<li>",
      "<list>"
    ],
    correctAnswer: 0  // Index of "<ul>"
  },
  {
    id: 8,
    question: "Which CSS property is used to change the background color?",
    options: [
      "color",
      "background-color",
      "border-color",
      "font-color"
    ],
    correctAnswer: 1  // Index of "background-color"
  },
  {
    id: 9,
    question: "Which HTML element is used to create a form?",
    options: [
      "<input>",
      "<form>",
      "<textarea>",
      "<button>"
    ],
    correctAnswer: 1  // Index of "<form>"
  },
  {
    id: 10,
    question: "Which CSS property is used to add space inside an element's border?",
    options: [
      "padding",
      "margin",
      "border-spacing",
      "line-height"
    ],
    correctAnswer: 0  // Index of "padding"
  },
  {
    id: 11,
    question: "What is the purpose of the `<label>` tag in an HTML form?",
    options: [
      "To create a text input",
      "To create a button",
      "To label form elements",
      "To submit a form"
    ],
    correctAnswer: 2  // Index of "To label form elements"
  },
  {
    id: 12,
    question: "Which HTML element is used to create a drop-down list?",
    options: [
      "<select>",
      "<option>",
      "<dropdown>",
      "<input>"
    ],
    correctAnswer: 0  // Index of "<select>"
  },
  {
    id: 13,
    question: "What does the `<ol>` tag create in an HTML document?",
    options: [
      "An ordered list",
      "An unordered list",
      "A list item",
      "A numbered paragraph"
    ],
    correctAnswer: 0  // Index of "An ordered list"
  },
  {
    id: 14,
    question: "Which CSS property is used to align text to the center?",
    options: [
      "text-align: left;",
      "text-align: right;",
      "text-align: center;",
      "text-align: justify;"
    ],
    correctAnswer: 2  // Index of "text-align: center;"
  },
  {
    id: 15,
    question: "What does the `float` property in CSS do?",
    options: [
      "Aligns an element to the left or right",
      "Centers an element",
      "Fixes an element's position",
      "Makes an element float above others"
    ],
    correctAnswer: 0  // Index of "Aligns an element to the left or right"
  },
  {
    id: 16,
    question: "Which HTML element is used to add a button?",
    options: [
      "<button>",
      "<input>",
      "<form>",
      "<label>"
    ],
    correctAnswer: 0  // Index of "<button>"
  },
  {
    id: 17,
    question: "Which attribute in the `<img>` tag is used to specify the image source?",
    options: [
      "src",
      "href",
      "link",
      "source"
    ],
    correctAnswer: 0  // Index of "src"
  },
  {
    id: 18,
    question: "Which CSS property controls the text color of an element?",
    options: [
      "color",
      "background-color",
      "font-color",
      "text-style"
    ],
    correctAnswer: 0  // Index of "color"
  },
  {
    id: 19,
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<a>",
      "<link>",
      "<href>",
      "<url>"
    ],
    correctAnswer: 0  // Index of "<a>"
  },
  {
    id: 20,
    question: "What does the `border-radius` property do in CSS?",
    options: [
      "Adds a border to an element",
      "Rounds the corners of an element",
      "Changes the border color",
      "Increases the border width"
    ],
    correctAnswer: 1  // Index of "Rounds the corners of an element"
  },
  {
    id: 21,
    question: "Which tag is used to define a table row in HTML?",
    options: [
      "<td>",
      "<tr>",
      "<th>",
      "<table>"
    ],
    correctAnswer: 1  // Index of "<tr>"
  },
  {
    id: 22,
    question: "What is the default display property of a `<div>` element in HTML?",
    options: [
      "block",
      "inline",
      "inline-block",
      "none"
    ],
    correctAnswer: 0  // Index of "block"
  },
  {
    id: 23,
    question: "Which CSS property is used to change the font size?",
    options: [
      "font-style",
      "font-weight",
      "font-size",
      "font-family"
    ],
    correctAnswer: 2  // Index of "font-size"
  },
  {
    id: 24,
    question: "Which tag is used to define a list item in HTML?",
    options: [
      "<li>",
      "<ul>",
      "<ol>",
      "<list>"
    ],
    correctAnswer: 0  // Index of "<li>"
  },
  {
    id: 25,
    question: "What does the `<title>` tag specify in an HTML document?",
    options: [
      "The title of the document shown in the browser tab",
      "The main heading of the page",
      "The subtitle of the page",
      "The alt text for an image"
    ],
    correctAnswer: 0  // Index of "The title of the document shown in the browser tab"
  },
  {
    id: 26,
    question: "Which attribute is used to open a hyperlink in a new tab?",
    options: [
      "href",
      "target",
      "rel",
      "src"
    ],
    correctAnswer: 1  // Index of "target"
  },
  {
    id: 27,
    question: "Which HTML tag is used to create a text area where users can type multiple lines of text?",
    options: [
      "<input>",
      "<textarea>",
      "<form>",
      "<textbox>"
    ],
    correctAnswer: 1  // Index of "<textarea>"
  },
  {
    id: 28,
    question: "Which CSS property is used to make the text bold?",
    options: [
      "font-weight",
      "font-style",
      "font-size",
      "font-family"
    ],
    correctAnswer: 0  // Index of "font-weight"
  },
  {
    id: 29,
    question: "What does the `opacity` property in CSS control?",
    options: [
      "The size of an element",
      "The color of an element",
      "The transparency of an element",
      "The position of an element"
    ],
    correctAnswer: 2  // Index of "The transparency of an element"
  },
  {
    id: 30,
    question: "Which tag is used to define a header in HTML?",
    options: [
      "<header>",
      "<head>",
      "<h1>",
      "<hgroup>"
    ],
    correctAnswer: 0  // Index of "<header>"
  }
];

export default questions;
