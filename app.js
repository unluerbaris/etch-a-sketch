const container = document.querySelector(".container");
const resetButton = document.querySelector(".resetButton");

const startGridSize = 16; // 16x16 grid
let currentGridSize = startGridSize;
createNewGrid(currentGridSize); // Create new grid with fixed starting size

resetButton.addEventListener("click", reset);

// createNewGrid(gridSize) function has one parameter that takes grid size.
// first it creates columns and adds it in container
// then every column takes square elements that created in nested for loop
// every square has an event listener that listens mouse events
function createNewGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        const column = document.createElement("div");
        column.classList.add(`column${i}`);
        container.append(column);
    
        for (let j = 0; j < gridSize; j++) {
            const square = document.createElement("div");
            square.classList.add(`square${(i * gridSize) + j}`);
            column.append(square);
            square.setAttribute("style", "outline: solid 1px; width: 20px; height:20px;");
    
            square.addEventListener("mousedown", event => {
                event.target.style.background = "black";
            });
        }
    }
}

// clearGrid(gridSize) function first removes squares inside the column element
// then removes the parent column
function clearGrid(gridSize) {
    console.log(gridSize);
    for (let i = 0; i < gridSize; i++) {
        const column = document.querySelector(`.column${i}`);

        for (let j = 0; j < gridSize; j++) {
            const square = document.querySelector(`.square${(i * gridSize) + j}`);
            square.remove();
        }
        column.remove();
    }
}

// reset() asks user a desirable grid size value
// then clears the previous grid 
// and draws new one with the new grid size value
function reset() {
    const newGridSize = Number(prompt("Enter the grid size"));

    clearGrid(currentGridSize);

    currentGridSize = newGridSize;
    createNewGrid(currentGridSize);
}