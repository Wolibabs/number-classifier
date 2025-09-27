const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, digitSum } = require("../utils/auth");

//Simple in memory cache for fun facts 
const factCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hours

async function getFact(number) {
    const key = String(number);
    const cached = factCache.get(key);
    const now = Date.now();
    if (cached && cached.expiresAt > now) return cached.text;

    //Use Numbers API to fetch a math fact
    const url = `https://numbersapi.com/${number}/math?json`;
    const response = await axios.get(url, { timeout: 3000 }); // 3 seconds timeout
    const text = response?.data?.text || "No fact found";

    factCache.set(key, { text, expiresAt: now + CACHE_TTL_MS });
    return text;
}
exports.classifyNumber = async (req, res) => {
  try {
    const numberParam = req.query.number;

    // strict Validation must be an integer string (allows negative sign)
    if (!numberParam || !/^-?\d+$/.test(numberParam)) {
      return res.status(400).json({
        number: numberParam,
        error: true,
      });
    }
    const num = Number(numberParam);
    if (!Number.isSafeInteger(num)) {
        return res.status(400).json({number: numberParam, error: true});
        }

    // Properties
    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    //Digit sum and check
    const result = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum(num),
        fun_fact: "",

    };

    //Fetch fun fact
    try {
        result.fun_fact = await getFact(num);
    } catch (err) {
        //fallback fact
        if (isArmstrong(num)) {
             result.fun_fact =`${num} is an Armstrong number because it is digits raised the power of ${String(num).length} sum to ${num}`;
        }else {
            result.fun_fact =`${num} is ${num % 2 === 0 ? "even" : "odd"} with a digit sum of ${digitSum(num)}.`;
        }
    }

    return res.json(result);
    }catch (err) {
        console.error("classifyNumber error:", err);
        return res.status(500).json({ error: "Server error", details: err.message });
  }
};
