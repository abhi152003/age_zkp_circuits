const snarkjs = require("snarkjs");
const fs = require("fs");

async function verifyProof() {
    try {
        // First check if the required files exist
        if (!fs.existsSync("proof.json")) {
            throw new Error("proof.json not found. Did you run the proof generation step?");
        }
        if (!fs.existsSync("public.json")) {
            throw new Error("public.json not found. Did you run the proof generation step?");
        }
        if (!fs.existsSync("verification_key.json")) {
            throw new Error("verification_key.json not found. Did you complete the circuit setup?");
        }

        // Read the files
        const proof = JSON.parse(fs.readFileSync("proof.json", "utf8"));
        const publicSignals = JSON.parse(fs.readFileSync("public.json", "utf8"));
        const vKey = JSON.parse(fs.readFileSync("verification_key.json", "utf8"));

        // Debug information about public signals
        console.error('=== Verification Debug Info ===');
        console.error('Raw Public Signals:', publicSignals);
        console.error(`Is Old Enough: ${publicSignals.isOldEnough}`);
        console.error(`Minimum Age: ${publicSignals.minimumAge}`);
        console.error(`Current Year: ${publicSignals.currentYear}`);
        console.error('============================');

        // Debugging public inputs
        console.log("Minimum Age:", publicSignals.minimumAge);
        console.log("Current Year:", publicSignals.currentYear);

        // Verify the proof
        const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

        if (isValid) {
            console.log("✅ Age verification successful!");
            console.log("The person is above the minimum age requirement.");
        } else {
            console.log("❌ Verification failed!");
            console.log("Invalid proof or age requirement not met.");
        }

        return isValid;
    } catch (error) {
        console.error("Error during verification:");
        console.error(error.message);
        process.exit(1);
    }
}

verifyProof().then(() => {
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});