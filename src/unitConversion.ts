// Helper Function for Input Validation
function validateNumber(value: number, functionName: string): void {
  if (typeof value !== "number" || !isFinite(value)) {
    throw new Error(`${functionName} expects a valid finite number.`);
  }
}

// Length Conversions
export function kilometersToMiles(kilometers: number): number {
  validateNumber(kilometers, "kilometersToMiles");
  return kilometers * 0.621371;
}

export function milesToKilometers(miles: number): number {
  validateNumber(miles, "milesToKilometers");
  return miles * 1.60934;
}

// Speed Conversions
export function mphToKph(mph: number): number {
  validateNumber(mph, "mphToKph");
  return mph * 1.60934;
}

export function kphToMph(kph: number): number {
  validateNumber(kph, "kphToMph");
  return kph * 0.621371;
}

export function knotsToKph(knots: number): number {
  validateNumber(knots, "knotsToKph");
  return knots * 1.852;
}

export function kphToKnots(kph: number): number {
  validateNumber(kph, "kphToKnots");
  return kph / 1.852;
}

export function mphToKnots(mph: number): number {
  validateNumber(mph, "mphToKnots");
  return mph * 0.868976;
}

export function knotsToMph(knots: number): number {
  validateNumber(knots, "knotsToMph");
  return knots * 1.15078;
}

// Temperature Conversions
export function fahrenheitToCelsius(fahrenheit: number): number {
  validateNumber(fahrenheit, "fahrenheitToCelsius");
  return ((fahrenheit - 32) * 5) / 9;
}

export function celsiusToFahrenheit(celsius: number): number {
  validateNumber(celsius, "celsiusToFahrenheit");
  return (celsius * 9) / 5 + 32;
}

export function celsiusToKelvin(celsius: number): number {
  validateNumber(celsius, "celsiusToKelvin");
  return celsius + 273.15;
}

export function kelvinToCelsius(kelvin: number): number {
  validateNumber(kelvin, "kelvinToCelsius");
  return kelvin - 273.15;
}

export function fahrenheitToKelvin(fahrenheit: number): number {
  validateNumber(fahrenheit, "fahrenheitToKelvin");
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

export function kelvinToFahrenheit(kelvin: number): number {
  validateNumber(kelvin, "kelvinToFahrenheit");
  return ((kelvin - 273.15) * 9) / 5 + 32;
}

// Weight Conversions
export function kgToLbs(kilograms: number): number {
  validateNumber(kilograms, "kgToLbs");
  return kilograms * 2.20462;
}

export function lbsToKg(pounds: number): number {
  validateNumber(pounds, "lbsToKg");
  return pounds / 2.20462;
}

// Distance Conversions
export function metersToFeet(meters: number): number {
  validateNumber(meters, "metersToFeet");
  return meters * 3.28084;
}

export function feetToMeters(feet: number): number {
  validateNumber(feet, "feetToMeters");
  return feet / 3.28084;
}

// Area Conversions
export function squareMetersToSquareFeet(squareMeters: number): number {
  validateNumber(squareMeters, "squareMetersToSquareFeet");
  return squareMeters * 10.7639;
}

export function squareFeetToSquareMeters(squareFeet: number): number {
  validateNumber(squareFeet, "squareFeetToSquareMeters");
  return squareFeet / 10.7639;
}

// Volume Conversions
export function litersToGallons(liters: number): number {
  validateNumber(liters, "litersToGallons");
  return liters * 0.264172;
}

export function gallonsToLiters(gallons: number): number {
  validateNumber(gallons, "gallonsToLiters");
  return gallons / 0.264172;
}

// Math Conversions
export function degreesToRadians(degrees: number): number {
  validateNumber(degrees, "degreesToRadians");
  return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
  validateNumber(radians, "radiansToDegrees");
  return radians * (180 / Math.PI);
}

export function kilometersToDegrees(
  lat: number,
  distanceKm: number
): { latDeg: number; lonDeg: number } {
  validateNumber(lat, "kilometersToDegrees (lat)");
  validateNumber(distanceKm, "kilometersToDegrees (distanceKm)");

  const latDeg = distanceKm / 111;
  const lonDeg = distanceKm / (111 * Math.cos(degreesToRadians(lat)));

  return { latDeg, lonDeg };
}
