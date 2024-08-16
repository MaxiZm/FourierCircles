export class Circle {
  constructor(radius, phase, parent, tps) {
    this.radius = radius;       // The radius of the circle, derived from the magnitude of the Fourier coefficient
    this.parent = parent;       // A reference to the parent circle, for hierarchical drawing
    this.phase = phase;         // The phase shift of the circle, derived from the phase of the Fourier coefficient
    this.tps = tps;             // Time per second (tps), or the frequency of rotation
    this.w = 2 * Math.PI * tps; // The angular velocity of the circle
  }

  angle(time) {
    if (this.tps === 0) return this.phase;  // If the frequency is 0, return 0
    // Calculate the angle based on time, phase, and frequency
    return (this.phase + this.w * time) % (2 * Math.PI);
  }
}
