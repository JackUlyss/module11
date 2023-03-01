// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const maxWeightInput = document.querySelector('.maxweight__input');
const minWeightInput = document.querySelector('.minweight__input');
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  
  if (document.querySelector("li") !== null) {
    let liList = document.querySelectorAll("li")
    for (let i = 0; i < liList.length; i++) {
      let oldLi = document.querySelector('li')
      fruitsList.removeChild(oldLi)
    }
  }

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    let newLi = document.createElement('li')

    newLi.innerHTML = `
      <div class=\"fruit__info\">
      <div>index: ${i}</div>
      <div>kind: ${fruits[i].kind}</div>
      <div>color: ${fruits[i].color}</div>
      <div>weight (кг):${fruits[i].weight}</div>
      </div>`

    newLi.classList.add('fruit__item')

    switch (fruits[i].color) {
      case 'фиолетовый':
        newLi.classList.add('fruit_violet');
        break;
      case 'зеленый': 
        newLi.classList.add('fruit_green');
        break;
      case 'розово-красный': 
        newLi.classList.add('fruit_carmazin');
        break;
      case 'желтый': 
        newLi.classList.add('fruit_yellow');
        break;
      case 'светло-коричневый': 
        newLi.classList.add('fruit_lightbrown');
        break;
      default: 
        newLi.classList.add('fruit_gray');
        break;
    }
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    fruitsList.appendChild(newLi)
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let copyFruits = fruits.slice()

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randomNumber = getRandomInt(0, fruits.length - 1)
    let currentFruits = fruits[randomNumber] 
    result.push(currentFruits)
    fruits.splice(randomNumber, 1)
    if (JSON.stringify(result) === JSON.stringify(copyFruits)) {
      alert('Данные не перемешались')
    }
  }

  if (JSON.stringify(result) === JSON.stringify(copyFruits)) {
    alert('Данные не перемешались')
  }
  
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter((item, i) => {
    item = fruits[i].weight
    return item >= minWeightInput.value && item <= maxWeightInput.value
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['розово-красный', 'светло-коричневый', 'желтый', 'зеленый', 'фиолетовый']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-1-i; j++) {
        if (comparation(arr[j], arr[j+1])) {
          [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function swap(arr, fI, fS){
      [arr[fI], arr[fS]] = [arr[fS], arr[fI]] 
    }

    function partition(arr, left, right) {
      let pivot = Math.floor((left + right) / 2),
          i = left,
          j = right;
      while (i <= j) {
        while (comparation(arr[pivot], arr[i])) {
          i++;
        }
        while (comparation(arr[j], arr[pivot])) {
          j--;
        }
        if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
        }
      }
      return i;
    }

    function quickSortHelper (arr, left, right) {
      let index;
      if (arr.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? arr.length-1 : right;
        index = partition(arr, left, right);
        if (left < index - 1) {
          quickSortHelper(arr, left, index - 1);
        }
        if (index < right) {
          quickSortHelper(arr, index, right);
        }
      }
      return arr
    }  
    quickSortHelper (arr)
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
  sortKind = 'quickSort'
  sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort'
    sortKindLabel.textContent = sortKind;
  }

});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...'; 
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let kind = kindInput.value;
  let color = colorInput.value;
  let weight = weightInput.value;

  if (kind.length > 0 && color.length > 0 && weight.length > 0) {

    fruits.push ({kind: `${kind}`, color: `${color}`, weight: `${weight}`})

  } else {

    alert('Фрукт не добавлен: одно из полей пустое.')

  }
  
  display();
});
