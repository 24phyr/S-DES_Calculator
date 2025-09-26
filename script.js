// P10(3527410986)
function permuteP10(keyArray) {
    return [keyArray[2], keyArray[4], keyArray[1], keyArray[6], keyArray[3], keyArray[9], keyArray[0], keyArray[8], keyArray[7], keyArray[5]];
}

function splitP10(P10Array) {
    return [P10Array.slice(0,5), P10Array.slice(5)];
}

function leftLS1(left) {
    return [left[1],left[2],left[3],left[4],left[0]];
}

function rightLS1(right) {
    return [right[1],right[2],right[3],right[4],right[0]];
}

function combineLS1(left,right) {
    return [left[1],left[2],left[3],left[4],left[0],right[1],right[2],right[3],right[4],right[0]];
}

function leftLS2(leftLS1Shifted) {
    return [leftLS1Shifted[2],leftLS1Shifted[3],leftLS1Shifted[4],leftLS1Shifted[0],leftLS1Shifted[1]];
}

function rightLS2(rightLS1Shifted) {
    return [rightLS1Shifted[2],rightLS1Shifted[3],rightLS1Shifted[4],rightLS1Shifted[0],rightLS1Shifted[1]];
}

function combineLS2(leftLS1Shifted,rightLS1Shifted) {
    return [leftLS1Shifted[2],leftLS1Shifted[3],leftLS1Shifted[4],leftLS1Shifted[0],leftLS1Shifted[1],rightLS1Shifted[2],rightLS1Shifted[3],rightLS1Shifted[4],rightLS1Shifted[0],rightLS1Shifted[1]];
}

// P8(637485109)
function permuteP8(shifted) {
    return [shifted[5],shifted[2],shifted[6],shifted[3],shifted[7],shifted[4],shifted[9],shifted[8]];
}

function SDES() {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    let ptArray = plaintext.split("").map(Number);
    let keyArray = key.split("").map(Number);

    console.log("Plaintext: ", ptArray);
    console.log("Key: ", keyArray);

    let P10Array = permuteP10(keyArray);
    console.log("P10 Permutation: ", P10Array);

    let [left, right] = splitP10(P10Array);
    console.log(left);
    console.log(right);

    let leftLS1Shifted = leftLS1(left);
    let rightLS1Shifted = rightLS1(right);

    let shiftedLS1 = combineLS1(left, right);
    console.log(shiftedLS1);

    let P8Array = permuteP8(shiftedLS1);
    console.log("P8 Permutation", P8Array);

    let leftLS2Shifted = leftLS2(leftLS1Shifted);
    let rightLS2Shifted = rightLS2(rightLS1Shifted);
    let shiftedLS2 = combineLS2(leftLS1Shifted, rightLS1Shifted);
    let K2 = permuteP8(shiftedLS2);
    console.log("K2: ", K2);

    document.getElementById("output").innerHTML = 
    "<p>Plaintext: " + ptArray.join("") + "</p>" +
    "<p>Key: " + keyArray.join("") + "</p>" +
    "<p>P10 Permutation: " + P10Array.join("") + "</p>" +
    "<p>left: " + left.join("") + "</p>" +
    "<p>right: " + right.join("") + "</p>" +
    "<p>LS-1 on Left: " + leftLS1Shifted.join("") + "</p>" +
    "<p>LS-1 on Right: " + rightLS1Shifted.join("") + "</p>" +
    "<p>Combining: " + shiftedLS1.join("") + "</p>" +
    "<p>K1: " + P8Array.join("") + "</p>" +
    "<p>LS-2 on Left: " + leftLS2Shifted.join("") + "</p>" +
    "<p>LS-2 on Right: " + rightLS2Shifted.join("") + "</p>" +
    "<p>Combining: " + shiftedLS2.join("") + "</p>" +
    "<p>K2: " + K2.join("") + "</p>";

}