const fs = require('fs');

// Parse input string into arrays of numbers
function parseInput(input) {
    // Split input into lines and extract the two numbers from each line
    const pairs = input.trim().split('\n').map(line => {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        return [left, right];
    });
    
    // Separate into left and right arrays
    const leftList = pairs.map(pair => pair[0]);
    const rightList = pairs.map(pair => pair[1]);
    
    return [leftList, rightList];
}

// Calculate similarity score
function calculateSimilarityScore(leftList, rightList) {
    let totalScore = 0;
    
    // For each number in the left list...
    for (let leftNum of leftList) {
        // Count how many times it appears in the right list
        const occurrences = rightList.filter(rightNum => rightNum === leftNum).length;
        // Add to total score (number * occurrences)
        totalScore += leftNum * occurrences;
    }
    
    return totalScore;
}

// Main function to process input and get result
function solve(input) {
    const [leftList, rightList] = parseInput(input);
    return calculateSimilarityScore(leftList, rightList);
}

// Read input from file and solve
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = solve(input);
    console.log(`The similarity score between the lists is: ${result}`);
} catch (err) {
    console.error('Error reading input file:', err);
}