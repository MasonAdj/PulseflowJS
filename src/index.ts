// Re-exporting functions from barnesInterpolation.ts
export { 
  toRadians, 
  haversineDistance, 
  gaussianWeight, 
  windToComponents, 
  barnesInterpolation 
} from './barnesInterpolation';

// Re-exporting functions from cubicInterpolation.ts
export { 
  cubicInterpolate, 
  biCubicInterpolate, 
  triCubicInterpolate, 
  nCubicInterpolate 
} from './cubicInterpolation';
