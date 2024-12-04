// Define types for clarity
type Report = number[];

function isValidDifference(a: number, b: number): boolean {
    const diff = Math.abs(a - b);
    return diff >= 1 && diff <= 3;
}

function isSafeReport(report: Report): boolean {
    if (report.length < 2) return true;
    
    let shouldBeIncreasing: boolean | null = null;
    
    for (let i = 0; i < report.length - 1; i++) {
        const current = report[i];
        const next = report[i + 1];
        
        if (!isValidDifference(current, next)) {
            return false;
        }
        
        if (shouldBeIncreasing === null) {
            shouldBeIncreasing = next > current;
            continue;
        }
        
        if (shouldBeIncreasing && next <= current) {
            return false;
        }
        if (!shouldBeIncreasing && next >= current) {
            return false;
        }
    }
    
    return true;
}

function isSafeWithDampener(report: Report): boolean {
    // First check if it's safe without removing any number
    if (isSafeReport(report)) {
        return true;
    }
    
    // Try removing each number one at a time
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }
    
    return false;
}

function countSafeReports(input: string): number {
    // Split input into lines and parse each line into numbers
    const reports = input
        .trim()
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.split(' ').map(Number));
    
    // Count safe reports including those that can be made safe with the dampener
    return reports.filter(isSafeWithDampener).length;
}

// Export the function to be used in the JavaScript file
export { countSafeReports };