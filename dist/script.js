const encryptBtn = document.querySelector("#enc-btn");
const decryptBtn = document.querySelector("#dec-btn");
const encryptDiv = document.querySelector("#encryption");
const decryptDiv = document.querySelector("#decryption");
const encryptionBtn = document.querySelector("#encryption-btn");
const decryptionBtn = document.querySelector("#decryption-btn");
let result = document.querySelector("#result");
let clutter = "";

function encryption() {
  encryptionBtn.addEventListener("click", function () {
    var input = document.getElementById("enc-textarea").value;
    var password = document.getElementById("enc-password").value;

    const letter = input.split("");
    letter.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} &#128${
        element.charCodeAt() -
        Math.floor(Math.random() * 4 + Math.ceil(Math.random() * 5))
      } `;
    });

    if (input != "" && password != "") {
      encryptionBtn.addEventListener("click", function () {
        result.classList.remove("hidden");
        result.innerHTML = clutter;
      });
    } else {
      alert("Please enter input and password both fields.");
    }

    let data = [];

    if (JSON.parse(localStorage.getItem("index1"))) {
      data = JSON.parse(localStorage.getItem("index1"));
      data.push({
        pwd: password,
        input: input,
        clutterVal: clutter,
      });
    } else {
      data = [
        {
          pwd: password,
          input: input,
          clutterVal: clutter,
        },
      ];
    }
    localStorage.setItem("index1", JSON.stringify(data));
  });
}
encryption();

function decryption() {
  decryptionBtn.addEventListener("click", function () {
    var input2 = document.getElementById("dec-textarea").value;
    var password2 = document.getElementById("dec-password").value;
    var clutter2 = "";

    var user = JSON.parse(localStorage.getItem("index1"));
    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)}`;
    });
    var found;
    for (let i of user) {
      if ((i.clutterVal = clutter2)) {
        found = i;
      }
    }

    if (found.clutterVal === clutter2) {
      result.innerHTML = found.input;
    } else {
      result.innerHTML = "Wrong password or input.";
    }
    if (input2 != "" && password2 != "") {
      decryptionBtn.addEventListener("click", function () {
        result.classList.remove("hidden");
      });
    } else {
      alert("Please enter input and password both fields.");
    }
  });
}
decryption();

function btnClick() {
  decryptBtn.addEventListener("click", function () {
    decryptDiv.classList.remove("hidden");
    encryptDiv.classList.add("hidden");
    encryptBtn.classList.remove("bg-slate-700");
    decryptBtn.classList.add("bg-slate-700");
    result.classList.add("hidden");
  });
  encryptBtn.addEventListener("click", function () {
    encryptDiv.classList.remove("hidden");
    decryptDiv.classList.add("hidden");
    encryptBtn.classList.add("bg-slate-700");
    decryptBtn.classList.remove("bg-slate-700");
  });
}
btnClick();

