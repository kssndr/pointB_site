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

// Ваш код для создания чекбоксов и кнопок
function createCheckboxes(data) {
  const container = document.querySelector('.modules-checkbox');
  const leftButtons = data.left_buttons;
  const rightButtons = data.right_buttons;

  // ваш код для добавления левых кнопок
  addButtons(leftButtons, container);

  // ваш код для добавления правых кнопок, если нужно
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

      // Выводим строку в консоль (или делаем с ней что-то ещё)
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

// версия не работает
// document.addEventListener('DOMContentLoaded', function () {
//   const requestProgramButton = document.getElementById('request_program');
//   const thankYouMessage = document.getElementById('thank-you-message');
//   const programForm = document.querySelector('.program-form');

//   // Обработчик для кнопки закрытия
//   document.getElementById('close_button').addEventListener('click', function() {
   
//     programForm.style.display = 'block';
 
//     thankYouMessage.style.display = 'none';
//   });

//   // Обработчик для кнопки "Записаться на собеседование"
//   requestProgramButton.addEventListener('click', function () {
//     // Сбор данных и действия аналогичны вашему коду

//     // Скрываем форму и показываем блок "Спасибо"
//     if (programForm) {
//       programForm.style.display = 'none';
//     }
//     thankYouMessage.style.display = 'block';

//     // Запускаем таймеры для исчезновения блока "Спасибо"
//     setTimeout(function() {
//       thankYouMessage.classList.add('fade-out');
//     }, 3000);

//     setTimeout(function() {
//       thankYouMessage.style.display = 'none';
//       thankYouMessage.classList.remove('fade-out');
//     }, 4000);
//   });
// });


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
      if(programForm) {  // Добавлено для обеспечения безопасности
          programForm.style.display = 'none';
      }
      thankYouMessage.style.display = 'block';

      // Запускаем таймер на 10 секунд (10000 миллисекунд)
      // Запускаем таймер на 9 секунд (9000 миллисекунд)
      setTimeout(function() {
        // Начинаем анимацию исчезновения
        thankYouMessage.classList.add('fade-out');
      }, 3000); // время в миллисекундах

      // Запускаем таймер на 10 секунд (10000 миллисекунд)
      setTimeout(function() {
        // Полностью скрываем блок "Спасибо" после окончания анимации
        thankYouMessage.style.display = 'none';
        thankYouMessage.classList.remove('fade-out'); // Удаляем класс, чтобы сбросить прозрачность
      }, 4000); // время в миллисекундах

      document.getElementById('close_button').addEventListener('click', function() {
        // Находим элемент с ID "program" и устанавливаем его свойство "display" в "none", чтобы скрыть его
        document.getElementById('program-form').style.display = 'none';
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Ваша остальная логика здесь...

  // Находим кнопку по ID и добавляем к ней обработчик события click
  let closeButton = document.getElementById("close_button");
  let programRequestButton = document.getElementById("program-request");
  let programForm = document.getElementById("program-form");

  if(closeButton && programForm) {
      closeButton.addEventListener("click", function() {
          programForm.style.display = "none"; // скрываем элемент
      });
  }

  if(programRequestButton && programForm) {
      programRequestButton.addEventListener("click", function() {
          programForm.style.display = "block"; // показываем элемент
      });
  }
});