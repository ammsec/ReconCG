/* =========================================
   ReconCG v5.0
   validation.js — Input validation
   ========================================= */

function validateFields(toolKey, data) {
  // Every tool form has either a "target" or "url" as its primary input
  const primary = "target" in data ? "target" : ("url" in data ? "url" : null);

  if (primary && !data[primary]) {
    return { valid: false, message: "Please enter a " + primary + " before generating." };
  }

  if (primary && data[primary]) {
    const value = data[primary];
    // Basic sanity check — block obvious shell metacharacters from free-text fields
    const dangerous = /[;&|`$><]/;
    if (dangerous.test(value)) {
      return { valid: false, message: "Remove special characters ( ; & | ` $ > < ) from the input." };
    }
  }

  // Tools that require a wordlist should have one set
  if ("wordlist" in data && !data.wordlist) {
    return { valid: false, message: "Please provide a wordlist path." };
  }

  return { valid: true, message: "" };
}
