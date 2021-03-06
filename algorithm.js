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