class Matrix {
    constructor(rows, cols, inputType, ...data) {
        this.rows = rows;
        this.columns = cols;
        this.matrix = [];
        this.inputOverflow = undefined;
        //this.type = Matrix.typeOf(this);
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

    static toMatrix(row, col, arr) {
        return new Matrix(row, col, 'Singular', arr);
    }

    static toArray(matrix) {
        if (matrix instanceof Matrix) {
            let arr = [];
            for (let row of matrix.matrix) {
                for (let val of row) {
                    arr.push(val);
                }
            }
            return arr;
        } else {
            throw 'Matrix Error: Cannot convert a non-matrix object into an array with \'toArray().\'';
        }
    }

    /*static typeOf(matrix) {
        if (matrix instanceof Matrix) {
            let a = Matrix.toArray(matrix);
            let arr = [];
            const allEqual = arr => arr.every(val => val === arr[0]);
            for (let val of a) {
                arr.push(typeof val);
            }
            if (allEqual(arr)) {return (typeof arr[0]);} else {return 'Compound';}
        } else {
            throw 'Matrix Error: Cannot find type of matrix if the argument is not a matrix.';
        }
    }
    Always returns "string" for some reason */

    nthRow(n) {
        if (n >= this.rows) {return null} else {return this.matrix[n]}
    }

    nthColumn(n) {
        if (n >= this.columns) {return null} else {
            let col = [];
            for (let i of this.matrix) {
                col.push(i[n]);
            }
            return col;
        } 
    }

    add(addend) {
        if (this.rows != addend.rows || this.columns != addend.columns) {
            throw 'Matrix Error: Cannot add two matrices with different sizes';
        }
        let arr = [];
        try {
            for (let i in this.matrix) {
                for (let j in this.matrix[i]) {
                    arr.push(this.matrix[i][j] + addend.matrix[i][j]);
                }
            }
        } catch (err) {
            throw err;
        } 
        return Matrix.toMatrix(this.rows, this.columns, arr);
    }

    subtract(subtrahend) {
        return this.add(this.constantProduct(-1));
    }

    scalarProduct(k) {
        if (typeof k != 'number') {throw 'Matrix Error: Cannot perform a mathematical operation using non-numerical arguments.';}
        let arr = [];
        for (let i in this.matrix) {
            for (let j in this.matrix[i]) {
                arr.push(k * this.matrix[i][j]);
            }
        }
        return Matrix.toMatrix(this.rows, this.columns, arr);
    }

    matrixProduct(multiplicand) {
        if (this.rows != multiplicand.columns || this.columns != multiplicand.rows) {
            throw 'Matrix Error: In order to multiply matrices, the columns of one matrix must be equal to the rows of the other, and the rows of the first matrix must be equal to the columns of the other.';
        }

        let arr = [];

        for (let i = 0; i <= this.rows; i++) {
            for (let j = 0; j <= multiplicand.columns; j++) {
                let num = this.matrix[i][j] * multiplicand.matrix[j][i];
                console.log(i, j, num, this.matrix[i], multiplicand.matrix[j]); 
                arr.push(num);
            }
        }


    }
}
/*
[
    [1, 2, 3, 4, 5, 6]
]

[
    [1]
    [2]
    [3]
    [4]
    [5]
    [6]
]

1*1; 2*2; 3*3
*/