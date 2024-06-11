// request to json file

async function fetchHouses() {
  const response = await fetch("1c_site.json");
  const data = await response.json();
  return data;
}

// price selectors
const price = document.querySelector(".cost__span");
const mainPrice = document.querySelector(".firstBlock__button>span");

let COAST_WELL = 0;
let COAST_FOUNTAIN = 0;
let startPrice = 0;

// page selectors
const servicesParent = document.querySelector(".secondBlock__services");
const houseId = document.querySelector("#id");

// slider selectors

const slidesModal = document.querySelectorAll(".firstBlock__field-img");
const prevModal = document.querySelector(".firstBlock__carousel-left");
const nextModal = document.querySelector(".firstBlock__carousel-right");
const slideModalField = document.querySelector(".firstBlock__field");
const mainSlide = document.querySelector(".firstBlock__carousel-item");
const mediaQuerrymax = window.matchMedia("(max-width: 959px)");

let slideIndex = 1;
let lastSlideIndex = 0;

// number imput selectors

const buttonWrappers = document.querySelector(".secondBlock__services");

let priceChange = 0;
let inputPriceChange = 0;

let firstPrice = 0;
let firstPositionInput = 0;
let secondPositionInput = 0;
let secondPrice = 0;

//list of additional services
let listAdditionalServices = [];

//an object made up of elements of mutual substitution, cant choose without, cant be removed without

const choiceobj = {
  "mutually exclusive": {
    "000000102": ["000000101", "000000105", "000000144"],
    "000000101": ["000000102"],
    "000000105": ["000000102", "000000144"],
    "000000144": ["000000102", "000000105"],
    "000000106": ["000000132"],
    "000000108": ["000000107"],
    "000000107": ["000000108"],
    "000000114": ["000000138"],
    "000000138": ["000000114", "000000132", "000000131", "000000122"],
    "000000120": ["000000121"],
    "000000121": ["000000120"],
    "000000131": ["000000130", "000000138"],
    "000000132": ["000000130", "000000138", "000000106"],
    "000000130": ["000000131"],
    "000000133": ["000000134", "000000135"],
    "000000134": ["000000133", "000000135"],
    "000000135": ["000000134", "000000133"],
    "000000124": ["000000125"],
    "000000125": ["000000124"],
    "000000110": ["000000109"],
    "000000109": ["000000110"],
  },
  "cant choose without": {
    "000000131": ["000000122"],
    "000000138": ["000000130"],
  },
  "cant be removed without": {
    "000000130": ["000000138"],
    "000000122": ["000000131"],
    "000000101": ["000000144"],
  },
};

function stopFunction(firstParametr, secondParametr) {
  if (firstParametr == secondParametr) {
    return;
  }
}

function searchForTheRightHouse(data) {
  let itemHouse = {};

  const housePageName = houseId.textContent;
  data["Дома"].forEach((house) => {
    const houseId = house["ДомКод"];
    house;
    if (housePageName == houseId) {
      itemHouse = house;
    }
  });

  return itemHouse;
}

function createAllsectionsAndSubsetions(data) {
  const allSectionsAndSubsections = [];

  searchForTheRightHouse(data)["Разделы"].forEach((section) => {
    stopFunction(section["Раздел"], "Несортированно (технический раздел)");

    allSectionsAndSubsections.push(section["Раздел"]);
    section["Подразделы"].forEach((subsection) => {
      if (section["Раздел"] != subsection["Подраздел"]) {
        allSectionsAndSubsections.push(subsection);
      }
    });
  });

  return allSectionsAndSubsections;
}

function changePrice(item) {
  startPrice += item["Стоимость"];
  price.textContent = startPrice;
  mainPrice.textContent = startPrice;
}

function activationOfRequiredService(item, itemName) {
  changePrice(item);
  listAdditionalServices.push(itemName);
}

function modalNumberInput(id, text, max) {
  return `
    <div class="secondBlock__service">
      <div class="secondBlock__service-button" id="${id}">
        <button class="secondBlock__service-buttonSelector inactiveBtn"></button>
      </div>
      <div class="secondBlock__service-text">
        ${text}
        <input class='secondBlock__service-input' type='number' min='0' max="${max}" value='0'/>
      </div>
    </div>
  `;
}

