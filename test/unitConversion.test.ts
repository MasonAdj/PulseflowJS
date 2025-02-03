import {
  kilometersToMiles, milesToKilometers, mphToKph, kphToMph, knotsToKph, kphToKnots,
  mphToKnots, knotsToMph, fahrenheitToCelsius, celsiusToFahrenheit, celsiusToKelvin,
  kelvinToCelsius, fahrenheitToKelvin, kelvinToFahrenheit, kgToLbs, lbsToKg,
  metersToFeet, feetToMeters, squareMetersToSquareFeet, squareFeetToSquareMeters,
  litersToGallons, gallonsToLiters, degreesToRadians, radiansToDegrees,
  kilometersToDegrees
} from '../src/unitConversion';

describe('Length Conversions', () => {
  test('kilometersToMiles', () => {
    expect(kilometersToMiles(1)).toBeCloseTo(0.621371);
    expect(kilometersToMiles(0)).toBe(0);
  });

  test('milesToKilometers', () => {
    expect(milesToKilometers(1)).toBeCloseTo(1.60934);
    expect(milesToKilometers(0)).toBe(0);
  });
});

describe('Speed Conversions', () => {
  test('mphToKph', () => {
    expect(mphToKph(1)).toBeCloseTo(1.60934);
    expect(mphToKph(0)).toBe(0);
  });

  test('kphToMph', () => {
    expect(kphToMph(1)).toBeCloseTo(0.621371);
    expect(kphToMph(0)).toBe(0);
  });

  test('knotsToKph', () => {
    expect(knotsToKph(1)).toBeCloseTo(1.852);
    expect(knotsToKph(0)).toBe(0);
  });

  test('kphToKnots', () => {
    expect(kphToKnots(1)).toBeCloseTo(1 / 1.852);
    expect(kphToKnots(0)).toBe(0);
  });

  test('mphToKnots', () => {
    expect(mphToKnots(1)).toBeCloseTo(0.868976);
    expect(mphToKnots(0)).toBe(0);
  });

  test('knotsToMph', () => {
    expect(knotsToMph(1)).toBeCloseTo(1.15078);
    expect(knotsToMph(0)).toBe(0);
  });
});

describe('Temperature Conversions', () => {
  test('fahrenheitToCelsius', () => {
    expect(fahrenheitToCelsius(32)).toBeCloseTo(0);
    expect(fahrenheitToCelsius(212)).toBeCloseTo(100);
  });

  test('celsiusToFahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBeCloseTo(32);
    expect(celsiusToFahrenheit(100)).toBeCloseTo(212);
  });

  test('celsiusToKelvin', () => {
    expect(celsiusToKelvin(0)).toBeCloseTo(273.15);
  });

  test('kelvinToCelsius', () => {
    expect(kelvinToCelsius(273.15)).toBeCloseTo(0);
  });

  test('fahrenheitToKelvin', () => {
    expect(fahrenheitToKelvin(32)).toBeCloseTo(273.15);
  });

  test('kelvinToFahrenheit', () => {
    expect(kelvinToFahrenheit(273.15)).toBeCloseTo(32);
  });
});

describe('Weight Conversions', () => {
  test('kgToLbs', () => {
    expect(kgToLbs(1)).toBeCloseTo(2.20462);
    expect(kgToLbs(0)).toBe(0);
  });

  test('lbsToKg', () => {
    expect(lbsToKg(1)).toBeCloseTo(1 / 2.20462);
    expect(lbsToKg(0)).toBe(0);
  });
});

describe('Distance Conversions', () => {
  test('metersToFeet', () => {
    expect(metersToFeet(1)).toBeCloseTo(3.28084);
    expect(metersToFeet(0)).toBe(0);
  });

  test('feetToMeters', () => {
    expect(feetToMeters(1)).toBeCloseTo(1 / 3.28084);
    expect(feetToMeters(0)).toBe(0);
  });
});

describe('Area Conversions', () => {
  test('squareMetersToSquareFeet', () => {
    expect(squareMetersToSquareFeet(1)).toBeCloseTo(10.7639);
    expect(squareMetersToSquareFeet(0)).toBe(0);
  });

  test('squareFeetToSquareMeters', () => {
    expect(squareFeetToSquareMeters(1)).toBeCloseTo(1 / 10.7639);
    expect(squareFeetToSquareMeters(0)).toBe(0);
  });
});

describe('Volume Conversions', () => {
  test('litersToGallons', () => {
    expect(litersToGallons(1)).toBeCloseTo(0.264172);
    expect(litersToGallons(0)).toBe(0);
  });

  test('gallonsToLiters', () => {
    expect(gallonsToLiters(1)).toBeCloseTo(1 / 0.264172);
    expect(gallonsToLiters(0)).toBe(0);
  });
});

describe('Math Conversions', () => {
  test('degreesToRadians', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(degreesToRadians(0)).toBe(0);
  });

  test('radiansToDegrees', () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
    expect(radiansToDegrees(0)).toBe(0);
  });

  test('kilometersToDegrees', () => {
    const result = kilometersToDegrees(0, 111);
    expect(result.latDeg).toBeCloseTo(1);
    expect(result.lonDeg).toBeCloseTo(1);
  });

  test('inputValidation', () => {
    expect(() => radiansToDegrees(NaN)).toThrow('radiansToDegrees expects a valid finite number.');
  });
  
});
