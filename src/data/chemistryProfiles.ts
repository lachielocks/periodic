import type { ChemistryProfile } from "@/lib/chem/types";

/** Per-element bonding profiles. Radii: Cordero et al. Dalton Trans. 2008 (pm); Z>96 estimated. */
export const chemistryProfiles: ChemistryProfile[] = [
  {
    "z": 1,
    "symbol": "H",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1,
      -1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 31,
    "radiusEstimated": false,
    "electronegativity": 2.2,
    "category": "nonmetal",
    "group": 1,
    "period": 1,
    "block": "s"
  },
  {
    "z": 2,
    "symbol": "He",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      0
    ],
    "maxCoordination": 0,
    "preferredCoordination": [
      0
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 28,
    "radiusEstimated": false,
    "electronegativity": null,
    "category": "noble-gas",
    "group": 18,
    "period": 1,
    "block": "s"
  },
  {
    "z": 3,
    "symbol": "Li",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 128,
    "radiusEstimated": false,
    "electronegativity": 0.98,
    "category": "alkali-metal",
    "group": 1,
    "period": 2,
    "block": "s"
  },
  {
    "z": 4,
    "symbol": "Be",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 96,
    "radiusEstimated": false,
    "electronegativity": 1.57,
    "category": "alkaline-earth",
    "group": 2,
    "period": 2,
    "block": "s"
  },
  {
    "z": 5,
    "symbol": "B",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 84,
    "radiusEstimated": false,
    "electronegativity": 2.04,
    "category": "metalloid",
    "group": 13,
    "period": 2,
    "block": "p"
  },
  {
    "z": 6,
    "symbol": "C",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4,
      -4,
      2
    ],
    "maxCoordination": 4,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 76,
    "radiusEstimated": false,
    "electronegativity": 2.55,
    "category": "nonmetal",
    "group": 14,
    "period": 2,
    "block": "p"
  },
  {
    "z": 7,
    "symbol": "N",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      3,
      -3,
      5
    ],
    "maxCoordination": 4,
    "preferredCoordination": [
      3
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 71,
    "radiusEstimated": false,
    "electronegativity": 3.04,
    "category": "nonmetal",
    "group": 15,
    "period": 2,
    "block": "p"
  },
  {
    "z": 8,
    "symbol": "O",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      -2,
      0
    ],
    "maxCoordination": 3,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 66,
    "radiusEstimated": false,
    "electronegativity": 3.44,
    "category": "nonmetal",
    "group": 16,
    "period": 2,
    "block": "p"
  },
  {
    "z": 9,
    "symbol": "F",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 57,
    "radiusEstimated": false,
    "electronegativity": 3.98,
    "category": "halogen",
    "group": 17,
    "period": 2,
    "block": "p"
  },
  {
    "z": 10,
    "symbol": "Ne",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0
    ],
    "maxCoordination": 0,
    "preferredCoordination": [
      0
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 58,
    "radiusEstimated": false,
    "electronegativity": null,
    "category": "noble-gas",
    "group": 18,
    "period": 2,
    "block": "p"
  },
  {
    "z": 11,
    "symbol": "Na",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 166,
    "radiusEstimated": false,
    "electronegativity": 0.93,
    "category": "alkali-metal",
    "group": 1,
    "period": 3,
    "block": "s"
  },
  {
    "z": 12,
    "symbol": "Mg",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 141,
    "radiusEstimated": false,
    "electronegativity": 1.31,
    "category": "alkaline-earth",
    "group": 2,
    "period": 3,
    "block": "s"
  },
  {
    "z": 13,
    "symbol": "Al",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 121,
    "radiusEstimated": false,
    "electronegativity": 1.61,
    "category": "post-transition",
    "group": 13,
    "period": 3,
    "block": "p"
  },
  {
    "z": 14,
    "symbol": "Si",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4,
      -4,
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 111,
    "radiusEstimated": false,
    "electronegativity": 1.9,
    "category": "metalloid",
    "group": 14,
    "period": 3,
    "block": "p"
  },
  {
    "z": 15,
    "symbol": "P",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      3,
      -3,
      5
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 107,
    "radiusEstimated": false,
    "electronegativity": 2.19,
    "category": "nonmetal",
    "group": 15,
    "period": 3,
    "block": "p"
  },
  {
    "z": 16,
    "symbol": "S",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 105,
    "radiusEstimated": false,
    "electronegativity": 2.58,
    "category": "nonmetal",
    "group": 16,
    "period": 3,
    "block": "p"
  },
  {
    "z": 17,
    "symbol": "Cl",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1,
      1,
      3,
      5,
      7
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 102,
    "radiusEstimated": false,
    "electronegativity": 3.16,
    "category": "halogen",
    "group": 17,
    "period": 3,
    "block": "p"
  },
  {
    "z": 18,
    "symbol": "Ar",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0
    ],
    "maxCoordination": 0,
    "preferredCoordination": [
      0
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 106,
    "radiusEstimated": false,
    "electronegativity": null,
    "category": "noble-gas",
    "group": 18,
    "period": 3,
    "block": "p"
  },
  {
    "z": 19,
    "symbol": "K",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 203,
    "radiusEstimated": false,
    "electronegativity": 0.82,
    "category": "alkali-metal",
    "group": 1,
    "period": 4,
    "block": "s"
  },
  {
    "z": 20,
    "symbol": "Ca",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 176,
    "radiusEstimated": false,
    "electronegativity": 1,
    "category": "alkaline-earth",
    "group": 2,
    "period": 4,
    "block": "s"
  },
  {
    "z": 21,
    "symbol": "Sc",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 170,
    "radiusEstimated": false,
    "electronegativity": 1.36,
    "category": "transition-metal",
    "group": 3,
    "period": 4,
    "block": "d"
  },
  {
    "z": 22,
    "symbol": "Ti",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4,
      3,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 160,
    "radiusEstimated": false,
    "electronegativity": 1.54,
    "category": "transition-metal",
    "group": 4,
    "period": 4,
    "block": "d"
  },
  {
    "z": 23,
    "symbol": "V",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      5,
      4,
      3,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 153,
    "radiusEstimated": false,
    "electronegativity": 1.63,
    "category": "transition-metal",
    "group": 5,
    "period": 4,
    "block": "d"
  },
  {
    "z": 24,
    "symbol": "Cr",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      3,
      6,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 139,
    "radiusEstimated": false,
    "electronegativity": 1.66,
    "category": "transition-metal",
    "group": 6,
    "period": 4,
    "block": "d"
  },
  {
    "z": 25,
    "symbol": "Mn",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      2,
      4,
      7
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 150,
    "radiusEstimated": false,
    "electronegativity": 1.55,
    "category": "transition-metal",
    "group": 7,
    "period": 4,
    "block": "d"
  },
  {
    "z": 26,
    "symbol": "Fe",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      2,
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 142,
    "radiusEstimated": false,
    "electronegativity": 1.83,
    "category": "transition-metal",
    "group": 8,
    "period": 4,
    "block": "d"
  },
  {
    "z": 27,
    "symbol": "Co",
    "valenceElectrons": 9,
    "commonOxidationStates": [
      2,
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 138,
    "radiusEstimated": false,
    "electronegativity": 1.88,
    "category": "transition-metal",
    "group": 9,
    "period": 4,
    "block": "d"
  },
  {
    "z": 28,
    "symbol": "Ni",
    "valenceElectrons": 10,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 124,
    "radiusEstimated": false,
    "electronegativity": 1.91,
    "category": "transition-metal",
    "group": 10,
    "period": 4,
    "block": "d"
  },
  {
    "z": 29,
    "symbol": "Cu",
    "valenceElectrons": 11,
    "commonOxidationStates": [
      2,
      1
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 132,
    "radiusEstimated": false,
    "electronegativity": 1.9,
    "category": "transition-metal",
    "group": 11,
    "period": 4,
    "block": "d"
  },
  {
    "z": 30,
    "symbol": "Zn",
    "valenceElectrons": 12,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 122,
    "radiusEstimated": false,
    "electronegativity": 1.65,
    "category": "transition-metal",
    "group": 12,
    "period": 4,
    "block": "d"
  },
  {
    "z": 31,
    "symbol": "Ga",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 122,
    "radiusEstimated": false,
    "electronegativity": 1.81,
    "category": "post-transition",
    "group": 13,
    "period": 4,
    "block": "p"
  },
  {
    "z": 32,
    "symbol": "Ge",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4,
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 120,
    "radiusEstimated": false,
    "electronegativity": 2.01,
    "category": "metalloid",
    "group": 14,
    "period": 4,
    "block": "p"
  },
  {
    "z": 33,
    "symbol": "As",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      3,
      -3,
      5
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 119,
    "radiusEstimated": false,
    "electronegativity": 2.18,
    "category": "metalloid",
    "group": 15,
    "period": 4,
    "block": "p"
  },
  {
    "z": 34,
    "symbol": "Se",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 3,
    "covalentRadiusSinglePm": 120,
    "radiusEstimated": false,
    "electronegativity": 2.55,
    "category": "nonmetal",
    "group": 16,
    "period": 4,
    "block": "p"
  },
  {
    "z": 35,
    "symbol": "Br",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1,
      1,
      3,
      5
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 120,
    "radiusEstimated": false,
    "electronegativity": 2.96,
    "category": "halogen",
    "group": 17,
    "period": 4,
    "block": "p"
  },
  {
    "z": 36,
    "symbol": "Kr",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0,
      2
    ],
    "maxCoordination": 0,
    "preferredCoordination": [
      0
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 116,
    "radiusEstimated": false,
    "electronegativity": 3,
    "category": "noble-gas",
    "group": 18,
    "period": 4,
    "block": "p"
  },
  {
    "z": 37,
    "symbol": "Rb",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 220,
    "radiusEstimated": false,
    "electronegativity": 0.82,
    "category": "alkali-metal",
    "group": 1,
    "period": 5,
    "block": "s"
  },
  {
    "z": 38,
    "symbol": "Sr",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 195,
    "radiusEstimated": false,
    "electronegativity": 0.95,
    "category": "alkaline-earth",
    "group": 2,
    "period": 5,
    "block": "s"
  },
  {
    "z": 39,
    "symbol": "Y",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 190,
    "radiusEstimated": false,
    "electronegativity": 1.22,
    "category": "transition-metal",
    "group": 3,
    "period": 5,
    "block": "d"
  },
  {
    "z": 40,
    "symbol": "Zr",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 175,
    "radiusEstimated": false,
    "electronegativity": 1.33,
    "category": "transition-metal",
    "group": 4,
    "period": 5,
    "block": "d"
  },
  {
    "z": 41,
    "symbol": "Nb",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      5,
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 164,
    "radiusEstimated": false,
    "electronegativity": 1.6,
    "category": "transition-metal",
    "group": 5,
    "period": 5,
    "block": "d"
  },
  {
    "z": 42,
    "symbol": "Mo",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      6,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 154,
    "radiusEstimated": false,
    "electronegativity": 2.16,
    "category": "transition-metal",
    "group": 6,
    "period": 5,
    "block": "d"
  },
  {
    "z": 43,
    "symbol": "Tc",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      7,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 147,
    "radiusEstimated": false,
    "electronegativity": 1.9,
    "category": "transition-metal",
    "group": 7,
    "period": 5,
    "block": "d"
  },
  {
    "z": 44,
    "symbol": "Ru",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      3,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 146,
    "radiusEstimated": false,
    "electronegativity": 2.2,
    "category": "transition-metal",
    "group": 8,
    "period": 5,
    "block": "d"
  },
  {
    "z": 45,
    "symbol": "Rh",
    "valenceElectrons": 9,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 142,
    "radiusEstimated": false,
    "electronegativity": 2.28,
    "category": "transition-metal",
    "group": 9,
    "period": 5,
    "block": "d"
  },
  {
    "z": 46,
    "symbol": "Pd",
    "valenceElectrons": 10,
    "commonOxidationStates": [
      2,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 139,
    "radiusEstimated": false,
    "electronegativity": 2.2,
    "category": "transition-metal",
    "group": 10,
    "period": 5,
    "block": "d"
  },
  {
    "z": 47,
    "symbol": "Ag",
    "valenceElectrons": 11,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 145,
    "radiusEstimated": false,
    "electronegativity": 1.93,
    "category": "transition-metal",
    "group": 11,
    "period": 5,
    "block": "d"
  },
  {
    "z": 48,
    "symbol": "Cd",
    "valenceElectrons": 12,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 144,
    "radiusEstimated": false,
    "electronegativity": 1.69,
    "category": "transition-metal",
    "group": 12,
    "period": 5,
    "block": "d"
  },
  {
    "z": 49,
    "symbol": "In",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 142,
    "radiusEstimated": false,
    "electronegativity": 1.78,
    "category": "post-transition",
    "group": 13,
    "period": 5,
    "block": "p"
  },
  {
    "z": 50,
    "symbol": "Sn",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4,
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 139,
    "radiusEstimated": false,
    "electronegativity": 1.96,
    "category": "post-transition",
    "group": 14,
    "period": 5,
    "block": "p"
  },
  {
    "z": 51,
    "symbol": "Sb",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      3,
      -3,
      5
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 139,
    "radiusEstimated": false,
    "electronegativity": 2.05,
    "category": "metalloid",
    "group": 15,
    "period": 5,
    "block": "p"
  },
  {
    "z": 52,
    "symbol": "Te",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metalloid",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 138,
    "radiusEstimated": false,
    "electronegativity": 2.1,
    "category": "metalloid",
    "group": 16,
    "period": 5,
    "block": "p"
  },
  {
    "z": 53,
    "symbol": "I",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1,
      1,
      5,
      7
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 139,
    "radiusEstimated": false,
    "electronegativity": 2.66,
    "category": "halogen",
    "group": 17,
    "period": 5,
    "block": "p"
  },
  {
    "z": 54,
    "symbol": "Xe",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0,
      2,
      4,
      6
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      2,
      4,
      6
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 140,
    "radiusEstimated": false,
    "electronegativity": 2.6,
    "category": "noble-gas",
    "group": 18,
    "period": 5,
    "block": "p"
  },
  {
    "z": 55,
    "symbol": "Cs",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 244,
    "radiusEstimated": false,
    "electronegativity": 0.79,
    "category": "alkali-metal",
    "group": 1,
    "period": 6,
    "block": "s"
  },
  {
    "z": 56,
    "symbol": "Ba",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 215,
    "radiusEstimated": false,
    "electronegativity": 0.89,
    "category": "alkaline-earth",
    "group": 2,
    "period": 6,
    "block": "s"
  },
  {
    "z": 57,
    "symbol": "La",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 207,
    "radiusEstimated": false,
    "electronegativity": 1.1,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 58,
    "symbol": "Ce",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 204,
    "radiusEstimated": false,
    "electronegativity": 1.12,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 59,
    "symbol": "Pr",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 203,
    "radiusEstimated": false,
    "electronegativity": 1.13,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 60,
    "symbol": "Nd",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 201,
    "radiusEstimated": false,
    "electronegativity": 1.14,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 61,
    "symbol": "Pm",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 199,
    "radiusEstimated": false,
    "electronegativity": null,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 62,
    "symbol": "Sm",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 198,
    "radiusEstimated": false,
    "electronegativity": 1.17,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 63,
    "symbol": "Eu",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 198,
    "radiusEstimated": false,
    "electronegativity": 1.2,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 64,
    "symbol": "Gd",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 196,
    "radiusEstimated": false,
    "electronegativity": 1.2,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 65,
    "symbol": "Tb",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 194,
    "radiusEstimated": false,
    "electronegativity": 1.2,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 66,
    "symbol": "Dy",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 192,
    "radiusEstimated": false,
    "electronegativity": 1.22,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 67,
    "symbol": "Ho",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 192,
    "radiusEstimated": false,
    "electronegativity": 1.23,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 68,
    "symbol": "Er",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 189,
    "radiusEstimated": false,
    "electronegativity": 1.24,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 69,
    "symbol": "Tm",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 190,
    "radiusEstimated": false,
    "electronegativity": 1.25,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 70,
    "symbol": "Yb",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3,
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 187,
    "radiusEstimated": false,
    "electronegativity": 1.1,
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f"
  },
  {
    "z": 71,
    "symbol": "Lu",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 187,
    "radiusEstimated": false,
    "electronegativity": 1.27,
    "category": "lanthanide",
    "group": 3,
    "period": 6,
    "block": "d"
  },
  {
    "z": 72,
    "symbol": "Hf",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 175,
    "radiusEstimated": false,
    "electronegativity": 1.3,
    "category": "transition-metal",
    "group": 4,
    "period": 6,
    "block": "d"
  },
  {
    "z": 73,
    "symbol": "Ta",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      5
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 170,
    "radiusEstimated": false,
    "electronegativity": 1.5,
    "category": "transition-metal",
    "group": 5,
    "period": 6,
    "block": "d"
  },
  {
    "z": 74,
    "symbol": "W",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      6,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 162,
    "radiusEstimated": false,
    "electronegativity": 2.36,
    "category": "transition-metal",
    "group": 6,
    "period": 6,
    "block": "d"
  },
  {
    "z": 75,
    "symbol": "Re",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      7,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 151,
    "radiusEstimated": false,
    "electronegativity": 1.9,
    "category": "transition-metal",
    "group": 7,
    "period": 6,
    "block": "d"
  },
  {
    "z": 76,
    "symbol": "Os",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      4,
      8
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 144,
    "radiusEstimated": false,
    "electronegativity": 2.2,
    "category": "transition-metal",
    "group": 8,
    "period": 6,
    "block": "d"
  },
  {
    "z": 77,
    "symbol": "Ir",
    "valenceElectrons": 9,
    "commonOxidationStates": [
      3,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 141,
    "radiusEstimated": false,
    "electronegativity": 2.2,
    "category": "transition-metal",
    "group": 9,
    "period": 6,
    "block": "d"
  },
  {
    "z": 78,
    "symbol": "Pt",
    "valenceElectrons": 10,
    "commonOxidationStates": [
      2,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 136,
    "radiusEstimated": false,
    "electronegativity": 2.28,
    "category": "transition-metal",
    "group": 10,
    "period": 6,
    "block": "d"
  },
  {
    "z": 79,
    "symbol": "Au",
    "valenceElectrons": 11,
    "commonOxidationStates": [
      3,
      1
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 136,
    "radiusEstimated": false,
    "electronegativity": 2.54,
    "category": "transition-metal",
    "group": 11,
    "period": 6,
    "block": "d"
  },
  {
    "z": 80,
    "symbol": "Hg",
    "valenceElectrons": 12,
    "commonOxidationStates": [
      2,
      1
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 132,
    "radiusEstimated": false,
    "electronegativity": 2,
    "category": "transition-metal",
    "group": 12,
    "period": 6,
    "block": "d"
  },
  {
    "z": 81,
    "symbol": "Tl",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      1,
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 145,
    "radiusEstimated": false,
    "electronegativity": 1.62,
    "category": "post-transition",
    "group": 13,
    "period": 6,
    "block": "p"
  },
  {
    "z": 82,
    "symbol": "Pb",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      2,
      4
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 146,
    "radiusEstimated": false,
    "electronegativity": 2.33,
    "category": "post-transition",
    "group": 14,
    "period": 6,
    "block": "p"
  },
  {
    "z": 83,
    "symbol": "Bi",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      3,
      5
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 148,
    "radiusEstimated": false,
    "electronegativity": 2.02,
    "category": "post-transition",
    "group": 15,
    "period": 6,
    "block": "p"
  },
  {
    "z": 84,
    "symbol": "Po",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      2,
      4
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 140,
    "radiusEstimated": false,
    "electronegativity": 2,
    "category": "post-transition",
    "group": 16,
    "period": 6,
    "block": "p"
  },
  {
    "z": 85,
    "symbol": "At",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1,
      1
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "nonmetal",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 2,
    "covalentRadiusSinglePm": 150,
    "radiusEstimated": true,
    "electronegativity": 2.2,
    "category": "halogen",
    "group": 17,
    "period": 6,
    "block": "p"
  },
  {
    "z": 86,
    "symbol": "Rn",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0,
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      2,
      4,
      6
    ],
    "bondBehavior": "noble",
    "allowsExpandedOctet": true,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 150,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "noble-gas",
    "group": 18,
    "period": 6,
    "block": "p"
  },
  {
    "z": 87,
    "symbol": "Fr",
    "valenceElectrons": 1,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 1,
    "preferredCoordination": [
      1
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 260,
    "radiusEstimated": true,
    "electronegativity": 0.7,
    "category": "alkali-metal",
    "group": 1,
    "period": 7,
    "block": "s"
  },
  {
    "z": 88,
    "symbol": "Ra",
    "valenceElectrons": 2,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 2,
    "preferredCoordination": [
      2
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 221,
    "radiusEstimated": false,
    "electronegativity": 0.9,
    "category": "alkaline-earth",
    "group": 2,
    "period": 7,
    "block": "s"
  },
  {
    "z": 89,
    "symbol": "Ac",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 215,
    "radiusEstimated": false,
    "electronegativity": 1.1,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 90,
    "symbol": "Th",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 206,
    "radiusEstimated": false,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 91,
    "symbol": "Pa",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      5,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 200,
    "radiusEstimated": false,
    "electronegativity": 1.5,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 92,
    "symbol": "U",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      6,
      4,
      5
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 196,
    "radiusEstimated": false,
    "electronegativity": 1.38,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 93,
    "symbol": "Np",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      5,
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 190,
    "radiusEstimated": false,
    "electronegativity": 1.36,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 94,
    "symbol": "Pu",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      4,
      6
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 187,
    "radiusEstimated": false,
    "electronegativity": 1.28,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 95,
    "symbol": "Am",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 180,
    "radiusEstimated": false,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 96,
    "symbol": "Cm",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 169,
    "radiusEstimated": false,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 97,
    "symbol": "Bk",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 168,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 98,
    "symbol": "Cf",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 168,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 99,
    "symbol": "Es",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 165,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 100,
    "symbol": "Fm",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 167,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 101,
    "symbol": "Md",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 173,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 102,
    "symbol": "No",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      2,
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 176,
    "radiusEstimated": true,
    "electronegativity": 1.3,
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f"
  },
  {
    "z": 103,
    "symbol": "Lr",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      6,
      8,
      9
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 161,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "actinide",
    "group": 3,
    "period": 7,
    "block": "d"
  },
  {
    "z": 104,
    "symbol": "Rf",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      4
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 157,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 4,
    "period": 7,
    "block": "d"
  },
  {
    "z": 105,
    "symbol": "Db",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      5
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 149,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 5,
    "period": 7,
    "block": "d"
  },
  {
    "z": 106,
    "symbol": "Sg",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      6
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 143,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 6,
    "period": 7,
    "block": "d"
  },
  {
    "z": 107,
    "symbol": "Bh",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      7
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 141,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 7,
    "period": 7,
    "block": "d"
  },
  {
    "z": 108,
    "symbol": "Hs",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      8
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 134,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 8,
    "period": 7,
    "block": "d"
  },
  {
    "z": 109,
    "symbol": "Mt",
    "valenceElectrons": 9,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 129,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 9,
    "period": 7,
    "block": "d"
  },
  {
    "z": 110,
    "symbol": "Ds",
    "valenceElectrons": 10,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 128,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 10,
    "period": 7,
    "block": "d"
  },
  {
    "z": 111,
    "symbol": "Rg",
    "valenceElectrons": 11,
    "commonOxidationStates": [
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 121,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 11,
    "period": 7,
    "block": "d"
  },
  {
    "z": 112,
    "symbol": "Cn",
    "valenceElectrons": 12,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 9,
    "preferredCoordination": [
      4,
      6
    ],
    "bondBehavior": "metal",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 122,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "transition-metal",
    "group": 12,
    "period": 7,
    "block": "d"
  },
  {
    "z": 113,
    "symbol": "Nh",
    "valenceElectrons": 3,
    "commonOxidationStates": [
      1
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 136,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 13,
    "period": 7,
    "block": "p"
  },
  {
    "z": 114,
    "symbol": "Fl",
    "valenceElectrons": 4,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 143,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 14,
    "period": 7,
    "block": "p"
  },
  {
    "z": 115,
    "symbol": "Mc",
    "valenceElectrons": 5,
    "commonOxidationStates": [
      1,
      3
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 162,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 15,
    "period": 7,
    "block": "p"
  },
  {
    "z": 116,
    "symbol": "Lv",
    "valenceElectrons": 6,
    "commonOxidationStates": [
      2
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 175,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 16,
    "period": 7,
    "block": "p"
  },
  {
    "z": 117,
    "symbol": "Ts",
    "valenceElectrons": 7,
    "commonOxidationStates": [
      -1,
      1
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 165,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 17,
    "period": 7,
    "block": "p"
  },
  {
    "z": 118,
    "symbol": "Og",
    "valenceElectrons": 8,
    "commonOxidationStates": [
      0
    ],
    "maxCoordination": 6,
    "preferredCoordination": [
      4
    ],
    "bondBehavior": "unknown",
    "allowsExpandedOctet": false,
    "minBondOrder": 1,
    "maxBondOrder": 1,
    "covalentRadiusSinglePm": 157,
    "radiusEstimated": true,
    "electronegativity": null,
    "category": "unknown",
    "group": 18,
    "period": 7,
    "block": "p"
  }
];

export const chemistryByZ = Object.fromEntries(
  chemistryProfiles.map((p) => [p.z, p])
) as Record<number, ChemistryProfile>;

export function getChemistryProfile(z: number): ChemistryProfile {
  const p = chemistryByZ[z];
  if (!p) throw new Error(`No chemistry profile for Z=${z}`);
  return p;
}
