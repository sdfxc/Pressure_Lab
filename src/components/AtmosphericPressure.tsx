/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Compass, Gauge, AlertCircle, HelpCircle, Activity, RotateCcw, Droplets, Info } from 'lucide-react';

export default function AtmosphericPressure() {
  const [atmSubTab, setAtmSubTab] = useState<'barometer' | 'can'>('barometer');

  // --- Sub-experiments select state ---
  const [baroExpMode, setBaroExpMode] = useState<'torricelli' | 'magdeburg'>('torricelli');
  const [canExpMode, setCanExpMode] = useState<'single_can' | 'double_cup'>('single_can');

  // ==========================================
  // --- BAROMETER STATE (Torricelli / Altitude) ---
  const [altitude, setAltitude] = useState<number>(0); // 0 to 9000 meters
  const p0 = 101.325; // kPa
  const pressureKPa = p0 * Math.exp(-0.00012 * altitude);
  const hHgMm = pressureKPa * 7.5006; 
  const airDensityPercent = Math.max(10, Math.round((pressureKPa / p0) * 100));

  // ==========================================
  // --- MAGDEBURG HEMISPHERES STATE ---
  const [isPumped, setIsPumped] = useState<boolean>(false);
  const [horsesCount, setHorsesCount] = useState<number>(2); // 0 to 16 horses
  const [pulledApart, setPulledApart] = useState<boolean>(false);
  const [magdeburgMsg, setMagdeburgMsg] = useState<string>('សូមចុច "បូមខ្យល់ចេញ" ដើម្បីបង្កើតលំហសុញ្ញកាសខាងក្នុងលំហដែកពីរ។');

  const holdingForceN = isPumped ? 101325 * 0.15 * 0.15 * Math.PI : 0; // P_atm * Area of 15cm radius ~ 7160 N
  const pullingForceN = horsesCount * 800; // ~800 N of load force per horse on average

  const handleMagdeburgPull = () => {
    if (!isPumped) {
      setPulledApart(true);
      setMagdeburgMsg('លំហដែកទាំងពីររបូតចេញពីគ្នាយ៉ាងងាយ ពីព្រោះខាងក្នុងមានខ្យល់ធម្មតា!');
      return;
    }
    if (pullingForceN >= holdingForceN) {
      setPulledApart(true);
      setMagdeburgMsg(`ជោគជ័យសម្បើម! ដោយការប្រើសេះចំនួន ${horsesCount} រួមគ្នាកម្លាំងទាញ ${pullingForceN}N បានឈ្នះកម្លាំងសង្កត់របស់បរិយាកាស ${holdingForceN.toFixed(0)}N ហើយក្បាលដែកត្រូវបានបំបែកចេញ!`);
    } else {
      setPulledApart(false);
      setMagdeburgMsg(`បរាជ័យ! ទោះបីជាប្រើសេះចំនួន ${horsesCount} ក្បាលទាញក្នុងកម្លាំង ${pullingForceN}N ក៏មិនអាចបំបែកលំហដែកទាំងពីរបានដែរ ព្រោះកម្លាំងសង្កត់ខ្យល់ខាងក្រៅគឺ ${holdingForceN.toFixed(0)}N ខ្លាំងពេក!`);
    }
  };

  const resetMagdeburg = () => {
    setIsPumped(false);
    setHorsesCount(2);
    setPulledApart(false);
    setMagdeburgMsg('សូមចុច "បូមខ្យល់ចេញ" ដើម្បីបង្កើតលំហសុញ្ញកាសខាងក្នុងលំហដែកពីរ។');
  };

  // ==========================================
  // --- COLLAPSING CAN STATE ---
  const [canStep, setCanStep] = useState<number>(1);
  const [isHeating, setIsHeating] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [isPouringWater, setIsPouringWater] = useState<boolean>(false);
  
  useEffect(() => {
    let timer: number;
    if (isHeating && canStep === 1) {
      timer = window.setTimeout(() => {
        setCanStep(2);
        setIsHeating(false);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [isHeating, canStep]);

  const handleApplyColdWater = () => {
    if (canStep < 3) return;
    setIsPouringWater(true);
    setTimeout(() => {
      setCanStep(4);
      setIsPouringWater(false);
    }, 1500);
  };

  const resetCanLab = () => {
    setCanStep(1);
    setIsHeating(false);
    setIsSealed(false);
    setIsPouringWater(false);
  };

  // ==========================================
  // --- DOUBLE CUP (COMBINED CANS) VACUUM SUCTION STATE ---
  const [cupsPumped, setCupsPumped] = useState<boolean>(false);
  const [cupsLoadKg, setCupsLoadKg] = useState<number>(15); // suspended load in kg
  const [cupsLoose, setCupsLoose] = useState<boolean>(false);
  const [cupsFeedback, setCupsFeedback] = useState<string>('ដាក់កែវពីរទល់មុខគ្នា រួចចុច "បូមបិទជិត" ដើម្បីបឺតខ្យល់ចេញ និងព្យួរទម្ងន់។');

  const cupsHoldingForceN = cupsPumped ? 101325 * 0.005 : 0; // ~500 N 
  const loadWeightN = cupsLoadKg * 9.8;

  const handleApplyCupsLoad = () => {
    if (loadWeightN > cupsHoldingForceN) {
      setCupsLoose(true);
      setCupsFeedback(`កែវបូមរបូតចេញធ្លាក់ចុះមកក្រោម! ពីព្រោះកម្លាំងទម្ងន់សង្កត់ ${loadWeightN.toFixed(1)}N ធំជាងកម្លាំងសើមខ្យល់ទប់ ${cupsHoldingForceN.toFixed(0)}N។`);
    } else {
      setCupsLoose(false);
      setCupsFeedback(`កែវទាំងពីរជាប់គ្នាយ៉ាងរឹងមាំ! ព្យួរទម្ងន់ ${cupsLoadKg}kg (${loadWeightN.toFixed(1)}N) ដោយជោគជ័យព្រោះសំពាធខ្យល់ទប់គាបបានរហូតដល់ ${cupsHoldingForceN.toFixed(0)}N។`);
    }
  };

  const resetCupsLab = () => {
    setCupsPumped(false);
    setCupsLoadKg(15);
    setCupsLoose(false);
    setCupsFeedback('ដាក់កែវពីរទល់មុខគ្នា រួចចុច "បូមបិទជិត" ដើម្បីបឺតខ្យល់ចេញ និងព្យួរទម្ងន់។');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="atm-pressure-sim" style={{ fontFamily: 'var(--font-sans)' }}>
      
      {/* Tab Select Header */}
      <div className="col-span-12 flex flex-col md:flex-row gap-3 justify-between items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setAtmSubTab('barometer')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              atmSubTab === 'barometer'
                ? 'bg-purple-650 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-400" />
            សម្ពាធបន្ទុកខ្យល់ និងបារ៉ូម៉ែត្រ / ម៉ាក់ដេបួរ
          </button>
          
          <button
            onClick={() => setAtmSubTab('can')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              atmSubTab === 'can'
                ? 'bg-purple-650 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            កំប៉ុងស្រុត និងការពិសោធន៍កំប៉ុងរួម
          </button>
        </div>
        
        <span className="text-xs font-mono text-slate-500 font-bold hidden sm:inline">
          {atmSubTab === 'barometer' ? 'P_atm ≈ 101.3 kPa' : 'ΔP = P_outside - P_inside'}
        </span>
      </div>

      {/* Simulator view */}
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[465px] lg:h-[525px] flex flex-col justify-between relative overflow-hidden shadow-sm">
        
        <AnimatePresence mode="wait">
          {atmSubTab === 'barometer' ? (
            baroExpMode === 'torricelli' ? (
              // --- BAROMETER AND ALTITUDE VIEW ---
              <motion.div
                key="barometer-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-grow flex flex-col justify-between h-full"
              >
                <div className="flex justify-between items-center z-10">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">បារ៉ូម៉ែត្របារតទោរិចសេលី (Mercury Barometer)</h3>
                    <p className="text-xs text-slate-550 dark:text-slate-400">អូសកម្ពស់ដីដើម្បីមើលដង់ស៊ីតេរំញ័រខ្យល់ និងការប្រែប្រួលបារត</p>
                  </div>
                  <button
                    onClick={() => setBaroExpMode('magdeburg')}
                    className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 transition px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 text-[10px] font-bold"
                  >
                    ប្ដូរទៅចានដែកម៉ាក់ដេបួរ (Magdeburg) ➔
                  </button>
                </div>

                {/* Graphical simulation container */}
                <div className="relative w-full h-[260px] border border-slate-200 dark:border-slate-800 rounded-2xl mt-4 bg-slate-100 dark:bg-slate-950 flex items-center justify-between px-8 overflow-hidden shadow-inner">
                  
                  {/* Simulated Air Density Molecules (fade away with altitude) */}
                  <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ opacity: airDensityPercent / 100 }}>
                    <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full blur-[1px] animate-pulse" />
                    <div className="absolute top-24 left-24 w-1.5 h-1.5 bg-purple-500 rounded-full blur-[1px] animate-pulse delay-75" />
                    <div className="absolute top-40 left-16 w-3.5 h-3.5 bg-purple-300 rounded-full blur-[1px]" />
                    <div className="absolute top-12 right-28 w-2 w-2 bg-purple-450 rounded-full blur-[1px]" />
                    <div className="absolute bottom-16 right-36 w-3 h-3 bg-purple-500 rounded-full blur-[1.5px] opacity-70" />
                    <div className="absolute bottom-32 left-40 w-2 h-2 bg-purple-400 rounded-full blur-[1px]" />
                    <div className="absolute bottom-10 right-16 w-2.5 h-2.5 bg-purple-300 rounded-full blur-[1px]" />
                  </div>

                  {/* Altitude background mountain decoration */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-200 dark:from-slate-900 to-transparent pointer-events-none opacity-40 flex items-end justify-center">
                    <div className="text-[120px] font-bold text-slate-300/30 dark:text-slate-700/20 select-none leading-none">🏔️</div>
                  </div>

                  {/* Air pressure forces */}
                  <div className="absolute left-1/4 top-4 flex flex-col items-center">
                    <span className="text-[9px] text-purple-650 dark:text-purple-400 font-bold mb-1">សម្ពាធខ្យល់បរិយាកាស</span>
                    <div className="flex gap-4">
                      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-5 bg-purple-500 rounded" />
                      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-1.5 h-5 bg-purple-500 rounded" />
                    </div>
                  </div>

                  {/* Glass tube and mercury beaker */}
                  <div className="w-[180px] h-[220px] relative flex flex-col justify-end items-center z-13 bg-white/20 dark:bg-slate-900/20 backdrop-blur rounded-xl p-3 border border-slate-300 dark:border-slate-800">
                    <div className="text-[9px] font-bold text-slate-650">រង្វាស់កម្ពស់បារត Torricelli</div>
                    
                    {/* Glass tube */}
                    <div className="w-[30px] h-[155px] border-x-2 border-t-2 border-slate-300 dark:border-slate-700 bg-white/10 dark:bg-slate-950/40 rounded-t-full relative flex items-end mb-[15px]">
                      {/* Mercury column */}
                      <motion.div 
                        animate={{ height: `${(hHgMm / 760) * 140}px` }} 
                        transition={{ type: "tween", duration: 0.4 }}
                        className="w-full bg-slate-400 dark:bg-slate-350 border-x border-t border-white rounded-t-lg shadow"
                      />

                      {/* Marks */}
                      <div className="absolute right-0.5 inset-y-0 flex flex-col justify-between text-[7px] font-mono font-black text-slate-500 select-none py-2">
                        <span>760</span>
                        <span>570</span>
                        <span>380</span>
                        <span>190</span>
                        <span>0</span>
                      </div>
                    </div>

                    {/* Mercury bowl */}
                    <div className="w-[85px] h-[25px] bg-slate-400 dark:bg-slate-300 border-2 border-slate-300 dark:border-slate-650 rounded-b-xl shadow-inner relative flex justify-center items-center">
                      <span className="text-[7px] text-slate-800 font-black font-mono">Mercury (Hg)</span>
                    </div>
                  </div>

                  {/* Stats table */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-slate-100 flex flex-col gap-1 w-[160px] shadow-lg">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wide font-bold">លទ្ធផលបារ៉ូម៉ែត្រ៖</span>
                    <div className="text-sm font-black text-purple-300 font-mono">
                      {hHgMm.toFixed(1)} mmHg
                    </div>
                    <div className="h-px bg-slate-800 my-1" />
                    <span className="text-[9px] text-slate-450 uppercase">ដង់ស៊ីតេខ្យល់៖</span>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {airDensityPercent}%
                    </span>
                  </div>
                </div>

                {/* Data metrics dashboard */}
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-3 gap-2 text-center mt-3 shadow-inner">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold">កម្ពស់ដី (Altitude)</span>
                    <span className="text-xs font-bold text-slate-750 dark:text-slate-300 font-mono">{altitude} ម៉ែត្រ</span>
                  </div>
                  <div className="border-x border-slate-150 dark:border-slate-850">
                    <span className="text-[10px] text-slate-500 block font-bold">សម្ពាធខ្យល់សរុប</span>
                    <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 font-mono">{pressureKPa.toFixed(2)} kPa</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold">សមមូលបរិយាកាស</span>
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400 font-mono">{(pressureKPa / 101.325).toFixed(3)} atm</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              // --- MAGDEBURG HEMISPHERES EXPERIMENT ---
              <motion.div
                key="magdeburg-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-grow flex flex-col justify-between h-full"
              >
                <div className="flex justify-between items-center z-10">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">ការពិសោធន៍ចានដែកម៉ាក់ដេបួរ (Magdeburg Hemispheres)</h3>
                    <p className="text-xs text-slate-550 dark:text-slate-400">គូសបូមខ្យល់ចេញ និងសាកល្បងប្រើសេះទាញបំបែកវាទប់សម្ពាធខ្យល់</p>
                  </div>
                  <button
                    onClick={() => setBaroExpMode('torricelli')}
                    className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 transition px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 text-[10px] font-bold"
                  >
                    ទម្រង់បារ៉ូម៉ែត្របារត ➔
                  </button>
                </div>

                {/* Magdeburg visual board */}
                <div className="relative w-full h-[260px] border border-slate-200 dark:border-slate-800 rounded-2xl mt-4 bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center overflow-hidden shadow-inner">
                  
                  {/* Left and Right horses pull visualization */}
                  <div className="absolute inset-x-0 inset-y-0 w-full flex justify-between items-center px-4 pointer-events-none">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">{horsesCount > 0 ? '🐎' : ''}</span>
                      <span className="text-[9px] text-rose-500 font-mono font-bold">{horsesCount > 0 ? `← ${pullingForceN / 2}N` : '0N'}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">{horsesCount > 0 ? '🐎' : ''}</span>
                      <span className="text-[9px] text-rose-500 font-mono font-bold">{horsesCount > 0 ? `${pullingForceN / 2}N →` : '0N'}</span>
                    </div>
                  </div>

                  {/* Two metal Hemispsheres */}
                  <div className="flex items-center gap-1.5 relative z-10 bg-white/20 dark:bg-slate-900/20 px-8 py-6 rounded-2xl border border-slate-250/30">
                    {/* Left Hemisphere */}
                    <motion.div
                      animate={{ x: pulledApart ? -40 : 0, rotateY: pulledApart ? -20 : 0 }}
                      className="w-16 h-24 bg-slate-500 dark:bg-slate-400 rounded-l-full border-y-4 border-l-4 border-slate-600 relative flex items-center justify-end"
                    >
                      <div className="w-1.5 h-6 bg-slate-750 absolute left-2 rounded shadow" />
                      <span className="text-[8px] text-white font-bold font-mono tracking-tighter mr-1 uppercase">Hemi L</span>
                    </motion.div>

                    {/* Joint indicator */}
                    {!pulledApart && (
                      <div className={`w-1 h-20 z-20 ${isPumped ? 'bg-red-500 animate-pulse' : 'bg-slate-350'}`} />
                    )}

                    {/* Right Hemisphere */}
                    <motion.div
                      animate={{ x: pulledApart ? 40 : 0, rotateY: pulledApart ? 20 : 0 }}
                      className="w-16 h-24 bg-slate-500 dark:bg-slate-400 rounded-r-full border-y-4 border-r-4 border-slate-600 relative flex items-center justify-start"
                    >
                      <div className="w-1.5 h-6 bg-slate-750 absolute right-2 rounded shadow" />
                      <span className="text-[8px] text-white font-bold font-mono tracking-tighter ml-1 uppercase">Hemi R</span>
                    </motion.div>
                  </div>

                  {/* Atmospheric compression representation arrows */}
                  {isPumped && !pulledApart && (
                    <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute flex gap-12 text-purple-500 font-bold text-xs">
                        <span>➔ P_atm ➔</span>
                        <span>← P_atm ←</span>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Status/Control Guide */}
                <div className="bg-slate-900 text-slate-100 rounded-xl p-3 flex gap-4 items-center mt-3 border border-slate-800">
                  <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-purple-300 block mb-0.5">របាយការណ៍ពិសោធន៍ Magdeburg៖</span>
                    {magdeburgMsg}
                  </div>
                </div>
              </motion.div>
            )
          ) : (
            canExpMode === 'single_can' ? (
              // --- COLLAPSING CAN EXPERIMENT PANEL ---
              <motion.div
                key="can-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-grow flex flex-col justify-between h-full"
              >
                <div className="flex justify-between items-center z-10">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">ពិសោធន៍កំទេចកំប៉ុងដែកបរិយាកាស (Can Crusher)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ទស្សនាបន្ទុកសម្ពាធខ្យល់សង្កត់កំប៉ុងអោយស្រុតក្រឡឹបភ្លាមៗ!</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCanExpMode('double_cup')}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 transition px-2 py-1 rounded-md text-[9px] font-bold border border-purple-200"
                    >
                      កំប៉ុងរួម/កែវបឺតគាប ➔
                    </button>
                    <button
                      onClick={resetCanLab}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-150 transition p-1 rounded-md border text-slate-600 dark:text-slate-350 text-[9px] flex items-center gap-0.5"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> សារថ្មី
                    </button>
                  </div>
                </div>

                {/* Sandbox */}
                <div className="relative w-full h-[260px] border border-slate-200 dark:border-slate-800 rounded-2xl mt-4 bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center overflow-hidden shadow-inner">
                  {isHeating && (
                    <div className="absolute bottom-[20px] w-24 h-16 flex flex-col items-center">
                      <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                      <span className="text-[8px] text-orange-500 font-bold uppercase animate-ping">Heating ON</span>
                    </div>
                  )}

                  {isPouringWater && (
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-450/40 to-transparent flex flex-wrap justify-center overflow-hidden pointer-events-none z-30">
                      <Droplets className="w-8 h-8 text-sky-400 animate-bounce" />
                    </div>
                  )}

                  <div className="relative w-[110px] h-[190px] flex justify-center items-center">
                    {isSealed && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1 w-12 h-2.5 bg-red-650 rounded-full border border-black z-20 flex justify-center items-center shadow">
                        <span className="text-[6px] text-white font-bold leading-none uppercase">Sealed</span>
                      </motion.div>
                    )}

                    <motion.div
                      animate={{
                        scaleX: canStep === 4 ? 0.35 : 1,
                        scaleY: canStep === 4 ? 0.6 : 1,
                        rotate: canStep === 4 ? -12 : 0,
                      }}
                      transition={{ type: canStep === 4 ? "spring" : "tween", stiffness: 400, damping: 10 }}
                      className={`w-[100px] h-[160px] rounded-2xl border-4 border-slate-400 bg-gradient-to-r from-red-600 via-rose-550 to-red-700 shadow-xl relative overflow-hidden flex flex-col justify-between py-4 z-10 ${
                        canStep === 4 ? 'grayscale contrast-125' : ''
                      }`}
                    >
                      <div className="absolute inset-x-0 h-4 bg-white/20 border-y border-white/10" />
                      <div className="text-center font-black text-rose-50 border-y-2 border-dashed border-rose-200/30 py-1 uppercase text-[9px] tracking-widest leading-none select-none">
                        CAMBODIA CAN
                      </div>
                      <div className="text-center text-[8px] text-white/90 font-bold font-mono">
                        {canStep === 1 && 'P_in = P_atm'}
                        {canStep === 2 && 'Steam filling'}
                        {canStep === 3 && 'Sealed Hot steam'}
                        {canStep === 4 && 'Water cold collapsed!'}
                      </div>
                    </motion.div>

                    {canStep === 4 && (
                      <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-20">
                        <div className="absolute left-[-30px] top-1/2 flex items-center justify-center">
                          <span className="text-[10px] text-purple-400 font-bold">P_atm</span>
                          <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-1 bg-purple-500 rounded" />
                        </div>
                        <div className="absolute right-[-30px] top-1/2 flex items-center justify-center flex-row-reverse">
                          <span className="text-[10px] text-purple-400 font-bold">P_atm</span>
                          <motion.div animate={{ x: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-1 bg-purple-500 rounded" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Steps Guide */}
                <div className="bg-slate-900 text-slate-100 rounded-xl p-3 flex gap-4 items-center mt-3 border border-slate-800 text-xs">
                  <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <span className="font-bold text-purple-300 block mb-0.5">ស្ថានភាពការពិសោធន៍៖</span>
                    {canStep === 1 && 'សូមចុចប៊ូតុង "ដុតកម្តៅកំប៉ុង" ដើម្បីដាំទឹកឱ្យពុះ និងបញ្ចេញខ្យល់ចេញ។'}
                    {canStep === 2 && 'ទឹកបានក្លាយជាចំហាយទឹកពេញកំប៉ុង។ សូម "គ្របមាត់កំប៉ុងឱ្យជិត"!'}
                    {canStep === 3 && 'កំប៉ុងត្រូវបានគ្របជិត! ចំហាយទឹកក្ដៅមានសំពាធស្មើខ្យល់ក្រៅ។ សូម "ស្រោចទឹកកក"!'}
                    {canStep === 4 && 'ជោគជ័យ! ចំហាយទឹកក្ដៅបានចុះត្រជាក់ក្លាយជាស្រក់ទឹកភ្លាមៗ បង្កើតជាលំហសុញ្ញកាសខាងក្នុង។ សម្ពាធខ្យល់ខាងក្រៅដ៏ខ្លាំង (P_atm) បានកំទេចកំប៉ុង។'}
                  </div>
                </div>
              </motion.div>
            ) : (
              // --- COMBINED CANS / PLUNGER SUCTION EXPERIMENT ---
              <motion.div
                key="double-cup-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-grow flex flex-col justify-between h-full"
              >
                <div className="flex justify-between items-center z-10">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">ការពិសោធន៍ប៊ឺតភ្ជាប់គ្នា (Combined Cans / Suction Cups)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">សាកល្បងរួមបញ្ចូលកែវពីរ បឺតខ្យល់ចេញ រួចព្យួរជើងខ្លាំងទម្ងន់ផ្សេងៗ</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCanExpMode('single_can')}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 transition px-2 py-1 rounded-md text-[9px] font-bold border border-purple-200"
                    >
                      កំប៉ុងស្រុតទោល ➔
                    </button>
                    <button
                      onClick={resetCupsLab}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-150 transition p-1 rounded-md border text-slate-600 dark:text-slate-350 text-[9px] flex items-center gap-0.5"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> សារថ្មី
                    </button>
                  </div>
                </div>

                {/* Double Cup sandbox */}
                <div className="relative w-full h-[260px] border border-slate-200 dark:border-slate-800 rounded-2xl mt-4 bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center overflow-hidden shadow-inner">
                  
                  <div className="flex flex-col items-center relative z-10">
                    {/* Upper cup */}
                    <div className="w-20 h-14 bg-indigo-505 dark:bg-indigo-600 rounded-t-lg border-2 border-slate-400 relative flex justify-center items-center shadow-lg">
                      <span className="text-[8px] text-white font-black">កែវក្រៅ (Top Cup)</span>
                    </div>

                    {/* Elastic/Airtight seal line */}
                    {!cupsLoose && (
                      <div className={`w-20 h-1.5 z-20 ${cupsPumped ? 'bg-red-500' : 'bg-slate-200'}`} />
                    )}

                    {/* Lower cup */}
                    <motion.div
                      animate={{ y: cupsLoose ? 60 : 0, rotate: cupsLoose ? 25 : 0 }}
                      className="w-20 h-14 bg-indigo-505 dark:bg-indigo-600 rounded-b-lg border-2 border-slate-400 relative flex flex-col justify-between items-center py-1 shadow-lg"
                    >
                      <span className="text-[8px] text-white font-black">កែវក្រោម (Lower Cup)</span>

                      {/* Suspended weight hanger and text */}
                      <div className="w-[1.5px] h-14 bg-slate-700 mx-auto relative flex flex-col items-center justify-end">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-mono text-[9px] font-bold border border-white top-6 absolute relative select-none">
                          👜 {cupsLoadKg}kg
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Atmospheric compression representation arrows */}
                  {cupsPumped && !cupsLoose && (
                    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex flex-col justify-between items-center py-20">
                      <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-purple-500 font-bold text-[10px]">▼ P_atm ▼</motion.div>
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-purple-500 font-bold text-[10px]">▲ P_atm ▲</motion.div>
                    </div>
                  )}
                </div>

                {/* Guide */}
                <div className="bg-slate-900 text-slate-100 rounded-xl p-3 flex gap-4 items-center mt-3 border border-slate-800 text-xs text-left">
                  <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <span className="font-bold text-purple-300 block mb-0.5 font-sans">របាយការណ៍កែវផ្គុំគ្នា៖</span>
                    {cupsFeedback}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Atmospheric controls & Theory explanation */}
      <div className="lg:col-span-5 flex flex-col gap-6" id="atm-controls">
        
        {/* Lab control panel card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-900">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">ឧបករណ៍បញ្ជាមេរៀន</h3>
          </div>

          <AnimatePresence mode="wait">
            {atmSubTab === 'barometer' ? (
              baroExpMode === 'torricelli' ? (
                // TORRICELLI BAROMETER SLIDERS
                <motion.div
                  key="baro-controls"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {/* Altitude height slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2 text-slate-700 dark:text-slate-350">
                      <span>កម្ពស់ដីពីនីវ៉ូសមុទ្រ (Altitude h):</span>
                      <span className="text-purple-600 dark:text-purple-450 font-mono text-sm font-bold">{altitude} ម៉ែត្រ (m)</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="8848" 
                      step="100"
                      value={altitude} 
                      onChange={(e) => setAltitude(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-650"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-bold">
                      <span>0ម (Sea level)</span>
                      <span>4000ម (ទីបេ/Tibet)</span>
                      <span>8848ម (Everest)</span>
                    </div>
                  </div>

                  {/* Info block explaining barometer height */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-150 text-[11px] text-slate-600 leading-relaxed">
                    📢 <span className="font-bold">គន្លឹះយល់ដឹង៖</span> នៅនីវ៉ូសមុទ្រ សម្ពាធខ្យល់ទ្រទ្រង់កម្ពស់ <span className="font-mono font-bold text-slate-800 dark:text-slate-200">បារត (Hg) បាន ៧៦០មមhg</span>។ នៅកំពូលភ្នំអេវើរ៉េស (Everest) ខ្យល់ស្ដើងយឺតយ៉ាវ សម្ពាធខ្យល់ចុះទន់ខ្សោយសល់តែ <span className="font-mono font-bold text-slate-850 dark:text-slate-200">~២៥០មមHg</span> ប៉ុណ្ណោះ។
                  </div>
                </motion.div>
              ) : (
                // MAGDEBURG HEMISPHERES CONTROLS
                <motion.div
                  key="magdeburg-controls"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 animate-fade-in"
                >
                  {/* Pump/Vacuum action */}
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 p-3 rounded-xl">
                    <div>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">ស្ថានភាពខ្យល់ក្នុងចាន៖</span>
                      <span className="text-[10px] text-slate-450">{isPumped ? 'លំហសុញ្ញកាស Vacuum 100%' : 'មានខ្យល់ធម្មតា'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPumped(true);
                        setPulledApart(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shadow transition-all ${
                        isPumped 
                          ? 'bg-rose-550 text-white' 
                          : 'bg-emerald-555 text-white hover:bg-emerald-600'
                      }`}
                    >
                      {isPumped ? 'ខ្យល់ត្រូវបានបូមចេញហើយ (SUCTION)' : 'បូមយកខ្យល់ចេញ'}
                    </button>
                  </div>

                  {/* Horses count selection */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-slate-700">
                      <span>ចំនួនសេះប្រើសម្រាប់ទាញ (Horses)៖</span>
                      <span className="text-purple-650 font-mono font-bold text-sm bg-purple-50 px-2 py-0.5 rounded">{horsesCount} ក្បាល</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="16"
                      step="1"
                      value={horsesCount}
                      onChange={(e) => setHorsesCount(Number(e.target.value))}
                      className="w-full h-1.5 accent-purple-600"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                      <span>1 ក្បាល (800 N)</span>
                      <span>8 ក្បាល (6400 N)</span>
                      <span>16 ក្បាល (12800 N)</span>
                    </div>
                  </div>

                  {/* Pull Action Trigger */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={handleMagdeburgPull}
                      className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold shadow-md"
                    >
                      ទាក់សេះឱ្យទាញបំបែក (Pull!)
                    </button>
                    <button
                      type="button"
                      onClick={resetMagdeburg}
                      className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-250 text-slate-650 dark:text-slate-300 text-[10px] font-bold border"
                    >
                      លុបកំណត់ថ្មី (Reset)
                    </button>
                  </div>
                </motion.div>
              )
            ) : (
              canExpMode === 'single_can' ? (
                // CAN COLLAPSE INTERACTION BUTTONS
                <motion.div
                  key="can-controls"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <button
                    disabled={canStep !== 1 || isHeating}
                    onClick={() => setIsHeating(true)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition shadow flex items-center justify-between ${
                      canStep === 1 
                        ? isHeating 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-orange-550 text-white'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>ជំហាន ១៖ ដុតកំដៅកំប៉ុង (Heat Up Can)</span>
                    {isHeating && <span className="animate-ping text-red-500">🔥 Heating...</span>}
                    {canStep > 1 && <span className="text-green-500 font-bold">✓ រួចរាល់</span>}
                  </button>

                  <button
                    disabled={canStep !== 2 || isSealed}
                    onClick={() => {
                      setIsSealed(true);
                      setCanStep(3);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition shadow flex items-center justify-between ${
                      canStep === 2
                        ? 'bg-rose-550 text-white hover:bg-rose-600'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>ជំហាន ២៖ គ្របមាត់កំប៉ុងឱ្យជិត (Seal Cap)</span>
                    {canStep > 2 && <span className="text-green-500 font-bold">✓ រួចរាល់</span>}
                  </button>

                  <button
                    disabled={canStep !== 3 || isPouringWater}
                    onClick={handleApplyColdWater}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition shadow flex items-center justify-between ${
                      canStep === 3
                        ? 'bg-sky-550 text-white hover:bg-sky-600'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>ជំហាន ៣៖ ស្រោចទឹកត្រជាក់ (Pour Cold Water!)</span>
                    {isPouringWater && <span className="animate-pulse text-indigo-300">💦 Pouring...</span>}
                    {canStep > 3 && <span className="text-green-500 font-bold">✓ កំប៉ុងស្រុតក្រឡឹប!</span>}
                  </button>
                </motion.div>
              ) : (
                // DOUBLE CUPS / COMBINED PLUNGERS CONTROLS
                <motion.div
                  key="double-cup-controls"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 animate-fade-in"
                >
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 border p-3 rounded-xl">
                    <div>
                      <span className="text-xs text-slate-705 font-bold block">ស្ថានភាពភ្ជាប់ផ្គុំកែវ៖</span>
                      <span className="text-[10px] text-slate-450">{cupsPumped ? 'បឺតខ្យល់ចេញVacuumចំហៀង' : 'មិនទាន់បឺតខ្យល់'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCupsPumped(true);
                        setCupsLoose(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shadow ${
                        cupsPumped ? 'bg-rose-550 text-white' : 'bg-indigo-505 text-white'
                      }`}
                    >
                      {cupsPumped ? 'បានបឺតរួចជាស្រេច' : 'បឺតយកខ្យល់ចេញ'}
                    </button>
                  </div>

                  {/* Weight Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-slate-700">
                      <span>ព្យួរទម្ងន់ត្រង់កែវក្រោម (suspended mass)៖</span>
                      <span className="text-indigo-600 font-mono font-bold text-sm bg-indigo-50 px-2 rounded">{cupsLoadKg} kg</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="5"
                      value={cupsLoadKg}
                      onChange={(e) => setCupsLoadKg(Number(e.target.value))}
                      className="w-full h-1.5 accent-indigo-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-bold">
                      <span>1 kg (9.8 N)</span>
                      <span>50 kg (490 N)</span>
                      <span>100 kg (980 N)</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={handleApplyCupsLoad}
                      className="py-2.5 rounded-xl bg-emerald-555 hover:bg-emerald-600 text-white text-[10px] font-bold shadow-md"
                    >
                      សាកល្បងព្យួរទម្ងន់ (Test Hang Weight)
                    </button>
                    <button
                      type="button"
                      onClick={resetCupsLab}
                      className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-250 text-slate-600 dark:text-slate-350 text-[10px] font-bold border"
                    >
                      លុបកំណត់ថ្មី (Reset)
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Physics Core Theory Explanation */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-slate-200">សម្ពាធបរិយាកាស (Atmospheric Pressure)</h4>
          </div>

          <p className="text-xs text-slate-350 leading-relaxed">
            🌍 <span className="font-bold text-purple-400">តើវាជាអ្វី?</span> នៅជុំវិញផែនដីមានស្រទាប់ខ្យល់កម្រាស់រាប់រយគីឡូម៉ែត្រ។ ទំងន់នៃខ្យល់នេះសង្កត់កែងមកលើផ្ទៃផែនដី និងវត្ថុទាំងឡាយបង្កើតបានជា <span className="font-bold text-white">សម្ពាធបរិយាកាស (Atmospheric Pressure)</span>។
          </p>
          <div className="mt-3 bg-purple-950/20 border-l-4 border-purple-500 p-2.5 rounded-r text-[10px] text-slate-300 flex gap-1.5 items-start">
            <Info className="w-4 h-4 text-purple-450 shrink-0 mt-0.5" />
            <span className="leading-tight">
              ចានដែកម៉ាក់ដេបួរ និងកែវរួមភ្ជាប់គ្នាបង្ហាញថា៖ នៅពេលមានសុញ្ញកាស១០០% ខាងក្នុង សម្ពាធខ្យល់ក្រៅដ៏ខ្លាំងបានសង្កត់ផ្ទៃទាំងពីរគាបជាប់គ្នាយ៉ាងខ្លាំងបំផុត ដែលតម្រូវឱ្យប្រើសេះជាច្រើន ឬទម្ងន់រហូតដល់រាប់រយញូតុន ទើបអាចទាញបំបែកចេញពីគ្នាបាន!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
