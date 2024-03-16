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

document.addEventListener("DOMContentLoaded", function () {
  // Находим все элементы меню
  const menuItems = document.querySelectorAll(".menu-item a");

  // Обходим каждый элемент меню
  menuItems.forEach(function (item) {
    // Добавляем обработчик клика
    item.addEventListener("click", function (e) {
      e.preventDefault(); // Отменяем стандартное действие ссылки

      // Получаем ID секции, к которой нужно прокрутиться
      const targetId = this.getAttribute("href").slice(1);

      // Находим соответствующую секцию по ID
      const targetSection = document.getElementById(targetId);

      // Прокручиваем страницу к секции с плавной анимацией
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
});
// ==============================================================================
// Динамическое создание блока меню Модулей программы
//==============================================================================
function isMobile() {
  return window.innerWidth <= 768; // предполагаем, что мобильные устройства имеют ширину экрана 768px или меньше
}

async function fetchJsonData() {
  try {
    const response = await fetch("pointb_texts.json");
    const jsonData = await response.json();

    const leftButtonsContainer = document.getElementById("left-buttons");
    const rightButtonsContainer = document.getElementById("right-buttons");

    if (isMobile()) {
      // Если экран мобильного устройства
      createCarousel(jsonData);
    } else {
      jsonData.left_buttons.forEach(buttonData => {
        const button = createButton(buttonData, leftButtonsContainer);
        leftButtonsContainer.appendChild(button);
      });

      jsonData.right_buttons.forEach(buttonData => {
        const button = createButton(buttonData, rightButtonsContainer);
        rightButtonsContainer.appendChild(button);
      });
    }
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
  // button.textContent = buttonData.name; //вместо просто кнопки кнопка с h3 (см ниже)

  const buttonTitle = document.createElement("h3"); // Создание элемента h3 для названия кнопки
  buttonTitle.textContent = buttonData.name; // Добавление текста названия в h3
  button.appendChild(buttonTitle); // Добавление h3 в контейнер кнопки

  button.addEventListener("mouseenter", () => {
    showText(buttonData.text, buttonData.name, container.id);
  });

  button.addEventListener("mouseleave", () => {
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

function createCarousel(jsonData) {
  const carouselContainer = document.getElementById("carousel-container");

  jsonData.left_buttons.concat(jsonData.right_buttons).forEach(buttonData => {
    const slide = document.createElement("div");
    slide.className = "item"; // Класс 'item' для OwlCarousel
    slide.innerHTML = `<h3>${buttonData.name}</h3><p>${buttonData.text}</p>`;
    carouselContainer.appendChild(slide);
  });

  initializeCarousel();
}

function initializeCarousel() {
  $("#carousel-container").owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    items: 1.2,
    // nav: false, // Обычно на мобильных устройствах лучше скрыть навигацию
    responsive: {
      0: {
        items: 1 // На очень маленьких экранах показывать 1 элемент
      },
      480: {
        items: 1 // На экранах от 480 пикселей показывать 2 элемента
      },
      768: {
        items: 2 // На экранах от 768 пикселей показывать 3 элемента
      }
    }
  });
}// ==============================================================================
// Динамическое создание отзывов
//==============================================================================


var reviewData = [
  {
    photo: "img/cases/Bstar.png",
    text: "Это мой первый опыт работы с коучем. Хотел бы сказать большое спасибо!<br> Что на мой взгляд удалось сделать:<br> Работа с Иннессой помогла определить мое текущее состояние, наметить вектор развития как руководителю, мыслить стратегически, определить четкие цели и способы их достижения, причем стабильно, методично, не давая возможности распыляться, разложить по полочкам приоритеты, выявить, что мне действительно важно и интересно, определить сильные и слабые стороны при взаимодействии с моей командой и другими подразделениями, выработать правильное поведение в кризисных ситуациях и условиях ограничений, поддержать мотивацию, взвешенно принимать решения, глубже понять принципы работы корпораций. Всё это очень помогает в каждодневной работе с коллегами, краткосрочном и долгосрочном планировании, целеполагании и понимании моего вектора движения вместе с Холдингом Т1. <br> Общение было выстроено в очень бережном формате. <br> Спасибо.<br>",
    author: "Голованов Алексей"
  },
  {
    photo: "img/cases/Bstar.png",
    text: "  Сотрудничали с Романовской Иннессой в рамках нескольких программ развития и запросов на индивидуальное сопровождения руководителей.<br> Очень довольны результатами. Руководители, которые были у Иннессы в сопровождении как у коуча, после работы с ней начинают лучше справляться со своими прямыми задачами, у них изменяется настрой, они начинают проявляться активно, предлагают новые идеи, от их старших руководителей мы получаем положительную обратную связь о том, что улучшилось коммуникация по задачам. Сами руководители, кто был в коучинге с Иннессой, говорят и видят смысл и пользу в сотрудничестве с ней.<br> Еще приятно то, что уровень компетенций у Иннессы высокий, а стоимость услуг в сравнении с другими корпоративными коучами очень доступная.<br>",
    author: "Броскина Надежда"
  },
  {
    photo: "img/cases/Bstar.png",
    text: "Лучший выбор за всё время! Спасибо за незабываемые впечатления.",
    author: "Дмитрий И."
  }
];

function createReviewCarousel(reviewData) {
  const reviewContainer = document.getElementById("reviewContainer");

  reviewData.forEach(data => {
    const slide = document.createElement("div");
    slide.className = "item"; // Класс 'item' для OwlCarousel
    // Добавляем внутреннее содержимое слайда: фотография, текст отзыва и подпись.
    slide.innerHTML = `
      <div class="review-slide">
      <div class="author"> 
        <img src="${data.photo}" alt="Photo of ${data.author}" class="review-photo">
        <div class="review-text">${data.text}</div>
      </div>
        <div class="review-author">${data.author}</div>
      </div>`;
    reviewContainer.appendChild(slide);
  });

  $("#reviewContainer").owlCarousel({
    loop: true,
    margin: 40,
    center: true,
    items: 1, // Изменено для лучшего отображения отзывов
    autoplay: true, // Добавлено автоматическое воспроизведение слайдов
    smartSpeed:1000,
    autoplayTimeout: 6000, // Интервал автоматического воспроизведения (в миллисекундах)
    nav: false, // Если нужна навигация, раскомментируйте эту строку
    dots:true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      768: {
        items: 1
      }
    }
  });
  // initializeReviewCarousel();
}

// function initializeReviewCarousel() {
  // $("#reviewContainer").owlCarousel({
  //   loop: false,
  //   margin: 10,
  //   items: 1, // Изменено для лучшего отображения отзывов
  //   autoplay: false, // Добавлено автоматическое воспроизведение слайдов
  //   autoplayTimeout: 5000, // Интервал автоматического воспроизведения (в миллисекундах)
  //   // nav: true, // Если нужна навигация, раскомментируйте эту строку
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     480: {
  //       items: 1
  //     },
  //     768: {
  //       items: 1
  //     }
  //   }
  // });


$(document).ready(function() {
 createReviewCarousel(reviewData);
});


// ==============================================================================
// ПРОГРАММА - Калькулятор Программ
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

      //console.log(`Сумма data-session для всех выбранных чекбоксов: ${sum}`);
      //console.log(`Количество выбранных чекбоксов: ${selectedCount}`);

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

      //console.log(`${kt}  ${km}  ${selectedCount}`);

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
      //console.log(selectedValuesString);

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
// Создание заявки для отправки по итогам работы клиента с калькулятором + отправкbа
//==============================================================================
document.addEventListener('DOMContentLoaded', function () {
  const requestProgramButton = document.getElementById('request_program');
  const closeButton = document.getElementById('close_button');
  const thankYouMessage = document.getElementById('thank-you-message');
  const programForm = document.getElementById('program-form');
  const programRequestButton = document.getElementById('program-request');

  // Обработчик для кнопки "Записаться на собеседование"
  if (requestProgramButton && programForm) {
    requestProgramButton.addEventListener('click', function () {

      const username = document.getElementById('username');
      const contacts = document.getElementById('contacts');
      const meetingFrequency = document.getElementById('meeting-frequency').value;
      const notes = document.getElementById('notes').value;
      const timeResult = document.getElementById('time-result').innerText;
      const moneyResult = document.getElementById('money-result').innerText;
      const currency = document.getElementById('currency').value;

      // Проверка: поля "username" и "contacts" не должны быть пустыми
      // Эта проверка должна идти сразу после сбора данных из полей
      let isValid = true;

      if (!username.value.trim()) {
        username.style.borderBottom = '2px solid red';
        isValid = false;
      } else {
        username.style.borderBottom = '';  // сбрасываем стиль
      }

      if (!contacts.value.trim()) {
        contacts.style.borderBottom = '2px solid red';
        isValid = false;
      } else {
        contacts.style.borderBottom = '';  // сбрасываем стиль
      }

      if (!isValid) {
        return;  // прекращаем выполнение, если форма невалидна
      }

      // Теперь, если все поля валидны, продолжаем выполнение кода
      const activeCheckboxesNames = collectCheckedValues();

      const formData = {
        type: "module",
        username: username.value,
        meetingFrequency,
        contacts: contacts.value,
        notes,
        timeResult,
        moneyResult,
        currency,
        activeCheckboxesNames, // добавляем названия активных чекбоксов

        // ... (остальные поля)
      };

      //console.log('Data to be sent:', formData);

      // Отправка данных на сервер
      fetch('sent_reqest_to_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (response.ok) {
            // Показать благодарственное сообщение
            programForm.style.display = 'none';
            thankYouMessage.style.display = 'block';

            setTimeout(function () {
              thankYouMessage.classList.add('fade-out');
            }, 3000);

            setTimeout(function () {
              thankYouMessage.style.display = 'none';
              thankYouMessage.classList.remove('fade-out');
            }, 4000);
          } else {
            console.error('Произошла ошибка при отправке данных.');
          }
        })
        .catch(error => {
          console.error('Ошибка при отправке данных:', error);
        });

      programForm.style.display = 'none';
      thankYouMessage.style.display = 'block';

      setTimeout(function () {
        thankYouMessage.classList.add('fade-out');
      }, 3000);

      setTimeout(function () {
        thankYouMessage.style.display = 'none';
        thankYouMessage.classList.remove('fade-out');
      }, 4000);

    });
  }

  // Обработчик для кнопки закрытия
  if (closeButton && programForm) {
    closeButton.addEventListener('click', function () {
      programForm.style.display = 'none';
    });
  }

  // Обработчик для другой кнопки, которая открывает форму
  if (programRequestButton && programForm) {
    programRequestButton.addEventListener('click', function () {
      programForm.style.display = 'block';
    });
  }

  function collectCheckedValues() {
    let selectedValues = []; // Массив для хранения выбранных значений

    // Получаем все выбранные чекбоксы
    const checkedBoxes = document.querySelectorAll('.custom-checkbox:checked');

    // Перебираем все выбранные чекбоксы и добавляем их значения в массив
    // Перебираем все выбранные чекбоксы
    checkedBoxes.forEach((checkbox) => {
      // Находим родительский элемент чекбокса
      const parentDiv = checkbox.closest('div');

      // В родительском элементе находим кнопку с классом checkbox-button
      const button = parentDiv.querySelector('.checkbox-button');

      // Добавляем текст кнопки в массив, если кнопка найдена
      if (button) {
        selectedValues.push(button.textContent);
      }
    });

    return selectedValues; // возвращаем массив с названиями
  }
});

//========================================================================================
//  КЕЙСЫ - Создание фильтра с вычеслением размеров блоков DESKTOP
//========================================================================================

// Добавьте следующую строку для подсчета количества созданных .case
let caseCount = 0;
let blockCaseContainer;
let casesContainer;
let cases;


const state = {
  activeFilters: [],
  maxCaseHeight: 0,
  totalCasesHeight: 0,
};

// функция для пересчета размеров case при нажатии на кнопку Расскрыть/Скрыть (вариант наоборот)
function updateContainerHeight() {
  let casesContainer = document.querySelector('.cases');
  let blockCaseContainer = document.querySelector('.c');
  let casesContainerA = document.querySelector('.cases-container');

  let totalHeight = 0;

  // Выбираем все элементы .case внутри .cases
  const caseElements = document.querySelectorAll('.case');

  // Перебираем все свёрнутые элементы .case
  caseElements.forEach(caseElement => {
    if (!caseElement.classList.contains('expanded')) {
      const height = 285; // стандартное значение для свёрнутых
      totalHeight += height;
      console.log('Свернутый элемент:', height, 'totalHeight:', totalHeight);
    }
  });

  // Перебираем все раскрытые элементы .case
  caseElements.forEach(caseElement => {
    if (caseElement.classList.contains('expanded')) {
      // Если элемент раскрыт, используем вашу функцию для вычисления максимальной высоты
      const { maxHeight } = findMaxHeightElementInCase(caseElement);
      const height = parseInt(maxHeight, 10); // Преобразование в целое число, если maxHeight — строка
      totalHeight += height;
      console.log('Раскрытый элемент:', height);
    }
  });

  // Устанавливаем вычисленную высоту для родительского блока .cases и .c
  if (casesContainer) {
    casesContainer.style.height = `${totalHeight}px`;
  }
  if (blockCaseContainer) {
    blockCaseContainer.style.height = `${totalHeight + 155}px`;
    casesContainerA.style.height = `${totalHeight}px`;
    casesContainer.style.height = `${totalHeight}px`;
  }
}

// Функция для создания элемента кейса и его наполнения данными
function createCaseElement(item, casesContainer) {
  const caseElement = document.createElement('div');
  caseElement.className = 'case';
  caseElement.id = `case-${item.id}`;
  // caseElement.classList.add('expanded');
  // caseElement.style.height = '220px';  // Ограничиваем высоту
  // caseElement.style.overflow = 'hidden';  // Скрываем переполнение

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


  // Добавление кнопки "Раскрыть"
  const toggleButton = document.createElement('button');
  toggleButton.className = 'expand-button';
  toggleButton.textContent = 'Развернуть';
  // toggleButton.style.position ="absolute";
  // toggleButton.style.top ="200px";
  toggleButton.style.width = "126px";
  toggleButton.style.height = '41px'; // Установка высоты кнопки
  toggleButton.style.backgroundColor = "white";
  toggleButton.style.border = '1px solid transparent'; // Прозрачная граница
  toggleButton.style.backgroundColor = '#C4A36D'; // Установка фонового цвета
  toggleButton.style.borderRadius = '22px'; // Установка радиуса закругления углов
  toggleButton.style.position = 'absolute';
  toggleButton.style.bottom = '0px'; // Устанавливаем отступ снизу
  toggleButton.style.left = '50%'; // Размещаем по горизонтали в центре
  toggleButton.style.transform = 'translateX(-50%)'; // Центрируем по горизонтали
  toggleButton.style.color = '#FFF'; // Установка цвета текста
  toggleButton.style.textAlign = 'center'; // Установка выравнивания текста по центру
  toggleButton.style.fontFamily = 'Inter'; // Установка шрифта
  toggleButton.style.fontSize = '14px'; // Установка размера шрифта
  toggleButton.style.fontStyle = 'normal'; // Установка стиля шрифта
  toggleButton.style.fontWeight = '700'; // Установка жирности шрифта
  toggleButton.style.lineHeight = 'normal'; // Установка междустрочного интервала
  toggleButton.style.zIndex = '2'; // Устанавливаем z-index слоя больше, чем у .case




  const layerElement = document.createElement('div');
  layerElement.className = 'layer';
  layerElement.style.height = '100px'; // Установка высоты слоя
  layerElement.style.background = 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)';
  layerElement.style.position = 'absolute'; // Устанавливаем позицию слоя в "absolute"
  layerElement.style.bottom = '0'; // Располагаем слой у нижнего края .case
  layerElement.style.width = '100%'; // Устанавливаем ширину слоя на 100%
  layerElement.style.zIndex = '1'; // Устанавливаем z-index слоя больше, чем у .case



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
          goalTextElement.innerHTML = summaryItem.goal_text;
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
          modTextElement.innerHTML = summaryItem.mod_text;
          summaryElement.appendChild(modTextElement);
        }

        // if (summaryItem.duration_title) {
        //   const durationTitleElement = document.createElement('div');
        //   durationTitleElement.className = 'duration_title';
        //   // durationTitleElement.textContent = summaryItem.duration_title;
        //   summaryElement.appendChild(durationTitleElement);
        // }

        // if (summaryItem.duration_text) {
        //   const durationTextElement = document.createElement('div');
        //   durationTextElement.className = 'duration_text';
        //   durationTextElement.textContent = summaryItem.duration_text;
        //   summaryElement.appendChild(durationTextElement);
        // }

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
          atextElement.innerHTML = pointaItem.a_text;
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
          bonusTxElement.innerHTML = bonusItem.bonus_text;
          bonusElement.appendChild(bonusTxElement);
        }
      });

      rElement.appendChild(bonusElement);

    }

  });


  casesContainer.appendChild(caseElement);
  caseElement.appendChild(toggleButton);


  // // Добавление кнопки "Раскрыть"
  // const toggleButton = document.createElement('button');
  // toggleButton.className = 'expand-button';
  // toggleButton.textContent = 'Раскрыть';

  // // Добавление обработчика события для кнопки "Раскрыть"
  toggleButton.addEventListener('click', toggleExpand);

  // Добавление элементов кейса в основной контейнер
  caseElement.appendChild(abrElement);
  caseElement.appendChild(toggleButton);
  caseElement.appendChild(layerElement);

  return caseElement;
}
// Обработчик событий для кнопки "Раскрыть"

