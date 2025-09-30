// P10(3527410986)
function permuteP10(keyBits) {
    return [keyBits[2], keyBits[4], keyBits[1], keyBits[6], keyBits[3], keyBits[9], keyBits[0], keyBits[8], keyBits[7], keyBits[5]];
}

// P8(637485109)
function permuteP8(tenBits) {
    return [tenBits[5],tenBits[2],tenBits[6],tenBits[3],tenBits[7],tenBits[4],tenBits[9],tenBits[8]];
}

// IP(26314857)
function initialpermute(bits) {
    return [bits[1], bits[5], bits[2], bits[0], bits[3], bits[7], bits[4], bits[6]];
}

//Expand(41232341)
function expand(bits) {
    return [bits[3], bits[0], bits[1], bits[2], bits[1], bits[2], bits[3], bits[0]]
}

function splitTenBits(tenBits) {
    return [tenBits.slice(0,5), tenBits.slice(5)];
}

function splitEightBits(bits) {
    return [bits.slice(0,4), bits.slice(4)];
}

function circularLS1(bits) {
    return [bits[1],bits[2],bits[3],bits[4],bits[0]];
}

function combineHalves(left,right) {
    return left.concat(right);
}

function circularLS2(bits) {
    return [bits[2],bits[3],bits[4],bits[0],bits[1]];
}

function XOR(first,second) {
    let result = [];
    for (let i = 0; i < first.length; i++) {
        if (first[i] === second[i]) {
            result.push(0);
        }
        else {
            result.push(1);
        }
    }
    return result;
}

const S0 = [[1,0,3,2],[3,2,1,0],[0,2,1,3],[3,1,3,2]];
const S1 = [[0,1,2,3],[2,0,1,3],[3,0,1,0],[2,1,0,3]];

function decimalToBits(num) {
    if (num === 0) {
        return [0, 0];
    }
    if (num === 1) {
        return [0, 1];
    }
    if (num === 2) {
        return [1, 0];
    }
    if (num === 3) {
        return [1, 1];
    }
}

function sBoxLookup(bits, box) {
    let row = 0;
    if (bits[0] === 0 && bits[3] === 0) {
        row = 0;
    }
    if (bits[0] === 0 && bits[3] === 1) {
        row = 1;
    }
    if (bits[0] === 1 && bits[3] === 0) {
        row = 2;
    }
    if (bits[0] === 1 && bits[3] === 1) {
        row = 3;
    }
    
    let col = 0;
    if (bits[1] === 0 && bits[2] === 0) {
        col = 0;
    }
    if (bits[1] === 0 && bits[2] === 1) {
        col = 1;
    }
    if (bits[1] === 1 && bits[2] === 0) {
        col = 2;
    }
    if (bits[1] === 1 && bits[2] === 1) {
        col = 3;
    }

    let value = box[row][col];

    return decimalToBits(value);
}


//const S0 = [[[0,1],[0,0],[1,1],[1,0]],[[1,1],[1,0],[0,1],[0,0]],[[0,0],[1,0],[0,1],[1,1]],[[1,1],[0,1],[1,1],[1,0]]];
//const S1 = [[[0,0],[0,1],[1,0],[1,1]],[[1,0],[0,0],[0,1],[1,1]],[[1,1],[0,0],[0,1],[0,0]],[[1,0],[0,1],[0,0],[1,1]]];

function SDES() {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    if (!/^[01]+$/.test(plaintext) && !/^[01]+$/.test(key)) {
        alert("Plaintext and Key must consist of binary digits.");
        return;
    }

    if (!/^[01]+$/.test(plaintext)) {
        alert("Plaintext must consist of binary digits.");
        return;
    }
    
    if (!/^[01]+$/.test(key)) {
        alert("Key must consist of binary digits.");
        return;
    }

    let plaintextBits = plaintext.split("").map(Number);
    let keyBits = key.split("").map(Number);

    console.log("Plaintext: ", plaintextBits);
    console.log("Key: ", keyBits);

    let permutedP10 = permuteP10(keyBits);
    console.log("P10 Permutation: ", permutedP10);

    let [left, right] = splitTenBits(permutedP10);
    console.log(left);
    console.log(right);

    let leftLS1Shifted = circularLS1(left);
    let rightLS1Shifted = circularLS1(right);

    let shiftedLS1 = combineHalves(leftLS1Shifted, rightLS1Shifted);
    console.log(shiftedLS1);

    let K1 = permuteP8(shiftedLS1);
    console.log("K1: ", K1);

    let leftLS2Shifted = circularLS2(leftLS1Shifted);
    let rightLS2Shifted = circularLS2(rightLS1Shifted);
    let shiftedLS2 = combineHalves(leftLS2Shifted, rightLS2Shifted);
    let K2 = permuteP8(shiftedLS2);
    console.log("K2: ", K2);
    // Key Generation Done

    let IP = initialpermute(plaintextBits);
    console.log("After IP: ", IP);

    let [leftIP, rightIP] = splitEightBits(IP);
    console.log(leftIP);
    console.log(rightIP);
    
    let expandedRightHalf = expand(rightIP);
    console.log(expandedRightHalf);

    let XORedValue = XOR(expandedRightHalf,K1);
    console.log("XOR Value: ", XORedValue);

    let [leftXOR,rightXOR] = splitEightBits(XORedValue);
    console.log("left", leftXOR);
    console.log("right", rightXOR);

    let left2 = sBoxLookup(leftXOR, S0);
    let right2 = sBoxLookup(rightXOR, S1);

    let sBoxOutput = left2.concat(right2);
    console.log("S-Box Output: ", sBoxOutput);
    
    //TODO: Implement Swap Function

    document.getElementById("output").innerHTML = 
    "<p>Plaintext: " + plaintextBits.join("") + "</p>" +
    "<p>Key: " + keyBits.join("") + "</p>" +
    "<p>P10 Permutation: " + permutedP10.join("") + "</p>" +
    "<p>left: " + left.join("") + "</p>" +
    "<p>right: " + right.join("") + "</p>" +
    "<p>LS-1 on Left: " + leftLS1Shifted.join("") + "</p>" +
    "<p>LS-1 on Right: " + rightLS1Shifted.join("") + "</p>" +
    "<p>Combining: " + shiftedLS1.join("") + "</p>" +
    "<p>K1: " + K1.join("") + "</p>" +
    "<p>LS-2 on Left: " + leftLS2Shifted.join("") + "</p>" +
    "<p>LS-2 on Right: " + rightLS2Shifted.join("") + "</p>" +
    "<p>Combining: " + shiftedLS2.join("") + "</p>" +
    "<p>K2: " + K2.join("") + "</p>" +
    "<p>After IP: " + IP.join("") + "</p>" +
    "<p>left: " + leftIP.join("") + "</p>" +
    "<p>right: " + rightIP.join("") + "</p>" +
    "<p>Expanded Right Half: " + expandedRightHalf.join("") + "</p>" +
    "<p>XORed Value: " + XORedValue.join("") + "</p>" +
    "<p>left: " + leftXOR.join("") + "</p>" +
    "<p>right: " + rightXOR.join("") + "</p>";
}