function modalService(code, price, subsection, activeClass) {
  return `
    <div class="secondBlock__service">
      <div class="secondBlock__service-button" id="${code}">
          <button class="secondBlock__service-buttonSelector ${activeClass}" value="${price}"></button>
      </div>
      <div class="secondBlock__service-text">${subsection} + ${price} руб.</div>
    </div>
  `;
}

function modalSection(nameSection) {
  return `
    <div class="secondBlock__services-header">${nameSection}</div>
  `;
}

function changeString(item) {
  if (item["Подраздел"].indexOf("(из коллеции ЛХ)") != -1 || item["Подраздел"].indexOf("(из коллецкции ЛХ)") != -1) {
    item["Подраздел"] = item["Подраздел"].split("(");
    item["Подраздел"][1] = "из нашей коллекции)";
    item["Подраздел"] = item["Подраздел"].join("(");
  }
}

function createServiceElement(item) {
  switch (typeof item) {
    case "object":
      switch (item["Подраздел"]) {
        case "Строительство дома в базовой комплектации":
          stopFunction(item["Подраздел"], "Строительство дома в базовой комплектации");
          break;
        case "Дом (в базовой комплектации)":
          changePrice(item);
          stopFunction(item["Подраздел"], "Дом (в базовой комплектации)");
          break;
        case "Колодец (кольцо)":
          COAST_FOUNTAIN = item["Стоимость"];
          return modalNumberInput("Устройство колодца", "Устройство колодца <b>(колец)</b>", "10");
        case "Скважина (метр)":
          COAST_WELL = item["Стоимость"];
          return modalNumberInput("Скважина Пластик", "Скважина Пластик <b>(метров)</b>", "100");
        default:
          switch (item["Код"]) {
            case "000000144":
              activationOfRequiredService(item, "Имитация бруса");
              return modalService(item["Код"], item["Стоимость"], item["Подраздел"], "activeBtn");
            case "000000132":
              activationOfRequiredService(item, "Стены и потолки: имитация бруса");
              return modalService(item["Код"], item["Стоимость"], item["Подраздел"], "activeBtn");
            default:
              changeString(item);
              return modalService(item["Код"], item["Стоимость"], item["Подраздел"], "inactiveBtn");
          }
      }
      break;
    case "string":
      switch (item) {
        case "Строительство дома в базовой комплектации":
          stopFunction(item, "Строительство дома в базовой комплектации");
          break;
        default:
          return modalSection(item);
      }
      break;
  }
}

// create all additional services

async function createAdditionalServices(func) {
  const data = await func();

  servicesParent.innerHTML = createAllsectionsAndSubsetions(data)
    .map((item) => createServiceElement(item))
    .join("");
}

// slider house img

function showSlides(n, transform, widthElem) {
  let translateCount = (slideIndex - 2) * -transform + "px";
  const lastTranslateCount = (slidesModal.length - 2) * -transform - widthElem + "px";

  if (n > slidesModal.length) {
    slideIndex = 1;
    slideModalField.style.transform = "translateX(0)";
  }

  if (n < 1) {
    slideIndex = slidesModal.length;
  }

  if (n >= 3 && translateCount !== "100px" && n <= slidesModal.length - 1) {
    slideModalField.style.transform = `translateX(${translateCount})`;
  }

  if (slideIndex == slidesModal - 1 || slideIndex - 3 == slidesModal.length - 3) {
    slideModalField.style.transform = `translateX(${lastTranslateCount})`;
  }

  if (translateCount == "100px" || translateCount == "0px") {
    slideModalField.style.transform = "translateX(0)";
  }

  slidesModal.forEach((slide) => slide.classList.remove("active"));

  slidesModal[slideIndex - 1].classList.add("active");

  mainSlide.src = slidesModal[slideIndex - 1].src;

  lastSlideIndex = slideIndex;
}

function plusSlides(n, transform, widthElem) {
  showSlides((slideIndex += n), transform, widthElem);
}

function switchSlides(direction) {
  if (mediaQuerrymax.matches) {
    plusSlides(direction, 95, -95);
  } else {
    plusSlides(direction, 180, -180);
  }
}

