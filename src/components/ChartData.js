// chartData.js
export const awsData = [
    { date: '2023-01-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-02-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-03-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-04-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-05-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-06-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-07-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-08-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-09-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-10-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-11-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-12-01', co2Emissions: getRandomNumber(0, 4000) },
    // Add more AWS data points as needed
  ];
  
  export const azureData = [
    { date: '2023-01-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-02-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-03-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-04-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-05-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-06-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-07-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-08-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-09-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-10-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-11-01', co2Emissions: getRandomNumber(0, 4000) },
    { date: '2023-12-01', co2Emissions: getRandomNumber(0, 4000) },
    // Add more Azure data points as needed
  ];
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  export default {
    awsData,
    azureData,
  };
  