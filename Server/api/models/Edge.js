'use strict';


class Edge {
    constructor(state, id) {
      this.state = state; //0 neutral , 1 red, 2 blue
      this.id = id;
    }
    static EmptyEdge() {
      return new Edge();
    }
  }
module.exports = Edge;