function toggleExpand(event) {
  const caseElement = event.target.closest('.case');
  const expandButton = event.target;  // это кнопка, которую мы нажали
  if (caseElement) {
    if (caseElement.classList.contains('expanded')) {
      caseElement.classList.remove('expanded');
      expandButton.innerHTML = 'Расскрыть';  // Меняем надпись на кнопке
      // Скрываем слой, когда кнопка "Развернуть" активна
      const layerElement = caseElement.querySelector('.layer');
      if (layerElement) {
        layerElement.style.display = 'block';

      }
    } else {
      caseElement.classList.add('expanded');
      expandButton.innerHTML = 'Свернуть';  // Меняем надпись на кнопке
      const layerElement = caseElement.querySelector('.layer');
      if (layerElement) {
        layerElement.style.display = 'none';

      }
    }
    updateContainerHeight(); // Пересчитываем высоты после изменения состояния
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    //console.log('Ошибка загрузки данных:', error);
  }
}

function calculateMaxHeights(data, item, caseElement) {
  if (state.activeFilters.length === 0) {
    resetHeights();
  } else {
    requestAnimationFrame(() => {
      setHeights(data); // Передаем data как аргумент
    });
  }
}

function setHeights(data) {
  requestAnimationFrame(() => {
    console.log('Inside requestAnimationFrame');
    console.log('Active Filters:', state.activeFilters);

    let totalMaxHeights = 0;

    if (state.activeFilters.length === 0) {
      console.log("No active filters. Resetting heights.");
      resetHeights();
      return;
    }

    data.forEach(item => {
      if (item.tags.some(tag => state.activeFilters.includes(tag))) {
        const caseElement = document.getElementById(`case-${item.id}`);

        if (caseElement) {
          const { maxHeight, maxElement } = findMaxHeightElementInCase(caseElement);

          console.log(`case-id: ${item.id}, max-element: ${maxElement.className}, max-height: ${maxHeight}`);
          totalMaxHeights += maxHeight;
          caseElement.setAttribute('data-max-height', maxHeight);

          const summaryElement = caseElement.querySelector('.summary');
          if (summaryElement) {
            summaryElement.style.height = `calc(${maxHeight}px-150px)`;
          }

          const existingAbrElement = caseElement.querySelector('.abr');
          if (existingAbrElement) {
            existingAbrElement.style.height = `${maxHeight}px`;
          }

          const casesElement = caseElement.querySelector('.cases');
          if (casesElement) {
            casesElement.style.height = `${maxHeight}px`;
          }

          let rh = 0;

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
    });

    console.log('Total max heights:', totalMaxHeights);

    if (state.activeFilters.length === 0) {
      console.log("No active filters. Resetting heights.");
      resetHeights();
    } else {
      if (blockCaseContainer) {
        blockCaseContainer.style.height = `${totalMaxHeights + 0}px`;
      }
      if (casesContainer) {
        casesContainer.style.height = `${totalMaxHeights + 0}px`;
      }
      if (cases) {
        cases.style.height = `${totalMaxHeights}px`;
      }
    }
  });
}

async function updateCases() {
  // Обнуляем переменные перед началом обработки данных
  blockCaseContainer = null;
  casesContainer = null;
  cases = null;
  caseCount = 0;

  const data = await fetchData('case.json');
  if (!data) return;

  casesContainer = document.querySelector('.cases');
  casesContainer.innerHTML = '';
  state.totalCasesHeight = 0;

  // Сбрасываем значения переменных, когда снимаются все фильтры
  if (state.activeFilters.length === 0) {
    blockCaseContainer = null;
    casesContainer = null;
    cases = null;
  }


  data.forEach(item => {
    if (item.tags.some(tag => state.activeFilters.includes(tag))) {
      let caseElement = createCaseElement(item, casesContainer);
      casesContainer.appendChild(caseElement);
      calculateMaxHeights(data, item, caseElement);

      // Увеличиваем счетчик каждый раз, когда создается .case
      caseCount++;
    }
  });
  // Выводим количество созданных .case в консоль
  //console.log(`Количество созданных .case: ${caseCount}`);
  updateContainerHeight();
}

function toggleButtonActivation(event) {
  const button = event.target;
  const filterId = button.innerText;
  button.classList.toggle('active');

  if (button.classList.contains('active')) {
    state.activeFilters.push(filterId);
  } else {
    const index = state.activeFilters.indexOf(filterId);
    if (index > -1) {
      state.activeFilters.splice(index, 1);
    }
  }

  // Обнуляем переменные, когда нет активных фильтров
  if (state.activeFilters.length === 0) {
    blockCaseContainer = null;
    casesContainer = null;
    cases = null;
    caseCount = 0;
    updateContainerHeight(); // Пересчитываем высоты без фильтров
  }

  updateCases();
  updateContainerHeight();
  //console.log(state.activeFilters);
}

//новая версия
document.addEventListener("DOMContentLoaded", function () {

  let blockCaseContainer = document.querySelector('.c');
  let casesContainer = document.querySelector('.cases-container');
  let cases = document.querySelector('.cases');

  function resetHeights(data) {
    if (blockCaseContainer) blockCaseContainer.style.height = '0px';
    if (casesContainer) casesContainer.style.height = '0px';
    if (cases) cases.style.height = '0px';
  }

  function createFilterButtons(data) {
    const filterContainer = document.getElementById('filter');
    if (!filterContainer) {
      filterContainer = document.createElement('div');
      filterContainer.id = 'filter';
      document.body.appendChild(filterContainer);
    }

    const filterButtons = [...data.left_buttons, ...data.right_buttons];

    filterButtons.forEach(button => {
      const btn = document.createElement('button');
      btn.innerHTML = button.name;
      btn.id = button.id.toString();
      btn.className = "btn-filter";
      btn.addEventListener('click', toggleButtonActivation);
      filterContainer.appendChild(btn);
    });
  }

  async function initialize() {
    const data = await fetchData('pointb_texts.json');
    if (!data) return;

    if (Array.isArray(data.left_buttons) && Array.isArray(data.right_buttons)) {
      createFilterButtons(data);
    } else {
      //console.log("Ошибка: полученные данные не содержат нужных массивов");
    }
  }

  initialize();

  // Добавление обработчика событий для закрытия списка при клике вне его
  document.addEventListener('click', function (event) {
    let filterButton = document.getElementById('filter-mob');
    let filterList = document.getElementById('filter-list');

    // Проверяем, был ли клик внутри списка или кнопки
    if (filterList && !filterList.contains(event.target) && !filterButton.contains(event.target)) {
      filterList.style.display = 'none';
    }
  });
});

//новый вариант
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      // Перебираем все добавленные узлы
      mutation.addedNodes.forEach(function (addedNode) {
        // Дополнительная проверка: удостоверимся, что узел является элементом DOM
        if (addedNode.nodeType === 1) {

          // Регулярное выражение для проверки ID в формате "case-<число>"
          const caseRegex = /^case-\d+$/;

          if (caseRegex.test(addedNode.id) || addedNode.classList.contains("summary") || addedNode.classList.contains("abr")) {
            // Измеряем высоту
            const height = addedNode.offsetHeight;
            //console.log(`Height of ${addedNode.id || addedNode.className}: ${height}`);
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

// Запуск наблюдения за корневым элементом
const targetNode = document.body;  // корневой элемент, который мы будем наблюдать
const config = { childList: true, subtree: true };  // опции
observer.observe(targetNode, config);

// Наблюдение за изменениями в корневом элементе DOM
observer.observe(document.body, { childList: true, subtree: true });

function findMaxHeightElementInCase(caseElement) {
  let maxHeight = 0;
  let maxElement = null;

  const childElements = caseElement.querySelectorAll('*'); // Получаем все дочерние элементы
  childElements.forEach(element => {
    const height = element.offsetHeight;
    console.log('findMaxHeightElementInCase:',element,height)
    if (height > maxHeight) {
      maxHeight = height;
      maxElement = element;
    }
  });
  
  return { maxHeight, maxElement };
}

//========================================================================================
//  КЕЙСЫ - Создание фильтра  MOBILE
//========================================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM полностью загружен и разобран");

  if (window.matchMedia("(max-width: 768px)").matches) {
    console.log("Экран соответствует мобильному устройству");
    let filterButton = document.getElementById('filter-mob');

    if (filterButton) {
      filterButton.addEventListener('click', function () {
        console.log("Кнопка filter-mob нажата");
        toggleVisibility('filter-list');
      });

      fetch('pointb_texts.json')
        .then(response => response.json())
        .then(data => {
          console.log("Данные из JSON загружены", data);
          createCheckboxList(data.left_buttons, data.right_buttons);
        })
        .catch(error => console.error('Ошибка при загрузке JSON:', error));
    } else {
      console.error("Элемент с ID 'filter-mob' не найден");
    }
  } else {
    console.log("Экран не соответствует мобильному устройству");
  }
});

// Добавление обработчика событий для кнопки "filter-mob-cancel"
let cancelButton = document.querySelector('.filter-mob-cancel');

if (cancelButton) {
  cancelButton.addEventListener('click', function () {
    // Сброс выбранных чекбоксов
    document.querySelectorAll('#filter-list input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    // Обновление выбранных фильтров и текста кнопки
    updateSelectedFilters();
  });
}

function createCheckboxList(leftButtons, rightButtons) {
  let listContainer = document.createElement('div');
  listContainer.id = 'filter-list';
  listContainer.style.display = 'none';

  // Функция для добавления чекбоксов
  function addCheckboxes(buttons) {
    buttons.forEach(button => {
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox-mob';
      checkbox.id = 'filter-' + button.id;
      checkbox.value = button.name;

      // Добавляем обработчик события для обновления списка и текста кнопки
      checkbox.addEventListener('change', updateSelectedFilters);

      let label = document.createElement('label');
      label.htmlFor = 'filter-' + button.id;
      label.textContent = button.name;

      listContainer.appendChild(checkbox);
      listContainer.appendChild(label);
      listContainer.appendChild(document.createElement('br'));
    });
  }

  // Добавление чекбоксов для каждого массива кнопок
  addCheckboxes(leftButtons);
  addCheckboxes(rightButtons);

  document.querySelector('.cases-container-head-mob').appendChild(listContainer);

  // Обновление списка и текста кнопки после создания чекбоксов
  updateSelectedFilters();

}



function toggleVisibility(elementId) {
  let element = document.getElementById(elementId);
  let cancelButton = document.querySelector('.filter-mob-cancel');

  if (element) {
    if (element.style.display === 'none' || element.style.display === '') {
      element.style.display = 'block'; // Показываем выпадающий список
      // Скрываем кнопку filter-mob-cancel, когда список отображается
      if (cancelButton) cancelButton.style.display = 'none';
    } else {
      element.style.display = 'none'; // Скрываем выпадающий список
      // Показываем кнопку filter-mob-cancel, когда список скрыт
      if (cancelButton) cancelButton.style.display = 'block';
    }
  } else {
    console.error("Элемент с ID '" + elementId + "' не найден");
  }
}


// Глобальная переменная для хранения выбранных элементов
let selectedFiltersMob = [];
let svgIconFilter = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <g clip-path="url(#clip0_223_10910)">
                    <path d="M10.5625 22.75C10.4104 22.7505 10.2612 22.7083 10.1319 22.6281C10.0148 22.5549 9.91828 22.4531 9.85146 22.3323C9.78465 22.2115 9.74973 22.0756 9.75001 21.9375V14.1212L3.47751 7.15813C2.8062 6.41065 2.43568 5.44093 2.43751 4.43625V4.0625C2.43751 3.84701 2.52311 3.64035 2.67548 3.48798C2.82786 3.3356 3.03452 3.25 3.25001 3.25H22.75C22.9655 3.25 23.1722 3.3356 23.3245 3.48798C23.4769 3.64035 23.5625 3.84701 23.5625 4.0625V4.43625C23.5643 5.44093 23.1938 6.41065 22.5225 7.15813L16.25 14.1212V18.4925C16.2509 18.9462 16.1251 19.3912 15.8868 19.7774C15.6486 20.1635 15.3072 20.4755 14.9013 20.6781L10.9281 22.6606C10.8149 22.7186 10.6897 22.7492 10.5625 22.75ZM4.10313 4.875C4.18365 5.31965 4.38619 5.73317 4.68813 6.06937L11.1881 13.2681C11.3148 13.4207 11.3812 13.6143 11.375 13.8125V20.6212L14.1781 19.2237C14.3134 19.1556 14.4269 19.051 14.5058 18.9218C14.5848 18.7926 14.6261 18.6439 14.625 18.4925V13.8125C14.6255 13.6111 14.7008 13.4171 14.8363 13.2681L21.3363 6.06937C21.6441 5.73508 21.8523 5.32139 21.9375 4.875H4.10313Z" fill="#3E4145"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_223_10910">
                    <rect width="26" height="26" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>`;

let svgIconArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M5 8L0.669873 0.499999L9.33013 0.5L5 8Z" fill="#313131"/>
                    </svg>`;
let currentCaseIndex = 0; // Индекс текущего отображаемого кейса
let filteredCaseData = []; // Отфильтрованные данные кейсов


function updateSelectedFilters() {
  selectedFiltersMob = [];
  document.querySelectorAll('#filter-list input[type="checkbox"]:checked').forEach(checkbox => {
    selectedFiltersMob.push(checkbox.value);
  });

  let filterButton = document.getElementById('filter-mob');
  if (filterButton) {
    let buttonText = selectedFiltersMob.length > 0 ?
      `Выбрано модулей (${selectedFiltersMob.length})` :
      "Выберите модули";
    filterButton.innerHTML = svgIconFilter + buttonText + svgIconArrow;
  }

    // Добавляем код для отображения/скрытия кнопки filter-mob-cancel
    // let cancelButton = document.querySelector('.filter-mob-cancel');
    // if (cancelButton) {
    //   if (selectedFiltersMob.length > 0) {
    //     cancelButton.style.display = 'block'; // Показываем кнопку
    //   } else {
    //     cancelButton.style.display = 'none'; // Скрываем кнопку
    //   }
    // }

  updateCasesContainer(); // Обновляем контейнер с кейсами
}

let caseData = []; // Глобальная переменная для хранения данных из case.json

// Загрузка данных из case.json
function loadCaseData() {
  fetch('case.json')
    .then(response => response.json())
    .then(data => {
      caseData = data; // Сохраняем данные в глобальную переменную
      updateSelectedFilters(); // Обновляем фильтры после загрузки данных
    })
    .catch(error => console.error('Ошибка при загрузке case.json:', error));
}

function updateCasesContainer() {
  let container = document.querySelector('.cases-containe-mob');
  container.innerHTML = ''; // Очищаем предыдущие результаты
  filteredCaseData = []; // Обнуляем отфильтрованные данные

  caseData.forEach(caseItem => {
    if (caseItem.tags.some(tag => selectedFiltersMob.includes(tag))) {
      filteredCaseData.push(caseItem);  // Добавляем элемент в отфильтрованные данные
      const clientInfoBlock = caseItem.blocks.find(block => block.summary?.find(item => item.client_name));
      if (clientInfoBlock) {
        const clientName = clientInfoBlock.summary.find(item => item.client_name).client_name
          ;
        const clientPhoto = clientInfoBlock.summary.find(item => item.photo)?.photo;

        // Создаем кнопку с фото и именем клиента
        let clientButton = document.createElement('button');
        clientButton.classList.add('client-button');
        clientButton.innerHTML = `<img class="client-photo-mob" src="${clientPhoto}" alt="Фото клиента" /><div class="client-name-mob">${clientName}</div>`;

        // Обработчик нажатия кнопки для отображения дополнительной информации
        clientButton.addEventListener('click', () => {
          displayClientInfo(caseItem);
        });

        container.appendChild(clientButton);
      }
    }
  });

  // if (filteredCaseData.length > 0) {
  //   displayClientInfo(filteredCaseData[currentCaseIndex]); // Отображаем первый кейс
  // }
}

// Функция для отображения дополнительной информации о клиенте
function displayClientInfo(caseItem) {
  // Извлекаем данные из caseItem
  const clientName = caseItem.blocks[0].summary.find(item => item.client_name)?.client_name || '';
  const goalText = caseItem.blocks[0].summary.find(item => item.goal_text)?.goal_text || '';
  const moduleText = caseItem.blocks[0].summary.find(item => item.mod_text)?.mod_text || '';
  const aText = caseItem.blocks[1].point_a[0]?.a_text || '';
  const bText = caseItem.blocks[2].point_b[0]?.b_text || '';
  const bonusText = caseItem.blocks[3].bonus[0]?.bonus_text || '';


  // if (nextButton) {
  //   nextButton.removeEventListener('click', showNextCase);
  // }
  // if (prevButton) {
  //   prevButton.removeEventListener('click', showPreviousCase);
  // }

  // Создаем и наполняем модальное окно
  let modalHtml = `
  <div class="modal-overlay"></div>
    <div class="mob-case-block">
        <div class="mob-head-cb">
            <div class="mob-head-name-cansel">
                <div class="mob-head-client-name-cb">${clientName}</div>
                <button class="mob-case-block-top-cancel" onclick="closeModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <g opacity="0.4">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1733 20.6946L9.34717 11.0091C9.05819 10.7277 9.05819 10.273 9.34717 9.99087L19.1733 0.305365C19.5904 -0.101788 20.2692 -0.101788 20.6871 0.305365C21.1043 0.712519 21.1043 1.37332 20.6871 1.78048L11.8525 10.5004L20.6871 19.2188C21.1043 19.6267 21.1043 20.2875 20.6871 20.6946C20.2692 21.1018 19.5904 21.1018 19.1733 20.6946Z" fill="#313131"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.82673 0.305369L11.6528 9.99088C11.9418 10.2723 11.9418 10.727 11.6528 11.0091L1.82673 20.6946C1.40955 21.1018 0.730804 21.1018 0.312886 20.6946C-0.104291 20.2875 -0.104291 19.6267 0.312886 19.2195L9.14754 10.4996L0.312888 1.78121C-0.104289 1.37333 -0.104289 0.712523 0.312888 0.305369C0.730806 -0.101785 1.40955 -0.101785 1.82673 0.305369Z" fill="#313131"/>
                </g>
              </svg>
                
                </button>
            </div>
            <div class="mob-head-title-cb">Запрос</div>
            <div class="mob-head-text-cb">${goalText}</div>
            <div class="mob-head-title-cb">Модули</div>
            <div class="mob-head-text-cb">${moduleText}</div>
        </div>
        <div class="mob-ab-cb">
            <div class="mob-ab-title-cb">Точка А</div>
            <div class="mob-a-text-arrow-cb">
                <div class="mob-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="176" viewBox="0 0 16 176" fill="none">
                <path d="M7.2929 175.707C7.68343 176.098 8.31659 176.098 8.70711 175.707L15.0711 169.343C15.4616 168.953 15.4616 168.319 15.0711 167.929C14.6806 167.538 14.0474 167.538 13.6569 167.929L8.00001 173.586L2.34315 167.929C1.95263 167.538 1.31946 167.538 0.92894 167.929C0.538415 168.319 0.538415 168.953 0.92894 169.343L7.2929 175.707ZM7 4.37114e-08L7.00001 175L9.00001 175L9 -4.37114e-08L7 4.37114e-08Z" fill="url(#paint0_linear_223_12386)"/>
                <defs>
                <linearGradient id="paint0_linear_223_12386" x1="8.00001" y1="175" x2="8" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0D4C47"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
                </defs>
                </svg>
                                
                </div>
                <div class="mob-ab-text-cb">${aText}</div>
            </div>
            <div class="mob-reslt-title-cb">Точка Б</div>
            <div class="mob-reslt-text-cb">${bText}</div>
        </div>
        <div class="mob-reslt-cb">
            <div class="mob-reslt-title-cb">Результаты бонусом</div>
            <div class="mob-reslt-text-cb">${bonusText}</div>
        </div>
        <div class="mob-bottom-cb">
            <button class="mob-case-block-bottom-prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="30" viewBox="0 0 64 30" fill="none">
            <path d="M0.585785 13.5858C-0.195259 14.3668 -0.195259 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.85786C15.3611 0.0768114 14.0948 0.0768112 13.3137 0.85786L0.585785 13.5858ZM64 13L2 13L2 17L64 17L64 13Z" fill="url(#paint0_linear_223_12388)"/>
            <defs>
            <linearGradient id="paint0_linear_223_12388" x1="2" y1="15" x2="64" y2="15" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8E8E8E"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
            </defs>
            </svg>
            
            </button>
            <button class="mob-case-block-bottom-cancel" onclick="closeModal()">Закрыть</button>
            <button class="mob-case-block-bottom-next">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="30" viewBox="0 0 64 30" fill="none">
              <path d="M63.4142 16.4142C64.1953 15.6332 64.1953 14.3668 63.4142 13.5858L50.6863 0.857869C49.9052 0.07682 48.6389 0.0768199 47.8579 0.857869C47.0768 1.63892 47.0768 2.90525 47.8579 3.6863L59.1716 15L47.8579 26.3137C47.0768 27.0948 47.0768 28.3611 47.8579 29.1421C48.6389 29.9232 49.9052 29.9232 50.6863 29.1421L63.4142 16.4142ZM-1.74846e-07 17L62 17L62 13L1.74846e-07 13L-1.74846e-07 17Z" fill="url(#paint0_linear_223_12387)"/>
              <defs>
                <linearGradient id="paint0_linear_223_12387" x1="62" y1="15" x2="0" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8E8E8E"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            </button>
        </div>
      </div>`;


  // Создаем контейнер для модального окна, если еще не создан
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }

  // Добавляем HTML модального окна в контейнер
  modalContainer.innerHTML = modalHtml;
  modalContainer.style.display = 'block'; // Показываем модальное окно
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона

  // Добавление обработчиков событий для кнопок переключения кейсов
  let nextButton = modalContainer.querySelector('.mob-case-block-bottom-next');
  let prevButton = modalContainer.querySelector('.mob-case-block-bottom-prev');

  // Удаляем предыдущие обработчики событий
  if (nextButton) {
    // nextButton.removeEventListener('click', showNextCase);
    nextButton.addEventListener('click', showNextCase); // Добавляем новый обработчик событий
  }
  if (prevButton) {
    // prevButton.removeEventListener('click', showPreviousCase);
    prevButton.addEventListener('click', showPreviousCase); // Добавляем новый обработчик событий
  }
}

// Функция для закрытия модального окна
function closeModal() {
  let modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.style.display = 'none'; // Скрываем модальное окно
    document.body.style.overflow = ''; // Восстанавливаем прокрутку фона
  }
}

function showNextCase() {
  currentCaseIndex = (currentCaseIndex + 1) % filteredCaseData.length;
  displayClientInfo(filteredCaseData[currentCaseIndex]);
  scrollToTopOfModal();
}

function showPreviousCase() {
  currentCaseIndex = (currentCaseIndex - 1 + filteredCaseData.length) % filteredCaseData.length;
  displayClientInfo(filteredCaseData[currentCaseIndex]);
  scrollToTopOfModal();
}

function scrollToTopOfModal() {
  let modalContainer = document.getElementById('modal-container');
  let topElement = modalContainer.querySelector('.mob-case-block');
  if (topElement) {
    topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Вызываем функцию загрузки данных из JSON при загрузке документа
document.addEventListener('DOMContentLoaded', loadCaseData);

//========================================================================================
//Создание и отправка анкеты
//========================================================================================

document.getElementById("anketa-request").addEventListener("click", function () {
  // код для загрузки данных и создания формы остается прежним
  document.getElementById("anketaModal").style.display = "block";
  document.body.style.overflow = "hidden";

  fetch('oprosnik.json')
    .then(response => response.json())
    .then(data => {
      if (!document.getElementById("questionForm")) {
        createQuestions(data.questions);
      }
      document.getElementById("anketaFormContainer").style.display = "block";
    })
    .catch((error) => console.error('Ошибка загрузки данных:', error));
});

// Функция для создания вопросов и ответов
function createQuestions(questionsData) {
  //console.log('createQuestions вызвана');
  const formContainer = document.getElementById('anketaFormContainer');

  // Удаляем старую форму, если она уже существует
  const oldForm = document.getElementById("questionForm");
  if (oldForm) {
    formContainer.removeChild(oldForm);
  }

  // Создаем новую форму
  const form = document.createElement('form');
  form.id = "questionForm";

  // Создаем заголовок формы
  const titleAnket = document.createElement('div');
  titleAnket.className = "title-anketa-name";
  titleAnket.textContent = "Ответьте на вопросы теста";

  // Создаем контейнер для SVG иконок
  const iconContainer = document.createElement('span');
  iconContainer.className = "icon-container-anketa";

  // Создаем кнопку
  const closeButton = document.createElement('button');
  closeButton.className = "close-anketa-button";
  closeButton.type = "button"; // Устанавливаем тип кнопки как "button"

  // SVG для крестика
  const closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeIcon.setAttribute("width", "60");
  closeIcon.setAttribute("height", "60");
  const closePath = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // Устанавливаем новые координаты, соответствующие 60px
  closePath.setAttribute("d", "M30 15 L30 45 M15 30 L45 30");

  // Изменяем цвет и толщину линии
  closePath.setAttribute("stroke", "#FFF");
  closePath.setAttribute("stroke-width", "3");
  closePath.setAttribute("stroke-linecap", "round");

  // Поворачиваем крестик на 45 градусов
  closePath.setAttribute("transform", "rotate(45 30 30)");

  closeIcon.appendChild(closePath);

  // Добавляем SVG иконки в контейнер
  iconContainer.appendChild(closeIcon);

  // Добавляем контейнер с иконкой в кнопку
  closeButton.appendChild(iconContainer);

  // Добавляем кнопку в форму
  form.appendChild(closeButton);

  form.appendChild(titleAnket);

  // Обработка закрытия формы для этой кнопки
  closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("anketaModal").style.display = 'none';
    document.body.style.overflow = "auto";
  });

  // Добавьте кнопку к вашей форме или к другому родительскому элементу
  form.appendChild(closeButton);


  questionsData.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = "question";

    const questionTitle = document.createElement('div'); //h3
    questionTitle.className = "title-anketa";
    questionTitle.textContent = `${index + 1}. ${question.text}`;
    questionDiv.appendChild(questionTitle);

    if (question.type === 'checkbox') {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = "options";

      question.options.forEach((option) => {
        const optionLabel = document.createElement('label');

        const optionInput = document.createElement('input');
        optionInput.type = 'checkbox';
        optionInput.className = 'custom-checkbox';
        //optionInput.name = `question_${index}`;
        optionInput.name = `${index + 1}. ${question.text}`; // Изменено здесь

        optionInput.value = option;

        const optionTextSpan = document.createElement('span');
        optionTextSpan.className = 'checkbox-anketa-text';
        optionTextSpan.textContent = option;

        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(optionTextSpan); // Используем span вместо простого текстового узла

        optionsDiv.appendChild(optionLabel);
      });

      questionDiv.appendChild(optionsDiv);
    }

    if (question.type === 'text') {
      const textArea = document.createElement('textarea');
      textArea.className = "anketa-text-area";
      //textArea.name = `question_${index}`;

      textArea.name = `${index + 1}. ${question.text}`; // Изменено здесь
      textArea.rows = 4;
      textArea.cols = 50;

      questionDiv.appendChild(textArea);
    }

    form.appendChild(questionDiv);
  });

  // блок контакта и отправки формы

  const requestDataDiv = document.createElement('div');
  requestDataDiv.className = "anketa-client-data";

  // Первый ряд
  const rowOne = document.createElement('div');
  rowOne.className = "anketa-row-one";

  const requestFirstBlock = document.createElement('div');
  requestFirstBlock.className = "anketa-first-block";
  const settTitleName = document.createElement('div');
  settTitleName.className = "anketa-sett-title";
  settTitleName.textContent = "Ваше имя*";
  const usernameInput = document.createElement('input');
  usernameInput.type = "text";
  usernameInput.id = "username-input-a";
  usernameInput.name = "username-input";
  usernameInput.className = "module-input";
  usernameInput.style.maxWidth = "280px";

  requestFirstBlock.appendChild(settTitleName);
  requestFirstBlock.appendChild(usernameInput);
  rowOne.appendChild(requestFirstBlock);

  const requestSecondBlock = document.createElement('div');
  requestSecondBlock.className = "anketa-second-block";
  const settTitleContact = document.createElement('div');
  settTitleContact.className = "anketa-sett-title";
  settTitleContact.textContent = "Удобный вид связи*";
  const checkboxContainer = document.createElement('div');
  checkboxContainer.className = "checkbox-container-a";

  ['E-mail', 'WhatsApp', 'Telegram'].forEach((contact, index) => {
    const checkboxItem = document.createElement('div');
    checkboxItem.className = "checkbox-item-a";

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox-contact-a";
    checkbox.id = `option${index + 1}`;
    checkbox.name = `option${index + 1}`;

    let value; // Значение для каждого чекбокса
    switch (contact) {
      case 'E-mail':
        value = 'E-mail';
        checkbox.checked = true; // Устанавливаем по умолчанию
        break;
      case 'WhatsApp':
        value = 'номер';
        break;
      case 'Telegram':
        value = 'номер(+ник)';
        break;
      default:
        value = '';
    }

    checkbox.value = value;

    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = "checkbox-label-a";
    checkboxLabel.htmlFor = `option${index + 1}`;
    checkboxLabel.textContent = contact;

    checkboxItem.appendChild(checkbox);
    checkboxItem.appendChild(checkboxLabel);
    checkboxContainer.appendChild(checkboxItem);
  });


  requestSecondBlock.appendChild(settTitleContact);
  requestSecondBlock.appendChild(checkboxContainer);
  rowOne.appendChild(requestSecondBlock);
  requestDataDiv.appendChild(rowOne);

  //третяя колонка
  const requestTrethBlock = document.createElement('div');
  requestTrethBlock.className = "anketa-treth-block";
  const settTitleOutput = document.createElement('output');
  settTitleOutput.id = "sett-title-output-a";
  settTitleOutput.textContent = "E-mail";
  const contactsInput = document.createElement('input');
  contactsInput.type = "text";
  contactsInput.id = "contacts-input-a";
  contactsInput.name = "contacts-input";
  contactsInput.className = "module-input";
  // contactsInput.style.position = "absolute";
  contactsInput.style.maxWidth = "280px";
  // contactsInput.style.height = "60px";

  requestTrethBlock.appendChild(settTitleOutput);
  requestTrethBlock.appendChild(contactsInput);
  rowOne.appendChild(requestTrethBlock);

  // Второй ряд
  const rowTwo = document.createElement('div');
  rowTwo.className = "anketa-row-two";

  const btnDiv = document.createElement('div');
  btnDiv.className = "anketa-button-block";
  const requestButton = document.createElement('button');
  requestButton.className = "anketa-sent";
  requestButton.id = "anketa-sent";
  requestButton.textContent = "Отправить";

  // Обработка отправки формы для этой кнопки
  requestButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (sendData()) { // Если sendData возвращает true, закрываем форму
      setTimeout(() => {
        document.getElementById("anketaModal").style.display = 'none';
        document.body.style.overflow = "auto";
      }, 1000);
    }
  });

  btnDiv.appendChild(requestButton);
  rowTwo.appendChild(btnDiv);
  requestDataDiv.appendChild(rowTwo);

  form.appendChild(requestDataDiv);  // Добавляем в форму

  formContainer.appendChild(form); // Добавляем новую форму в контейнер

  // После добавления всех чекбоксов в форму, устанавливаем обработчики событий
  collectCheckedValues();
  document.querySelectorAll('.custom-checkbox-contact-a').forEach((checkbox) => {
    checkbox.addEventListener('change', collectCheckedValues);
  });

  formContainer.appendChild(form); // Добавляем новую форму в контейнер

  // Добавьте вашу функцию collectCheckedValues
  function collectCheckedValues() {
    let selectedValues = []; // Массив для хранения выбранных значений

    // Получаем все выбранные чекбоксы
    const checkedBoxes = document.querySelectorAll('.custom-checkbox-contact-a:checked');

    // Перебираем все выбранные чекбоксы и добавляем их значения в массив
    checkedBoxes.forEach((checkbox) => {
      selectedValues.push(checkbox.value);
    });

    // Преобразуем массив в строку, разделяя значения запятыми
    const selectedValuesString = selectedValues.join(', ');

    // Выводим строку в консоль
    //console.log(selectedValuesString);

    // Здесь я предполагаю, что нужно изменить значение элемента с id 'sett-title-output-a'
    const outputElement = document.getElementById('sett-title-output-a');
    if (outputElement) {
      outputElement.value = selectedValuesString;
    }

    return selectedValuesString;
  }

}

