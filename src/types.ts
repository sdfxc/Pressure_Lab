/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type LabTab = 'solid' | 'fluid' | 'pascal' | 'atmosphere' | 'applications' | 'quiz';

export interface SolidMaterial {
  name: string;
  density: number; // kg/m^3
  color: string;
}

export interface LiquidType {
  id: string;
  name: string;
  density: number; // kg/m^3
  color: string;
}
