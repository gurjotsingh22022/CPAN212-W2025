const LDash = require('lodash');
const moment = require('moment');

const holidays = [
  { name: 'Christmas', date: '2025-12-25' },
  { name: 'Canada Day', date: '2025-07-01' },
  { name: 'New Year', date: '2026-01-01' },
  { name: 'Thanksgiving', date: '2025-11-27' },
];

function daysUntil(date) {
  const today = moment();
  const holidayDate = moment(date);
  return holidayDate.diff(today, 'days');
}

console.log('Days until holidays:');
holidays.forEach(holiday => {
  const days = daysUntil(holiday.date);
  console.log(`${holiday.name}: ${days} days`);
});

const randomHoliday = LDash.sample(holidays);
console.log('\nRandom Holiday:', randomHoliday);

const christmasIndex = LDash.findIndex(holidays, { name: 'Christmas' });
const canadaDayIndex = LDash.findIndex(holidays, { name: 'Canada Day' });
console.log(`\nIndex of Christmas: ${christmasIndex}`);
console.log(`Index of Canada Day: ${canadaDayIndex}`);
