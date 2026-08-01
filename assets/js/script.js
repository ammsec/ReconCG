/*
=========================================
ReconCG v1.0
Author: ammsec
=========================================
*/

function generateCommand() {

    let target = document.getElementById("target").value.trim();

    if (target === "") {
        alert("Please enter a target.");
        return;
    }

    let command = "nmap ";

    if (document.getElementById("syn").checked) {
        command += "-sS ";
    }

    if (document.getElementById("service").checked) {
        command += "-sV ";
    }

    if (document.getElementById("os").checked) {
        command += "-O ";
    }

    if (document.getElementById("aggressive").checked) {
        command += "-A ";
    }

    if (document.getElementById("verbose").checked) {
        command += "-v ";
    }

    if (document.getElementById("pn").checked) {
        command += "-Pn ";
    }

    command += target;

    document.getElementById("output").value = command;

}

function copyCommand() {

    let output = document.getElementById("output");

    if (output.value === "") {
        alert("Generate a command first.");
        return;
    }

    navigator.clipboard.writeText(output.value)
        .then(() => {

            alert("Command copied successfully!");

        })
        .catch(() => {

            output.select();
            document.execCommand("copy");
            alert("Command copied!");

        });

}

function resetForm() {

    document.getElementById("target").value = "";

    document.getElementById("syn").checked = false;

    document.getElementById("service").checked = false;

    document.getElementById("os").checked = false;

    document.getElementById("aggressive").checked = false;

    document.getElementById("verbose").checked = false;

    document.getElementById("pn").checked = false;

    document.getElementById("output").value = "";

}

document.addEventListener("DOMContentLoaded", () => {

    console.log("ReconCG Loaded Successfully");

    const target = document.getElementById("target");

    if (target) {

        target.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {

                generateCommand();

            }

        });

    }

});