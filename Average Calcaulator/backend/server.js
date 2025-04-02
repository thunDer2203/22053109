const express = require('express');

const app = express();
const port = 3000;

// In-memory storage for the window
let window = [];
const windowSize = 10;

// Function to calculate the average of numbers in the window
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Function to generate random numbers
function generateRandomNumbers(count) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}

// Function to generate even numbers
function generateEvenNumbers(count) {
  return Array.from({ length: count }, (_, i) => i * 2);
}

// Function to generate prime numbers
function generatePrimeNumbers(count) {
  const numbers = [];
  let num = 2;
  while (numbers.length < count) {
    if (isPrime(num)) numbers.push(num);
    num++;
  }
  return numbers;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to generate Fibonacci numbers
function generateFibonacciNumbers(count) {
  const numbers = [];
  let a = 0, b = 1;
  while (numbers.length < count) {
    numbers.push(a);
    [a, b] = [b, a + b];
  }
  return numbers;
}

// Endpoint to calculate the average
app.get('/numbers/:numberid', (req, res) => {
  const numberid = req.params.numberid;
  let fetchedNumbers = [];

  switch (numberid) {
    case 'r':
      fetchedNumbers = generateRandomNumbers(windowSize);
      break;
    case 'e':
      fetchedNumbers = generateEvenNumbers(windowSize);
      break;
    case 'p':
      fetchedNumbers = generatePrimeNumbers(windowSize);
      break;
    case 'f':
      fetchedNumbers = generateFibonacciNumbers(windowSize);
      break;
    default:
      return res.status(400).json({ error: 'Invalid numberid. Use r, e, p, or f' });
  }

  // Store previous state before updating the window
  const windowPrevState = [...window];

  // Update the window with fetched numbers
  window = [...window, ...fetchedNumbers].slice(-windowSize);

  // Calculate the average
  const average = calculateAverage(window);

  // Respond with the window state and average
  res.json({
    windowPrevState,
    windowCurrState: window,
    numbers: fetchedNumbers,
    avg: average,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
