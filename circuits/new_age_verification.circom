pragma circom 2.2.1;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

template PoseidonHash() {
    signal input in;
    signal output out;
    
    component poseidon = Poseidon(1);
    poseidon.inputs[0] <== in;
    out <== poseidon.out;
}

template Main() {
    // Inputs
    signal input age;
    signal input hashInput;

    // Output
    signal output isOver18;

    // Internal signals
    signal computedHash;

    // Create hash instance
    component hasher = PoseidonHash();
    hasher.in <== age;
    computedHash <== hasher.out;

    // Ensure the computed hash matches the input hash
    computedHash === hashInput;

    // Verify if age >= 18 using the comparators
    component ageCheck = GreaterEqThan(32);
    ageCheck.in[0] <== age;
    ageCheck.in[1] <== 18;
    isOver18 <== ageCheck.out;
}

component main = Main();
