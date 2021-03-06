let canvas;
let ctx;

$(document).ready(() => {
    //input canvas
    canvas = document.getElementById("inputCanvas")
    ctx = canvas.getContext("2d");

    //why do I have to do this...
    canvas.width = 150;
    canvas.height = 210;

    //canvas resets
    reset()

    //handle inputs
    canvas.addEventListener("mousedown", mouseDown, false);

    //buttons
    $("#clearButton").click(() => { reset() })
    $("#exportButton").click(() => {
        $("#export").text(encode(inputArray).split('/'))
        copyToClipboard("#export")
    })
})

//copies to clipboard
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

//stores data about the board
let inputArray = []
for (let y = 0; y < 7; y++) {
    inputArray.push(new Array(5).fill(false))
}

//displays filled squares
function displayFilled() {
    for (y in inputArray) {
        for (x in inputArray[y]) {
            y = parseInt(y)
            x = parseInt(x)
            if (inputArray[y][x] == true) {
                ctx.fillStyle = "#000000"
            } else {
                ctx.fillStyle = "#FFFFFF"
            }
            ctx.fillRect(x * 30 + 2, y * 30 + 2, 26, 26)
        }
    }
}

//handles mouse clicks
function mouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.pageX - rect.left,
        y = event.pageY - rect.top;
    const boxCoords = {
        x: Math.floor(x / 30),
        y: Math.floor(y / 30)
    }
    inputArray[boxCoords.y][boxCoords.x] = !inputArray[boxCoords.y][boxCoords.x]
    displayFilled();
    $("#preview").text(['Preview:'].concat(createFancyText(encode(inputArray).split('/'))).join('\n'))
}

//resets everything
function reset() {
    //resets the canvas
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 150, 210)
    for (let x = 0; x <= 150; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 210);
        ctx.stroke();
    }
    for (let y = 0; y <= 210; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(150, y);
        ctx.stroke();
    }
    //resets internal data
    inputArray = []
    for (let y = 0; y < 7; y++) {
        inputArray.push(new Array(5).fill(false))
    }
}

//exports to string
function encode(array) {
    let out = []
    for (subarray in array) {
        out[subarray] = ''
        for (unit in array[subarray]) {
            out[subarray] += array[subarray][unit] == true ? 1 : 0
        }
    }
    return out.join('/')
}

//creates the fancy text
function createFancyText(input) {

    //initialize matrixes
    const verticalMatrix = []
    const horizontalMatrix = []

    //fill arrays
    for (let y = 0; y < input.length; y++) {
        verticalMatrix.push(new Array(input[0].length + 1).fill(0))
    }
    for (let y = 0; y < input.length + 1; y++) {
        horizontalMatrix.push(new Array(input[0].length).fill(0))
    }


    //input data
    for (y in input) {
        y = parseInt(y)

        for (x in input[y]) {
            x = parseInt(x)

            if (input[y][x] == 1) {
                //fill in horizontal matrixes
                horizontalMatrix[y][x] = 1 - horizontalMatrix[y][x]
                horizontalMatrix[y + 1][x] = 1 - horizontalMatrix[y + 1][x]

                //fill in vertical matrixes
                verticalMatrix[y][x] = 1 - verticalMatrix[y][x]
                verticalMatrix[y][x + 1] = 1 - verticalMatrix[y][x + 1]
            }
        }
    }

    //convert to strings
    const verticalStringMatrix = new Array(input.length).fill(``)
    const horizontalStringMatrix = new Array(input.length + 1).fill(``)

    //fill string matrixes
    for (y in verticalMatrix) {
        verticalStringMatrix[y] = verticalMatrix[y].join().replace(/1/g, '/').replace(/0/g, ' ').replace(/,/g, '')
    }
    for (y in horizontalMatrix) {
        horizontalStringMatrix[y] = horizontalMatrix[y].join().replace(/1/g, '_').replace(/0/g, ' ').replace(/,/g, '')
    }

    //interlacing functon
    function interlaceArrays(array0, array1) {
        let out = [];
        for (let i = 0; i < Math.max(array0.length, array1.length); i++) {
            if (array0[i] != undefined) out.push(array0[i])
            if (array1[i] != undefined) out.push(array1[i])
        }
        return out;
    }

    //join matrixes
    const output = []
    for (y in horizontalStringMatrix) {
        if (y > 0) {
            output.push(interlaceArrays(verticalStringMatrix[y - 1], horizontalStringMatrix[y]).join(''))
        } else {
            output.push(interlaceArrays(horizontalStringMatrix[y], new Array(input[0].length + 1).fill(' ').join('')).join(''))
        }
    }

    //print to console
    for (let entry = 0; entry < output.length; entry++) {
        output[entry] = new Array(output.length - entry).fill(' ').join('') + output[entry]
    }
    return output;
}