// ==============================================================================
// бургер
//==============================================================================

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', function () {
    menu.classList.toggle('show');
  });

  fetchJsonData();
});


// ==============================================================================
// Динамическое создание блока меню Модулей программы
//==============================================================================

async function fetchJsonData() {
  try {
    const response = await fetch("pointb_texts.json");
    const jsonData = await response.json();

    const leftButtonsContainer = document.getElementById("left-buttons");
    const rightButtonsContainer = document.getElementById("right-buttons");

    jsonData.left_buttons.forEach(buttonData => {
      const button = createButton(buttonData, leftButtonsContainer);
      leftButtonsContainer.appendChild(button);
    });

    jsonData.right_buttons.forEach(buttonData => {
      const button = createButton(buttonData, rightButtonsContainer);
      rightButtonsContainer.appendChild(button);
    });
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

const textContentDiv = document.getElementById("text-content");
const buttonNameDiv = document.getElementById("button-name");
const textDisplayContainer = document.getElementById("text-display-container");

function createButton(buttonData, container) {
  const button = document.createElement("div");
  button.className = "button";
  button.textContent = buttonData.name;

  button.addEventListener("mousedown", () => {
    showText(buttonData.text, buttonData.name, container.id);
  });

  button.addEventListener("mouseup", () => {
    hideText();
  });

  return button;
}

function showText(text, buttonName, containerId) {
  textContentDiv.textContent = text;
  buttonNameDiv.textContent = buttonName;

  textDisplayContainer.style.display = "block";
  textDisplayContainer.style.zIndex = "1001";

  if (containerId === "left-buttons") {
    textDisplayContainer.style.left = "0";
    textDisplayContainer.style.right = "auto";
    textDisplayContainer.style.transform = "translateX(450px)"; // Добавлены пиксели
  } else if (containerId === "right-buttons") {
    textDisplayContainer.style.right = "0";
    textDisplayContainer.style.left = "auto";
    textDisplayContainer.style.transform = "translateX(-410px)"; // Добавлены пиксели
  }

}

function hideText() {
  textDisplayContainer.style.display = "none";
  textDisplayContainer.style.zIndex = "1000";
}

// Add a click event listener to the whole document to hide the text-display-container
document.addEventListener("click", (event) => {
  if (!textDisplayContainer.contains(event.target)) {
    hideText();
  }
});

// ==============================================================================
// Кнопка запуска Калькулятора Программ
//==============================================================================


// document.addEventListener('DOMContentLoaded', function () {
//   // Ваш код здесь
//   document.getElementById('program-request').addEventListener('click', function() {
//     document.getElementById('program-form').style.display = 'block';
//   });
// });



// ==============================================================================
// Калькулятор Программ
//==============================================================================

// Создание чек боксов для колькулятора программ
// Загрузка JSON из файла
fetch('pointb_texts.json')
  .then(response => response.json())
  .then(data => {
    // Данные успешно загружены, теперь можно их использовать
    createCheckboxes(data);
  })
  .catch(error => {
    console.error('Ошибка загрузки JSON', error);
  });

// код для создания чекбоксов и кнопок
function createCheckboxes(data) {
  const container = document.querySelector('.modules-checkbox');
  const leftButtons = data.left_buttons;
  const rightButtons = data.right_buttons;

  // код для добавления левых кнопок
  addButtons(leftButtons, container);

  //  код для добавления правых кнопок, если нужно
  addButtons(rightButtons, container);
}

// ==============================================================================
// Динамическое создание блока чекбоксов в Конструкторе программы
//==============================================================================
// код с добавлением id и session для вычислений
function addButtons(buttonData, container) {
  buttonData.forEach((button, index) => {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox'; //ЭЭЭ!!!
    checkbox.id = `custom-checkbox-${index}`; // Добавляем уникальный ID для каждого чекбокса
    checkbox.dataset.session = button.session; // Добавляем session как data-attribute

    const buttonElement = document.createElement('button');
    buttonElement.textContent = button.name;
    buttonElement.className = `checkbox-button`;//ЭЭЭ!!!
    buttonElement.id = `${index}`; // Добавляем уникальный ID для каждой кнопки + ЭЭЭ!!! убрал название checkbox-button
    buttonElement.dataset.session = button.session; // Добавляем session как data-attribute

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none'; // Скрыть подсказку по умолчанию
    tooltip.textContent = button.text;
    tooltip.id = `tooltip-${index}`; // Добавляем уникальный ID для каждой подсказки
    tooltip.dataset.session = button.session; // Добавляем session как data-attribute

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    buttonContainer.appendChild(buttonElement);
    buttonContainer.appendChild(tooltip);

    div.appendChild(checkbox);
    div.appendChild(buttonContainer);

    container.appendChild(div);

    // Обработчик для показа и скрытия подсказки
    buttonElement.addEventListener('click', function () {
      if (tooltip.style.display === 'none' || !tooltip.style.display) {
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    });

    // Функция для подсчета и вывода суммы и количества выбранных чекбоксов
    function calculateResults() {
      let sum = 0;
      let selectedCount = 0; // Переменная для хранения количества выбранных чекбоксов
      const divider = document.getElementById('meeting-frequency').value; // частота сессий
      const currency = document.getElementById('currency').value; // валюта
      const checkedBoxes = document.querySelectorAll('.custom-checkbox:checked');

      checkedBoxes.forEach((checkedBox) => {
        sum += Number(checkedBox.dataset.session);
      });

      selectedCount = checkedBoxes.length; // Количество выбранных чекбоксов

      console.log(`Сумма data-session для всех выбранных чекбоксов: ${sum}`);
      console.log(`Количество выбранных чекбоксов: ${selectedCount}`);

      // const km = 1;
      // const kt = 1;

      // Вычисляем коэффициент
      if (selectedCount === 1) {
        km = 1;
        kt = 1;
      } else if (selectedCount === 2) {
        kt = 1.25;
        km = 1.15;
      } else if (selectedCount === 3) {
        kt = 1.35;
        km = 1.15;
      } else if (selectedCount === 4) {
        kt = 1.4;
        km = 1.15;
      } else if (selectedCount === 5) {
        kt = 1.35;
        km = 1.15;
      } else if (selectedCount > 5) {
        kt = 1.35;
        km = 1.15;
      }

      console.log(`${kt}  ${km}  ${selectedCount}`);

      function roundToHundred(num) {
        return Math.round(num / 100) * 100;
      }

      // Находим элемент output и устанавливаем в них значения
      document.getElementById('money-result').value = `${roundToHundred(sum * currency / km).toLocaleString('ru-RU')}`;
      document.getElementById('time-result').value = `${parseFloat(sum / kt).toFixed(0)} сессий или ${parseFloat((((sum / kt) / divider) / 4.5).toFixed(1))} мес.`;

    }

    // Добавляем обработчик событий на чекбоксы выбранных Модулей
    document.addEventListener('change', function (event) {
      if (event.target.matches('.custom-checkbox')) {
        calculateResults();
      }
    });

    // Добавляем обработчик событий на выпадающий список частоты встреч
    document.getElementById('meeting-frequency').addEventListener('change', function () {
      calculateResults();
    });

    // Добавляем обработчик событий на выпадающий список Валют
    document.getElementById('currency').addEventListener('change', function () {
      calculateResults();
    });

    // Добавляем обработчик событий на чекбоксы Контакты
    document.addEventListener('change', function (event) {
      if (event.target.matches('.custom-checkbox-contact')) {
        calculateResults();
      }
    });

    // сбор удобных каналов связи
    function collectCheckedValues() {
      let selectedValues = []; // Массив для хранения выбранных значений

      // Получаем все выбранные чекбоксы
      const checkedBoxes = document.querySelectorAll('.custom-checkbox-contact:checked');

      // Перебираем все выбранные чекбоксы и добавляем их значения в массив
      checkedBoxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
      });

      // Преобразуем массив в строку, разделяя значения запятыми
      const selectedValuesString = selectedValues.join(', ');

      // Выводим строку в консоль
      console.log(selectedValuesString);

      document.getElementById('sett-title-output').value = selectedValuesString;

      return selectedValuesString;
    }

    // Или при изменении состояния любого чекбокса
    document.querySelectorAll('.custom-checkbox-contact').forEach((checkbox) => {
      checkbox.addEventListener('change', collectCheckedValues);
    });



  });
}

// ==============================================================================
// подсчет закрытых чекбоксов - но это не точно (забыл)
//==============================================================================

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]'); //ЭЭЭ class="checkbox"
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        this.classList.add('checked');
      } else {
        this.classList.remove('checked');
      }
    });
  });
});