function sendData() {
  //console.log("Функция sendData вызвана");
  const form = document.getElementById("questionForm");

  if (!form) {
    console.error("Форма не найдена!");
    return;
  }

  const usernameInput = document.getElementById("username-input-a");
  const contactsInput = document.getElementById("contacts-input-a");

  let isValid = true; // Флаг валидации

  // Сбрасываем стили на дефолтные
  usernameInput.style.borderBottom = "1px solid #FFF";
  contactsInput.style.borderBottom = "1px solid #FFF";

  if (!usernameInput.value) {
    usernameInput.style.borderBottom = "1px solid red";
    isValid = false; // Отмечаем, что валидация не прошла
  }

  if (!contactsInput.value) {
    contactsInput.style.borderBottom = "1px solid red";
    isValid = false; // Отмечаем, что валидация не прошла
  }

  if (!isValid) {
    //console.log("Валидация не пройдена");
    return false; // Валидация не прошла
  }
  //console.log("Валидация пройдена, отправка данных...");


  // Ваш остальной код для обработки и отправки данных
  const formData = new FormData(form);

  const dataObj = {};
  formData.forEach((value, key) => {
    if (dataObj[key]) {
      if (!Array.isArray(dataObj[key])) {
        dataObj[key] = [dataObj[key]];
      }
      dataObj[key].push(value);
    } else {
      dataObj[key] = value;
    }
  });

  // Преобразование объекта данных в строку JSON
  const selectedValues = JSON.stringify(dataObj);

  //console.log("Будут отправлены следующие данные:", selectedValues);

  let typePost = "anketa15";
  let username = "";
  let contacts = "";
  let buttonId = "";

  sendInterviewRequestFormData(typePost, username, contacts, buttonId, selectedValues);


  return true; // Валидация и отправка прошли успешно
}
//========================================================================================
//Создание карусели для команды на мобильной версии
//========================================================================================
$(document).ready(function () {
  $(".members.owl-carousel").owlCarousel({
    loop: false, // Зацикливание карусели
    margin: 40, // Отступы между элементами
    center: false,
    items: 1.5,
    responsive: { // Адаптивность
      0: {
        items: 1 // Количество элементов при ширине экрана 0px и выше
      },
      480: {
        items: 2 // Количество элементов при ширине экрана 600px и выше
      },
      768: {
        items: 3 // Количество элементов при ширине экрана 1000px и выше
      }
    }
  });
});



