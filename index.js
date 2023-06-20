// Função para criar uma tabela de bingo com tamanho 5x5 e as colunas específicas
function createBingoTable(name) {
  const table = document.createElement('table');
  table.classList.add('bingo-table');

  const column1 = getRandomNonRepeatingNumbers(1, 15, 5);
  const column2 = getRandomNonRepeatingNumbers(16, 30, 5);
  const column3 = getRandomNonRepeatingNumbers(31, 45, 5);
  const column4 = getRandomNonRepeatingNumbers(46, 60, 5);
  const column5 = getRandomNonRepeatingNumbers(61, 75, 5);

  const numbers = mergeColumns(column1, column2, column3, column4, column5);
  numbers.splice(12, 1, 'X'); // Substituir o número 13 (correspondente à célula central) por "X"

  for (let row = 0; row < 5; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 5; col++) {
      const td = document.createElement('td');
      td.textContent = numbers[row * 5 + col];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  const caption = document.createElement('caption');
  caption.textContent = name;
  table.appendChild(caption);

  return table;
}

// Função para mesclar as colunas de números em uma única array
function mergeColumns(...columns) {
  const merged = [];
  for (let i = 0; i < columns[0].length; i++) {
    for (let j = 0; j < columns.length; j++) {
      merged.push(columns[j][i]);
    }
  }
  return merged;
}

// Função para gerar números aleatórios em um intervalo, com quantidade específica
function getRandomNumbers(min, max, count) {
  const numbers = [];
  while (numbers.length < count) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(number);
  }
  return numbers;
}

// Função para gerar números aleatórios não repetidos em um intervalo, com quantidade específica
function getRandomNonRepeatingNumbers(min, max, count) {
  if (count > max - min + 1) {
    throw new Error('O intervalo não possui números suficientes para a quantidade solicitada');
  }

  const numbers = new Set();
  while (numbers.size < count) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(number);
  }
  return Array.from(numbers);
}

// Função para verificar se a tabela está completa
function checkBingo(card) {
  const cells = card.getElementsByClassName('selected');
  return cells.length === 24;
}

// Função para sortear um número
function drawNumber() {
  const drawnNumbersContainer = document.getElementById('drawnNumbers');
  const drawnNumber = document.createElement('div');
  drawnNumber.classList.add('drawn-number');

  let number;
  do {
    number = getUniqueRandomNumber(1, 75);
  } while (drawnNumbers.has(number));

  drawnNumbers.add(number);
  drawnNumber.textContent = number;

  drawnNumbersContainer.appendChild(drawnNumber);

  markNumber(number);
}

// Função para gerar um número aleatório não repetido em um intervalo
function getUniqueRandomNumber(min, max) {
  if (drawnNumbers.size === (max - min + 1)) {
    throw new Error('Todos os números foram sorteados');
  }

  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (drawnNumbers.has(number));

  return number;
}

// Função para pintar um número na tabela de bingo
function markNumber(number) {
  const bingoCards = document.getElementsByClassName('bingo-card');
  for (let card of bingoCards) {
    const cells = card.getElementsByTagName('td');
    for (let cell of cells) {
      if (cell.textContent == number) {
        cell.classList.add('selected');
        break;
      }
    }

    // Verificar se a tabela está completa
    if (checkBingo(card)) {
      card.classList.add('bingo-complete');
    }
  }
}

// Variável para armazenar os números sorteados
const drawnNumbers = new Set();

// Adicionando os eventos aos botões
const drawButton = document.getElementById('drawButton');
drawButton.addEventListener('click', drawNumber);

const automaticDrawButton = document.getElementById('automaticDrawButton');
automaticDrawButton.addEventListener('click', toggleAutomaticDraw);

let automaticDrawInterval;
let automaticDrawActive = false;

// Função para alternar o sorteio automático
function toggleAutomaticDraw() {
  const automaticDrawButton = document.getElementById('automaticDrawButton');
  if (automaticDrawActive) {
    clearInterval(automaticDrawInterval);
    automaticDrawActive = false;
    automaticDrawButton.classList.remove('draw-off');
    automaticDrawButton.classList.add('draw-on');
  } else {
    automaticDrawInterval = setInterval(drawNumber, 1000);
    automaticDrawActive = true;
    automaticDrawButton.classList.remove('draw-on');
    automaticDrawButton.classList.add('draw-off');
  }
}

// Função para adicionar uma tabela de bingo à página
function addBingoCard() {
  const container = document.getElementById('bingoCardContainer');
  const bingoCard = document.createElement('div');
  bingoCard.classList.add('bingo-card');

  const bingoCardName = document.createElement('h2');
  bingoCardName.classList.add('bingo-card-name');
  const name = prompt('Digite o nome da tabela de bingo:');
  bingoCardName.textContent = name ? name : 'Tabela ' + (container.children.length + 1);

  const table = createBingoTable(bingoCardName.textContent);

  bingoCard.appendChild(bingoCardName);
  bingoCard.appendChild(table);
  container.appendChild(bingoCard);
}

// Evento de clique do botão para adicionar tabela de bingo
const addBingoCardButton = document.getElementById('addBingoCardButton');
addBingoCardButton.addEventListener('click', addBingoCard);
