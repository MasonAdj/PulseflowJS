# Unit Conversions

This segment encompasses unit conversions for use either standalone, or to be used to help get data formatted in the correct units for algorithms included in other sections of PulseFlow.

## Length Conversions

### `kilometersToMiles(kilometers: number): number`

- **Description**: Converts kilometers to miles.
- **Inputs**:
  - `kilometers` (number): The distance in kilometers.
- **Outputs**:
  - The equivalent distance in miles.
- **Example**:
  ```javascript
  import { kilometersToMiles } from "pulseflowjs";
  const miles = kilometersToMiles(10); // 6.21371
  ```

### `milesToKilometers(miles: number): number`

- **Description**: Converts miles to kilometers.
- **Inputs**:
  - `miles` (number): The distance in miles.
- **Outputs**:
  - The equivalent distance in kilometers.
- **Example**:
  ```javascript
  import { milesToKilometers } from "pulseflowjs";
  const kilometers = milesToKilometers(10); // 16.0934
  ```

## Speed conversions

### `mphToKph(mph: number): number`

- **Description**: Converts miles per hour (mph) to kilometers per hour (kph).
- **Inputs**:
  - `mph` (number): Speed in miles per hour.
- **Outputs**:
  - The equivalent speed in kilometers per hour.
- **Example**:
  ```javascript
  import { mphToKph } from "pulseflowjs";
  const kph = mphToKph(60); // 96.5604
  ```

### `kphToMph(kph: number): number`

- **Description**: Converts kilometers per hour (kph) to miles per hour (mph).
- **Inputs**:
  - `kph` (number): Speed in kilometers per hour.
- **Outputs**:
  - The equivalent speed in miles per hour.
- **Example**:
  ```javascript
  import { kphToMph } from "pulseflowjs";
  const mph = kphToMph(100); // 62.1371
  ```

### `knotsToKph(knots: number): number`

- **Description**: Converts knots to kilometers per hour (kph).
- **Inputs**:
  - `knots` (number): Speed in knots.
- **Outputs**:
  - The equivalent speed in kilometers per hour.
- **Example**:
  ```javascript
  import { knotsToKph } from "pulseflowjs";
  const kph = knotsToKph(10); // 18.52
  ```

### `kphToKnots(kph: number): number`

- **Description**: Converts kilometers per hour (kph) to knots.
- **Inputs**:
  - `kph` (number): Speed in kilometers per hour.
- **Outputs**:
  - The equivalent speed in knots.
- **Example**:
  ```javascript
  import { kphToKnots } from "pulseflowjs";
  const knots = kphToKnots(20); // 10.7999
  ```

### `mphToKnots(mph: number): number`

- **Description**: Converts miles per hour (mph) to knots.
- **Inputs**:
  - `mph` (number): Speed in miles per hour.
- **Outputs**:
  - The equivalent speed in knots.
- **Example**:
  ```javascript
  import { mphToKnots } from "pulseflowjs";
  const knots = mphToKnots(30); // 26.06928
  ```

### `kphToKnots(kph: number): number`

- **Description**: Converts kilometers per hour (kph) to knots.
- **Inputs**:
  - `kph` (number): Speed in kilometers per hour.
- **Outputs**:
  - The equivalent speed in knots.
- **Example**:
  ```javascript
  import { kphToKnots } from "pulseflowjs";
  const knots = kphToKnots(50); // 26.9988
  ```

### `mphToKnots(mph: number): number`

- **Description**: Converts miles per hour (mph) to knots.
- **Inputs**:
  - `mph` (number): Speed in miles per hour.
- **Outputs**:
  - The equivalent speed in knots.
- **Example**:
  ```javascript
  import { mphToKnots } from "pulseflowjs";
  const knots = mphToKnots(60); // 52.13856
  ```

### `knotsToMph(knots: number): number`

- **Description**: Converts knots to miles per hour (mph).
- **Inputs**:
  - `knots` (number): Speed in knots.
- **Outputs**:
  - The equivalent speed in miles per hour.
- **Example**:
  ```javascript
  import { knotsToMph } from "pulseflowjs";
  const mph = knotsToMph(20); // 23.0156
  ```

## Temperature Conversions

### `fahrenheitToCelsius(fahrenheit: number): number`

- **Description**: Converts Fahrenheit to Celsius.
- **Inputs**:
  - `fahrenheit` (number): Temperature in Fahrenheit.
- **Outputs**:
  - The equivalent temperature in Celsius.
- **Example**:
  ```javascript
  import { fahrenheitToCelsius } from "pulseflowjs";
  const celsius = fahrenheitToCelsius(98.6); // 37
  ```

### `celsiusToFahrenheit(celsius: number): number`

- **Description**: Converts Celsius to Fahrenheit.
- **Inputs**:
  - `celsius` (number): Temperature in Celsius.
- **Outputs**:
  - The equivalent temperature in Fahrenheit.
- **Example**:
  ```javascript
  import { celsiusToFahrenheit } from "pulseflowjs";
  const fahrenheit = celsiusToFahrenheit(25); // 77
  ```

### `celsiusToKelvin(celsius: number): number`

- **Description**: Converts Celsius to Kelvin.
- **Inputs**:
  - `celsius` (number): Temperature in Celsius.
- **Outputs**:
  - The equivalent temperature in Kelvin.
- **Example**:
  ```javascript
  import { celsiusToKelvin } from "pulseflowjs";
  const kelvin = celsiusToKelvin(0); // 273.15
  ```

### `kelvinToCelsius(kelvin: number): number`

- **Description**: Converts Kelvin to Celsius.
- **Inputs**:
  - `kelvin` (number): Temperature in Kelvin.
- **Outputs**:
  - The equivalent temperature in Celsius.
