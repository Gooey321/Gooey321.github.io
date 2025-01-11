// Main game logic function
function myfunc() {
  // Retrieve cell values
  let b1 = document.querySelector("#b1 input").value;
  let b2 = document.querySelector("#b2 input").value;
  let b3 = document.querySelector("#b3 input").value;
  let b4 = document.querySelector("#b4 input").value;
  let b5 = document.querySelector("#b5 input").value;
  let b6 = document.querySelector("#b6 input").value;
  let b7 = document.querySelector("#b7 input").value;
  let b8 = document.querySelector("#b8 input").value;
  let b9 = document.querySelector("#b9 input").value;

  // Winning combinations
  const wins = [
    [b1, b2, b3],
    [b4, b5, b6],
    [b7, b8, b9],
    [b1, b4, b7],
    [b2, b5, b8],
    [b3, b6, b9],
    [b1, b5, b9],
    [b3, b5, b7],
  ];

  // Check for winner
  for (let combo of wins) {
    if (combo.every((val) => val === "X")) {
      document.getElementById("print").innerHTML = "Player X won";
      highlightWinningCells(combo);
      disableAllCells();
      return;
    }
    if (combo.every((val) => val === "0")) {
      document.getElementById("print").innerHTML = "Player 0 won";
      highlightWinningCells(combo);
      disableAllCells();
      return;
    }
  }

  // Check for tie
  if (
    [b1, b2, b3, b4, b5, b6, b7, b8, b9].every(
      (val) => val === "X" || val === "0"
    )
  ) {
    document.getElementById("print").innerHTML = "It's a tie";
    disableAllCells();
  }

  updateUI();

  checkRadioactive();

  turnCounter++;
}

// Function to highlight winning cells
function highlightWinningCells(combo) {
  for (let i = 1; i <= 9; i++) {
    let cellValue = document.querySelector(`#b${i} input`).value;
    if (combo.includes(cellValue)) {
      document.querySelector(`#b${i} input`).style.color = "red";
    }
  }
}

// Function to disable all cells
function disableAllCells() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`b${i}`).onclick = null;
  }
}

// Function to reset game
function myfunc_2() {
  location.reload();
}

// Game variables
let flag = 1;
let bombXCount = 0;
let bomb0Count = 0;
let turnCounter = 0;
let radioactiveRows = [];
let radioactiveColumns = [];
let radiationMap = {};
let modalResolve = null;

// Bomb usage function
async function useBomb(player) {
  const bombUsed = await clearRowOrColumn();
  if (bombUsed) {
    if (player === "X" && bombXCount < 2) {
      bombXCount++;
      console.log("Player X Bomb Count:", bombXCount);
    } else if (player === "0" && bomb0Count < 2) {
      bomb0Count++;
      console.log("Player 0 Bomb Count:", bomb0Count);
    }
    // Switch to the next player
    flag = flag === 1 ? 0 : 1;
    turnCounter++;
  } else {
    console.log("Bomb placement was canceled or failed.");
  }
  updateUI();
}

// Function to clear row or column
function clearRowOrColumn() {
  document.getElementById("bombModal").style.display = "block";
  return new Promise((resolve) => {
    modalResolve = resolve;
  });
}

function closeModal() {
  document.getElementById("bombModal").style.display = "none";
}

function confirmBomb() {
  const choice = document.getElementById("bombChoice").value;
  const num = parseInt(document.getElementById("bombNumber").value);

  if (choice && num >= 1 && num <= 3) {
    if (choice === "row") {
      clearRow(num);
    } else if (choice === "column") {
      clearColumn(num);
    }
    modalResolve(true);
    closeModal();
  } else {
    alert("Please select a valid row/column and number.");
  }
}

// Function to set radioactive cells
function setRadioactive(row = null, column = null) {
  if (row !== null) {
    for (let i = 1; i <= 3; i++) {
      let index = (row - 1) * 3 + i;
      const cell = document.getElementById(`b${index}`);
      cell.classList.remove("normal");
      cell.classList.add("radioactive");
    }
    radioactiveRows.push({ row: row, turn: turnCounter });
  }

  if (column !== null) {
    for (let i = 0; i < 3; i++) {
      let index = column + i * 3;
      const cell = document.getElementById(`b${index}`);
      cell.classList.remove("normal");
      cell.classList.add("radioactive");
    }
    radioactiveColumns.push({ column: column, turn: turnCounter });
  }
}

