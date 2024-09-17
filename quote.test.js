const apiQuotes = [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
];

// Mocking DOM elements
document.body.innerHTML = `
  <div id="quote-container"></div>
  <div id="quote"></div>
  <div id="author"></div>
  <button id="new-quote"></button>
  <button id="twitter"></button>
  <div id="loader"></div>
`;

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiQuotes),
  })
);

// Import the script you want to test
const { newQuote, getQuotes } = require('../script.js');  // Make sure this path is correct

// Test the newQuote function
test('displays a new quote', () => {
  // Manually set the mocked quotes array
  apiQuotes.push({ text: "Test Quote", author: "Test Author" });

  // Call the function to show the new quote
  newQuote();
  
  const quoteText = document.getElementById('quote').textContent;
  const authorText = document.getElementById('author').textContent;
  
  expect(quoteText).toBe(apiQuotes[apiQuotes.length - 1].text);
  expect(authorText).toBe(apiQuotes[apiQuotes.length - 1].author);
});

// Test for getQuotes function
test('fetches quotes from API and displays one', async () => {
  await getQuotes();

  const quoteText = document.getElementById('quote').textContent;
  const authorText = document.getElementById('author').textContent;

  expect(fetch).toHaveBeenCalledTimes(1); // Ensure the fetch API was called
  expect(quoteText).toBe(apiQuotes[0].text);
  expect(authorText).toBe(apiQuotes[0].author);
});
