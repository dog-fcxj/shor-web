/**
 * @file locales.ts
 * This file contains the translation strings for the application.
 * It centralizes all user-facing text to enable easy internationalization.
 */
import { ExplanationTopic } from '../types';

const en = {
  // App Header
  title: "Shor's Algorithm Explorer",
  subtitle: "An interactive simulation of quantum factorization.",

  // Input Form
  formLabel: "Factorize N =",
  formPlaceholder: "e.g., 91",
  buttonRunning: "Running...",
  buttonStart: "Start Factorization",
  formHint: "Try composite odd numbers like 15, 35, 91, 143, or 323.",
  
  // App Status Messages
  errorLabel: "Error",
  runningFactorization: (n: string) => `Running factorization for N = ${n}...`,
  simulatingQuantum: "Simulating quantum process...",
  factorizationComplete: "Factorization Complete!",
  factorizationFailed: "Factorization Failed",
  factorizationFailedMessage: (n: string) => `The algorithm could not find factors for N = ${n} after several attempts. This can happen if the number is prime or due to the probabilistic nature of the algorithm.`,
  
  // Input Validation Errors
  errorNumberRange: "Please enter an integer between 4 and 100,000.",
  errorNumberEven: "Please enter an odd number. A factor is 2.",
  errorNumberTooSmall: "Please enter a number greater than 1.",
  errorNumberIsPrime: "The number is prime and cannot be factored.",
  
  // Attempt Card
  attemptTitle: (id: number) => `Attempt #${id}`,
  status: {
    running: "Running",
    failed: "Failed",
    success: "Success",
  },
  yes: "Yes",
  no: "No",
  step1Title: "Pick a base 'a' and check GCD",
  step1ChosenBase: "Chosen base",
  step1CheckingGcd: "Checking",
  step2Title: "Quantum Period Finding",
  step2Description: (a: string, n: string) => `Simulate the quantum circuit to find the period 'r' of f(x) = ${a}^x mod ${n}.`,
  step2Measurement: (c: string, t: string, q: string) => `Simulated measurement: c = ${c} on a register of size q = 2^${t} = ${q}.`,
  step3Title: "Continued Fraction Expansion",
  step3Description: `Expand the fraction c/q to find a candidate for the period 'r'.`,
  step4Title: "Verify Period",
  step4Description: (r: string) => `Verifying candidate period r = ${r}`,
  step4IsOdd: "Is 'r' odd?",
  step4IsTrivial: `Is a^(r/2) ≡ -1 (mod N) (trivial result)?`,
  step5Title: "Calculate Factors",
  step5Description: (a: string) => `Since the period 'r' is valid, we can calculate the factors using the base a = ${a}:`,
  step5Term: "Term",
  step5Factor1: "Factor 1",
  step5Factor2: "Factor 2",
  step5Success: "Success & Verification",
  step5FoundFactors: (f1: string, f2: string) => `Found factors ${f1} and ${f2}`,
  step5Check: "Check:",
  attemptFailed: "Attempt Failed",
  
  // Shor Algorithm Errors (from shor.ts)
  shorErrorContFraction: "Continued fraction expansion did not yield a suitable period candidate.",
  shorErrorPeriodOdd: "The period 'r' is odd. A new base 'a' must be chosen.",
  shorErrorTrivial: `a^(r/2) ≡ -1 (mod N). This gives a trivial factor. A new base 'a' must be chosen.`,
  shorErrorFactorsTrivial: "Calculated factors were trivial (1 or N).",
  
  // Quantum Circuit Diagram
  circuitDiagramTitle: "Simplified Circuit Diagram",
  circuitQubits: (n: number) => `${n} qubits`,
  circuitMeasure: "Measure",
  
  // Continued Fraction Table
  tableHeaderConvergent: "Convergent",
  tableHeaderDenominator: "Denominator",
  tableHintCandidate: "This denominator is the best candidate for the period 'r'",
  tableBestCandidate: "Best candidate for period",
  
  // Common UI Elements
  explainButtonLabel: "Get explanation",
  modalClose: "Close",
};

