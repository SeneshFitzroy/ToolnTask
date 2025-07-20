const phone = '0761120457';
const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
console.log('Original:', phone);
console.log('Cleaned:', cleanPhone);
console.log('Length:', cleanPhone.length);

const patterns = [
  /^(\+94|0094|94)?0?7[0-9]{8}$/, // Pattern 1
  /^(\+94|0094|94)?0?1[1-9][0-9]{7}$/, // Pattern 2
  /^0?7[0-9]{8}$/, // Pattern 3
  /^0?1[1-9][0-9]{7}$/ // Pattern 4
];

patterns.forEach((pattern, i) => {
  const match = pattern.test(cleanPhone);
  console.log(`Pattern ${i + 1}: ${pattern} - ${match ? 'MATCH' : 'NO MATCH'}`);
});

// Test the pattern that should work
const workingPattern = /^0?7[0-9]{8}$/;
console.log('Working pattern test:', workingPattern.test(cleanPhone));
console.log('Manual check: starts with 0?', cleanPhone.startsWith('0'));
console.log('Manual check: second char is 7?', cleanPhone[1] === '7');
console.log('Manual check: total length 10?', cleanPhone.length === 10);