//========================================================================================
//Создание поля выбора способа контакта собеседование (малая форма)
//========================================================================================

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
  //console.log(selectedValuesString);

  document.getElementById('sett-title-output-r').value = selectedValuesString;

  return selectedValuesString;
}

// Или при изменении состояния любого чекбокса
document.querySelectorAll('.custom-checkbox-contact-r').forEach((checkbox) => {
  checkbox.addEventListener('change', collectCheckedValues);
});

//========================================================================================
//Создание и отправка заявки на собеседование (малая форма)
//========================================================================================
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('request_small-main-request');

  submitButton.addEventListener('click', function () {
    const usernameInput = document.getElementById('username-input-main-request');
    const contactsInput = document.getElementById('contacts-input-main-request');
    const contactsChoose = document.getElementById('sett-title-output-r');

    // Проверяем валидность данных
    if (usernameInput && contactsInput) { // Проверяем, что элементы существуют
      // Удаляем класс 'invalid', если он уже был добавлен
      usernameInput.classList.remove('invalid');
      contactsInput.classList.remove('invalid');

      // Получаем значения
      const username = usernameInput.value;
      const contacts = contactsInput.value;

      let isValid = true;

      if (username === '') {
        usernameInput.classList.add('invalid');
        usernameInput.style.borderBottom = '2px solid red';
        isValid = false;
      }

      if (contacts === '') {
        contactsInput.classList.add('invalid');
        contactsInput.style.borderBottom = '2px solid red';
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Выводим данные в консоль
      console.log(`Username: ${username}, Contacts: ${contacts}`);

      usernameInput.value = '';
      contactsInput.value = '';
      contactsChoose.value = '-';


      // Здесь можно отправить эти данные куда-либо, например, на сервер
      let typePost = "interviewRequestMF";
      let initiatingButtonId = "mainForm";
      let selectedValues = collectCheckedValues(); // Теперь это массив выбранных чекбоксов
      console.log(`typePost: ${typePost}, Username: ${username}, Contacts: ${contacts}, buttonId: ${initiatingButtonId},selectedCheckboxes: ${selectedValues}`);
      sendInterviewRequestFormData(typePost, username, contacts, initiatingButtonId, selectedValues);

      document.querySelectorAll('.custom-checkbox-contact-r').forEach((checkbox) => {
        checkbox.checked = false;
      });

      thankYouMessageClone.style.display = 'block';

      setTimeout(function () {
        // Начинаем анимацию исчезновения
        thankYouMessageClone.classList.add('fade-out');
      }, 3000); // время в миллисекундах

      // Запускаем таймер на 10 секунд (10000 миллисекунд)
      setTimeout(function () {
        // Полностью скрываем блок "Спасибо" после окончания анимации
        thankYouMessageClone.style.display = 'none';
        thankYouMessageClone.classList.remove('fade-out'); // Удаляем класс, чтобы сбросить прозрачность
      }, 4000); // время в миллисекундах


      // Здесь добавьте код для отправки данных на сервер
      // let selectedCheckboxes = []; // Пустой массив для хранения значений выбранных чекбоксов
      // document.querySelectorAll('.custom-checkbox-contact-r:checked').forEach((checkbox) => {
      //   selectedCheckboxes.push(checkbox.value);
      // });




    } else {
      console.log("Elements not found");
    }
  });
});
//========================================================================================
//Клонирование Сообщение с благодарностью об отправки заявки
//========================================================================================

