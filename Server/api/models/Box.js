'use strict';


class Box {
    constructor(idx,x,y) {
      this.idx = idx;
      this.x=x;
      this.y=y;
      this.top = {};//edge
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
