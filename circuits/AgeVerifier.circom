pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template AgeVerifier() {
    signal input birthdate;  // User's birthdate in UNIX timestamp
    signal input currentDate; // Current date in UNIX timestamp
    signal output isValid;    // Output: 1 if age >= 18, else 0

    // Constants
    var secondsInDay = 86400; // 24 * 60 * 60
    var eighteenYearsInSeconds = 18 * 365 * secondsInDay;  // 18 years in seconds

    // Calculate time difference in seconds
    signal timeDifference <== currentDate - birthdate;

    // Compare directly with 18 years in seconds
    component lt = LessThan(52);  // Increased bits to handle larger numbers
    lt.in[0] <== timeDifference;
    lt.in[1] <== eighteenYearsInSeconds;

    // Set isValid to 0 if under 18, 1 if 18 or over
    isValid <== 1 - lt.out;
}

component main = AgeVerifier();