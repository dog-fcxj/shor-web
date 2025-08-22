/**
 * @file shor.ts
 * This file contains the core logic for simulating Shor's algorithm.
 * It includes mathematical utility functions for number theory operations
 * and the main async generator `runShor` that yields the state of the
 * algorithm at each step.
 */

import { ShorAttempt, Convergent } from '../types';

// --- BigInt Math Utility Functions ---

/**
 * Calculates the greatest common divisor (GCD) of two BigInt numbers using the Euclidean algorithm.
 * @param a The first number.
 * @param b The second number.
 * @returns The GCD of a and b.
 */
function gcd(a: bigint, b: bigint): bigint {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Calculates (base^exp) % mod efficiently using modular exponentiation.
 * @param base The base number.
 * @param exp The exponent.
 * @param mod The modulus.
 * @returns The result of (base^exp) % mod.
 */
function power(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
}

/**
 * Computes the convergents of a fraction c/q using the continued fraction algorithm.
 * @param c The numerator of the fraction.
 * @param q The denominator of the fraction.
 * @returns An array of Convergent objects.
 */
function getConvergents(c: bigint, q: bigint): Convergent[] {
  const convergents: Convergent[] = [];
  let temp_c = c;
  let temp_q = q;
  // Initialize variables for the algorithm (p_n = a_n*p_{n-1} + p_{n-2}, etc.)
  let hn_2 = 0n, hn_1 = 1n; // Numerators (p)
  let kn_2 = 1n, kn_1 = 0n; // Denominators (q)

  // Limit iterations to prevent potential infinite loops with large numbers.
  for (let i = 0; i < 30; i++) {
    if (temp_q === 0n) break;
    const a = temp_c / temp_q;
    const next_c = temp_q;
    const next_q = temp_c % temp_q;
    temp_c = next_c;
    temp_q = next_q;

    // Calculate the next numerator and denominator.
    const hn = a * hn_1 + hn_2;
    const kn = a * kn_1 + kn_2;

    // The denominator `kn` should not exceed the original number `N` (checked in the main loop).
    // If it exceeds `q`, it's not a useful approximation.
    if (kn > q) break;

    convergents.push({ a, numerator: hn, denominator: kn });

    // Update historical values for the next iteration.
    hn_2 = hn_1;
    hn_1 = hn;
    kn_2 = kn_1;
    kn_1 = kn;
  }
  return convergents;
}


/**
 * An async generator function that simulates Shor's algorithm to factor a given number N.
 * It yields the state of the computation at each major step, allowing the UI to update in real-time.
 * @param N The odd integer greater than 1 to be factored.
 * @yields {ShorAttempt} An object representing the current state of the factorization attempt.
 */
export async function* runShor(N: bigint): AsyncGenerator<ShorAttempt, void, undefined> {
  if (N <= 1n || N % 2n === 0n) {
    throw new Error("Input must be an odd integer greater than 1.");
  }

  const MAX_ATTEMPTS = 10;
  let attemptId = 0;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    attemptId++;
    // 1. Pick a random base 'a'
    const a = BigInt(Math.floor(Math.random() * (Number(N) - 2))) + 2n;
    
    let currentAttempt: ShorAttempt = { id: attemptId, n: N, a, status: 'running' };
    yield currentAttempt;
    await new Promise(res => setTimeout(res, 500)); // Pause for UI animation

    // 2. Check if 'a' shares a factor with N
    const commonDivisor = gcd(a, N);
    currentAttempt.gcdCheck = commonDivisor;

    if (commonDivisor > 1n) {
      currentAttempt.status = 'success';
      currentAttempt.factors = [commonDivisor, N / commonDivisor];
      yield currentAttempt;
      return; // Factorization complete
    }
    yield currentAttempt;
    await new Promise(res => setTimeout(res, 500));

    // --- Quantum Part Simulation ---
    // In a real quantum computer, we would not know the period 'r' beforehand.
    // For this simulation, we first find 'r' classically to simulate a realistic measurement 'c'.
    let r = 1n;
    let val = a % N;
    while (val !== 1n) {
      val = (val * a) % N;
      r++;
    }

    // Determine the number of qubits 't' for the first register.
    const t_num = Math.ceil(2 * Math.log2(Number(N)));
    const t = BigInt(t_num);
    const q = 2n ** t;

    // Simulate a measurement 'c' which would be approximately s*q/r for some random s.
    const s = BigInt(Math.floor(Math.random() * (Number(r) - 1))) + 1n;
    const c = (s * q) / r;

    currentAttempt.quantumResult = { c, q, t: t_num };
    yield currentAttempt;
    await new Promise(res => setTimeout(res, 500));

    // --- Classical Part: Continued Fractions ---
    // 3. Find the period 'r' from the measurement 'c'.
    const convergents = getConvergents(c, q);
    let candidateR: bigint | null = null;
    // The denominators of the convergents are candidates for 'r'.
    for(const conv of convergents) {
        if(conv.denominator > 0 && conv.denominator < N) {
            candidateR = conv.denominator;
        }
    }

    if (!candidateR) {
        currentAttempt.status = 'failed';
        currentAttempt.error = "Continued fraction expansion did not yield a suitable period candidate.";
        yield currentAttempt;
        continue; // Try a new 'a'
    }
    
    currentAttempt.fractionResult = { convergents, candidateR };
    currentAttempt.period = candidateR;
    yield currentAttempt;
    await new Promise(res => setTimeout(res, 1000));
    
    // --- 4. Verification of the period 'r' ---
    const period = candidateR;
    const isPeriodOdd = period % 2n !== 0n;
    let isTrivial = false;
    
    if (!isPeriodOdd) {
      const term = power(a, period / 2n, N);
      isTrivial = (term + 1n) % N === 0n;
    }
    
    currentAttempt.verification = { isPeriodOdd, isTrivial };
    yield currentAttempt;
    await new Promise(res => setTimeout(res, 500));

    if (isPeriodOdd) {
      currentAttempt.status = 'failed';
      currentAttempt.error = "The period 'r' is odd. A new base 'a' must be chosen.";
      yield currentAttempt;
      continue; // Try a new 'a'
    }
    
    if (isTrivial) {
      currentAttempt.status = 'failed';
      currentAttempt.error = `a^(r/2) ≡ -1 (mod N). This gives a trivial factor. A new base 'a' must be chosen.`;
      yield currentAttempt;
      continue; // Try a new 'a'
    }
    
    // --- 5. Success: Calculate factors ---
    const term = power(a, period / 2n, N);
    const p1 = gcd(term - 1n, N);
    const p2 = gcd(term + 1n, N);
    currentAttempt.factorizationResult = { term, p1, p2 };

    if (p1 > 1n && p1 < N) {
        currentAttempt.status = 'success';
        currentAttempt.factors = [p1, N / p1];
        yield currentAttempt;
        return; // Factorization complete
    }
     if (p2 > 1n && p2 < N) {
        currentAttempt.status = 'success';
        currentAttempt.factors = [p2, N / p2];
        yield currentAttempt;
        return; // Factorization complete
    }

    // If factors are 1 or N, the attempt failed.
    currentAttempt.status = 'failed';
    currentAttempt.error = "Calculated factors were trivial (1 or N).";
    yield currentAttempt;
  }
}