function activateBtn(selector) {
  if (selector.classList.contains("inactiveBtn")) {
    selector.classList.add("activeBtn");
    selector.classList.remove("inactiveBtn");
  }
}

function deactivateBtn(selector) {
  if (selector.classList.contains("activeBtn")) {
    selector.classList.add("inactiveBtn");
    selector.classList.remove("activeBtn");
  }
}

function removeFromArrayListAdittionalServices(indexElement) {
  if (indexElement != -1) {
    listAdditionalServices.splice(indexElement, 1);
  }
}

function priceChangeDueToFirstInput(firstPriceValue, action, value) {
  console.log(action);
  switch (action) {
    case "+":
      firstPrice = firstPriceValue;
      inputPriceChange = inputPriceChange + firstPrice - inputPriceChange;
      firstPositionInput = value;
      break;
    case "-":
      firstPrice = firstPriceValue;
      inputPriceChange = inputPriceChange - firstPositionInput * COAST_WELL;
      firstPositionInput = value;
      break;
  }
}

function priceChangeDueToSecondInput(secondPriceValue, action, value) {
  console.log(action);
  switch (action) {
    case "+":
      secondPrice = secondPriceValue;
      inputPriceChange = inputPriceChange + secondPrice - inputPriceChange;
      secondPositionInput = value;
      break;
    case "-":
      secondPrice = secondPriceValue;
      inputPriceChange = secondPositionInput * COAST_FOUNTAIN;
      secondPositionInput = value;
      break;
  }
}

function actionOnNumberInputs(event) {
  const firstInput = document.getElementById(`Скважина Пластик`);
  const secondInput = document.getElementById(`Устройство колодца`);
  const firstActiveButton = document.getElementById("Скважина Пластик").querySelector("button");
  const secondActiveButton = document.getElementById("Устройство колодца").querySelector("button");
  if (
    event.target.classList.contains("secondBlock__service-input") &&
    event.target.parentNode.previousElementSibling.getAttribute("id") === "Скважина Пластик"
  ) {
    let value = event.target.value;

    stopFunction(value, "");

    deactivateBtn(secondActiveButton);

    const indexFirstInput = listAdditionalServices.indexOf(`Количество метров: ${firstPositionInput}`);
    const indexSecondInput = listAdditionalServices.indexOf(`Количество колец: ${secondPositionInput}`);

    removeFromArrayListAdittionalServices(indexFirstInput);

    removeFromArrayListAdittionalServices(indexSecondInput);

    if (+value > 100) {
      event.target.value = "100";
      value = "100";
      return;
    }

    inputPriceChange -= secondPrice;

    secondInput.nextElementSibling.querySelector("input").value = 0;
    secondPositionInput = 0;
    secondPrice = 0;

    if (+value === 0) {
      deactivateBtn(firstActiveButton);

      priceChangeDueToFirstInput(0, "-", value);
    } else if (+value > firstPositionInput) {
      activateBtn(firstActiveButton);

      priceChangeDueToFirstInput(+value * COAST_WELL, "+", value);

      listAdditionalServices.push(`Количество метров: ${firstPositionInput}`);
    } else if (+value < firstPositionInput) {
      priceChangeDueToFirstInput(+value * COAST_WELL, "+", value);

      listAdditionalServices.push(`Количество метров: ${firstPositionInput}`);
    } else if (+value == firstPositionInput) {
      priceChangeDueToFirstInput(+value * COAST_WELL, "+", value);

      listAdditionalServices.push(`Количество метров: ${firstPositionInput}`);
    }

    firstPositionInput = +value;

    price.textContent = startPrice + priceChange + inputPriceChange;
  } else if (
    event.target.classList.contains("secondBlock__service-input") &&
    event.target.parentNode.previousElementSibling.getAttribute("id") === "Устройство колодца"
  ) {
    let value = event.target.value;

    stopFunction(value, "");

    deactivateBtn(firstActiveButton);

    const indexFirstInput = listAdditionalServices.indexOf(`Количество метров: ${firstPositionInput}`);
    const indexSecondInput = listAdditionalServices.indexOf(`Количество колец: ${secondPositionInput}`);

    removeFromArrayListAdittionalServices(indexFirstInput);

    removeFromArrayListAdittionalServices(indexSecondInput);

    inputPriceChange -= firstPrice;

    firstInput.nextElementSibling.querySelector("input").value = 0;
    firstPositionInput = 0;
    firstPrice = 0;

    if (+value > 10) {
      event.target.value = "10";
      value = "10";
      return;
    }

    if (+value === 0) {
      deactivateBtn(secondActiveButton);

      priceChangeDueToSecondInput(0, "-", value);
    } else if (+value > secondPositionInput) {
      activateBtn(secondActiveButton);

      priceChangeDueToFirstInput(+value * COAST_FOUNTAIN, "+", value);

      listAdditionalServices.push(`Количество колец: ${secondPositionInput}`);
    } else if (+value < secondPositionInput) {
      priceChangeDueToFirstInput(+value * COAST_FOUNTAIN, "+", value);

      listAdditionalServices.push(`Количество колец: ${secondPositionInput}`);
    } else if (+value == secondPositionInput) {
      priceChangeDueToFirstInput(+value * COAST_FOUNTAIN, "+", value);

      listAdditionalServices.push(`Количество колец: ${secondPositionInput}`);
    }

    secondPositionInput = +value;

    price.textContent = startPrice + priceChange + inputPriceChange;
  }
}

