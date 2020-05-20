'use strict';


class Square {
    constructor(x,y) {
      this.up = {};
      this.right = {};
      this.bottom = {};
      this.left = {};
      this.state = 0; //0 neutral , 1 red, 2 blue
    }
    static EmptySquare() {
      return new Square();
    }
  }
module.exports = Square;
