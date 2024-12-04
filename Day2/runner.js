const fs = require('fs');
const { countSafeReports } = require('./analyzer.js');

// Read and process the input file
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = countSafeReports(input);
    console.log(`Number of safe reports with Problem Dampener: ${result}`);
} catch (error) {
    console.error('Error reading or processing the input file:', error);
}