// P10(3527410986)
function permuteP10(keyBits) {
    return [keyBits[2], keyBits[4], keyBits[1], keyBits[6], keyBits[3], keyBits[9], keyBits[0], keyBits[8], keyBits[7], keyBits[5]];
}

function splitTenBits(tenBits) {
    return [tenBits.slice(0,5), tenBits.slice(5)];
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

// P8(637485109)
function permuteP8(tenBits) {
    return [tenBits[5],tenBits[2],tenBits[6],tenBits[3],tenBits[7],tenBits[4],tenBits[9],tenBits[8]];
}

function SDES() {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

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
    "<p>K2: " + K2.join("") + "</p>";

}