// Test Sri Lankan phone number validation
// Run with: node test-srilankan-phone.js

const testPhoneNumbers = [
  '077 123 4567',
  '0771234567',
  '+94 77 123 4567',
  '+94771234567',
  '94771234567',
  '0094771234567',
  '070 123 4567',
  '071 123 4567',
  '072 123 4567',
  '074 123 4567',
  '075 123 4567',
  '076 123 4567',
  '077 123 4567',
  '078 123 4567',
  '011 123 4567',  // Colombo landline
  '021 123 4567',  // Kandy landline
  '031 123 4567',  // Negombo landline
  '041 123 4567',  // Matara landline
  '047 123 4567',  // Hambantota landline
  '051 123 4567',  // Anuradhapura landline
  '055 123 4567',  // Badulla landline
  '057 123 4567',  // Bandarawela landline
  '063 123 4567',  // Ampara landline
  '065 123 4567',  // Batticaloa landline
  '067 123 4567',  // Trincomalee landline
  '081 123 4567',  // Ratnapura landline
  '091 123 4567',  // Jaffna landline
];

const phoneRegex = /^(\+94|0094|94|0)?[1-9][0-9]{8,9}$/;

function normalizePhone(phone) {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  let normalizedPhone = cleanPhone;
  if (normalizedPhone.startsWith('+94')) {
    normalizedPhone = '0' + normalizedPhone.substring(3);
  } else if (normalizedPhone.startsWith('0094')) {
    normalizedPhone = '0' + normalizedPhone.substring(4);
  } else if (normalizedPhone.startsWith('94')) {
    normalizedPhone = '0' + normalizedPhone.substring(2);
  }
  
  return normalizedPhone;
}

console.log('🇱🇰 Testing Sri Lankan Phone Number Validation\n');
console.log('Format: Original -> Cleaned -> Normalized -> Valid?');
console.log('='.repeat(60));

testPhoneNumbers.forEach(phone => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const normalized = normalizePhone(phone);
  const isValid = phoneRegex.test(cleaned);
  
  console.log(`${phone.padEnd(16)} -> ${cleaned.padEnd(12)} -> ${normalized.padEnd(12)} -> ${isValid ? '✅' : '❌'}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ Valid | ❌ Invalid');
console.log('\nNote: All valid numbers should normalize to 0XXXXXXXXX format');
