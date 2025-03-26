/**
 * Header
 */
// create <div>counter</div>
const counter_origin = document.querySelector(".counter");

// Add - when push button, add new counter div elem
const buttonAdd = document.getElementById("btnAdd");

buttonAdd.addEventListener("click", () => {
  const counter_origin = createCounterOrigin();
  document.getElementById("counters").appendChild(counter_origin);
});

// All Clear does clear all 'count number'
const buttonAllClear = document.getElementById("btnAllClear");
buttonAllClear.addEventListener("click", () => {
  // 1. get all 'counter' under counters
  const counters = document.getElementById("counters");

  // 2. init all p cntNumber
  for (const cnt of counters.children) {
    cnt.querySelector(".cntNumber").textContent = paddingCountNumber(0);
    cnt.querySelector(".totalNumber").textContent = paddingCountNumber(0);
  }
});

/**
 * create counter origin for copy
 */
function createCounterOrigin() {
  const parent_node = createNewElement("div", "", "counter");

  // <span class="cntNumber">123</span>
  const count_number = createNewElement("span", "000", "cntNumber");
  parent_node.appendChild(count_number);

  const span = createNewElement("span", "/");
  parent_node.appendChild(span);

  // <span class="totalNumber">000</span>
  const total_number = createNewElement("span", "000", "totalNumber");
  parent_node.appendChild(total_number);

  // <button class="button">+</button>
  const plus_button = createNewElement("button", "+", "btnCount");
  plus_button.addEventListener("click", () => {
    let number = Number(count_number.textContent);
    number += 1;
    count_number.textContent = paddingCountNumber(number);

    let totalNumber = Number(total_number.textContent);
    totalNumber += 1;
    total_number.textContent = paddingCountNumber(totalNumber);
  });
  parent_node.appendChild(plus_button);

  // <button class="button">-</button>
  const minus_button = createNewElement("button", "-", "btnCount");
  minus_button.addEventListener("click", () => {
    let totalNumber = Number(total_number.textContent);
    totalNumber += 1;
    total_number.textContent = paddingCountNumber(totalNumber);
  });
  parent_node.appendChild(minus_button);

  // <input type="text">
  parent_node.appendChild(createNewElement("input", "", "content"));

  // <button class="button btnDel">DEL</button>
  const delete_button = createNewElement("button", "D", "button", "btnDel");
  delete_button.addEventListener("click", () => {
    delete_button.parentNode.parentNode.removeChild(parent_node);
  });
  parent_node.appendChild(delete_button);

  return parent_node;
}

function createNewElement(name, text, ...classes) {
  const node = document.createElement(name);

  node.textContent = text;
  for (const cls of classes) {
    node.classList.add(cls);
  }

  return node;
}

/**
 * storage
 */
const localstorage_id = "my_super_counter_is_awesome";

// load storage
loadCookie();
setInterval(() => saveCookie(), 3 * 1000);

/**
 * save state to cookie each 5sec
 */
function saveCookie() {
  const counters = document.getElementById("counters");

  if (counters.children.length == 0) return;

  let save_states = {};
  for (const cnt of counters.children) {
    const input_value = cnt.querySelector(".content").value;
    const count_number = cnt.querySelector(".cntNumber").textContent;
    const total_number = cnt.querySelector(".totalNumber").textContent;

    save_states[input_value] = String(
      Number(count_number) + "/" + Number(total_number)
    );
  }
  localStorage.setItem(localstorage_id, JSON.stringify(save_states));
}

/**
 * load state to cookie when loading js
 */
function loadCookie() {
  const storage = localStorage.getItem(localstorage_id);
  const object = JSON.parse(storage);

  for (const key in object) {
    const counter_origin = createCounterOrigin();
    counter_origin.querySelector(".content").value = key;

    const string_num = object[key].split("/");
    counter_origin.querySelector(".cntNumber").textContent = paddingCountNumber(
      string_num[0]
    );
    counter_origin.querySelector(".totalNumber").textContent =
      paddingCountNumber(string_num[1]);

    document.getElementById("counters").appendChild(counter_origin);
  }
}

function paddingCountNumber(countNumber) {
  if (countNumber < 0) {
    return "000";
  } else if (countNumber < 10) {
    return "00" + String(countNumber);
  } else if (countNumber < 100) {
    return "0" + String(countNumber);
  }
  return countNumber;
}
