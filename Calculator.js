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

// Calculate total distance between sorted lists
function calculateTotalDistance(leftList, rightList) {
    // Sort both lists in ascending order
    const sortedLeft = [...leftList].sort((a, b) => a - b);
    const sortedRight = [...rightList].sort((a, b) => a - b);
    
    // Calculate sum of absolute differences between pairs
    let totalDistance = 0;
    for (let i = 0; i < sortedLeft.length; i++) {
        totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }
    
    return totalDistance;
}

// Main function to process input and get result
function solve(input) {
    const [leftList, rightList] = parseInput(input);
    return calculateTotalDistance(leftList, rightList);
}

// Read input from file
try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = solve(input);
    console.log(`The total distance between the lists is: ${result}`);
} catch (err) {
    console.error('Error reading input file:', err);
}