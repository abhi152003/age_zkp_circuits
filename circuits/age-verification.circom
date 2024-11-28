pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/gates.circom";

template AgeVerification() {
    // Public Inputs - Order matters for public signals!
    signal input minimumAge;
    signal input currentYear;
    
    // Private Inputs
    signal input birthYear;
    
    // Intermediate signals
    signal age;
    
    // Output
    signal output isOldEnough;
    
    // Calculate age
    age <== currentYear - birthYear;
    
    // Age verification components
    component ageCheck = GreaterEqThan(32); // Check if age >= minimumAge
    ageCheck.in[0] <== age;
    ageCheck.in[1] <== minimumAge;
    
    // Valid birth year check (must be less than current year)
    component birthYearCheck = LessThan(32);
    birthYearCheck.in[0] <== birthYear;
    birthYearCheck.in[1] <== currentYear;
    
    // Reasonable birth year check (must be after 1900)
    component reasonableYearCheck = GreaterThan(32);
    reasonableYearCheck.in[0] <== birthYear;
    reasonableYearCheck.in[1] <== 1900;
    
    // Age must be non-negative and reasonable (less than 150)
    component validAgeRange = LessThan(32);
    validAgeRange.in[0] <== age;
    validAgeRange.in[1] <== 150;
    
    // Combine all checks
    component andGate1 = AND();
    andGate1.a <== birthYearCheck.out;
    andGate1.b <== reasonableYearCheck.out;
    
    component andGate2 = AND();
    andGate2.a <== andGate1.out;
    andGate2.b <== validAgeRange.out;
    
    component andGate3 = AND();
    andGate3.a <== andGate2.out;
    andGate3.b <== ageCheck.out;
    
    isOldEnough <== andGate3.out;
}

component main = AgeVerification();