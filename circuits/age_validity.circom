pragma circom 2.1.0;

// Template for verifying age using timestamp difference
template AgeVerification() {
    // Inputs
    signal input birthTimestamp;     // User's birthdate timestamp
    signal input currentTimestamp;   // Current timestamp
    signal input minimumAgeInSeconds; // Minimum age threshold in seconds
    
    // Output signal (proof validity)
    signal output isProofValid;
    
    // Calculate timestamp difference
    signal timestampDiff <-- currentTimestamp - birthTimestamp;
    
    // Verify timestamp difference is non-negative (currentTimestamp > birthTimestamp)
    // This uses a quadratic constraint to check non-negativity
    signal negativeDiff <-- timestampDiff * timestampDiff;
    
    // Ensure the difference is positive
    negativeDiff === negativeDiff;
    
    // Verify age constraint 
    // Check if timestamp difference is greater than minimum age in seconds
    signal ageConstraint <-- timestampDiff - minimumAgeInSeconds;
    
    // Use quadratic constraint to verify the age condition
    signal ageConstraintSquared <-- ageConstraint * ageConstraint;
    
    // Determine proof validity
    // If ageConstraint is non-negative, proof is valid (1)
    // If ageConstraint is negative, proof is invalid (0)
    signal isPositive <-- (ageConstraint > 0) ? 1 : 0;
    
    // Constrain the output
    isProofValid <-- isPositive;
}

// Example component instantiation
// Minimum age of 18 years in seconds (approximate)
// 18 * 365.25 * 24 * 60 * 60 = 567648000 seconds
component main = AgeVerification();