//open and close selection menu

buttonWrappers.addEventListener("input", (event) => actionOnNumberInputs(event));
// click select button

buttonWrappers.addEventListener("click", (e) => {
  const target = e.target;
  if (
    target.classList.contains("secondBlock__service-button") ||
    target.classList.contains("secondBlock__service-buttonSelector")
  ) {
    if (target.classList.contains("secondBlock__service-button")) {
      const btn = target.querySelector("button");
      const value = +btn.value;

      if (btn.classList.contains("inactiveBtn")) {
        const id = btn.parentNode.getAttribute("id");

        if (id === "Скважина Пластик" || id === "Устройство колодца") {
          return;
        }

        if (id === "000000101") {
          const el = document.getElementById("000000144").children[0];
          const secondEl = document.getElementById("000000105").children[0];
          if (el.classList.contains("inactiveBtn") && secondEl.classList.contains("inactiveBtn")) {
            priceChange += +el.getAttribute("value");
            el.classList.add("activeBtn");
            el.classList.remove("inactiveBtn");
            listAdditionalServices.push("Имитация бруса");
          }
        }

        listAdditionalServices.push(id);

        let choiceElsId = "";
        let choice = "";

        if (choiceobj["cant choose without"][id]) {
          choiceElsId = choiceobj["cant choose without"][id];
          choice = "cant choose without";
        } else if (choiceobj["mutually exclusive"][id]) {
          choiceElsId = choiceobj["mutually exclusive"][id];
          choice = "mutually exclusive";
        }

        if (choiceElsId && choice == "mutually exclusive") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);
            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }

            if (choiceobj["cant choose without"][`${elId}`]) {
              const choiceEls = choiceobj["cant choose without"][`${elId}`];
              choiceEls.forEach((choiceElId) => {
                const choiceEl = document.getElementById(`${choiceElId}`).children[0];
                const index = listAdditionalServices.indexOf(choiceElId);

                if (index !== -1) {
                  listAdditionalServices.splice(index, 1);
                  choiceEl.classList.add("inactiveBtn");
                  choiceEl.classList.remove("activeBtn");
                  priceChange -= +choiceEl.getAttribute("value");
                }
              });
            }

            if (elChildren.classList.contains("activeBtn")) {
              elChildren.classList.remove("activeBtn");
              elChildren.classList.add("inactiveBtn");

              priceChange -= +elChildren.getAttribute("value");
              const index = listAdditionalServices.indexOf(elId);

              if (index != -1) {
                listAdditionalServices.splice(index, 1);
              }
            }
          });
        } else if (choiceElsId && choice == "cant choose without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }

            if (choiceobj["mutually exclusive"][id]) {
              const choiceEls = choiceobj["mutually exclusive"][id];
              choiceEls.forEach((choiceElId) => {
                if (choiceobj["cant be removed without"][elId]) {
                  const element = document.getElementById(`${choiceElId}`);
                  let elementChildren = "";
                  if (!element) {
                    return;
                  } else {
                    elementChildren = element.children[0];
                  }

                  const indexEl = listAdditionalServices.indexOf(choiceElId);

                  if (indexEl !== -1) {
                    listAdditionalServices.splice(indexEl, 1);
                    priceChange -= +elementChildren.getAttribute("value");
                    elementChildren.classList.add("inactiveBtn");
                    elementChildren.classList.remove("activeBtn");
                  }
                }

                const choiceEl = document.getElementById(`${choiceElId}`);

                let choiceElChildren = "";
                if (!choiceEl) {
                  return;
                } else {
                  choiceElChildren = choiceEl.children[0];
                }
                const index = listAdditionalServices.indexOf(choiceElChildren);

                if (index !== -1) {
                  listAdditionalServices.splice(index, 1);
                  priceChange -= +choiceElChildren.getAttribute("value");
                  choiceElChildren.classList.add("inactiveBtn");
                  choiceElChildren.classList.remove("activeBtn");
                }
              });
            }

            if (elChildren.classList.contains("inactiveBtn")) {
              elChildren.classList.remove("inactiveBtn");
              elChildren.classList.add("activeBtn");

              priceChange += +elChildren.getAttribute("value");
              const index = listAdditionalServices.indexOf(elId);

              if (index == -1) {
                listAdditionalServices.push(elId);
              }
            }
          });
        }

        btn.classList.add("activeBtn");
        btn.classList.remove("inactiveBtn");
        priceChange += value;
      } else {
        const id = btn.parentNode.getAttribute("id");

        if (id === "Устройство колодца") {
          let secondInput = document.getElementById(`Устройство колодца`).nextElementSibling.querySelector("input");

          secondInput.value = 0;

          inputPriceChange = 0;

          price.textContent = startPrice + priceChange + inputPriceChange;
        } else if (id === "Скважина Пластик") {
          let firstInput = document.getElementById(`Скважина Пластик`).nextElementSibling.querySelector("input");

          firstInput.value = 0;

          inputPriceChange = 0;

          price.textContent = startPrice + priceChange + inputPriceChange;
        }

        let choiceElsId = "";
        let choice = "";
        if (choiceobj["cant be removed without"][id]) {
          choiceElsId = choiceobj["cant be removed without"][id];
          choice = "cant be removed without";
        } else if (choiceobj["cant choose without"][id]) {
          choiceElsId = choiceobj["cant choose without"][id];
          choice = "cant choose without";
        }

        if (choiceElsId && choice == "cant be removed without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }

            const indexEl = listAdditionalServices.indexOf(elId);
            if (indexEl !== -1) {
              listAdditionalServices.splice(indexEl, 1);
              elChildren.classList.add("inactiveBtn");
              elChildren.classList.remove("activeBtn");

              priceChange -= +elChildren.getAttribute("value");
            }
          });
          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        } else if (choiceElsId && choice == "cant choose without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }
            const indexEl = listAdditionalServices.indexOf(elId);

            if (indexEl !== -1) {
              listAdditionalServices.splice(indexEl, 1);

              elChildren.classList.add("inactiveBtn");
              elChildren.classList.remove("activeBtn");

              priceChange -= +elChildren.getAttribute("value");
            }
          });
          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        } else {
          if (id === "000000102" || id === "000000101" || id === "000000105") {
            const facadeImitation = document.getElementById("000000144").querySelector("button");

            if (facadeImitation.classList.contains("inactiveBtn")) {
              listAdditionalServices.push("Имитация бруса");
              facadeImitation.classList.add("activeBtn");
              facadeImitation.classList.remove("inactiveBtn");
              priceChange += +facadeImitation.getAttribute("value");
            }
          } else if (id === "000000106") {
            const facadeImitation = document.getElementById("000000132").querySelector("button");

            if (facadeImitation.classList.contains("inactiveBtn")) {
              listAdditionalServices.push("Стены и потолки: имитация бруса");
              facadeImitation.classList.add("activeBtn");
              facadeImitation.classList.remove("inactiveBtn");
              priceChange += +facadeImitation.getAttribute("value");
            }
          } else if (id === "000000144") {
            return;
          } else if (id === "000000132") {
            return;
          }

          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        }

        btn.classList.add("inactiveBtn");
        btn.classList.remove("activeBtn");
        priceChange -= value;
      }

      price.textContent = startPrice + priceChange + inputPriceChange;
    } else {
      const btn = target.parentNode.querySelector("button");
      const value = +btn.value;

      if (btn.classList.contains("inactiveBtn")) {
        const id = btn.parentNode.getAttribute("id");

        if (id === "Скважина Пластик" || id === "Устройство колодца") {
          return;
        }

        if (id === "000000101") {
          const el = document.getElementById("000000144").children[0];
          const secondEl = document.getElementById("000000105").children[0];
          if (el.classList.contains("inactiveBtn") && secondEl.classList.contains("inactiveBtn")) {
            priceChange += +el.getAttribute("value");
            el.classList.add("activeBtn");
            el.classList.remove("inactiveBtn");
            listAdditionalServices.push("Имитация бруса");
          }
        }
        listAdditionalServices.push(id);

        let choiceElsId = "";
        let choice = "";

        if (choiceobj["cant choose without"][id]) {
          choiceElsId = choiceobj["cant choose without"][id];
          choice = "cant choose without";
        } else if (choiceobj["mutually exclusive"][id]) {
          choiceElsId = choiceobj["mutually exclusive"][id];
          choice = "mutually exclusive";
        }

        if (choiceElsId && choice == "mutually exclusive") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }
            if (choiceobj["cant choose without"][`${elId}`]) {
              const choiceEls = choiceobj["cant choose without"][`${elId}`];
              choiceEls.forEach((choiceElId) => {
                const choiceEl = document.getElementById(`${choiceElId}`).children[0];
                const index = listAdditionalServices.indexOf(choiceElId);

                if (index !== -1) {
                  listAdditionalServices.splice(index, 1);
                  choiceEl.classList.add("inactiveBtn");
                  choiceEl.classList.remove("activeBtn");
                  priceChange -= +choiceEl.getAttribute("value");
                }
              });
            }

            if (elChildren.classList.contains("activeBtn")) {
              elChildren.classList.remove("activeBtn");
              elChildren.classList.add("inactiveBtn");

              priceChange -= +elChildren.getAttribute("value");
              const index = listAdditionalServices.indexOf(elId);

              if (index != -1) {
                listAdditionalServices.splice(index, 1);
              }
            }
          });
        } else if (choiceElsId && choice == "cant choose without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }
            if (choiceobj["mutually exclusive"][id]) {
              const choiceEls = choiceobj["mutually exclusive"][id];
              choiceEls.forEach((choiceElId) => {
                if (choiceobj["cant be removed without"][elId]) {
                  const element = document.getElementById(`${elId}`).children[0];
                  const indexEl = listAdditionalServices.indexOf(elId);

                  if (indexEl !== -1) {
                    listAdditionalServices.splice(indexEl, 1);
                    priceChange -= +element.getAttribute("value");
                    element.classList.add("inactiveBtn");
                    element.classList.remove("activeBtn");
                  }
                }
                const choiceEl = document.getElementById(`${choiceElId}`);

                let choiceElChildren = "";
                if (!choiceEl) {
                  return;
                } else {
                  choiceElChildren = choiceEl.children[0];
                }
                const index = listAdditionalServices.indexOf(choiceElChildren);

                if (index !== -1) {
                  listAdditionalServices.splice(index, 1);
                  priceChange -= +choiceElChildren.getAttribute("value");
                  choiceElChildren.classList.add("inactiveBtn");
                  choiceElChildren.classList.remove("activeBtn");
                }
              });
            }

            if (elChildren.classList.contains("inactiveBtn")) {
              elChildren.classList.remove("inactiveBtn");
              elChildren.classList.add("activeBtn");

              priceChange += +elChildren.getAttribute("value");
              const index = listAdditionalServices.indexOf(elId);

              if (index == -1) {
                listAdditionalServices.push(elId);
              }
            }
          });
        }

        btn.classList.add("activeBtn");
        btn.classList.remove("inactiveBtn");
        priceChange += value;
      } else {
        const id = btn.parentNode.getAttribute("id");

        if (id === "Устройство колодца") {
          let secondInput = document.getElementById(`${COAST_FOUNTAIN + "input"}`);
          let secondInputCounters = document.getElementById(`${COAST_FOUNTAIN + "numberCounter"}`);
          let secondInputProgressBar = document.getElementById(`${COAST_FOUNTAIN + "progressBar"}`);

          secondInputProgressBar.style.width = 0 + "px";
          secondInputCounters.style.left = 0 + "px";
          secondInputCounters.textContent = 0;
          secondInput.value = 0;

          inputPriceChange = 0;

          price.textContent = startPrice + priceChange + inputPriceChange;
        } else if (id === "Скважина Пластик") {
          let firstInput = document.getElementById(`${COAST_WELL + "input"}`);
          let firstInputCounters = document.getElementById(`${COAST_WELL + "numberCounter"}`);
          let firstInputProgressBar = document.getElementById(`${COAST_WELL + "progressBar"}`);

          firstInputProgressBar.style.width = 0 + "px";
          firstInputCounters.style.left = 0 + "px";
          firstInputCounters.textContent = 0;
          firstInput.value = 0;

          inputPriceChange = 0;

          price.textContent = startPrice + priceChange + inputPriceChange;
        }

        let choiceElsId = "";
        let choice = "";
        if (choiceobj["cant be removed without"][id]) {
          choiceElsId = choiceobj["cant be removed without"][id];
          choice = "cant be removed without";
        } else if (choiceobj["cant choose without"][id]) {
          choiceElsId = choiceobj["cant choose without"][id];
          choice = "cant choose without";
        }

        if (choiceElsId && choice == "cant be removed without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }

            const indexEl = listAdditionalServices.indexOf(elId);
            if (indexEl !== -1) {
              listAdditionalServices.splice(indexEl, 1);
              elChildren.classList.add("inactiveBtn");
              elChildren.classList.remove("activeBtn");

              priceChange -= +elChildren.getAttribute("value");
            }
          });
          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        } else if (choiceElsId && choice == "cant choose without") {
          choiceElsId.forEach((elId) => {
            const el = document.getElementById(`${elId}`);

            let elChildren = "";
            if (!el) {
              return;
            } else {
              elChildren = el.children[0];
            }
            const indexEl = listAdditionalServices.indexOf(elId);

            if (indexEl !== -1) {
              listAdditionalServices.splice(indexEl, 1);

              elChildren.classList.add("inactiveBtn");
              elChildren.classList.remove("activeBtn");

              priceChange -= +elChildren.getAttribute("value");
            }
          });
          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        } else {
          if (id === "000000102" || id === "000000101" || id === "000000105") {
            const facadeImitation = document.getElementById("000000144").querySelector("button");

            if (facadeImitation.classList.contains("inactiveBtn")) {
              listAdditionalServices.push("Имитация бруса");
              facadeImitation.classList.add("activeBtn");
              facadeImitation.classList.remove("inactiveBtn");
              priceChange += +facadeImitation.getAttribute("value");
            }
          } else if (id === "000000106") {
            const facadeImitation = document.getElementById("000000132").querySelector("button");

            if (facadeImitation.classList.contains("inactiveBtn")) {
              listAdditionalServices.push("Стены и потолки: имитация бруса");
              facadeImitation.classList.add("activeBtn");
              facadeImitation.classList.remove("inactiveBtn");
              priceChange += +facadeImitation.getAttribute("value");
            }
          } else if (id === "000000144") {
            return;
          } else if (id === "000000132") {
            return;
          }

          const indexEl = listAdditionalServices.indexOf(id);
          listAdditionalServices.splice(indexEl, 1);
        }

        btn.classList.add("inactiveBtn");
        btn.classList.remove("activeBtn");
        priceChange -= value;
      }

      price.textContent = startPrice + priceChange + inputPriceChange;
    }
  }
});

