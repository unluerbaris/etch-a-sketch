const container = document.querySelector(".container");

for (let i = 0; i < 16; i++) {
    const column = document.createElement("div");
    column.classList.add(`column${i}`);
    container.append(column);

    for (let j = 0; j < 16; j++) {
        const square = document.createElement("div");
        square.classList.add(`square${(i * 16) + j}`);
        column.append(square);
        square.setAttribute("style", "outline: solid 1px; width: 20px; height:20px;");
    }
}