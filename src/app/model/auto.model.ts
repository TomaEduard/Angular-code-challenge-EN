
export interface Vehicle<T, U, V> {
  type: T;
  subtype: U[];
  image: V;
}

// Auto
export type AutoType = 'Auto';
export type AutoSubtype =
  'Hatchback'
  | 'Sedan'
  | 'Station'
  | 'Cabriolet'
  | 'Coupé'
  | 'Multi Purpose Vehicle (MVP)'
  | 'Terreinauto';
export type AutoImage = 'assets/auto.jpg';

// Motor
export type MotorType = 'Motor';
export type MotorSubtype =
  'All-road'
  | 'Naked'
  | 'Enduro'
  | 'Race'
  | 'Toermotor'
  | 'Chopper'
  | 'Zijspan';

export type MotorImage = 'assets/motor.jpg';

// Scooter
export type ScooterType = 'Scooter';
export type ScooterSubtype = null;
export type ScooterImage = 'assets/scooter.jpg';

export const AUTO: Vehicle<AutoType, AutoSubtype, AutoImage> = {
  type: 'Auto',
  subtype: [
    'Hatchback',
    'Sedan',
    'Station',
    'Cabriolet',
    'Coupé',
    'Multi Purpose Vehicle (MVP)',
    'Terreinauto'
  ],
  image: 'assets/auto.jpg'
};
export const MOTOR: Vehicle<MotorType, MotorSubtype, MotorImage> = {
  type: 'Motor',
  subtype: [
    'All-road',
    'Naked',
    'Enduro',
    'Race',
    'Toermotor',
    'Chopper',
    'Zijspan'
  ],
  image: 'assets/motor.jpg'
};
export const SCOOTER: Vehicle<ScooterType, ScooterSubtype, ScooterImage> = {
  type: 'Scooter',
  subtype: [],
  image: 'assets/scooter.jpg'
};

export type AllType = AutoType | MotorType | ScooterType;

export interface Auto {
  auto: Vehicle<AutoType, AutoSubtype, AutoImage>;
}

export interface Motor {
  motor: Vehicle<MotorType, MotorSubtype, MotorImage>;
}

export interface Scooter {
  scooter: Vehicle<ScooterType, never, ScooterImage>; // Since ScooterSubtype is null, we use `never` here
}
export type AllVehicles = Auto | Motor | Scooter;