const zh: typeof en = {
  // App Header
  title: "SHOR算法演示器",
  subtitle: "一个交互式的量子因式分解模拟器。",

  // Input Form
  formLabel: "分解 N =",
  formPlaceholder: "例如 91",
  buttonRunning: "运行中...",
  buttonStart: "开始分解",
  formHint: "请尝试不超过100000的奇数合数，如 15, 35, 91, 143, 或 323。",

  // App Status Messages
  errorLabel: "错误",
  runningFactorization: (n: string) => `正在为 N = ${n} 运行因式分解...`,
  simulatingQuantum: "正在模拟量子过程...",
  factorizationComplete: "分解完成！",
  factorizationFailed: "分解失败",
  factorizationFailedMessage: (n: string) => `多次尝试后，算法未能找到 N = ${n} 的因子。如果该数字是素数或由于算法的概率性，可能会发生这种情况。`,
  
  // Input Validation Errors
  errorNumberRange: "请输入一个 4 到 100,000 之间的整数。",
  errorNumberEven: "请输入一个奇数。因子之一是 2。",
  errorNumberTooSmall: "请输入一个大于 1 的数字。",
  errorNumberIsPrime: "该数字是素数，无法进行因式分解。",
  
  // Attempt Card
  attemptTitle: (id: number) => `尝试 #${id}`,
  status: {
    running: "运行中",
    failed: "失败",
    success: "成功",
  },
  yes: "是",
  no: "否",
  step1Title: "选择基数 'a' 并检查 GCD",
  step1ChosenBase: "选择的基数",
  step1CheckingGcd: "检查",
  step2Title: "量子周期查找",
  step2Description: (a: string, n: string) => `模拟量子电路以找到函数 f(x) = ${a}^x mod ${n} 的周期 'r'。`,
  step2Measurement: (c: string, t: string, q: string) => `模拟测量结果：c = ${c}，寄存器大小为 q = 2^${t} = ${q}。`,
  step3Title: "连分数展开",
  step3Description: `展开分数 c/q 以找到周期 'r' 的候选值。`,
  step4Title: "验证周期",
  step4Description: (r: string) => `验证候选周期 r = ${r}`,
  step4IsOdd: "'r' 是奇数吗？",
  step4IsTrivial: `a^(r/2) ≡ -1 (mod N) 是否成立 (平凡解)？`,
  step5Title: "计算因子",
  step5Description: (a: string) => `由于周期 'r' 有效，我们可以使用基数 a = ${a} 来计算因子：`,
  step5Term: "中间项",
  step5Factor1: "因子 1",
  step5Factor2: "因子 2",
  step5Success: "成功与验证",
  step5FoundFactors: (f1: string, f2: string) => `找到因子 ${f1} 和 ${f2}`,
  step5Check: "验证:",
  attemptFailed: "尝试失败",
  
  // Shor Algorithm Errors (from shor.ts)
  shorErrorContFraction: "连分数展开未能产生合适的周期候选值。",
  shorErrorPeriodOdd: "周期 'r' 是奇数。必须选择一个新的基数 'a'。",
  shorErrorTrivial: `a^(r/2) ≡ -1 (mod N)。这导致了平凡解。必须选择一个新的基数 'a'。`,
  shorErrorFactorsTrivial: "计算出的因子是平凡的 (1 或 N)。",

  // Quantum Circuit Diagram
  circuitDiagramTitle: "简化电路图",
  circuitQubits: (n: number) => `${n} 量子比特`,
  circuitMeasure: "测量",

  // Continued Fraction Table
  tableHeaderConvergent: "收敛项",
  tableHeaderDenominator: "分母",
  tableHintCandidate: "此分母是周期 'r' 的最佳候选值",
  tableBestCandidate: "最佳周期候选值",

  // Common UI Elements
  explainButtonLabel: "获取解释",
  modalClose: "关闭",
};

export const translations = { en, zh };
export type TranslationSet = typeof en;

export const explanationTitles: Record<'en' | 'zh', Record<ExplanationTopic, string>> = {
  en: {
    [ExplanationTopic.ShorIntro]: "Shor's Algorithm Introduction",
    [ExplanationTopic.CoprimeSelection]: "Co-prime Base Selection",
    [ExplanationTopic.QuantumPeriodFinding]: "Quantum Period Finding",
    [ExplanationTopic.QuantumCircuit]: "The Quantum Circuit",
    [ExplanationTopic.ContinuedFractions]: "Continued Fractions",
    [ExplanationTopic.PeriodVerification]: "Period Verification",
    [ExplanationTopic.FinalFactorCalculation]: "Final Factor Calculation",
  },
  zh: {
    [ExplanationTopic.ShorIntro]: "Shor算法简介",
    [ExplanationTopic.CoprimeSelection]: "互质基数选择",
    [ExplanationTopic.QuantumPeriodFinding]: "量子周期查找",
    [ExplanationTopic.QuantumCircuit]: "量子电路",
    [ExplanationTopic.ContinuedFractions]: "连分数",
    [ExplanationTopic.PeriodVerification]: "周期验证",
    [ExplanationTopic.FinalFactorCalculation]: "最终因子计算",
  }
};


