// Check if prime
function isPrime(num) {
    if (!Number.isSafeInteger(num) || num <= 1) return false;
    if(num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Check if perfect number
function isPerfect(num) {

    // Only positive integers >=2 can be perfect
    if (!Number.isSafeInteger(num) || num < 2) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      const other = num / i;
      if (other !== i) sum += other;
    }
  }
  return sum === num;
}

// Check if Armstrong number
function isArmstrong(num) {
    // Armstrong normally applies to non-negative integers
    if (!Number.isSafeInteger(num) || num < 0) return false;
    
  const digits = num.toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(parseInt(d, 10,), power), 0);
  return sum === num;
}
    //sum
function digitSum(num) {
    return Math.abs(num)
        .toString()
        .split('')
        .reduce((acc, d) => acc + parseInt(d, 10), 0);
}
module.exports = { isPrime, isPerfect, isArmstrong, digitSum };

