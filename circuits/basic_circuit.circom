pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template AgeVerification() {
    signal input minAge;   // Public input
    signal input userAge;  // Private input
    signal output ageValidation; // Public output indicating validation status

    // Create comparison component
    component geq = GreaterEqThan(32);
    
    // Connect inputs to the comparison component
    geq.in[0] <== userAge;
    geq.in[1] <== minAge;

    // Set ageValidation based on the comparison result
    // 1 means valid, 0 means invalid
    ageValidation <== geq.out;

    // Enforce that ageValidation is strictly binary
    ageValidation * (ageValidation - 1) === 0;
}

component main = AgeVerification();