// ==============================================================================
// Создание заявки для отправки по итогам работы клиента с калькулятором + отправка
//==============================================================================
// старый вариант (работает)
document.addEventListener('DOMContentLoaded', function () {
  const requestProgramButton = document.getElementById('request_program');
  const thankYouMessage = document.getElementById('thank-you-message');
  const programForm = document.querySelector('.program-form');  // Предполагая, что ваш <section> имеет класс "program"


  // Один обработчик для клика по кнопке "Записаться на собеседование"
  requestProgramButton.addEventListener('click', function () {

    // Собираем данные из полей
    const username = document.getElementById('username').value;
    const meetingFrequency = document.getElementById('meeting-frequency').value;
    const contacts = document.getElementById('contacts').value;
    const notes = document.getElementById('notes').value;
    const timeResult = document.getElementById('time-result').innerText;
    const moneyResult = document.getElementById('money-result').innerText;
    const currency = document.getElementById('currency').value;

    // Собираем текст кнопок, рядом с отмеченными чекбоксами
    let checkboxes = document.querySelectorAll('.custom-checkbox:checked');
    let selectedButtonContent = [];
    checkboxes.forEach((checkbox) => {
      const button = checkbox.closest('div').querySelector('.button-container .checkbox-button');
      if (button) {
        selectedButtonContent.push(button.innerText);
      }
    });

    // Формируем объект данных, который будет отправлен
    const formData = {
      username,
      meetingFrequency,
      contacts,
      notes,
      timeResult,
      moneyResult,
      currency,
      selectedButtonContent: selectedButtonContent.join(', ')
    };

    // Выводим объект в консоль
    console.log('Data to be sent:', formData);

    // Скрываем форму и показываем блок "Спасибо"
    if (programForm) {  // Добавлено для обеспечения безопасности
      programForm.style.display = 'none';
    }
    thankYouMessage.style.display = 'block';

    // Запускаем таймер на 10 секунд (10000 миллисекунд)
    // Запускаем таймер на 9 секунд (9000 миллисекунд)
    setTimeout(function () {
      // Начинаем анимацию исчезновения
      thankYouMessage.classList.add('fade-out');
    }, 3000); // время в миллисекундах

    // Запускаем таймер на 10 секунд (10000 миллисекунд)
    setTimeout(function () {
      // Полностью скрываем блок "Спасибо" после окончания анимации
      thankYouMessage.style.display = 'none';
      thankYouMessage.classList.remove('fade-out'); // Удаляем класс, чтобы сбросить прозрачность
    }, 4000); // время в миллисекундах

    document.getElementById('close_button').addEventListener('click', function () {
      // Находим элемент с ID "program" и устанавливаем его свойство "display" в "none", чтобы скрыть его
      document.getElementById('program-form').style.display = 'none';
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {

  // Находим кнопку по ID и добавляем к ней обработчик события click
  let closeButton = document.getElementById("close_button");
  let programRequestButton = document.getElementById("program-request");
  let programForm = document.getElementById("program-form");

  if (closeButton && programForm) {
    closeButton.addEventListener("click", function () {
      programForm.style.display = "none"; // скрываем элемент
    });
  }

  if (programRequestButton && programForm) {
    programRequestButton.addEventListener("click", function () {
      programForm.style.display = "block"; // показываем элемент
    });
  }
});

//========================================================================================
//Создание фильтра с вычеслением размеров блоков
//========================================================================================

document.addEventListener("DOMContentLoaded", function () {
  let activeFilters = [];
  let maxCaseHeight = 0;
  let totalCasesHeight = 0; // Для хранения общей высоты всех case-блоков
  const blockCaseContainer = document.querySelector('.block-cases');
  const caseContainer = document.querySelector('.cases-container');
  const cases = document.querySelector('.cases');


  function toggleButtonActivation(event) {
    const button = event.target;
    const filterId = button.innerText;
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
      activeFilters.push(filterId);
    } else {
      const index = activeFilters.indexOf(filterId);
      if (index > -1) {
        activeFilters.splice(index, 1);
      }
    }
    updateCases();
    console.log(activeFilters);
  }

  function updateCases() {
    // maxCaseHeight = 0; // Обнуляем максимальную высоту
    fetch('case.json')
      .then(response => response.json())
      .then(data => {
        const casesContainer = document.querySelector('.cases');
        casesContainer.innerHTML = '';
        totalCasesHeight = 0; // Обнуляем общую высоту

        data.forEach(item => {
          if (item.tags.some(tag => activeFilters.includes(tag))) {
            const caseElement = document.createElement('div');
            caseElement.className = 'case';
            caseElement.id = `case-${item.id}`;

            // код для наполнения case

            // Создание div с классом "abr"
            const abrElement = document.createElement('div');
            abrElement.className = 'abr';
            caseElement.appendChild(abrElement);

            // Создание div с классом "ab"
            const abElement = document.createElement('div');
            abElement.className = 'ab';
            abrElement.appendChild(abElement);

            // Создание div с классом "r"
            const rElement = document.createElement('div');
            rElement.className = 'r';
            abrElement.appendChild(rElement);

            // Создание блока Summary
            item.blocks.forEach(block => {
              if (block.summary) {
                const summaryElement = document.createElement('div');
                summaryElement.className = 'summary';


                // Создание блока для SVG
                const svgContainer = document.createElement('div');
                svgContainer.className = 'green_arrow';

                // Вставка SVG кода внутрь контейнера
                svgContainer.innerHTML = `
      <svg width="305" height="16" viewBox="0 0 305 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M303.874 8.81599C304.264 8.42547 304.264 7.7923 303.874 7.40178L297.51 1.03782C297.119 0.647295 296.486 0.647295 296.096 1.03782C295.705 1.42834 295.705 2.06151 296.096 2.45203L301.753 8.10889L296.096 13.7657C295.705 14.1563 295.705 14.7894 296.096 15.18C296.486 15.5705 297.119 15.5705 297.51 15.18L303.874 8.81599ZM0.3479 9.10889H303.167V7.10889H0.3479V9.10889Z" fill="url(#paint0_linear_223_5471)"/>
        <defs>
          <linearGradient id="paint0_linear_223_5471" x1="303.167" y1="8.10889" x2="0.3479" y2="8.10889" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0D4C47"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    `;

                // Добавление SVG контейнера в элемент с классом "abr" (не работало - поменял на ab)
                abElement.appendChild(svgContainer);

                block.summary.forEach(summaryItem => {
                  if (summaryItem.photo) {
                    const photoElement = document.createElement('img');
                    photoElement.className = 'photo_client';
                    photoElement.src = summaryItem.photo;
                    summaryElement.appendChild(photoElement);
                  }

                  if (summaryItem.client_name) {
                    const clientNameElement = document.createElement('div');
                    clientNameElement.className = 'client-name';
                    clientNameElement.innerHTML = summaryItem.client_name;
                    summaryElement.appendChild(clientNameElement);
                  }

                  if (summaryItem.goal_title) {
                    const goalTitleElement = document.createElement('div');
                    goalTitleElement.className = 'goal_title';
                    goalTitleElement.textContent = summaryItem.goal_title;
                    summaryElement.appendChild(goalTitleElement);
                  }

                  if (summaryItem.goal_text) {
                    const goalTextElement = document.createElement('div');
                    goalTextElement.className = 'goal_text';
                    goalTextElement.textContent = summaryItem.goal_text;
                    summaryElement.appendChild(goalTextElement);
                  }

                  if (summaryItem.mod_title) {
                    const modTitleElement = document.createElement('div');
                    modTitleElement.className = 'mod_title';
                    modTitleElement.textContent = summaryItem.mod_title;
                    summaryElement.appendChild(modTitleElement);
                  }

                  if (summaryItem.mod_text) {
                    const modTextElement = document.createElement('div');
                    modTextElement.className = 'mod_text';
                    modTextElement.textContent = summaryItem.mod_text;
                    summaryElement.appendChild(modTextElement);
                  }

                  if (summaryItem.duration_title) {
                    const durationTitleElement = document.createElement('div');
                    durationTitleElement.className = 'duration_title';
                    durationTitleElement.textContent = summaryItem.duration_title;
                    summaryElement.appendChild(durationTitleElement);
                  }

                  if (summaryItem.duration_text) {
                    const durationTextElement = document.createElement('div');
                    durationTextElement.className = 'duration_text';
                    durationTextElement.textContent = summaryItem.duration_text;
                    summaryElement.appendChild(durationTextElement);
                  }

                });

                caseElement.appendChild(summaryElement);
              }


              // ... Здесь заполнение данных для Point A
              if (block.point_a) {
                const pointAElement = document.createElement('div');
                pointAElement.className = 'point_a';


                block.point_a.forEach(pointaItem => {
                  if (pointaItem.a_title) {
                    const atitleElement = document.createElement('div');
                    atitleElement.className = 'a_title';
                    atitleElement.textContent = pointaItem.a_title;
                    pointAElement.appendChild(atitleElement);
                  }

                  if (pointaItem.a_title) {
                    const atextElement = document.createElement('div');
                    atextElement.className = 'a_text';
                    atextElement.textContent = pointaItem.a_text;
                    pointAElement.appendChild(atextElement);
                  }
                });

                abElement.appendChild(pointAElement);
              }

              // ... Здесь заполнение данных для Point B
              if (block.point_b) {
                const pointBElement = document.createElement('div');
                pointBElement.className = 'point_b';

                block.point_b.forEach(pointbItem => {
                  if (pointbItem.b_title) {
                    const btitleElement = document.createElement('div');
                    btitleElement.className = 'b_title';
                    btitleElement.textContent = pointbItem.b_title;
                    pointBElement.appendChild(btitleElement);
                  }

                  if (pointbItem.b_title) {
                    const btextElement = document.createElement('div');
                    btextElement.className = 'b_text';
                    btextElement.innerHTML = pointbItem.b_text;
                    pointBElement.appendChild(btextElement);
                  }
                });

                abElement.appendChild(pointBElement);

              }

              // ... Здесь заполнение данных для Результатов с превышением (Бонусов)
              if (block.bonus) {
                const bonusElement = document.createElement('div');
                bonusElement.className = 'bonus';

                block.bonus.forEach(bonusItem => {
                  if (bonusItem.bonus_title) {
                    const bonusTElement = document.createElement('div');
                    bonusTElement.className = 'bonus_title';
                    bonusTElement.textContent = bonusItem.bonus_title;
                    bonusElement.appendChild(bonusTElement);
                  }

                  if (bonusItem.bonus_text) {
                    const bonusTxElement = document.createElement('div');
                    bonusTxElement.className = 'bonus_text';
                    bonusTxElement.textContent = bonusItem.bonus_text;
                    bonusElement.appendChild(bonusTxElement);
                  }
                });

                rElement.appendChild(bonusElement);

              }


            });

            casesContainer.appendChild(caseElement);


            //================== Блок вычисления высот===============================

            // Вычисление и установка высоты происходят тут
            requestAnimationFrame(() => {

              totalMaxHeights = 0;  // Обнуляем сумму максимальных высот перед новым расчетом

              data.forEach(item => {
                if (item.tags.some(tag => activeFilters.includes(tag))) {
                  const caseElement = document.getElementById(`case-${item.id}`);

                  if (caseElement) {
                    const { maxHeight, maxElement } = findMaxHeightElementInCase(caseElement);

                    console.log(`case-id: ${item.id}, max-element: ${maxElement.className}, max-height: ${maxHeight}`);
                    // Теперь у вас есть maxElement и maxHeight, которые представляют собой элемент с максимальной высотой и его высоту.
                    totalMaxHeights += maxHeight; // Суммируем максимальные высоты


                    // Устанавливаем максимальную высоту для summary и abr
                    const summaryElement = caseElement.querySelector('.summary');
                    if (summaryElement) {
                      summaryElement.style.height = `${maxHeight}px`;
                    }

                    // Уже существующий abrElement в вашем коде
                    const existingAbrElement = caseElement.querySelector('.abr');
                    if (existingAbrElement) {
                      existingAbrElement.style.height = `${maxHeight}px`;

                    }
                    // Уже существующий abrElement в вашем коде
                    const casesElement = caseElement.querySelector('.cases');
                    if (casesElement) {
                      casesElement.style.height = `${maxHeight}px`;
                    }

                    let rh=0

                    const rElement = caseElement.querySelector('.r');
                    if (rElement) {
                      rh = rElement.offsetHeight;
                      console.log(`Высота блока r: ${rh}px`); 
                    }

                    const aElement = caseElement.querySelector('.point_a');
                    if (aElement) {
                      aElement.style.height = `${maxHeight - rh}px`;
                    }


                  }
                }
              })
              console.log('Total max heights:', totalMaxHeights); // Выводим сумму максимальных высот
              // теперь totalMaxHeights содержит сумму максимальных высот всех case

                          // Устанавливаем максимальную высоту для block-case и case-container
            if (blockCaseContainer) {
              blockCaseContainer.style.height = `${totalMaxHeights+ 250}px`;
            }
            if (caseContainer) {
              caseContainer.style.height = `${totalMaxHeights + 250}px`;
            }

            const casesElement = caseElement.querySelector('.cases');
            if (casesContainer) {
              casesContainer.style.height = `${totalMaxHeights}px`;
            }
            })
          }
        });
      })
      .catch(error => console.log('Ошибка загрузки данных:', error));
  }

  fetch('pointb_texts.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.left_buttons) && Array.isArray(data.right_buttons)) {
        let filterContainer = document.getElementById('filter');
        if (!filterContainer) {
          filterContainer = document.createElement('div');
          filterContainer.id = 'filter';
          document.body.appendChild(filterContainer);
        }

        [...data.left_buttons, ...data.right_buttons].forEach(button => {
          const btn = document.createElement('button');
          btn.innerHTML = button.name;
          btn.id = button.id.toString();
          btn.className = "btn-filter";
          btn.addEventListener('click', toggleButtonActivation);
          filterContainer.appendChild(btn);
        });
      } else {
        console.log("Ошибка: полученные данные не содержат нужных массивов");
      }
    })
    .catch(error => console.log('Ошибка загрузки данных:', error));
});


const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      // Перебираем все добавленные узлы
      mutation.addedNodes.forEach(function (addedNode) {
        // Дополнительная проверка: удостоверимся, что узел является элементом DOM
        if (addedNode.nodeType === 1) {
          // Проверяем, является ли узел элементом с нужным ID или классом
          if (addedNode.id === "case-3" || addedNode.classList.contains("summary") || addedNode.classList.contains("abr")) {
            // Измеряем высоту
            const height = addedNode.offsetHeight;
            console.log(`Height of ${addedNode.id || addedNode.className}: ${height}`);
          }

          // Если добавленный узел содержит другие элементы, можно также искать внутри него
          const summaries = addedNode.querySelectorAll(".summary");
          const abrs = addedNode.querySelectorAll(".abr");
          summaries.forEach(element => console.log(`Height of summary: ${element.offsetHeight}`));
          abrs.forEach(element => console.log(`Height of abr: ${element.offsetHeight}`));
        }
      });
    }
  });
});

