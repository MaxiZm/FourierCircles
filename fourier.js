
function integrate(f, a, b, n) {
  let sum = math.complex(0, 0);  // Initialize sum as a complex number
  let dx = math.divide(math.subtract(b, a), n);  // Calculate dx as (b - a) / n

  for (let i = 0; i < n; i++) {
    let x = math.add(a, math.multiply(i, dx));  // Calculate x = a + i * dx
    sum = math.add(sum, math.multiply(f(x), dx));  // sum += f(x) * dx
  }

  return sum;
}

export function fourier(apoints, N, K) {
  return  math.divide(integrate(
    (t) => {
      const a = 2 * Math.PI * K * t / N; // Corrected the formula
      const complexNumber = math.multiply(
        math.exp(math.complex(0, -a)),
        math.complex(apoints[Math.floor(t)][0], apoints[Math.floor(t)][1])
      );
      return complexNumber; // Return the complex number directly, not its magnitude
    },
    0, N, N
  ), N);
}
