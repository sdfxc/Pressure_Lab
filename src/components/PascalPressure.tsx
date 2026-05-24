/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUp, Zap, HelpCircle, Activity, Scale, Info } from 'lucide-react';

interface PascalObject {
  id: string;
  name: string;
  weightN: number;
  icon: string;
}

const PASCAL_OBJECTS: PascalObject[] = [
  { id: 'car', name: 'រថយន្តធុនតូច (Compact Car)', weightN: 12000, icon: '🚗' },
  { id: 'bus', name: 'ឡានក្រុង (Bus)', weightN: 80000, icon: '🚌' },
  { id: 'oxcart', name: 'រទេះគោ (Ox Cart)', weightN: 4000, icon: '🐂' },
  { id: 'truck', name: 'រទេះដឹកទំនិញ (Cargo Truck)', weightN: 150000, icon: '🚛' },
  { id: 'elephant', name: 'ដំរី (Elephant)', weightN: 40000, icon: '🐘' },
  { id: 'horse', name: 'សេះ (Horse)', weightN: 5000, icon: '🐴' },
  { id: 'motorcycle', name: 'ម៉ូតូ (Motorcycle)', weightN: 2000, icon: '🏍️' },
  { id: 'bicycle', name: 'កង់ (Bicycle)', weightN: 150, icon: '🚲' },
  { id: 'human', name: 'មនុស្ស (Human)', weightN: 700, icon: '🧑' },
  { id: 'cat', name: 'សត្វឆ្មា (Cat)', weightN: 40, icon: '🐱' },
  { id: 'dog', name: 'ឆ្កែ (Dog)', weightN: 150, icon: '🐶' },
  { id: 'cow', name: 'គោ (Cow)', weightN: 6000, icon: '🐄' },
  { id: 'mouse', name: 'កណ្ដុរ (Mouse)', weightN: 2, icon: '🐭' },
  { id: 'chicken', name: 'មាន់ (Chicken)', weightN: 20, icon: '🐔' },
  { id: 'duck', name: 'ទា (Duck)', weightN: 20, icon: '🦆' },
];

