'use strict';


class Box {
    constructor(x,y) {
      this.up = {};
      this.right = {};
      this.bottom = {};
      this.left = {};
      this.state = 0; //0 neutral , 1 red, 2 blue
    }
    static EmptyBox() {
      return new Box();
    }
  }
module.exports = Box;
