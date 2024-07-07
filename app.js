const container = document.querySelector(".container");
const pencilButton = document.querySelector(".pencilButton");
const eraserButton = document.querySelector(".eraserButton");
const resetButton = document.querySelector(".resetButton");
const slider = document.getElementById("myRange");
const sliderOutput = document.getElementById("sliderOutput");

const containerSize = container.clientWidth;
const startGridSize = 16; // 16x16 grid
const minGridSize = 2;
const maxGridSize = 64;

let currentColor = "#000000"; // black is the starter color

let isClicked = false;

let currentGridSize = startGridSize;
createNewGrid(currentGridSize); // Create new grid with fixed starting size

resetButton.addEventListener("click", reset);
pencilButton.addEventListener("click", () => currentColor = "#000000");
eraserButton.addEventListener("click", () => currentColor = "#FFFFFF");

// createNewGrid(gridSize) function has one parameter that takes grid size.
// first it creates columns and adds it in container
// then every column takes square elements that created in nested for loop
// every square has an event listener that listens mouse events
function createNewGrid(gridSize) {
    sliderOutput.innerText = gridSize;
    slider.oninput = () => {
        sliderOutput.innerText = slider.value;
    }

    gridSize = slider.value;

    for (let i = 0; i < gridSize; i++) {
        const column = document.createElement("div");
        column.classList.add(`column${i}`);
        container.append(column);
    
        for (let j = 0; j < gridSize; j++) {
            const square = document.createElement("div");
            square.classList.add(`square${(i * gridSize) + j}`);
            column.append(square);
            square.setAttribute("style", `outline: solid 1px; width: ${containerSize / gridSize}px; height: ${containerSize / gridSize}px;`);

            square.addEventListener("mousedown", paint);
            square.addEventListener("mouseover", paint);

            // Update isClicked
            square.addEventListener("mousedown", event => {
                isClicked = true;
                console.log(isClicked);
            });
            square.addEventListener("mouseup", event => {
                isClicked = false;
                console.log(isClicked);
            });
        }
    }
}

// Paint while mousedown until mouseup event
function paint(event) {
    if (event.type === "mouseover" && !isClicked) return;
    event.target.style.background = currentColor;
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
    let newGridSize = slider.value;

    if (newGridSize > maxGridSize || newGridSize < minGridSize) {
        alert(`Grid size value must be more than ${minGridSize} and less than ${maxGridSize}`);
        reset();
    } else {
        clearGrid(currentGridSize);

        currentGridSize = newGridSize;
        createNewGrid(currentGridSize);
    }
}