export default function PascalPressure() {
  const [area1, setArea1] = useState<number>(5);  // Piston 1 Area (cm^2) - from 1 to 20
  const [area2, setArea2] = useState<number>(50); // Piston 2 Area (cm^2) - from 20 to 150
  
  // Selected Piston 1 & 2 items
  const [selectedPressId, setSelectedPressId] = useState<string>('human'); // default human
  const [selectedLiftId, setSelectedLiftId] = useState<string>('car');   // default car

  // Weights of items (customizable by user)
  const [force1, setForce1] = useState<number>(700); // weight on Piston 1
  const [liftWeight, setLiftWeight] = useState<number>(12000); // weight on Piston 2

  // Find object details
  const pressObject = PASCAL_OBJECTS.find(o => o.id === selectedPressId) || PASCAL_OBJECTS[8];
  const liftObject = PASCAL_OBJECTS.find(o => o.id === selectedLiftId) || PASCAL_OBJECTS[0];

  const handlePressObjSelect = (id: string) => {
    setSelectedPressId(id);
    const match = PASCAL_OBJECTS.find(o => o.id === id);
    if (match) setForce1(match.weightN);
  };

  const handleLiftObjSelect = (id: string) => {
    setSelectedLiftId(id);
    const match = PASCAL_OBJECTS.find(o => o.id === id);
    if (match) setLiftWeight(match.weightN);
  };

  // Convert area values inside calculations
  const area1SqM = area1 / 10000;
  const area2SqM = area2 / 10000;
  
  // P1 = F1 / A1
  const pressurePa = force1 / area1SqM; 

  // Output mechanical advantage force: F2 = F1 * (A2 / A1)
  const force2 = force1 * (area2 / area1);

  // Lifting outcome
  const canLift = force2 >= liftWeight;

  // Render visual height change
  // Displacement based on balance ratio
  const strokePercent = Math.min(100, Math.max(10, (force1 / 2000) * 100)); // normalized
  const displacement1 = (strokePercent / 100) * 60; // in px
  const displacement2 = displacement1 * (area1 / area2); // Piston 2 upward lift

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="pascal-pressure-sim" style={{ fontFamily: 'var(--font-sans)' }}>
      
      {/* Simulation visual display */}
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[460px] lg:h-[520px] flex flex-col justify-between relative overflow-hidden shadow-sm">
        
        <div className="flex justify-between items-center z-10">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">ម៉ាស៊ីនសង្កត់អ៊ីដ្រូលីក (Hydraulic Press Principle)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">វាយតម្លៃការបញ្ជូនសម្ពាធទាំងស្រុងក្នុងអង្គធាតុរាវ (ច្បាប់ប៉ាស្កាល់)</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-250 dark:border-emerald-900 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              សម្ពាធស្មើគ្នា (P₁ = P₂)
            </span>
          </div>
        </div>

        {/* 2D Piston Cross-Section view */}
        <div className="relative flex-grow flex items-center justify-center mt-6">
          <div className="w-full max-w-[420px] h-[260px] relative flex items-end">
            
            {/* Hydraulic fluid holding background container */}
            <div className="absolute inset-x-0 bottom-0 top-[110px] bg-sky-200/40 dark:bg-sky-950/20 border-b-8 border-x-8 border-slate-400 dark:border-slate-700 rounded-b-3xl overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-sky-400/20 dark:bg-sky-550/10 pointer-events-none" />
            </div>

            {/* Cylinder 1 (Left Piston / Small) */}
            <div className="absolute left-[30px] bottom-0 w-[90px] h-[210px] flex flex-col justify-end">
              {/* Liquid Column */}
              <motion.div 
                animate={{ height: `${130 - displacement1}px` }}
                className="bg-sky-450 dark:bg-sky-600/80 w-full border-r-2 border-slate-300 dark:border-slate-800"
              />

              {/* Left Piston Head */}
              <motion.div
                animate={{ y: displacement1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute top-[40px] inset-x-0 h-9 bg-slate-705 dark:bg-slate-800 border-b-4 border-slate-900 flex flex-col items-center justify-center shadow-md z-10"
                style={{ scaleX: Math.max(0.4, area1 / 10) }}
              >
                <div className="text-[9px] text-white font-mono font-bold">A₁ = {area1} cm²</div>
                <ArrowDown className="w-3.5 h-3.5 text-rose-450 animate-bounce absolute -top-4" />

                {/* Left Sitting Pressing Object */}
                <div className="absolute -top-14 flex flex-col items-center select-none">
                  <span className="text-2xl filter drop-shadow-md">{pressObject.icon}</span>
                  <span className="text-[8px] bg-slate-900/90 text-slate-200 px-1 py-0.2 rounded font-mono font-bold mt-0.5 whitespace-nowrap">
                    {force1} N
                  </span>
                </div>
              </motion.div>
              {/* Outer cylinder left walls */}
              <div className="absolute top-0 bottom-0 inset-x-0 border-x-4 border-slate-400 dark:border-slate-700 pointer-events-none" />
            </div>

            {/* Connecting Pipe */}
            <div className="absolute left-[120px] right-[110px] bottom-0 h-[45px] bg-sky-455 dark:bg-sky-600/80 border-t-8 border-slate-400 dark:border-slate-700 z-0" />

            {/* Cylinder 2 (Right Piston / Large) */}
            <div className="absolute right-[10px] bottom-0 w-[130px] h-[210px] flex flex-col justify-end items-center">
              {/* Right Liquid column */}
              <motion.div 
                animate={{ height: `${130 + displacement2}px` }}
                className="bg-sky-450 dark:bg-sky-600/80 w-full border-l-2 border-slate-300 dark:border-slate-800"
              />

              {/* Right Piston Head */}
              <motion.div
                animate={{ y: -displacement2 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute top-[40px] inset-x-0 h-9 bg-slate-705 dark:bg-slate-800 border-b-4 border-slate-900 flex flex-col items-center justify-center shadow-md z-10"
                style={{ scaleX: Math.max(0.5, area2 / 90) }}
              >
                <div className="text-[9px] text-white font-mono font-bold">A₂ = {area2} cm²</div>
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400 absolute -bottom-4 animate-pulse" />

                {/* Sitting Heavy lifted Object */}
                <motion.div 
                  className="absolute -top-16 flex flex-col items-center select-none"
                  animate={{ y: canLift ? [-2, 2, -2] : 0 }}
                  transition={{ repeat: canLift ? Infinity : 0, duration: 1.5 }}
                >
                  <span className="text-3xl filter drop-shadow-md">{liftObject.icon}</span>
                  <span className="text-[8px] bg-slate-900/90 text-slate-200 px-1.5 py-0.2 rounded font-mono mt-0.5 font-bold whitespace-nowrap">
                    {liftWeight} N
                  </span>
                </motion.div>
              </motion.div>
              {/* Outer cylinder right walls */}
              <div className="absolute top-0 bottom-0 inset-x-0 border-x-4 border-slate-400 dark:border-slate-700 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Live Lifting Status Indicators */}
        <div className="grid grid-cols-2 gap-4 items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-840 p-4 rounded-xl shadow-inner z-10">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">កម្លាំងច្រានឡើង Piston ធំ (F₂)៖</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono block">
              {force2.toFixed(1)} N <span className="text-xs text-slate-400">({(force2 / 9.8).toFixed(1)} kg)</span>
            </span>
          </div>
          <div className="border-l border-slate-150 dark:border-slate-800 pl-3">
            <span className="text-[10px] text-slate-400 block font-bold">លទ្ធផលនៃការលើក៖</span>
            {canLift ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-1 rounded-md flex items-center gap-1 w-max mt-1 bubble-glow">
                🎉 លើកទ្រទ្រង់រួចរាល់! (Lifted)
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-955/20 dark:text-rose-400 px-2 py-1 rounded-md flex items-center gap-1 w-max mt-1">
                ❌ កម្លាំងមិនទាន់គ្រប់គ្រាន់!
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Control sliders & Explanation */}
      <div className="lg:col-span-5 flex flex-col gap-6" id="pascal-piston-controls">
        
        {/* Pascal lab control board */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-900">
            <Scale className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">ជម្រើសទិន្នន័យបន្ទុក</h3>
          </div>

          {/* Pressing Object Selector Piston 1 */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1">១. ជ្រើសរើស វត្ថុកម្លាំងសង្កត់ (Piston Left)៖</label>
            <select
              value={selectedPressId}
              onChange={(e) => handlePressObjSelect(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg p-2 text-slate-700 dark:text-slate-300 outline-none font-bold"
            >
              {PASCAL_OBJECTS.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.icon} {obj.name} (~{obj.weightN} N)
                </option>
              ))}
            </select>
          </div>

          {/* Slider and Manual typing for Force 1 (Piston 1 weight) */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-rose-550" /> ទម្ងន់ / កម្លាំងសង្កត់ផ្ទាល់ (F₁):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={force1}
                  onChange={(e) => setForce1(Math.max(1, Number(e.target.value)))}
                  className="w-16 px-1.5 py-0.5 border border-slate-200 dark:border-slate-800 rounded text-center font-mono font-bold text-rose-650 bg-white dark:bg-slate-950 text-xs"
                />
                <span className="font-bold text-slate-500 text-[10px]">N</span>
              </div>
            </div>
            <input 
              type="range" 
              min="10" 
              max="15000" 
              value={force1 > 15000 ? 15000 : force1} 
              onChange={(e) => setForce1(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-rose-550"
            />
          </div>

          {/* Lifted Object Selector Piston 2 */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1">២. ជ្រើសរើសវត្ថុធ្ងន់សម្រាប់លើក (Piston Right)៖</label>
            <select
              value={selectedLiftId}
              onChange={(e) => handleLiftObjSelect(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg p-2 text-slate-700 dark:text-slate-300 outline-none font-bold"
            >
              {PASCAL_OBJECTS.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.icon} {obj.name} (~{obj.weightN} N)
                </option>
              ))}
            </select>
          </div>

          {/* Slider and Manual typing for Piston 2 Weight to lift */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <span>ទម្ងន់វត្ថុលើកគាំទ្រ (F₂ target):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={liftWeight}
                  onChange={(e) => setLiftWeight(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-1.5 py-0.5 border border-slate-200 dark:border-slate-800 rounded text-center font-mono font-bold text-emerald-650 bg-white dark:bg-slate-950 text-xs"
                />
                <span className="font-bold text-slate-500 text-[10px]">N</span>
              </div>
            </div>
            <input 
              type="range" 
              min="10" 
              max="160000" 
              step="100"
              value={liftWeight > 160000 ? 160000 : liftWeight} 
              onChange={(e) => setLiftWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-855 rounded-lg appearance-none cursor-pointer accent-emerald-550"
            />
          </div>

          {/* Piston Areas Configurations */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50/60 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150">
              <span className="text-[10px] text-slate-505 block font-bold mb-1">ផ្ទៃបាត Piston តូច A₁៖</span>
              <input
                type="number"
                value={area1}
                onChange={(e) => setArea1(Math.max(1, Math.min(25, Number(e.target.value))))}
                className="w-full text-center py-1 border border-slate-200 dark:border-slate-800 rounded font-mono font-bold text-xs bg-white dark:bg-slate-950 text-sky-600 outline-none"
                min="1"
                max="25"
              />
              <input 
                type="range" 
                min="1" 
                max="25" 
                value={area1} 
                onChange={(e) => setArea1(Number(e.target.value))}
                className="w-full h-1 mt-1 accent-sky-550"
              />
            </div>

            <div className="bg-slate-50/60 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150">
              <span className="text-[10px] text-slate-505 block font-bold mb-1">ផ្ទៃបាត Piston ធំ A₂៖</span>
              <input
                type="number"
                value={area2}
                onChange={(e) => setArea2(Math.max(10, Math.min(200, Number(e.target.value))))}
                className="w-full text-center py-1 border border-slate-200 dark:border-slate-800 rounded font-mono font-bold text-xs bg-white dark:bg-slate-950 text-emerald-600 outline-none"
                min="10"
                max="200"
              />
              <input 
                type="range" 
                min="10" 
                max="200" 
                value={area2} 
                onChange={(e) => setArea2(Number(e.target.value))}
                className="w-full h-1 mt-1 accent-emerald-555"
              />
            </div>
          </div>

        </div>

        {/* Pascal Formula & Scientific Context */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-emerald-450" />
            <h4 className="font-bold text-slate-250">ច្បាប់ប៉ាស្កាល់ (Pascal's Principle)</h4>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs border border-slate-850 mb-3 space-y-1.5">
            <div className="text-center font-bold text-emerald-400 text-sm mb-1">P₁ = P₂</div>
            <div className="text-center text-slate-300">F₁ / A₁ = F₂ / A₂</div>
            <div className="text-center text-yellow-405 font-bold mt-1">⇒ F₂ = F₁ × (A₂ / A₁)</div>
          </div>

          <p className="text-xs text-slate-350 leading-relaxed">
            👨‍🔬 <span className="font-bold text-emerald-400">គោលការណ៍មេកានិច៖</span> សម្ពាធដែលបង្កើតឡើងដោយកម្លាំងសង្កត់ 
            <span className="text-yellow-405"> F₁</span> លើផ្ទៃបាតតូច <span className="text-yellow-405"> A₁</span> ត្រូវបានបញ្ជូនទាំងស្រុង និងស្មើគ្នាគ្រប់ទិសទីតាមរយៈអង្គធាតុរាវ ទៅបង្កើតជាកម្លាំងច្រានឡើង <span className="text-yellow-405">F₂</span> យ៉ាងធំសម្បើមលើផ្ទៃបាតធំ <span className="text-yellow-405">A₂</span>។
          </p>
          <div className="mt-3 bg-emerald-950/20 border-l-4 border-emerald-500 p-2.5 rounded-r text-[11px] text-slate-350 flex gap-1.5">
            <Info className="w-4 h-4 text-emerald-405 shrink-0" />
            <span>សមាមាត្រផ្ទៃបាត <span className="font-bold">{(area2 / area1).toFixed(1)} ដង</span> ជួយបង្កើនកម្លាំងសង្កត់បញ្ចូល {force1}N ឡើងដល់ <span className="font-bold text-emerald-400">{force2.toFixed(0)}N</span>!</span>
          </div>
        </div>

      </div>
    </div>
  );
}