const buttonsSpan = document.querySelectorAll(".secondBlock__service-span");
const imgBtn = document.querySelector(".firstBlock__carousel-item");
const modal = document.querySelector(`.modalMain.bgwhite`);
const imgsField = document.querySelectorAll(".firstBlock__field-img");
let slideIndexModal = 1;

imgsField.forEach((imgField, index) => {
  imgField.addEventListener("click", () => {
    modal.classList.add("visible");
    modal.classList.remove("notVisible");
    document.body.style.overflow = "hidden";
    slideIndexModal = index + 1;
    showSlidesModal(slideIndexModal);
  });
});

imgBtn.addEventListener("click", () => {
  modal.classList.add("visible");
  modal.classList.remove("notVisible");
  document.body.style.overflow = "hidden";
  slidesModal.forEach((slide, i) => {
    if (slide.classList.contains("active")) {
      slideIndexModal = i + 1;
      showSlidesModal(slideIndexModal);
    }
  });
});

const buttonWrapper = modal.children[0];
const btnClose = buttonWrapper.children[0];
btnClose.addEventListener("click", (e) => {
  if (modal.classList.contains("visible")) {
    modal.classList.remove("visible");
    modal.classList.add("notVisible");
    document.body.style.overflow = "";
  }
});

buttonWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__wrapper")) {
    modal.classList.remove("visible");
    modal.classList.add("notVisible");
    document.body.style.overflow = "";
  }
});