const thankYouMessageOriginal = document.getElementById('thank-you-message');
const thankYouMessageClone = thankYouMessageOriginal.cloneNode(true); // true означает глубокое клонирование, включая дочерние элементы
thankYouMessageClone.id = 'thank-you-message';
thankYouMessageClone.style.width = '847px';
thankYouMessageClone.style.height = '325px';
thankYouMessageClone.style.zIndex = '3';
thankYouMessageClone.style.top = '0px';
thankYouMessageClone.style.left = '0px';
// document.querySelector('.thank-you-message').appendChild(thankYouMessageClone);
thankYouMessageClone.id = 'small-form-requrst-thank-you-message'; // измените ID, чтобы избежать конфликта идентификаторов
document.querySelector('.request-form').appendChild(thankYouMessageClone); // '.some-container' — это селектор контейнера, в который вы хотите вставить новый блок


//========================================================================================
//Динамическое создание Вопросы-Ответы
//========================================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Загрузка JSON файла при загрузке страницы
  fetch('faq.json')
    .then(response => response.json())
    .then(data => createFAQ(data.questions))
    .catch(error => console.error('Ошибка загрузки данных:', error));
});

function createFAQ(questionsData) {
  const faqContainer = document.getElementById('faqContainer');

  questionsData.forEach((question, index) => {
    // Создаем контейнер для вопроса и иконки
    const questionContainer = document.createElement('div');
    questionContainer.className = "faq-question-container";

    // Создаем кнопку для вопроса
    const questionButton = document.createElement('button');
    // questionButton.textContent = question.text; //добавляем  h4 (ниже)
    questionButton.className = "faq-question";
    questionButton.style.textDecoration = "underline";
    questionButton.style.textDecorationStyle = "dotted";

    // Создаем элемент h4 для текста вопроса и добавляем его в кнопку
    const questionText = document.createElement('h4');
    questionText.textContent = question.text;
    questionButton.appendChild(questionText);  // Добавляем текст вопроса внутрь h4, а затем h4 в кнопку

    // Проверка, содержит ли `answer` текст для создания якоря
    if (question.answer.includes("Настроить под себя")) {
      question.answer = createAnchorFromText(question.answer, "program-request", "Настроить под себя");
    }

    // Создаем контейнер для SVG иконок
    const iconContainer = document.createElement('span');
    iconContainer.className = "icon-container";

    // SVG для крестика
    const closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // (Добавьте атрибуты и элементы для вашего SVG крестика)
    closeIcon.setAttribute("width", "24");
    closeIcon.setAttribute("height", "24");
    const closePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    closePath.setAttribute("d", "M12 7 L12 17 M7 12 L17 12");
    closePath.setAttribute("stroke", "#9C8F8B");
    closePath.setAttribute("stroke-width", "1");
    closePath.setAttribute("stroke-linecap", "round");
    closeIcon.appendChild(closePath);
    closeIcon.style.display = "block";

    // SVG для палки
    const openIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // (Добавьте атрибуты и элементы для вашего SVG палки)
    openIcon.setAttribute("width", "24");
    openIcon.setAttribute("height", "24");
    const openPath = document.createElementNS("http://www.w3.org/2000/svg", "line");
    openPath.setAttribute("x1", "7");
    openPath.setAttribute("y1", "12");
    openPath.setAttribute("x2", "17");
    openPath.setAttribute("y2", "12");
    openPath.setAttribute("stroke", "#0D4C47");
    openPath.setAttribute("stroke-width", "1");
    openPath.setAttribute("stroke-opacity", "0.5");
    openPath.setAttribute("stroke-linecap", "round");
    openIcon.appendChild(openPath);
    openIcon.style.display = "none";

    // Добавляем SVG иконки в контейнер
    iconContainer.appendChild(closeIcon);
    iconContainer.appendChild(openIcon);

    // Добавляем кнопку и SVG иконки в контейнер
    questionContainer.appendChild(questionButton);
    questionContainer.appendChild(iconContainer);

    // Создаем div для ответа
    // const answerDiv = document.createElement('div');
    // answerDiv.textContent = question.answer;
    // answerDiv.className = "faq-answer";
    // answerDiv.style.display = "none";

    const answerDiv = document.createElement('div');
    answerDiv.innerHTML = question.answer; // Изменено с textContent на innerHTML
    answerDiv.className = "faq-answer";
    answerDiv.style.display = "none";

    // Функция для переключения видимости ответа и иконок
    const toggleAnswer = function () {
      if (answerDiv.style.display === "none") {
        answerDiv.style.display = "block";
        closeIcon.style.display = "none";
        openIcon.style.display = "block";
        questionContainer.style.backgroundColor = '#EDF5F5';  // Меняем фон 
        questionButton.style.textDecoration = '';
        questionButton.style.textDecorationStyle = '';
      } else {
        answerDiv.style.display = "none";
        closeIcon.style.display = "block";
        openIcon.style.display = "none";
        questionContainer.style.backgroundColor = '';  // Сбрасываем фон 
        questionButton.style.textDecoration = 'underline';
        questionButton.style.textDecorationStyle = 'dotted';

      }
    };

    // Добавляем событие клика для кнопки и иконки
    questionButton.addEventListener("click", toggleAnswer);
    iconContainer.addEventListener("click", toggleAnswer);

    // Добавляем контейнер вопроса и ответ в главный контейнер
    faqContainer.appendChild(questionContainer);
    faqContainer.appendChild(answerDiv);
  });
}
// Функция для замены названия кнопки на якорную ссылку
function createAnchorFromText(text, buttonId, buttonText) {
  const anchorHtml = `<a href="#${buttonId}" style="text-decoration: underline;">${buttonText}</a>`;
  return text.replace(buttonText, anchorHtml);
}


