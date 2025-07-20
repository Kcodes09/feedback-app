const today = new Date();
const shortDateUS = today.toLocaleDateString('en-US'); // Example: "7/20/2025"
const shortDateUK = new Date().toLocaleDateString('en-IN'); // Example: "20/07/2025"
console.log(shortDateUS);
console.log(shortDateUK);