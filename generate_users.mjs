import { faker } from '@faker-js/faker';
import fs from 'fs';

function generateAlias(firstName, lastName) {
  const patterns = [
    () => `${firstName.toLowerCase()}${faker.number.int({ min: 100, max: 9999 })}`,
    () => `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    () => `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    () => `${lastName.toLowerCase()}${firstName.charAt(0).toLowerCase()}`,
    () => faker.internet.username({ firstName, lastName }),
  ];
  
  const numAliases = faker.number.int({ min: 1, max: 3 });
  const aliases = [];
  const usedPatterns = new Set();
  
  while (aliases.length < numAliases && usedPatterns.size < patterns.length) {
    const idx = faker.number.int({ min: 0, max: patterns.length - 1 });
    if (!usedPatterns.has(idx)) {
      aliases.push(patterns[idx]());
      usedPatterns.add(idx);
    }
  }
  
  return aliases;
}

function generateUser() {
  const gender = faker.person.sex();
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  const middleName = faker.person.middleName(gender);
  
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const aliases = generateAlias(firstName, lastName);
  
  const user = {
    // Basic Identity
    id: faker.string.uuid(),
    firstName,
    middleName,
    lastName,
    fullName: `${firstName} ${middleName} ${lastName}`,
    gender,
    dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
    age: null, // Will calculate
    
    // Contact Information
    email,
    phoneNumber: faker.phone.number(),
    
    // Address
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      coordinates: {
        lat: parseFloat(faker.location.latitude()),
        lng: parseFloat(faker.location.longitude())
      }
    },
    
    // Online Presence
    username: faker.internet.username({ firstName, lastName }),
    aliases,
    avatar: faker.image.avatar(),
    website: faker.internet.url(),
    
    // Professional Information
    jobTitle: faker.person.jobTitle(),
    company: faker.company.name(),
    bio: faker.person.bio(),
    
    // Financial Information (fake, for testing only)
    creditCard: {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      issuer: faker.finance.creditCardIssuer(),
      expiryDate: `${faker.date.future({ years: 5 }).getMonth() + 1}/${faker.date.future({ years: 5 }).getFullYear()}`
    },
    bankAccount: faker.finance.accountNumber(),
    
    // Additional Details
    ssn: faker.string.numeric(9), // Fake SSN
    vehicleInfo: {
      manufacturer: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      type: faker.vehicle.type(),
      vin: faker.vehicle.vin(),
      licensePlate: faker.vehicle.vrm()
    },
    
    // Metadata
    createdAt: new Date().toISOString(),
    password: faker.internet.password({ length: 16, memorable: false })
  };
  
  // Calculate age
  const today = new Date();
  const birthDate = new Date(user.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  user.age = age;
  
  return user;
}

function generateUsers(count) {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  
  return users;
}

// Main execution
const count = parseInt(process.argv[2]) || 10;

if (isNaN(count) || count <= 0) {
  console.error('Please provide a valid positive number');
  process.exit(1);
}

const users = generateUsers(count);

// Save to JSON file
const outputFile = `fake_users_${Date.now()}.json`;
fs.writeFileSync(outputFile, JSON.stringify(users, null, 2));

console.log(`${count} fake users --> saved to "${outputFile}"\n`);