const mediaQuerrymax1200 = window.matchMedia("(max-width: 1199px)");
const sliderImgsModal = modal.querySelectorAll(".modalMain__img");
const btnNext = buttonWrapper.children[buttonWrapper.children.length - 2];
const btnPrev = buttonWrapper.children[buttonWrapper.children.length - 1];

function showSlidesModal(n) {
  if (n > sliderImgsModal.length) {
    slideIndexModal = 1;
  }

  if (n < 1) {
    slideIndexModal = sliderImgsModal.length;
  }

  sliderImgsModal.forEach((slide) => slide.classList.add("none"));
  sliderImgsModal.forEach((slide) => slide.classList.remove("block"));
  sliderImgsModal[slideIndexModal - 1].classList.add("block");
  sliderImgsModal[slideIndexModal - 1].classList.remove("none");
}

function plusSlidesModal(n) {
  showSlidesModal((slideIndexModal += n));
}

btnPrev.addEventListener("click", function () {
  plusSlidesModal(-1);
});

btnNext.addEventListener("click", function () {
  plusSlidesModal(1);
});

buttonsSpan.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.querySelector(`.modal[data-modal=${btn.dataset.modal}]`);
    modal.classList.add("visible");
    modal.classList.remove("notVisible");
    document.body.style.overflow = "hidden";
  });
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  const buttonWrapper = modal.children[0];
  const btnClose = buttonWrapper.children[0];
  btnClose.addEventListener("click", (e) => {
    if (modal.classList.contains("visible")) {
      modal.classList.remove("visible");
      modal.classList.add("notVisible");
      document.body.style.overflow = "";
    }
  });

  buttonWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__wrapper")) {
      modal.classList.remove("visible");
      modal.classList.add("notVisible");
      document.body.style.overflow = "";
    }
  });

  // modal slider

  const sliderImgs = buttonWrapper.querySelectorAll(".modal__img");
  const btnNext = buttonWrapper.children[buttonWrapper.children.length - 2];
  const btnPrev = buttonWrapper.children[buttonWrapper.children.length - 1];

  let slideIndex = 1;

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > sliderImgs.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = sliderImgs.length;
    }

    sliderImgs.forEach((slide) => slide.classList.add("none"));
    sliderImgs.forEach((slide) => slide.classList.remove("block"));

    sliderImgs[slideIndex - 1].classList.add("block");
    sliderImgs[slideIndex - 1].classList.remove("none");
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  btnPrev.addEventListener("click", function () {
    plusSlides(-1);
  });

  btnNext.addEventListener("click", function () {
    plusSlides(1);
  });
});

createAdditionalServices(fetchHouses);

prevModal.addEventListener("click", () => switchSlides(-1));

nextModal.addEventListener("click", () => switchSlides(1));