/* =================================================================================================== */
/*  Мобильная форма заяки на соебеование (та которая появляется поверх всего в двух местах на сайте) */
/* ================================================================================================== */

function openRequestFormModal(buttonId) {
  const modal = document.createElement('div');
  modal.className = 'request-form-modal';
  const modalContent = document.createElement('div');
  modalContent.className = 'request-form-modal-content';
  modal.appendChild(modalContent);

  const requestForm = createRequestForm(buttonId);
  modalContent.appendChild(requestForm);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
  modal.style.display = 'block';

  // Вызываем эту функцию теперь, после того как модальная форма добавлена в DOM
  addCheckboxListeners('custom-checkbox-contact-m', 'sett-title-output-m');
}

document.querySelectorAll('.open-request-form-button').forEach(button => {
  button.addEventListener('click', function () {
    openRequestFormModal(this.id);
  });
});

let selectedValues = [];

function createRequestForm(initiatingButtonId) {
  // Create root div
  const rootDiv = document.createElement('div');
  rootDiv.className = 'request-form-m';

  // Create background div
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'request-background-m';



  // Create image
  const img = document.createElement('img');
  img.className = 'request-img-m';
  img.src = '/img/lists.png';
  img.alt = 'request';
  rootDiv.appendChild(img);
  rootDiv.appendChild(backgroundDiv);



  // Create text div
  const textDiv = document.createElement('div');
  textDiv.className = 'request-text';
  textDiv.textContent = 'Запишись на собеседование';
  rootDiv.appendChild(textDiv);

  // Create client data div
  const clientDataDiv = document.createElement('div');
  clientDataDiv.className = 'request-client-data-m';
  rootDiv.appendChild(clientDataDiv);

  // Create row-one
  const rowOne = document.createElement('div');
  rowOne.className = 'row-one-m';
  clientDataDiv.appendChild(rowOne);

  // Create first block in row-one
  const firstBlock1 = createInputBlock('Ваше имя*', 'username-input-m', 'text');
  rowOne.appendChild(firstBlock1);

  // Create second block in row-one
  const secondBlock1 = createCheckboxBlock();
  rowOne.appendChild(secondBlock1);

  // Добавляем обработчики к только что созданным чекбоксам
  addCheckboxListeners('custom-checkbox-contact-m', 'sett-title-output-m');


  // Create row-two
  const rowTwo = document.createElement('div');
  rowTwo.className = 'row-two-m';
  clientDataDiv.appendChild(rowTwo);

  // Create first block in row-two
  const firstBlock2 = document.createElement('div');
  firstBlock2.className = 'request-first-block-m';
  const output = document.createElement('output');
  output.id = 'sett-title-output-m';
  output.textContent = '-';
  firstBlock2.appendChild(output);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'contacts-input-m';
  input.name = 'contacts-input-m';
  input.className = 'module-input';
  input.style.position = 'absolute';
  // input.style.width = '500px';
  input.style.top = '60px';
  firstBlock2.appendChild(input);

  rowTwo.appendChild(firstBlock2);

  // Create second block in row-two
  const secondBlock2 = document.createElement('div');
  secondBlock2.className = 'request-second-block-m-btn';
  const button = document.createElement('button');
  button.className = 'request-m';
  button.id = 'request_small-m';
  button.textContent = 'Записаться';

  // Добавляем обработчик события
  button.addEventListener('click', function () {
    const usernameInput = document.getElementById('username-input-m');
    const contactsInput = document.getElementById('contacts-input-m');

    const username = usernameInput.value.trim();
    const contacts = contactsInput.value.trim();

    let isValid = true;

    // Удаляем старые стили подсветки, если они есть
    usernameInput.style.borderBottom = '1px solid white';
    contactsInput.style.borderBottom = '1px solid white';

    if (username === '') {
      usernameInput.style.borderBottom = '2px solid red';
      isValid = false;
    }

    if (contacts === '') {
      contactsInput.style.borderBottom = '2px solid red';
      isValid = false;
    }

    if (!isValid) return; // Выйти из функции, если одно из полей пусто

    // Здесь можно отправить эти данные куда-либо, например, на сервер
    let typePost = "interviewRequest";
    // let buttonId = this.id;

    //console.log(`typePost: ${typePost}, Username: ${username}, Contacts: ${contacts}, buttonId: ${initiatingButtonId},selectedCheckboxes: ${selectedValues}`);
    sendInterviewRequestFormData(typePost, username, contacts, initiatingButtonId, selectedValues);

    // Закрыть модальное окно
    document.querySelector('.request-form-modal').remove();

    // Показать блок с уведомлением
    const notification = document.createElement('div');
    notification.className = 'notification';

    const notificationBackground = document.createElement('div');
    notificationBackground.className = 'notification-background';

    const notificationMessage = document.createElement('div');
    notificationMessage.className = 'notification-message';
    notificationMessage.innerHTML = 'Спасибо за запрос! <br> Мы скоро свяжемся с вами.';


    // notification.style.position = 'fixed';
    // notification.style.top = '50%';
    // notification.style.left = '50%';
    // notification.style.transform = 'translate(-50%, -50%)';
    // notification.style.backgroundColor = 'white';
    // notification.style.padding = '20px';


    document.body.appendChild(notification);
    notification.appendChild(notificationBackground)
    notification.appendChild(notificationMessage)

    // Удалить блок с уведомлением через 1 секунду
    setTimeout(function () {
      notification.classList.add('fade-out');
      setTimeout(function () {
        notification.remove();
      }, 1000);
    }, 1000);

  });


  secondBlock2.appendChild(button);
  rowTwo.appendChild(secondBlock2);

  return rootDiv;

}
//функция отправки формы заявки на собеседование

