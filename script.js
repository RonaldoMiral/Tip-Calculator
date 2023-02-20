const bill = document.getElementById("bill");
const number_of_people = document.getElementById("number-of-people");
const tip_price = document.getElementById("tip-price");
const total_price = document.getElementById("total-price");
const select_tip = document.getElementsByClassName("select-tip");
const tip_buttons = Array.from(select_tip[0].children);

let tip = 1;

bill.oninput = function () {
  if (number_of_people.value != "") calculating();
};

for (let i = 0; i < tip_buttons.length; i++) {
  tip_buttons[i].addEventListener("click", function () {
    if (tip_buttons[i].classList.contains("custom")) {
      for (let k = 0; k < tip_buttons.length; k++) {
        tip_buttons[k].classList.remove("isOn");
      }

      const custom = tip_buttons[i];
      custom.setAttribute("type", "number");
      custom.value = "";

      custom.addEventListener("input", () => {
        selectingTip(custom);
        if (number_of_people.value != "") calculating();
      });
    } else {
      selectingTip(tip_buttons[i]);
    }

    if (number_of_people.value != "") calculating();
  });
}

function selectingTip(clickedButton) {
  for (let k = 0; k < tip_buttons.length; k++) {
    if (!clickedButton.classList.contains("custom")) {
      tip_buttons[k].classList.remove("isOn");
      if (clickedButton == tip_buttons[k]) {
        clickedButton.classList.add("isOn");
      }
    }
  }

  tip = !clickedButton.classList.contains("custom")
    ? Number(clickedButton.innerText.replace("%", "")) / 100
    : clickedButton.value / 100;
  console.log(tip);
}

function calculating() {
  if (
    number_of_people.value <= 0 ||
    number_of_people.value == "" ||
    !Number.isInteger(Number(number_of_people.value))
  ) {
    document
      .getElementsByClassName("number-of-people")[0]
      .classList.add("error");
    total_price.innerText = "$0.00";
    tip_price.innerText = "$0.00";
    return;
  }

  document
    .getElementsByClassName("number-of-people")[0]
    .classList.remove("error");
  let byPerson = bill.value / number_of_people.value;
  let tipByPerson = byPerson * tip;
  let total = byPerson + tipByPerson;

  tip_price.innerText = tipByPerson.toFixed(2);
  total_price.innerText = total.toFixed(2);

  document.getElementById("reset").disabled = false;
}

function reset() {
  bill.value = "";
  number_of_people.value = "";
  total_price.innerText = "$0.00";
  tip_price.innerText = "$0.00";
  tip_buttons[tip_buttons.length - 1].setAttribute("type", "button");
  tip_buttons[tip_buttons.length - 1].value = "Custom";
  tip = 1;
  document.getElementById("reset").disabled = true;

  for (let i = 0; i < tip_buttons.length; i++) {
    tip_buttons[i].classList.remove("isOn");
  }
}