export const explanationContent: Record<'en' | 'zh', Record<ExplanationTopic, string>> = {
  en: {
    [ExplanationTopic.ShorIntro]: "Shor's algorithm is a quantum algorithm for integer factorization. Developed by Peter Shor in 1994, it's significant because it can factor large numbers exponentially faster than the best-known classical algorithms. This ability poses a threat to modern cryptography, which relies on the difficulty of factoring.\n\nThe algorithm cleverly combines classical steps with a quantum core. The main steps are:\n1. Choose a random number 'a'.\n2. Use a quantum computer to find the period 'r' of the function $f(x) = a^x \\pmod{N}$.\n3. Use the period 'r' in a classical calculation to find the factors of N.",
    [ExplanationTopic.CoprimeSelection]: "The first classical step is to pick a random integer 'a' such that $1 < a < N$. We then compute the greatest common divisor (GCD) of 'a' and 'N', written as $gcd(a, N)$.\n\nIf $gcd(a, N) > 1$, we have luckily found a non-trivial factor of N, and the algorithm terminates. If $gcd(a, N) = 1$, 'a' and 'N' are co-prime, and we proceed to the quantum part of the algorithm. This check is necessary because the subsequent steps rely on 'a' being co-prime with N to form a valid periodic function.",
    [ExplanationTopic.QuantumPeriodFinding]: "This is the heart of Shor's algorithm. We need to find the period 'r' of the function $$f(x) = a^x \\pmod{N}$$ The period 'r' is the smallest positive integer such that $a^r \\equiv 1 \\pmod{N}$.\n\nWhile finding 'r' is extremely hard for classical computers, a quantum computer can do it efficiently using the Quantum Fourier Transform (QFT). The quantum circuit prepares a superposition of states, computes $f(x)$ for all of them simultaneously, and then uses the QFT to transform the state, making the period 'r' likely to be revealed upon measurement.",
    [ExplanationTopic.QuantumCircuit]: "The simplified circuit consists of two registers of qubits. The first register (t-qubits) is initialized to a superposition of all possible input values using Hadamard (H) gates. The second register (n-qubits) is for storing the output of the function.\n\nA controlled-Uf gate then computes $f(x) = a^x \\pmod{N}$, entangling the two registers. Finally, an inverse Quantum Fourier Transform (QFT⁻¹) is applied to the first register. This transformation concentrates the probability amplitude on states related to the period 'r'. Measuring this first register gives a value from which 'r' can be deduced.",
    [ExplanationTopic.ContinuedFractions]: "The quantum measurement doesn't directly give us the period 'r'. Instead, it gives an integer 'c' which is a good approximation of a random multiple of $q/r$, where 'q' is the size of the first quantum register ($q = 2^t$). So, we have the approximation $$\\frac{c}{q} \\approx \\frac{s}{r}$$ for some unknown integer 's'.\n\nThe Continued Fractions algorithm is a classical method to find the best rational approximations for a given value. By applying it to $c/q$, we can efficiently recover the fraction $s/r$ and extract the denominator, which is our candidate for the period 'r'.",
    [ExplanationTopic.PeriodVerification]: "After the continued fractions step gives us a candidate period 'r', we must perform two classical checks.\n\nFirst, we check if 'r' is odd. If it is, the method fails for this 'a', and we must restart with a new one.\n\nSecond, if 'r' is even, we compute $a^{r/2} \\pmod{N}$. If this result is congruent to $-1 \\pmod{N}$ (or $N-1$), it leads to trivial factors (1 and N). This is also a failure case, requiring a restart. If 'r' is even and the second check passes, we have found a valid period and can proceed to the final step.",
    [ExplanationTopic.FinalFactorCalculation]: "Once a valid period 'r' is found (it's even and doesn't produce a trivial result), we know that $a^r \\equiv 1 \\pmod{N}$. This can be rewritten as $(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0 \\pmod{N}$.\n\nThis means that N must share a factor with either $(a^{r/2} - 1)$ or $(a^{r/2} + 1)$. We can find these factors by computing the greatest common divisor (GCD) with N:\n\n$$p = gcd(a^{r/2} - 1, N)$$\n$$q = gcd(a^{r/2} + 1, N)$$\n\nThese values, p and q, are the non-trivial factors of N.",
  },
  zh: {
    [ExplanationTopic.ShorIntro]: "Shor算法是一种用于整数因式分解的量子算法。它由彼得·秀尔于1994年提出，其重要性在于它能以指数级速度比最知名的经典算法更快地分解大数。这种能力对依赖于因式分解难度的现代密码学构成了威胁。\n\n该算法巧妙地将经典步骤与量子核心相结合。主要步骤如下：\n1. 选择一个随机数 'a'。\n2. 使用量子计算机找到函数 $f(x) = a^x \\pmod{N}$ 的周期 'r'。\n3. 使用周期 'r' 进行经典计算，找出 N 的因子。",
    [ExplanationTopic.CoprimeSelection]: "第一个经典步骤是选择一个随机整数 'a'，使得 $1 < a < N$。然后我们计算 'a' 和 'N' 的最大公约数 (GCD)，记为 $gcd(a, N)$。\n\n如果 $gcd(a, N) > 1$，我们就幸运地找到了 N 的一个非平凡因子，算法终止。如果 $gcd(a, N) = 1$，'a' 和 'N' 是互质的，我们继续进行算法的量子部分。这个检查是必要的，因为后续步骤依赖于 'a' 与 N 互质来形成一个有效的周期函数。",
    [ExplanationTopic.QuantumPeriodFinding]: "这是Shor算法的核心。我们需要找到函数 $$f(x) = a^x \\pmod{N}$$ 的周期 'r'。周期 'r' 是满足 $a^r \\equiv 1 \\pmod{N}$ 的最小正整数。\n\n对于经典计算机来说，找到 'r' 是极其困难的，但量子计算机可以使用量子傅里叶变换 (QFT) 高效地完成。量子电路准备一个状态的叠加态，同时为所有状态计算 $f(x)$，然后使用 QFT 变换该状态，使得周期 'r' 在测量时很可能被揭示出来。",
    [ExplanationTopic.QuantumCircuit]: "简化的电路由两个量子比特寄存器组成。第一个寄存器 (t-qubits) 使用哈达玛 (H) 门初始化为所有可能输入值的叠加态。第二个寄存器 (n-qubits) 用于存储函数的输出。\n\n一个受控 Uf 门然后计算 $f(x) = a^x \\pmod{N}$，使两个寄存器纠缠在一起。最后，对第一个寄存器应用逆量子傅里叶变换 (QFT⁻¹)。这种变换将概率幅度集中在与周期 'r' 相关的状态上。测量第一个寄存器会得到一个值，从中可以推断出 'r'。",
    [ExplanationTopic.ContinuedFractions]: "量子测量并不能直接给出周期 'r'。相反，它给出一个整数 'c'，这个 'c' 是 $q/r$ 的某个随机倍数的良好近似值，其中 'q' 是第一个量子寄存器的大小 ($q = 2^t$)。因此，我们有近似关系 $$\\frac{c}{q} \\approx \\frac{s}{r}$$ 对于某个未知的整数 's'。\n\n连分数算法是一种经典的数学方法，用于寻找给定值的最佳有理数近似。通过将其应用于 $c/q$，我们可以高效地恢复分数 $s/r$ 并提取分母，分母就是我们周期 'r' 的候选值。",
    [ExplanationTopic.PeriodVerification]: "在连分数步骤为我们提供了一个候选周期 'r' 之后，我们必须执行两次经典检查。\n\n首先，我们检查 'r' 是否为奇数。如果是，则该方法对当前的 'a' 失败，我们必须用一个新的 'a' 重新开始。\n\n其次，如果 'r' 是偶数，我们计算 $a^{r/2} \\pmod{N}$。如果结果与 $-1 \\pmod{N}$ (或 $N-1$) 同余，它会导致平凡因子 (1 和 N)。这也是一个失败情况，需要重新开始。如果 'r' 是偶数且第二次检查通过，我们就找到了一个有效的周期，可以进入最后一步。",
    [ExplanationTopic.FinalFactorCalculation]: "一旦找到一个有效的周期 'r' (它是偶数且不会产生平凡结果)，我们就知道 $a^r \\equiv 1 \\pmod{N}$。这可以改写为 $(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0 \\pmod{N}$。\n\n这意味着 N 必须与 $(a^{r/2} - 1)$ 或 $(a^{r/2} + 1)$ 共享一个因子。我们可以通过计算与 N 的最大公约数 (GCD) 来找到这些因子：\n\n$$p = gcd(a^{r/2} - 1, N)$$\n$$q = gcd(a^{r/2} + 1, N)$$\n\n这些值 p 和 q 就是 N 的非平凡因子。",
  }
};