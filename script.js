// DOM element references
var ageInput = document.getElementById("age");
var heightInput = document.getElementById("height");
var weightInput = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var submitButton = document.getElementById("submit");
var resultBox = document.getElementById("result-box");
var errorMessage = document.getElementById("error-message");

// Function to display messages and results (Replaces alert())
function displayMessage(text, isError = false) {
    if (isError) {
        errorMessage.textContent = text;
        errorMessage.classList.remove("hidden");
        resultBox.classList.add("hidden");
    } else {
        errorMessage.classList.add("hidden");
        resultBox.innerHTML = text;
        resultBox.classList.remove("hidden");
        resultBox.scrollIntoView({ behavior: 'smooth' });
    }
}

// Validation function
function validateForm() {
    // Check if fields are filled and contain valid numbers
    if (
        !ageInput.value ||
        !heightInput.value ||
        !weightInput.value ||
        (male.checked === false && female.checked === false) ||
        isNaN(ageInput.value) ||
        isNaN(heightInput.value) ||
        isNaN(weightInput.value)
    ) {
        displayMessage("Please fill all required fields and ensure the values are numbers.", true);
        return false;
    }
    return true;
}

// Main BMI calculation function
function countBmi() {
    if (!validateForm()) {
        return;
    }
    
    const weightKg = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);
    
    // Convert height from centimeters to meters
    const heightM = heightCm / 100;

    // BMI Formula: weight (kg) / [height (m)]^2
    var bmi = weightKg / (heightM * heightM);
    
    var resultColor = "#333";
    var bmiCategory = "";

    // Determine BMI Category (Using WHO standard ranges)
    const roundedBMI = parseFloat(bmi).toFixed(1);
    
    if (bmi < 18.5) {
        bmiCategory = "Underweight";
        resultColor = "#ffc107"; // Yellow
    } else if (bmi <= 24.9) {
        bmiCategory = "Healthy";
        resultColor = "#28a745"; // Green (Ideal)
    } else if (bmi <= 29.9) {
        bmiCategory = "Overweight";
        resultColor = "#ff7700"; // Orange
    } else {
        bmiCategory = "Obesity";
        resultColor = "#dc3545"; // Red
    }

    // Generate Result HTML
    const resultHtml = `
        <h2 style="color: ${resultColor}; font-weight: 600; margin-top: 0; font-size: 1.5rem;">Your Result: ${bmiCategory}</h2>
        <h1 style="color: #4a90e2; margin-top: 10px; font-size: 2.8rem;">${roundedBMI}</h1>
        <p style="font-size: 0.9rem; color: #777;">
            (Based on WHO BMI classification.)
        </p>
    `;
    
    displayMessage(resultHtml, false);
}

// Attach event listener to the submit button
submitButton.addEventListener("click", countBmi);
