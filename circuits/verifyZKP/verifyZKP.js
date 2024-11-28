const { ethers } = require("ethers");

async function verifyZKP() {
    // Replace with your contract's ABI and address
    const verifierAbi = [{ "inputs": [{ "internalType": "uint256[2]", "name": "_pA", "type": "uint256[2]" }, { "internalType": "uint256[2][2]", "name": "_pB", "type": "uint256[2][2]" }, { "internalType": "uint256[2]", "name": "_pC", "type": "uint256[2]" }, { "internalType": "uint256[1]", "name": "_pubSignals", "type": "uint256[1]" }], "name": "verifyProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }];
    const verifierAddress = "0xEDdfF24Df3fBC152D800B4FDFd20a6e35c8694BF";

    // Connect to the Ethereum network (replace with your provider)
    const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/p87QDFHBkvdCxKgBjmOcHsXNCQph6eop");
    const contract = new ethers.Contract(verifierAddress, verifierAbi, provider);

    // Prepare the proof and public inputs
    const a = [
        "12264940344271769208724522072218553329594531749444833512221812213023648297642",
        "896204674811550080778230066731237894177921310706812205773549038723496738625",
    ];

    const b = [
        [
            "15516998596982533870120551928968744967791513798850946821520091098977489682384",
            "9474531604180474231632413226337410739191431925368937731995682896798143215810",
        ],
        [
            "15499308304552162003670717734490867830644758861389059751200255941073245240027",
            "10419504015985922256553455831172930990450189302195842214136902254531816102022",
        ],
    ];

    const c = [
        "2002897484423085158727534497793228492534761465426109494077975121376211893350",
        "20617469022218478564863668621695956964622399691851409173708547123922750698299",
    ];

    const publicInputs = ["1"];

    // Call the verifyProof function
    const isValid = await contract.verifyProof(a, b, c, publicInputs);
    console.log(isValid)

    console.log("Verification Result:", isValid ? "Success" : "Failure");
}

verifyZKP().catch(console.error);