async function sendInterviewRequestFormData(typePost, username, contacts, buttonId, selectedValues) {

  // Включаем новые данные в тело запроса
  const requestBody = {
    type: typePost,
    username: username,
    contacts: contacts,
    buttonId: buttonId,
    selectedCheckboxes: selectedValues  // Массив выбранных значений чекбоксов
  };


  try {
    const response = await fetch('sent_reqest_to_email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    // Здесь можно добавить логику обработки успешного ответа, например:
    //console.log('Data received:', data);
    //alert('Ваши данные успешно отправлены.');

  } catch (error) {
    console.error('Error during fetch operation:', error);

    // Вывод сообщения об ошибке пользователю
    alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');

    // Тут можно добавить логику отправки ошибки на сервер для анализа, если это необходимо
  }
}


// реализация отслеживания выбранных чекбоксов

function addCheckboxListeners(className, outputElementId) {
  document.querySelectorAll(`.${className}`).forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      selectedValues = [];

      const checkedBoxes = document.querySelectorAll(`.${className}:checked`);

      checkedBoxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
      });

      //const selectedValuesString = selectedValues.join(', ');

      document.getElementById(outputElementId).value = selectedValues.join(', ');

      // return selectedValues;
    });
  });
}

function createInputBlock(title, id, type) {
  const block = document.createElement('div');
  block.className = 'request-first-block-m';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'sett-title';
  titleDiv.textContent = title;
  block.appendChild(titleDiv);

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  input.className = 'module-input-m';
  block.appendChild(input);

  return block;
}

