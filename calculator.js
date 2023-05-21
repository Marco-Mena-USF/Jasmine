window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {
    amount: 100000,
    years: 5,
    rate: 3.5
}}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(values);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const { amount, years, rate } = values;
  const monthlyInterestRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
  const monthlyPayment = (amount * monthlyInterestRate) / denominator;
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").textContent = "$" + monthly;
}

function appendTd(tr, value) {
  const td = document.createElement("td");
  td.textContent = value;
  tr.appendChild(td);
}

function appendDeleteBtn(tr) {
  const td = document.createElement("td");
  td.textContent = "X";
  td.addEventListener("click", function() {
    tr.remove();
  });
  tr.appendChild(td);
}

function testAppendDeleteBtn() {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  const tr = document.createElement("tr");
  appendDeleteBtn(tr);
  tbody.appendChild(tr);

  console.log("Table before deletion:");
  console.log(table.innerHTML);

  const deleteBtn = tr.querySelector("td");
  deleteBtn.click();

  console.log("Table after deletion:");
  console.log(table.innerHTML);
}

testAppendDeleteBtn();
