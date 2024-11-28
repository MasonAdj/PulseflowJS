// Length Conversions
export function kilometersToMiles(kilometers: number): number {
  const conversionFactor = 0.621371;
  return kilometers * conversionFactor;
}

export function milesToKilometers(miles: number): number {
  const conversionFactor = 1.60934;
  return miles * conversionFactor;
}

// Speed Conversions
export function mphToKph(mph: number): number {
  const conversionFactor = 1.60934;
  return mph * conversionFactor;
}

export function kphToMph(kph: number): number {
  const conversionFactor = 0.621371;
  return kph * conversionFactor;
}

export function knotsToKph(knots: number): number {
  const conversionFactor = 1.852;
  return knots * conversionFactor;
}

export function kphToKnots(kph: number): number {
  const conversionFactor = 1 / 1.852;
  return kph * conversionFactor;
}

export function mphToKnots(mph: number): number {
  const conversionFactor = 0.868976; // 1 mph = 0.868976 knots
  return mph * conversionFactor;
}

export function knotsToMph(knots: number): number {
  const conversionFactor = 1.15078; // 1 knot = 1.15078 mph
  return knots * conversionFactor;
}

// Temperature Conversions
export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9;
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9 / 5) + 32;
}

export function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15;
}

export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

export function fahrenheitToKelvin(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9 + 273.15;
}

export function kelvinToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * 9 / 5 + 32;
}

// Weight Conversions
export function kgToLbs(kilograms: number): number {
  const conversionFactor = 2.20462;
  return kilograms * conversionFactor;
}

export function lbsToKg(pounds: number): number {
  const conversionFactor = 1 / 2.20462;
  return pounds * conversionFactor;
}

// Distance Conversions
export function metersToFeet(meters: number): number {
  const conversionFactor = 3.28084;
  return meters * conversionFactor;
}

export function feetToMeters(feet: number): number {
  const conversionFactor = 1 / 3.28084;
  return feet * conversionFactor;
}

// Area Conversions
export function squareMetersToSquareFeet(squareMeters: number): number {
  const conversionFactor = 10.7639;
  return squareMeters * conversionFactor;
}

export function squareFeetToSquareMeters(squareFeet: number): number {
  const conversionFactor = 1 / 10.7639;
  return squareFeet * conversionFactor;
}

// Volume Conversions
export function litersToGallons(liters: number): number {
  const conversionFactor = 0.264172;
  return liters * conversionFactor;
}

export function gallonsToLiters(gallons: number): number {
  const conversionFactor = 1 / 0.264172;
  return gallons * conversionFactor;
}

//Math Conversions
export function degreesToRadians(degrees: number): number {
  const conversionFactor = Math.PI / 180; // 1 degree = π/180 radians
  return degrees * conversionFactor;
}

export function radiansToDegrees(radians: number): number {
  const conversionFactor = 180 / Math.PI; // 1 radian = 180/π degrees
  return radians * conversionFactor;
}

export function kilometersToDegrees(lat: number, distanceKm: number): { latDeg: number; lonDeg: number } {
  const latDeg = distanceKm / 111; // Convert km to degrees for latitude

  // Calculate the degree increment for longitude at the given latitude
  const lonDeg = distanceKm / (111 * Math.cos(degreesToRadians(lat)));

  return { latDeg, lonDeg };
}