// Наблюдение за изменениями в корневом элементе DOM
observer.observe(document.body, { childList: true, subtree: true });

function findMaxHeightElementInCase(caseElement) {
  let maxHeight = 0;
  let maxElement = null;


  const childElements = caseElement.querySelectorAll('*'); // Получаем все дочерние элементы
  childElements.forEach(element => {
    const height = element.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
      maxElement = element;
    }
  });





  return { maxHeight, maxElement };
}

//========================================================================================
//Создание и отправка анкеты
//========================================================================================



//========================================================================================
//Создание и отправка заявки на собеседование (малая форма)
//========================================================================================

 // Добавляем обработчик событий на чекбоксы Контакты
 document.addEventListener('change', function (event) {
  if (event.target.matches('.custom-checkbox-contact-r')) {
    calculateResults();
  }
});

// сбор удобных каналов связи
function collectCheckedValues() {
  let selectedValues = []; // Массив для хранения выбранных значений

  // Получаем все выбранные чекбоксы
  const checkedBoxes = document.querySelectorAll('.custom-checkbox-contact-r:checked');

  // Перебираем все выбранные чекбоксы и добавляем их значения в массив
  checkedBoxes.forEach((checkbox) => {
    selectedValues.push(checkbox.value);
  });

  // Преобразуем массив в строку, разделяя значения запятыми
  const selectedValuesString = selectedValues.join(', ');

  // Выводим строку в консоль
  console.log(selectedValuesString);

  document.getElementById('sett-title-output-r').value = selectedValuesString;

  return selectedValuesString;
}

    // Или при изменении состояния любого чекбокса
    document.querySelectorAll('.custom-checkbox-contact-r').forEach((checkbox) => {
      checkbox.addEventListener('change', collectCheckedValues);
    });
