/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Weight, Layers, ChevronRight, HelpCircle, Activity, ArrowDown } from 'lucide-react';

interface SolidMaterial {
  name: string;
  density: number; // kg/m^3
  color: string;
  bgLight: string;
}

const MATERIALS: SolidMaterial[] = [
  { name: 'ដែកថែប (Steel)', density: 7850, color: '#4B5563', bgLight: 'bg-slate-600' },
  { name: 'ឈើ (Wood)', density: 700, color: '#D97706', bgLight: 'bg-amber-600' },
  { name: 'មាស (Gold)', density: 19300, color: '#F59E0B', bgLight: 'bg-yellow-500' },
  { name: 'ទឹកកក (Ice)', density: 917, color: '#38BDF8', bgLight: 'bg-sky-400' },
];

interface SupportSurface {
  name: string;
  k: number; // spring stiffness/sinking coefficient
  description: string;
}

const SURFACES: SupportSurface[] = [
  { name: 'ខ្សាច់ទន់ (Soft Sand)', k: 180, description: 'ស្រុតចុះខ្លាំងនៅពេលមានសម្ពាធខ្ពស់' },
  { name: 'អេប៉ុង (Sponge)', k: 100, description: 'យឺតខ្លាំង ឆាប់ស្រុតចុះ' },
  { name: 'ដីឥដ្ឋ (Clay)', k: 300, description: 'ធន់នឹងការស្រុតជាមធ្យម' },
];

