export class Circle {
  constructor(radius, parent, tps) {
    this.radius = radius;
    this.parent = parent;
    this.tps = tps;
  }

  angle(time) {
    return time * 2 * Math.PI / this.tps % (2 * Math.PI);
  }

}