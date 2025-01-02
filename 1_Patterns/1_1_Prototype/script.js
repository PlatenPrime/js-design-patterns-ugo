class BoardSquare {
  constructor(color, row, file, startingPiece) {
    this.color = color;
    this.row = row;
    this.file = file;
  }
  occupySquare(piece) {
    this.piece = piece;
  }
  clearSquare() {
    this.piece = null;
  }
}

const whiteSquare = new BoardSquare("white");
const whiteSquareTwo = new BoardSquare("white");
// ....
const whiteSquareLast = new BoardSquare("white");

console.log(whiteSquare);

const blackSquare = new BoardSquare("black");
const blackSquareTwo = new BoardSquare("black");
// ....
const blackSquareLast = new BoardSquare("black");

class BoardSquarePrototype {
  constructor(prototype) {
    this.prototype = prototype;
  }

  clone() {
    // return new BoardSquare(this.prototype.color, this.prototype.row, this.prototype.file);
    // OR
    // const boardSquare = new BoardSquare();
    // boardSquare.color = this.prototype.color;
    // boardSquare.row = this.prototype.row;
    // boardSquare.file = this.prototype.file;
    // return boardSquare;
    // BUT
    return Object.assign(new BoardSquare(), this.prototype);
  }
}

const whiteSquarePrototype = new BoardSquarePrototype(whiteSquare);
const blackSquarePrototype = new BoardSquarePrototype(blackSquare);

const whiteSquareClone = whiteSquarePrototype.clone();
const blackSquareClone = blackSquarePrototype.clone();

console.log(whiteSquareClone);
console.log(blackSquareClone);

console.assert(
  whiteSquareClone.color === whiteSquare.color,
  "whiteSquareClone.color === whiteSquare.color()"
);

class Square {
  constructor() {}
  occupySquare(piece) {
    this.piece = piece;
  }
  clearSquare() {
    this.piece = null;
  }
}


class BlackSquare extends Square {
  constructor() {
    super();
    this.color = "black";
  }
}