function createCheckboxBlock() {
  const block = document.createElement('div');
  block.className = 'request-second-block-m';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'sett-title-m';
  titleDiv.textContent = 'Удобный вид связи*';
  block.appendChild(titleDiv);

  const container = document.createElement('div');
  container.className = 'checkbox-container-m';

  const options = [
    { id: 'option1', value: 'E-mail', label: 'E-mail' },
    { id: 'option2', value: 'номер', label: 'WhatsApp' },
    { id: 'option3', value: 'ник(+номер)', label: 'Telegram' },
  ];

  options.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'checkbox-item-m';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox-contact-m';
    checkbox.id = opt.id;
    checkbox.name = opt.id;
    checkbox.value = opt.value;
    item.appendChild(checkbox);

    const label = document.createElement('label');
    label.className = 'checkbox-label-m';
    label.setAttribute('for', opt.id);
    label.textContent = opt.label;
    item.appendChild(label);

    container.appendChild(item);
  });

  block.appendChild(container);

  return block;


}

// // 1. Отправляем запрос на сервер для получения информации о стране пользователя

// Глобальная переменная для хранения страны пользователя
let userCountryGlobal = null;

fetch('/get-user-country.php') // Здесь '/get-user-country' - это адрес вашего сервера для определения страны пользователя
  .then(response => response.json())
  .then(data => {
    // 2. После получения информации о стране, используем ее для выбора соответствующей контактной информации
    //const userCountry = data.country; // Предположим, что сервер возвращает страну в формате ISO 3166-1 Alpha-2 (например, "US", "UK")
    userCountryGlobal = data.country;

    const contactsByCountry = {
      RUS: {
        company_name: "ИП Романовская И.В.",
        numbers: "ИНН: 421409221318, ОГРНИП 320784700298867",
        address: '346550, РОССИЯ, обл РОСТОВСКАЯ,',
        contacts: 'mail@superday.one',
      },
      KZ: {
        company_name: "TOO Point B",
        numbers: "БИН 221140016750",
        address: 'Казахстан, Алматинская область',
        contacts: 'mail@pointb.ltd',
      },
      OTHER: {
        company_name: "TOO Point B",
        numbers: "БИН 221140016750",
        address: 'Казахстан, Алматинская область',
        contacts: 'mail@pointb.ltd',
      },
      // Добавьте контактную информацию для других стран
    };

    // 3. Вставляем контактную информацию на страницу
    const contactInfo = contactsByCountry[userCountryGlobal] || contactsByCountry['RUS']; // Если страны пользователя нет в списке, используем данные для RUS
    if (contactInfo) {
      const addressElement = document.getElementById('address');
      const numbersElement = document.getElementById('numbers');
      const companyNameElement = document.getElementById('company_name');
      const contactsElement = document.getElementById('contacts_email');

      companyNameElement.textContent = contactInfo.company_name;
      numbersElement.textContent = contactInfo.numbers;
      addressElement.textContent = contactInfo.address;
      contactsElement.textContent = contactInfo.contacts;
    } else {
      // Если информации о стране пользователя нет в списке, обработайте эту ситуацию
      console.error('Информация о стране пользователя не найдена.');
    }
  })
  .catch(error => {
    console.error('Ошибка при получении информации о стране пользователя:', error);

    const ruscontactInfo = contactsByCountry['RUS']; // Используем данные для RUS при ошибке
    if (ruscontactInfo) {
      const addressElement = document.getElementById('address');
      const numbersElement = document.getElementById('numbers');
      const companyNameElement = document.getElementById('company_name');
      const contactsElement = document.getElementById('contacts');

      companyNameElement.textContent = ruscontactInfo.company_name;
      numbersElement.textContent = ruscontactInfo.numbers;
      addressElement.textContent = ruscontactInfo.address;
      contactsElement.textContent = ruscontactInfo.contacts;
    } else {
      // Если информации о стране пользователя нет в списке, обработайте эту ситуацию
      console.error('Информация о стране пользователя не найдена.');
    }
  });

// Получение модального окна
var termsModal = document.getElementById("termsModal");
var privacyModal = document.getElementById("privacyModal");

// Получение кнопки, открывающей модальное окно
var termsLink = document.querySelector("a[href='/terms-and-conditions.html']");
var privacyLink = document.querySelector("a[href='/privacy-policy.html']");

var termsLinkT = document.querySelector("a[href='/terms-and--conditions.html']");
var privacyLinkT = document.querySelector("a[href='/privacy--policy.html']");

// Получение элемента <span>, который закрывает модальное окно
var spans = document.getElementsByClassName("close-term");

// Когда пользователь кликает на ссылку, открыть модальное окно
// termsLink.onclick = function(event) {
//     event.preventDefault(); // Предотвращение перехода по ссылке
//     loadDocument('terms-and-conditions.html', 'termsText');
//     termsModal.style.display = "block";
// }

termsLink.onclick = function(event) {
  event.preventDefault();
  if (userCountryGlobal === 'RUS') {
      loadDocument('terms-and-conditions.html', 'termsText');
      termsModal.style.display = "block";
  }
}

// privacyLink.onclick = function(event) {
//     event.preventDefault(); // Предотвращение перехода по ссылке
//     loadDocument('privacy-policy.html', 'privacyText');
//     privacyModal.style.display = "block";
// }

privacyLink.onclick = function(event) {
  event.preventDefault();
  if (userCountryGlobal === 'RUS') {
      loadDocument('privacy-policy.html', 'privacyText');
      privacyModal.style.display = "block";
  }
}

termsLink.onclick = function(event) {
  event.preventDefault();
  if (userCountryGlobal !== 'RUS') {
      loadDocument('terms-and--conditions.html', 'termsText');
      termsModal.style.display = "block";
  }
}

privacyLink.onclick = function(event) {
  event.preventDefault();
  if (userCountryGlobal !== 'RUS') {
      loadDocument('privacy--policy.html', 'privacyText');
      privacyModal.style.display = "block";
  }
}


// Когда пользователь кликает на <span> (x), закрыть модальное окно
for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        termsModal.style.display = "none";
        privacyModal.style.display = "none";
    }
}

// Загрузка содержимого документа в модальное окно
function loadDocument(url, elementId) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById(elementId).innerHTML = xhr.responseText;
        } else {
            console.error('Ошибка загрузки документа: ', xhr.statusText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

// Когда пользователь кликает в любом месте за пределами модального окна, закрыть его
window.onclick = function(event) {
    if (event.target == termsModal || event.target == privacyModal) {
        termsModal.style.display = "none";
        privacyModal.style.display = "none";
    }
}
// Получение кнопки "Принять" для Политики конфиденциальности
var acceptPrivacyBtn = document.getElementById("acceptPrivacy");

// Действие при нажатии на кнопку "Принять"
acceptPrivacyBtn.onclick = function() {
    console.log("Пользователь принял Политику конфиденциальности"); // Пример действия: вывод в консоль
    privacyModal.style.display = "none"; // Закрыть модальное окно

    // Здесь можно добавить дополнительный код, например, для сохранения состояния согласия пользователя
}
// Получение кнопки "Принять" для Условий использования
var acceptTermsBtn = document.getElementById("acceptTerms");

// Действие при нажатии на кнопку "Принять"
acceptTermsBtn.onclick = function() {
    console.log("Пользователь принял Условия использования"); // Пример действия: вывод в консоль
    termsModal.style.display = "none"; // Закрыть модальное окно

    // Здесь можно добавить дополнительный код, например, для сохранения состояния согласия пользователя
}