// Function to clear a row
function clearRow(row) {
  for (let i = 1; i <= 3; i++) {
    let index = (row - 1) * 3 + i;
    const cellDiv = document.getElementById(`b${index}`);
    const cellId = `b${index}`;

    document.querySelector(`#b${index} input`).value = "";

    cellDiv.onclick = function () {
      window[`myfunc_${index + 2}`]();
      myfunc();
    };

    cellDiv.classList.add("radioactive");
    cellDiv.classList.remove("normal");

    if (!radiationMap[`b${index}`]) {
      radiationMap[`b${index}`] = [];
    }
    radiationMap[cellId].push({
      decayTurn: turnCounter + 2,
    });
  }
  radioactiveRows.push({ row: row, turn: turnCounter });
}

// Function to clear a column
function clearColumn(column) {
  for (let i = 0; i < 3; i++) {
    let index = column + i * 3;
    const cellDiv = document.getElementById(`b${index}`);
    const cellId = `b${index}`;

    document.querySelector(`#b${index} input`).value = "";
    cellDiv.onclick = function () {
      window[`myfunc_${index + 2}`]();
      myfunc();
    };
    cellDiv.classList.add("radioactive");
    cellDiv.classList.remove("normal");

    if (!radiationMap[`b${index}`]) {
      radiationMap[`b${index}`] = [];
    }
    radiationMap[cellId].push({
      decayTurn: turnCounter + 2,
    });
  }
  radioactiveColumns.push({ column: column, turn: turnCounter });
}

// Function to check radioactive cells
function checkRadioactive() {
  console.log(`Turn counter: ${turnCounter}`);
  console.log(`radiation map:`, JSON.stringify(radiationMap, null, 2));
  for (let cellId in radiationMap) {
    radiationMap[cellId] = radiationMap[cellId].filter(
      (radiation) => radiation.decayTurn > turnCounter
    );

    // If no active radiation remains, remove 'radioactive' class
    if (radiationMap[cellId].length === 0) {
      const cell = document.getElementById(cellId);
      cell.classList.remove("radioactive");
      cell.classList.add("normal");
      delete radiationMap[cellId];
    }
  }
}

function cancelBomb() {
  modalResolve(false);
  closeModal();
}

// Function to update UI elements
function updateUI() {
  document.getElementById("bombX").disabled = flag !== 1 || bombXCount >= 2;
  document.getElementById("bomb0").disabled = flag !== 0 || bomb0Count >= 2;
  document.getElementById("bomb0Count").innerHTML = 2 - bomb0Count;
  document.getElementById("bombXCount").innerHTML = 2 - bombXCount;
}

// Functions for each cell click
function myfunc_3() {
  handleCellClick(1, 1, "b1", "myfunc_3");
}

function myfunc_4() {
  handleCellClick(1, 2, "b2", "myfunc_4");
}

function myfunc_5() {
  handleCellClick(1, 3, "b3", "myfunc_5");
}

function myfunc_6() {
  handleCellClick(2, 1, "b4", "myfunc_6");
}

function myfunc_7() {
  handleCellClick(2, 2, "b5", "myfunc_7");
}

function myfunc_8() {
  handleCellClick(2, 3, "b6", "myfunc_8");
}

function myfunc_9() {
  handleCellClick(3, 1, "b7", "myfunc_9");
}

function myfunc_10() {
  handleCellClick(3, 2, "b8", "myfunc_10");
}

function myfunc_11() {
  handleCellClick(3, 3, "b9", "myfunc_11");
}

// General function for handling cell clicks
function handleCellClick(row, col, cellId, funcName) {
  if (radiationMap[cellId] && radiationMap[cellId].length > 0) {
    alert("This field is radioactive, you can't play here");
    return;
  }

  // Set the value inside the input
  if (flag === 1) {
    document.querySelector(`#${cellId} input`).value = "X";
    flag = 0;
  } else {
    document.querySelector(`#${cellId} input`).value = "0";
    flag = 1;
  }

  // Disable the cell by removing the onclick handler
  document.getElementById(cellId).onclick = null;

  myfunc();
  updateUI();
}