export default function SolidPressure() {
  const [mass, setMass] = useState<number>(10); // in kg
  const [selectedMaterial, setSelectedMaterial] = useState<SolidMaterial>(MATERIALS[0]);
  const [selectedSurface, setSelectedSurface] = useState<SupportSurface>(SURFACES[0]);
  const [g, setG] = useState<number>(10); // gravity acceleration

  // Area input mode: 'preset' | 'custom_dims' | 'direct_m2'
  const [areaMode, setAreaMode] = useState<'preset' | 'custom_dims' | 'direct_m2'>('preset');
  
  // Preset choices
  const [presetOption, setPresetOption] = useState<'A' | 'B' | 'C'>('B');

  // Custom dimensions state (in cm)
  const [customWidthCm, setCustomWidthCm] = useState<number>(2);
  const [customLengthCm, setCustomLengthCm] = useState<number>(3);

  // Direct area state (in m2)
  const [directAreaM2, setDirectAreaM2] = useState<number>(0.0006);

  // Calculations for surface Area
  let area = 1.0; // m^2
  let wVisual = 1.0; // for 3D visual scale
  let calculationDetails = '';

  if (areaMode === 'preset') {
    switch (presetOption) {
      case 'A':
        area = 2.25;
        wVisual = 1.5;
        calculationDetails = 'ផ្ទៃធំ: 1.5m × 1.5m = 2.25 m²';
        break;
      case 'C':
        area = 0.25;
        wVisual = 0.5;
        calculationDetails = 'ផ្ទៃតូច: 0.5m × 0.5m = 0.25 m²';
        break;
      case 'B':
      default:
        area = 1.0;
        wVisual = 1.0;
        calculationDetails = 'ផ្ទៃមធ្យម: 1.0m × 1.0m = 1.00 m²';
        break;
    }
  } else if (areaMode === 'custom_dims') {
    // Width and Length in m
    const wM = customWidthCm / 100;
    const lM = customLengthCm / 100;
    area = wM * lM;
    wVisual = Math.max(0.4, Math.min(1.8, (customWidthCm / 10) * 0.8)); // map cm to visual scale
    
    // Dynamic math formulas:
    // Ex: 2cm x 3cm = 6cm^2 = 0.0006m^2
    // and 0.02m x 0.03m = 0.0006m^2
    const sqCm = customWidthCm * customLengthCm;
    calculationDetails = `គណនីយ៖ ${customWidthCm}cm × ${customLengthCm}cm = ${sqCm}cm² = ${area.toFixed(6)}m² \nនិង ${wM.toFixed(2)}m × ${lM.toFixed(2)}m = ${area.toFixed(6)}m²`;
  } else {
    // Direct m2
    area = Math.max(0.000001, directAreaM2);
    // Visual proportional to square root of area
    wVisual = Math.max(0.3, Math.min(1.8, Math.sqrt(area) * 20));
    calculationDetails = `កំណត់ដោយផ្ទាល់៖ A = ${area.toFixed(6)} m²`;
  }

  const force = mass * g; // Newton (N)
  const pressure = force / area; // Pascal (Pa)

  // Sinking depth calculation based on surface spring/sinking coefficient
  const sinkingDepth = Math.min(100, (pressure / selectedSurface.k) * 12);

  // Handle mass typing manually (clamp to logical values)
  const handleMassChange = (val: number) => {
    if (isNaN(val)) return;
    setMass(Math.max(0, val));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="solid-pressure-sim" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Visual Simulation Canvas */}
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[460px] lg:h-[520px] relative overflow-hidden shadow-sm">
        <div className="flex justify-between items-center z-10">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">ម៉ូដែលពិសោធន៍សម្ពាធនៃអង្គធាតុរឹង (3D Model)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">សង្កេតកម្រិតស្រុតនៃដុំអង្គធាតុរឹងលើផ្ទៃទន់ផ្សេងៗគ្នា</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-mono">
            ជម្រៅស្រុត: <span className="font-bold text-rose-500">{(sinkingDepth / 10).toFixed(2)} សម (cm)</span>
          </div>
        </div>

        {/* Visual elements */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Ceiling/Sky gradient */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-sky-100/50 dark:from-sky-950/20 to-transparent pointer-events-none" />

          <div className="w-full max-w-[340px] relative mt-12 flex flex-col items-center">
            {/* Block Representation */}
            <motion.div
              animate={{ 
                y: sinkingDepth,
                width: wVisual * 110,
                height: 140 - (wVisual * 5), // variable height to look volumetric
              }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              style={{ backgroundColor: selectedMaterial.color }}
              className="rounded-t border-t border-x border-white/20 shadow-lg relative flex flex-col items-center justify-center p-4 text-white font-medium z-10"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[9px] font-bold select-none text-teal-300">
                {selectedMaterial.name}
              </div>
              <Weight className="w-7 h-7 mb-1 opacity-90 text-amber-300" />
              <span className="text-sm font-bold font-mono">{mass} kg</span>
              <span className="text-[10px] opacity-90 font-mono text-center mt-1">
                ផ្ទៃបាត: {area >= 0.01 ? `${area.toFixed(4)} m²` : `${area.toFixed(6)} m²`}
              </span>
              
              {/* Force arrow down indicators */}
              <div className="absolute -bottom-8 flex gap-2">
                <ArrowDown className="w-5 h-5 text-rose-400 animate-bounce" />
              </div>
            </motion.div>

            {/* Sinking Surface Line and Foam Box */}
            <div className="w-[360px] h-[120px] relative">
              {/* Indentation mask (the displaced sand/sponge) */}
              <motion.div
                animate={{ 
                  y: sinkingDepth,
                  width: wVisual * 110 + 4,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-slate-300 dark:bg-slate-800 border-x border-slate-400 dark:border-slate-700 h-[10px] z-0"
              />

              {/* Surface block - visually representing the material block sits on */}
              <div className="absolute top-0 inset-x-0 bottom-0 bg-yellow-150 border-t-2 border-yellow-600/30 rounded-b-lg overflow-hidden flex flex-col justify-end"
                style={{
                  backgroundColor: 
                    selectedSurface.name === 'ខ្សាច់ទន់ (Soft Sand)' ? '#fef08a' : 
                    selectedSurface.name === 'អេប៉ុង (Sponge)' ? '#cbd5e1' : '#b45309' 
                }}
              >
                {/* Surface material decoration */}
                <div className="p-3 text-center text-xs font-bold text-slate-700 dark:text-slate-800 opacity-80">
                  {selectedSurface.name} ({selectedSurface.description})
                </div>
                {/* Sand dots/texture */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '8px 8px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Dashboard Footprint */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-3 gap-2 text-center z-10 shadow-inner">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">កម្លាំងសង្កត់កែង (F)</span>
            <span className="text-base font-bold text-indigo-650 dark:text-indigo-400 font-mono">{force.toFixed(1)} N</span>
          </div>
          <div className="border-x border-slate-100 dark:border-slate-900">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">ផ្ទៃបាតប៉ះពាល់ (A)</span>
            <span className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">
              {area >= 0.01 ? `${area.toFixed(4)} m²` : `${area.toFixed(6)} m²`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">សម្ពាធសរុប (P)</span>
            <span className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">
              {pressure >= 1000 ? `${(pressure / 1000).toFixed(2)} kPa` : `${pressure.toFixed(1)} Pa`}
            </span>
          </div>
        </div>
      </div>

      {/* Control panel & Theory cards */}
      <div className="lg:col-span-5 flex flex-col gap-6" id="solid-pressure-controls">
        {/* Lab Controls Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-900">
            <Activity className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-850 dark:text-slate-100">ម៉ាស៊ីនវាស់ស្ទង់ការពិសោធន៍</h3>
          </div>

          {/* Mass Input and Slider (Combined) */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2 text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1"><Weight className="w-3.5 h-3.5 text-indigo-500" /> កំណត់ម៉ាសអង្គធាតុ (m) :</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => handleMassChange(Number(e.target.value))}
                  className="w-16 px-1.5 py-0.5 border border-slate-200 dark:border-slate-800 rounded text-center font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs bg-slate-50 dark:bg-slate-900 outline-none"
                  min="0.1"
                  max="1000"
                  step="0.5"
                />
                <span className="font-bold text-slate-500">គីឡូក្រាម (kg)</span>
              </div>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={mass > 100 ? 100 : mass} 
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Area Configuration Form */}
          <div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <Layers className="w-3.5 h-3.5 text-indigo-505" />
              <span>របៀបកំណត់ផ្ទៃបាតប៉ះពាល់ (A):</span>
            </div>

            {/* Mode selection tab */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-3">
              <button
                type="button"
                onClick={() => setAreaMode('preset')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all ${
                  areaMode === 'preset'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-705'
                }`}
              >
                លំដាប់គំរូ
              </button>
              <button
                type="button"
                onClick={() => setAreaMode('custom_dims')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all ${
                  areaMode === 'custom_dims'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-705'
                }`}
              >
                ប្រវែងជ្រុង
              </button>
              <button
                type="button"
                onClick={() => setAreaMode('direct_m2')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all ${
                  areaMode === 'direct_m2'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-705'
                }`}
              >
                ម៉ែត្រការ៉េ (m²)
              </button>
            </div>

            {/* Sub content based on mode */}
            {areaMode === 'preset' && (
              <div className="grid grid-cols-3 gap-2 animate-fade-in">
                <button
                  onClick={() => setPresetOption('A')}
                  className={`py-1.5 px-2 text-xs rounded-xl border font-bold flex flex-col items-center transition-all ${
                    presetOption === 'A' 
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  <span className="text-[10px]">ផ្ទៃធំ (A)</span>
                  <span className="font-mono text-[9px] font-normal">2.25 m²</span>
                </button>
                <button
                  onClick={() => setPresetOption('B')}
                  className={`py-1.5 px-2 text-xs rounded-xl border font-bold flex flex-col items-center transition-all ${
                    presetOption === 'B' 
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  <span className="text-[10px]">ផ្ទៃមធ្យម (B)</span>
                  <span className="font-mono text-[9px] font-normal">1.00 m²</span>
                </button>
                <button
                  onClick={() => setPresetOption('C')}
                  className={`py-1.5 px-2 text-xs rounded-xl border font-bold flex flex-col items-center transition-all ${
                    presetOption === 'C' 
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  <span className="text-[10px]">ផ្ទៃតូច (C)</span>
                  <span className="font-mono text-[9px] font-normal">0.25 m²</span>
                </button>
              </div>
            )}

            {areaMode === 'custom_dims' && (
              <div className="bg-indigo-50/50 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col gap-3">
                {/* Inputs for custom dimensions */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">ទទឹងក្បាល (Width W) cm:</label>
                    <input
                      type="number"
                      value={customWidthCm}
                      onChange={(e) => setCustomWidthCm(Math.max(0.01, Number(e.target.value)))}
                      className="w-full text-center py-1.5 border border-slate-250 dark:border-slate-800 rounded font-mono font-bold text-xs bg-white dark:bg-slate-950 text-indigo-650 outline-none"
                      min="0.1"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">បណ្តោយ (Length L) cm:</label>
                    <input
                      type="number"
                      value={customLengthCm}
                      onChange={(e) => setCustomLengthCm(Math.max(0.01, Number(e.target.value)))}
                      className="w-full text-center py-1.5 border border-slate-250 dark:border-slate-800 rounded font-mono font-bold text-xs bg-white dark:bg-slate-950 text-indigo-650 outline-none"
                      min="0.1"
                      step="0.5"
                    />
                  </div>
                </div>

                {/* Mathematical Conversion presentation box */}
                <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] leading-relaxed select-all">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-1 border-b border-dashed border-slate-100 dark:border-slate-900 pb-1 flex items-center gap-1">
                    <span className="block w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                    <span>ការបំប្លែងតាមទំហំគណនា៖</span>
                  </div>
                  {/* Matching Ex: 2cm x 3cm = 6cm^2 = 0.0006m^2 and 0.02m x 0.03m = 0.0006m^2 */}
                  <div className="font-mono text-slate-705 dark:text-slate-300 font-bold pr-1">
                    • {customWidthCm}cm × {customLengthCm}cm = {(customWidthCm * customLengthCm).toFixed(1)}cm² = {area.toFixed(6)}m²
                  </div>
                  <div className="font-mono text-teal-650 dark:text-teal-400 font-bold mt-1">
                    • {(customWidthCm / 100).toFixed(2)}m × {(customLengthCm / 100).toFixed(2)}m = {area.toFixed(6)}m²
                  </div>
                </div>
              </div>
            )}

            {areaMode === 'direct_m2' && (
              <div className="bg-indigo-50/50 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-950">
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <label className="text-slate-500 text-[10px]">ផ្ទៃ A (គិតជាម៉ែត្រការ៉េ Direct m²):</label>
                  <span className="font-mono text-indigo-650 dark:text-indigo-400 font-bold text-sm">{area.toFixed(6)} m²</span>
                </div>
                <input
                  type="number"
                  value={directAreaM2}
                  onChange={(e) => setDirectAreaM2(Math.max(0.000001, Number(e.target.value)))}
                  className="w-full text-center py-2 border border-slate-250 dark:border-slate-800 rounded font-mono font-bold text-sm bg-white dark:bg-slate-950 text-indigo-650 outline-none"
                  min="0.000001"
                  step="0.0001"
                />
                <span className="text-[10px] text-slate-400 block mt-1 leading-normal">
                  (បញ្ជាក់៖ 1 cm² = 0.0001 m² | 10 cm² = 0.001 m²)
                </span>
              </div>
            )}
          </div>

          {/* Block Material selection */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">ប្រភេទអង្គធាតុរឹង:</span>
              <select
                value={selectedMaterial.name}
                onChange={(e) => {
                  const found = MATERIALS.find(m => m.name === e.target.value);
                  if (found) setSelectedMaterial(found);
                }}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-700 dark:text-slate-300 outline-none font-bold mt-1"
              >
                {MATERIALS.map((mat) => (
                  <option key={mat.name} value={mat.name}>{mat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">ផ្ទៃទ្រទ្រង់ខាងក្រោម:</span>
              <select
                value={selectedSurface.name}
                onChange={(e) => {
                  const found = SURFACES.find(s => s.name === e.target.value);
                  if (found) setSelectedSurface(found);
                }}
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-700 dark:text-slate-300 outline-none font-bold mt-1"
              >
                {SURFACES.map((surf) => (
                  <option key={surf.name} value={surf.name}>{surf.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gravity settings */}
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl mt-1">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">សំទុះទំនាញផែនដី (g):</span>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setG(10)} 
                className={`px-3 py-1 text-xs rounded-lg font-mono font-bold transition-all ${g === 10 ? 'bg-indigo-650 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                10 m/s²
              </button>
              <button 
                type="button"
                onClick={() => setG(9.8)} 
                className={`px-3 py-1 text-xs rounded-lg font-mono font-bold transition-all ${g === 9.8 ? 'bg-indigo-650 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                9.8 m/s²
              </button>
            </div>
          </div>
        </div>

        {/* Physics Formula & Concept Section */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h4 className="font-bold text-slate-200">គន្លឹះមេរៀន និងរូបមន្ត</h4>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs border border-slate-850 mb-4 relative overflow-hidden">
            <div className="absolute right-2 top-2 text-[8px] text-slate-550 uppercase tracking-widest font-sans font-bold">រូបមន្តសម្ពាធនៃអង្គធាតុរឹង</div>
            <div className="text-center font-bold text-teal-400 text-lg mb-2">P = F / A</div>
            <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-350">
              <div><span className="text-yellow-405 font-bold">P</span> : សម្ពាធ (គិតជា ប៉ាស្កាល់ <span className="text-teal-400 font-bold">Pa</span> ឬ <span className="text-teal-400 font-bold">N/m²</span>)</div>
              <div><span className="text-yellow-405 font-bold">F</span> : កម្លាំងសង្កត់កែង (គិតជា ញូតុន <span className="text-teal-400 font-bold">N</span>) = m × g</div>
              <div><span className="text-yellow-405 font-bold">A</span> : ផ្ទៃរងសង្កត់ (គិតជា ម៉ែត្រការ៉េ <span className="text-teal-400 font-bold">m²</span>)</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            👉 <span className="font-extrabold text-teal-400 text-[13px]">សន្និដ្ឋាន៖</span> សម្ពាធមានទំនាក់ទំនងសមាមាត្រផ្ទុយពីផ្ទៃប៉ះពាល់ (A) 
            និងសមាមាត្រនឹងកម្លាំងសង្កត់កែង (F)។ មានន័យថា៖
          </p>
          <ul className="list-disc list-inside text-xs text-slate-400 mt-2 space-y-1 pl-1">
            <li>បើ <span className="text-amber-450 font-bold">ផ្ទៃបាតប៉ះពាល់ A កាន់តែតូច</span> សម្ពាធនឹង <span className="text-rose-400 font-bold">កាន់តែខ្លាំង</span> ខ្លាំងបំផុតធ្វើឱ្យដុំដែកស្រុតជ្រៅ។</li>
            <li>បើ <span className="text-amber-450 font-bold">ម៉ាស m កាន់តែធំ</span> (កម្លាំងទំងន់កើនឡើង) សម្ពាធ <span className="text-rose-400 font-bold">កាន់តែខ្លាំងឡើង</span> ជាក់ស្តែង។</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
