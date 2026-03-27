// ELEMENTS
const form = document.getElementById("form");
const tipEl = document.getElementById("tip-per-person");
const totalEl = document.getElementById("total-per-person");

const errBill = document.getElementById("err1");
const errPeople = document.getElementById("err2");

const customInput = document.getElementById("custom");
const tipRadios = document.querySelectorAll('input[name="tip"]');

// STATE
const state = {
  bill: 0,
  tip: 0,
  people: 1,
};

// EVENTS
form.addEventListener("input", handleInput);

form.addEventListener("reset", handleReset);

// HANDLE INPUT
function handleInput(e) {
  const { id, value, name, type } = e.target;

  // BILL
  if (id === "bill") {
    state.bill = parseFloat(value) || 0;
    toggleError(errBill, state.bill <= 0);
  }

  // PEOPLE
  if (id === "people") {
    state.people = parseFloat(value) || 0;
    toggleError(errPeople, state.people <= 0);
  }

  // CUSTOM TIP
  if (id === "custom") {
    state.tip = parseFloat(value) || 0;

    // uncheck radios if user types custom
    tipRadios.forEach((radio) => (radio.checked = false));
  }

  // RADIO TIP
  if (type === "radio" && name === "tip") {
    state.tip = parseFloat(value);

    // clear custom input if radio selected
    customInput.value = "";
  }

  update();
}

// UPDATE (calculate + render)
function update() {
  const { bill, tip, people } = state;

  const tipTotal = bill * (tip / 100);
  const total = bill + tipTotal;

  const tipPerPerson = tipTotal / people;
  const totalPerPerson = total / people;

  render(tipPerPerson, totalPerPerson);
}

// RENDER
function render(tipValue, totalValue) {
  tipEl.textContent = `$${tipValue.toFixed(2)}`;
  totalEl.textContent = `$${totalValue.toFixed(2)}`;
}

// RESET
function handleReset() {
  // let browser reset inputs first, then sync state
  setTimeout(() => {
    state.bill = 0;
    state.tip = 0;
    state.people = 1;

    render(0, 0);

    toggleError(errBill, false);
    toggleError(errPeople, false);
  });
}

// ERROR TOGGLE
function toggleError(el, show) {
  el.classList.toggle("hidden", !show);
}
