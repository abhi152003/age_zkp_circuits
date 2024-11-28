const generateInput = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const minimumAge = 18;

    // Input validation
    if (birthYear > currentYear) {
        throw new Error(`Invalid birth year: ${birthYear}. Birth year cannot be in the future.`);
    }

    const age = currentYear - birthYear;
    
    if (age < 0 || age > 150) {
        throw new Error(`Invalid age: ${age}. Age must be between 0 and 150 years.`);
    }

    if (birthYear < 1900) {
        throw new Error(`Invalid birth year: ${birthYear}. Birth year must be after 1900.`);
    }

    const input = {
        minimumAge,
        currentYear,
        birthYear
    };

    // Print debug information to stderr (won't affect the JSON output)
    console.error('=== Input Generation Debug Info ===');
    console.error(`Current Year: ${currentYear}`);
    console.error(`Birth Year: ${birthYear}`);
    console.error(`Calculated Age: ${age}`);
    console.error(`Minimum Required Age: ${minimumAge}`);
    console.error(`Meets age requirement: ${age >= minimumAge ? 'Yes' : 'No'}`);
    console.error('================================');

    return input;
};

try {
    const birthYear = parseInt(process.argv[2]);
    
    if (isNaN(birthYear)) {
        throw new Error('Please provide a valid birth year as a number');
    }
    
    const input = generateInput(birthYear);
    // Output only the JSON to stdout
    console.log(JSON.stringify(input, null, 2));
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}