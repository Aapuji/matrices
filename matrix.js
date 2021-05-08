class Matrix {
    constructor(rows, cols, inputType, ...data) {
        this.rows = rows;
        this.columns = cols;
        this.matrix = [];
        this.inputOverflow = undefined;
        switch (inputType) {
            case 'Singular':
                if (data.length = 1 && data[0].length === this.rows * this.columns) {
                    data = data[0];
                }
                for (let i = 0; i < this.rows; i++) {
                    let current = [];
                    for (let j = 0; j < this.columns; j++) {
                        current.push(data[j]);
                    }
                    this.matrix.push(current);
                    data.splice(0, this.columns);
                }
                if (data) {this.inputOverflow = data;}
                break;
            case 'Array':
                for (let i = 0; i < this.rows; i++) {
                    console.log(data[i].length, i)
                    if (data[i].length != this.columns) {
                        throw 'Matrix Error: The length of each input array does not equal the inputted number of columns.';
                    } else {
                        this.matrix.push(data[i]);
                    }
                }
                break;
            case 'Matrix':
                if (data.length > 1) {throw 'Matrix Error: Number of inputted matrices exceeds 1.';}
                if (data[0].length != this.rows) {throw 'Matrix Error: Inputted rows does not equal rows of inputted matrix.';}
                for (let row of data[0]) {
                    if (row.length != this.columns) {throw 'Matrix Error: Inputted columns does not equal columns of inputted matrix.';}
                }
                this.matrix = data[0];
                break;
            default:
                this.matrix = undefined; 
        }
    }

    static arrayToMatrix(row, col, arr) {
        return new Matrix(row, col, 'Singular', arr);
    }
}