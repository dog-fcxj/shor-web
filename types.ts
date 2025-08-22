/**
 * @file types.ts
 * This file contains all the TypeScript type definitions and interfaces
 * used throughout the Shor's algorithm explorer application.
 */

/**
 * Represents the supported language codes.
 */
export type Language = 'en' | 'zh';

/**
 * Represents a single convergent from the continued fraction expansion.
 * Convergents are rational approximations of a real number.
 */
export interface Convergent {
  /** The coefficient `a_k` in the continued fraction expansion. */
  a: bigint;
  /** The numerator `p_k` of the convergent fraction. */
  numerator: bigint;
  /** The denominator `q_k` of the convergent fraction, a candidate for the period 'r'. */
  denominator: bigint;
}

/**
 * Represents a complete attempt to factor the number N using Shor's algorithm.
 * It tracks the state and results of each major step of the algorithm.
 */
export interface ShorAttempt {
  /** A unique identifier for this attempt. */
  id: number;
  /** The number to be factored. */
  n: bigint;
  /** The randomly chosen base 'a' for this attempt. */
  a: bigint;
  /** The current status of the attempt. */
  status: 'running' | 'failed' | 'success';
  /** The result of the initial greatest common divisor (GCD) check. */
  gcdCheck?: bigint;
  /** The simulated results from the quantum period-finding stage. */
  quantumResult?: {
    /** The measured value 'c' from the first quantum register. */
    c: bigint;
    /** The size of the first quantum register, `q = 2^t`. */
    q: bigint;
    /** The number of qubits 't' used in the first register. */
    t: number;
  };
  /** The results from the continued fraction expansion. */
  fractionResult?: {
    /** A list of all calculated convergents. */
    convergents: Convergent[];
    /** The best candidate found for the period 'r'. */
    candidateR: bigint;
  };
  /** The verified period 'r' of the function f(x) = a^x mod N. */
  period?: bigint;
  /** The results of the classical verification checks on the candidate period. */
  verification?: {
    /** True if the period 'r' is odd, which is a failure condition. */
    isPeriodOdd: boolean;
    /** True if the period leads to a trivial solution (a^(r/2) = -1 mod N), a failure condition. */
    isTrivial: boolean;
  };
  /** The results from the final factor calculation step. */
  factorizationResult?: {
    /** The intermediate term `a^(r/2) mod N`. */
    term: bigint;
    /** The first potential factor, `gcd(term - 1, N)`. */
    p1: bigint;
    /** The second potential factor, `gcd(term + 1, N)`. */
    p2: bigint;
  };
  /** The final non-trivial factors of N if found. */
  factors?: bigint[];
  /** An error message if the attempt failed. */
  error?: string;
}

/**
 * Defines the different topics available for explanation in the UI.
 * Each enum member corresponds to a specific step or concept in Shor's algorithm.
 */
export enum ExplanationTopic {
  ShorIntro = "Shor's Algorithm Introduction",
  CoprimeSelection = "Co-prime Base Selection",
  QuantumPeriodFinding = "Quantum Period Finding",
  QuantumCircuit = "The Quantum Circuit",
  ContinuedFractions = "Continued Fractions",
  PeriodVerification = "Period Verification",
  FinalFactorCalculation = "Final Factor Calculation",
}