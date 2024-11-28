const { execSync } = require("child_process");
const fs = require("fs");

// Test cases
const testCases = [
  { birthdate: 946684800, currentDate: 1700860800, expected: 1 }, // Age >= 18
  { birthdate: 1230768000, currentDate: 1700860800, expected: 0 }  // Age < 18
];

testCases.forEach(({ birthdate, currentDate, expected }, index) => {
  const input = { birthdate, currentDate };
  fs.writeFileSync("input.json", JSON.stringify(input));

  execSync("node AgeVerifier_js/generate_witness.js AgeVerifier_js/AgeVerifier.wasm input.json witness.wtns");
  execSync("snarkjs wtns export json witness.wtns witness.json");

  const witness = JSON.parse(fs.readFileSync("witness.json"));
  const output = witness[1]; // Assuming isValid is the second signal

  console.log(`Test Case ${index + 1}:`, output === expected ? "Passed" : "Failed");
});
