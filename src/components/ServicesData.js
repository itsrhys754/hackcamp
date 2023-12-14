// AdditionalChartData.js
export const additionalData = [
    { date: 'AWS 01', Services: getRandomNumber(0, 4000) },
    { date: 'AWS 02', Services: getRandomNumber(0, 4000) },
    { date: 'Athena', Services: getRandomNumber(0, 4000) },
    { date: 'Athena 2', Services: getRandomNumber(0, 4000) },
    { date: 'EU-west', Services: getRandomNumber(0, 4000) },
    { date: 'US-east', Services: getRandomNumber(0, 4000) },
    { date: 'US-south', Services: getRandomNumber(0, 4000) },
    // Add more data points as needed
  ];
  
  // Helper function to generate random numbers
  export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  