- **Example**:
  ```javascript
  import { kelvinToCelsius } from "pulseflowjs";
  const celsius = kelvinToCelsius(273.15); // 0
  ```

### `fahrenheitToKelvin(fahrenheit: number): number`

- **Description**: Converts Fahrenheit to Kelvin.
- **Inputs**:
  - `fahrenheit` (number): Temperature in Fahrenheit.
- **Outputs**:
  - The equivalent temperature in Kelvin.
- **Example**:
  ```javascript
  import { fahrenheitToKelvin } from "pulseflowjs";
  const kelvin = fahrenheitToKelvin(32); // 273.15
  ```

### `kelvinToFahrenheit(kelvin: number): number`

- **Description**: Converts Kelvin to Fahrenheit.
- **Inputs**:
  - `kelvin` (number): Temperature in Kelvin.
- **Outputs**:
  - The equivalent temperature in Fahrenheit.
- **Example**:
  ```javascript
  import { kelvinToFahrenheit } from "pulseflowjs";
  const fahrenheit = kelvinToFahrenheit(273.15); // 32
  ```

## Weight Conversions

### `kgToLbs(kilograms: number): number`

- **Description**: Converts kilograms to pounds.
- **Inputs**:
  - `kilograms` (number): Weight in kilograms.
- **Outputs**:
  - The equivalent weight in pounds.
- **Example**:
  ```javascript
  import { kgToLbs } from "pulseflowjs";
  const pounds = kgToLbs(5); // 11.0231
  ```

### `lbsToKg(pounds: number): number`

- **Description**: Converts pounds to kilograms.
- **Inputs**:
  - `pounds` (number): Weight in pounds.
- **Outputs**:
  - The equivalent weight in kilograms.
- **Example**:
  ```javascript
  import { lbsToKg } from "pulseflowjs";
  const kilograms = lbsToKg(10); // 4.53592
  ```

## Distance Conversions

### `metersToFeet(meters: number): number`

- **Description**: Converts meters to feet.
- **Inputs**:
  - `meters` (number): Distance in meters.
- **Outputs**:
  - The equivalent distance in feet.
- **Example**:
  ```javascript
  import { metersToFeet } from "pulseflowjs";
  const feet = metersToFeet(10); // 32.8084
  ```

### `feetToMeters(feet: number): number`

- **Description**: Converts feet to meters.
- **Inputs**:
  - `feet` (number): Distance in feet.
- **Outputs**:
  - The equivalent distance in meters.
- **Example**:
  ```javascript
  import { feetToMeters } from "pulseflowjs";
  const meters = feetToMeters(32.8084); // 10
  ```

## Area Conversions

### `squareMetersToSquareFeet(squareMeters: number): number`

- **Description**: Converts square meters to square feet.
- **Inputs**:
  - `squareMeters` (number): Area in square meters.
- **Outputs**:
  - The equivalent area in square feet.
- **Example**:
  ```javascript
  import { squareMetersToSquareFeet } from "pulseflowjs";
  const squareFeet = squareMetersToSquareFeet(10); // 107.639
  ```

### `squareFeetToSquareMeters(squareFeet: number): number`

- **Description**: Converts square feet to square meters.
- **Inputs**:
  - `squareFeet` (number): Area in square feet.
- **Outputs**:
  - The equivalent area in square meters.
- **Example**:
  ```javascript
  import { squareFeetToSquareMeters } from "pulseflowjs";
  const squareMeters = squareFeetToSquareMeters(107.639); // 10
  ```

## Volume Conversions

### `litersToGallons(liters: number): number`

- **Description**: Converts liters to gallons.
- **Inputs**:
  - `liters` (number): Volume in liters.
- **Outputs**:
  - The equivalent volume in gallons.
- **Example**:
  ```javascript
  import { litersToGallons } from "pulseflowjs";
  const gallons = litersToGallons(10); // 2.64172
  ```

### `gallonsToLiters(gallons: number): number`

- **Description**: Converts gallons to liters.
- **Inputs**:
  - `gallons` (number): Volume in gallons.
- **Outputs**:
  - The equivalent volume in liters.
- **Example**:
  ```javascript
  import { gallonsToLiters } from "pulseflowjs";
  const liters = gallonsToLiters(5); // 18.9271
  ```

## Math Conversions

### `degreesToRadians(degrees: number): number`

- **Description**: Converts degrees to radians.
- **Inputs**:
  - `degrees` (number): Angle in degrees.
- **Outputs**:
  - The equivalent angle in radians.
- **Example**:
  ```javascript
  import { degreesToRadians } from "pulseflowjs";
  const radians = degreesToRadians(180); // 3.14159
  ```

### `radiansToDegrees(radians: number): number`

- **Description**: Converts radians to degrees.
- **Inputs**:
  - `radians` (number): Angle in radians.
- **Outputs**:
  - The equivalent angle in degrees.
- **Example**:
  ```javascript
  import { radiansToDegrees } from "pulseflowjs";
  const degrees = radiansToDegrees(Math.PI); // 180
  ```

### `kilometersToDegrees(lat: number, distanceKm: number): { latDeg: number; lonDeg: number }`

- **Description**: Converts a distance in kilometers to latitude and longitude degree increments, based on the given latitude.
- **Inputs**:
  - `lat` (number): Latitude in degrees.
  - `distanceKm` (number): Distance in kilometers to convert.
- **Outputs**:
  - An object with two properties:
    - `latDeg` (number): The latitude degree increment corresponding to the distance in kilometers.
    - `lonDeg` (number): The longitude degree increment corresponding to the distance in kilometers.
- **Example**:
  ```javascript
  import { kilometersToDegrees } from "pulseflowjs";
  const { latDeg, lonDeg } = kilometersToDegrees(40, 100); // latDeg: 0.9009, lonDeg: 1.4139
  ```
