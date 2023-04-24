// Replace YOUR_API_KEY with your actual OpenAI API key
const encodedString = "c2std3lKMnZKdWN4VjhLTDRzUnRNTkJUM0JsYmtGSklrUFR3eWZkRkZZQXZsT2QwM3pj";
    const decodedString = atob(encodedString);
const apiKey = decodedString;

// Load the OpenAI API library
const openai = require('openai')(`${apiKey}`);

// Retrieve the image and encode it as base64
const image = document.getElementById("image");
const canvas = document.createElement("canvas");
canvas.width = image.width;
canvas.height = image.height;
const context = canvas.getContext("2d");
context.drawImage(image, 0, 0, canvas.width, canvas.height);
const base64 = canvas.toDataURL("image/jpeg").split(",")[1];

// Retrieve the user's question and ask OpenAI API to answer it
const question = document.getElementById("question").value;
openai.completions.create({
  engine: 'davinci',
  prompt: `Q: ${question}\nI: data:image/jpeg;base64,${base64}\nA:`,
  max_tokens: 1024,
  n: 1,
  stop: '\n'
}).then(response => {
  const answer = response.data.choices[0].text.trim();
  document.getElementById("answer").textContent = answer;
}).catch(error => {
  console.error(error);
});
