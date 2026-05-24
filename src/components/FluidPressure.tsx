/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Wind, Gauge, HelpCircle, Activity, Thermometer, Box, PlusCircle, RotateCcw } from 'lucide-react';
import { LiquidType } from '../types';

const LIQUID_PRESETS: LiquidType[] = [
  { id: 'water', name: 'ទឹក (Water)', density: 1000, color: '#38BDF8' },
  { id: 'gasoline', name: 'ប្រេងសាំង (Gasoline)', density: 700, color: '#F43F5E' },
  { id: 'kerosene', name: 'ប្រេងកាត (Kerosene)', density: 800, color: '#F59E0B' },
  { id: 'diesel', name: 'ម៉ាស៊ូត (Diesel)', density: 850, color: '#84CC16' },
  { id: 'alcohol', name: 'អាល់កុល (Alcohol)', density: 789, color: '#A855F7' },
  { id: 'honey', name: 'ទឹកឃ្មុំ (Honey)', density: 1420, color: '#D97706' },
  { id: 'seawater', name: 'ទឹកសមុទ្រ (Seawater)', density: 1025, color: '#06B6D4' },
  { id: 'cookingoil', name: 'ប្រេងឆា (Cooking Oil)', density: 920, color: '#EAB308' },
];

export default function FluidPressure() {
  const [subTab, setSubTab] = useState<'liquid' | 'gas'>('liquid');

  // --- Liquid pressure state ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>('water');
  const [density, setDensity] = useState<number>(1000); // kg/m^3
  const [depth, setDepth] = useState<number>(2.5); // meter (0 to 5m)
  const [g, setG] = useState<number>(10); // gravity m/s^2 (customizable)
  const [pAtm, setPAtm] = useState<number>(101325); // Pascal (customizable atmospheric pressure)
  const [includeAtm, setIncludeAtm] = useState<boolean>(true);
  const [customLiquidColor, setCustomLiquidColor] = useState<string>('#38BDF8');

  // Automatically update density and color when preset changes
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId !== 'custom') {
      const match = LIQUID_PRESETS.find(p => p.id === presetId);
      if (match) {
        setDensity(match.density);
        setCustomLiquidColor(match.color);
      }
    }
  };

  // Switch to custom preset automatically if density is adjusted manually
  const handleDensityChange = (newDensity: number) => {
    const clamped = Math.max(100, Math.min(2500, newDensity));
    setDensity(clamped);
    // Find matching preset, else set custom
    const match = LIQUID_PRESETS.find(p => p.density === clamped);
    if (match) {
      setSelectedPresetId(match.id);
      setCustomLiquidColor(match.color);
    } else {
      setSelectedPresetId('custom');
      setCustomLiquidColor('#14B8A6'); // teal for custom
    }
  };

  // Calculations for Liquid pressure
  const hydrostaticPressure = density * g * depth; // Pa
  const totalPressure = includeAtm ? hydrostaticPressure + pAtm : hydrostaticPressure;

  // --- Gas pressure state ---
  const [temperature, setTemperature] = useState<number>(300); // Kelvin (100K to 600K)
  const [volume, setVolume] = useState<number>(3); // Liters or relative m^3 (1 to 5)
  const [moleculesCount, setMoleculesCount] = useState<number>(30); // count

  // Gas pressure calculation based on Ideal Gas Law: P = nRT/V
  const R = 8.314;
  const gasPressure = (moleculesCount * R * temperature) / volume; // relative unit as Pa/kPa

  // Gas particles animation ref for canvas or styled divs
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  // Initialize and update particles
  useEffect(() => {
    const initialParticles = Array.from({ length: moleculesCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // percent
      y: Math.random() * 80 + 10, // percent
      vx: (Math.random() - 0.5) * (temperature / 100) * 2, // velocity scales with temperature
      vy: (Math.random() - 0.5) * (temperature / 100) * 2,
    }));
    setParticles(initialParticles);
  }, [moleculesCount]);

  // Handle particle movement loop
  useEffect(() => {
    let animationFrameId: number;
    const speedMultiplier = Math.sqrt(temperature / 300);

    const updateGasSimulation = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let nx = p.x + p.vx * speedMultiplier * 0.4;
          let ny = p.y + p.vy * speedMultiplier * 0.4;
          let nvx = p.vx;
          let nvy = p.vy;

          if (nx < 5) {
            nx = 5;
            nvx = -nvx;
          }
          if (nx > 95) {
            nx = 95;
            nvx = -nvx;
          }
          if (ny < 5) {
            ny = 5;
            nvy = -nvy;
          }
          if (ny > 90) {
            ny = 90;
            nvy = -nvy;
          }

          return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
      animationFrameId = requestAnimationFrame(updateGasSimulation);
    };

    animationFrameId = requestAnimationFrame(updateGasSimulation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [temperature]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="fluid-pressure-sim" style={{ fontFamily: 'var(--font-sans)' }}>
      
      {/* Simulation Header with sub-tabs */}
      <div className="col-span-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setSubTab('liquid')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              subTab === 'liquid'
                ? 'bg-sky-550 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350'
            }`}
          >
            <Droplet className="w-4 h-4 text-sky-400" />
            សម្ពាធក្នុងអង្គធាតុរាវ (Hydrostatic Pressure)
          </button>
          
          <button
            onClick={() => setSubTab('gas')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              subTab === 'gas'
                ? 'bg-amber-550 text-white shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350'
            }`}
          >
            <Wind className="w-4 h-4 text-amber-500" />
            សម្ពាធក្នុងឧស្ម័ន (Gas Pressure)
          </button>
        </div>
        
        <span className="text-xs font-mono text-slate-500 font-bold">
          {subTab === 'liquid' ? 'P = ρ · g · h' : 'P = n · R · T / V'}
        </span>
      </div>

      {/* Primary Simulator Canvas */}
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[460px] lg:h-[520px] flex flex-col justify-between relative overflow-hidden shadow-sm">
        
        <AnimatePresence mode="wait">
          {subTab === 'liquid' ? (
            // --- LIQUID PRESSURE EXPERIMENTAL RENDER ---
            <motion.div
              key="liquid-sim"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-grow flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-center z-10">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">ម៉ូដែលសសរអង្គធាតុរាវស្វ័យប្រវត្ត</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">អូសសញ្ញា ឬផ្លាស់ប្ដូរតម្លៃក្នុងបន្ទះបញ្ជាខាងស្តាំ</p>
                </div>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs rounded-lg flex items-center gap-1.5 font-bold shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: customLiquidColor }} />
                  {selectedPresetId === 'custom' ? 'ល្បាយផ្ទាល់ខ្លួន (Custom)' : (LIQUID_PRESETS.find(p => p.id === selectedPresetId)?.name || 'រាវ')}
                </div>
              </div>

              {/* Liquid Container visual */}
              <div className="relative w-full max-w-[340px] h-[270px] mx-auto border-x-4 border-b-4 border-slate-400 dark:border-slate-700 rounded-b-2xl mt-4 bg-slate-200 dark:bg-slate-950 flex items-end overflow-hidden shadow-inner">
                
                {/* Scaled level grid markers */}
                <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none z-10 font-bold py-2">
                  <span>5.0 ម</span>
                  <span>3.75 ម</span>
                  <span>2.5 ម</span>
                  <span>1.25 ម</span>
                  <span>0.0 ម</span>
                </div>

                {/* Actual Liquid body */}
                <motion.div
                  animate={{ height: `${(depth / 5) * 100}%` }}
                  transition={{ type: "tween", duration: 0.3 }}
                  style={{ backgroundColor: customLiquidColor }}
                  className="w-full relative opacity-60 flex items-end justify-center transition-all"
                >
                  {/* Bubble animations inside fluid */}
                  <div className="absolute inset-0 overflow-hidden opacity-40">
                    <div className="absolute bottom-4 left-6 w-1 h-1 bg-white rounded-full animate-bounce duration-1000" />
                    <div className="absolute bottom-16 right-12 w-2 h-2 bg-white rounded-full animate-bounce duration-700" />
                    <div className="absolute bottom-28 left-12 w-1.5 h-1.5 bg-white rounded-full animate-bounce duration-1200" />
                  </div>
                </motion.div>

                {/* Draggable/Selectable Gauge Indicator */}
                <motion.div 
                  animate={{ bottom: `${(depth / 5) * 270 - 15}px` }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="absolute right-4 w-[210px] h-9 bg-slate-900/95 border border-slate-700 rounded-xl px-2.5 py-1 text-white text-xs flex items-center justify-between shadow-lg z-25"
                >
                  <div className="flex items-center gap-1 font-bold">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-mono text-[11px] text-teal-300">
                      {totalPressure >= 1000 ? `${(totalPressure / 1000).toFixed(2)} kPa` : `${totalPressure.toFixed(0)} Pa`}
                    </span>
                  </div>
                  <div className="text-[9px] bg-slate-800 text-slate-350 px-1.5 py-0.5 rounded font-mono font-bold">
                    h = {depth.toFixed(2)}m
                  </div>
                </motion.div>

                {/* Vertical invisible slider to easily control depth */}
                <input 
                  type="range"
                  min="0.0"
                  max="5"
                  step="0.05"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="absolute inset-y-0 right-0 w-8 h-full opacity-0 cursor-row-resize z-30"
                />
              </div>

              {/* Live physics variables dashboard */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-4 gap-1 text-center mt-3 shadow-inner">
                <div>
                  <span className="text-[9px] text-slate-500 block font-bold">ដង់ស៊ីតេ (ρ)</span>
                  <span className="text-xs font-extrabold text-slate-750 dark:text-slate-300 font-mono block">{density} kg/m³</span>
                </div>
                <div className="border-l border-slate-150 dark:border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-bold">ទំនាញដី (g)</span>
                  <span className="text-xs font-extrabold text-slate-750 dark:text-slate-300 font-mono block">{g} m/s²</span>
                </div>
                <div className="border-l border-slate-150 dark:border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-bold">ជម្រៅរាវ (h)</span>
                  <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400 font-mono block">{depth.toFixed(2)} m</span>
                </div>
                <div className="border-l border-slate-150 dark:border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-bold">សម្ពាធអ៊ីដ្រូគ្រាប់</span>
                  <span className="text-xs font-extrabold text-teal-650 dark:text-teal-400 font-mono block">{(hydrostaticPressure / 1000).toFixed(2)} kPa</span>
                </div>
              </div>
            </motion.div>
          ) : (
            // --- GAS PRESSURE EXPERIMENTAL RENDER ---
            <motion.div
              key="gas-sim"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-grow flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-center z-10 animate-fade-in">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">ម៉ូដែលសម្ពាធឧស្ម័នមីក្រូទស្សន៍</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">សង្កេតកាលគិតគូរប៉ះទង្គិចភាគល្អិតបង្កើតជាសម្ពាធ</p>
                </div>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs rounded-lg font-mono flex items-center gap-1 font-bold shadow-sm">
                  <Thermometer className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                  {temperature} K / {Math.round(temperature - 273.15)}°C
                </div>
              </div>

              {/* Molecule Box visual rendering */}
              <div className="relative w-full max-w-[340px] h-[240px] mx-auto bg-slate-900 border-4 border-slate-700 rounded-2xl mt-4 overflow-hidden shadow-2xl flex items-center justify-center">
                
                {/* Dynamically Resizable Container Box representing Gas Volume */}
                <motion.div
                  animate={{
                    width: `${(volume / 5) * 100}%`,
                    height: '92%'
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  ref={containerRef}
                  className="bg-slate-950/90 border-2 border-slate-750 border-dashed rounded-lg relative overflow-hidden"
                >
                  {/* Render simulated molecules particles */}
                  {particles.map((p) => {
                    const speedColor = temperature > 400 ? 'bg-orange-500 shadow-orange-500/50' : temperature < 200 ? 'bg-indigo-400 shadow-indigo-400/50' : 'bg-green-400 shadow-green-400/50';
                    return (
                      <div
                        key={p.id}
                        className={`absolute w-2 h-2 rounded-full shadow-sm transition-transform duration-500 ${speedColor}`}
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                        }}
                      />
                    );
                  })}
                </motion.div>
                
                {/* Burner/Cooler heater visual below the box */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-orange-600/30 to-transparent flex justify-center items-center">
                  {temperature > 400 && (
                    <span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold font-mono"> heating </span>
                  )}
                  {temperature < 200 && (
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold font-mono"> cooling </span>
                  )}
                </div>
              </div>

              {/* Dynamic Gas Gauge Data dashboard */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-3 gap-2 text-center mt-3 shadow-inner">
                <div>
                  <span className="text-[10px] text-slate-550 block font-bold">មាឌធុង (V)</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-450 font-mono">{volume.toFixed(1)} លីត្រ</span>
                </div>
                <div className="border-x border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] text-slate-555 block font-bold">ចំនួនភាគល្អិត (n)</span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 font-mono">{moleculesCount} ភាគល្អិត</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-555 block font-bold">សម្ពាធគណនា (P)</span>
                  <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400 font-mono">
                    {gasPressure.toFixed(2)} kPa
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fluid / Gas Controls & Theory */}
      <div className="lg:col-span-5 flex flex-col gap-6" id="fluid-gas-controls">
        
        {/* Render specific control card depending on active sub-tab */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-105 dark:border-slate-900">
            <Activity className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-850 dark:text-slate-100">ឧបករណ៍បញ្ជាមន្ទីរពិសោធន៍</h3>
          </div>

          <AnimatePresence mode="wait">
            {subTab === 'liquid' ? (
              // LIQUID SLIDERS
              <motion.div
                key="liq-controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Grid of Liquid Presets */}
                <div>
                  <label className="text-xs font-bold mb-1.5 text-slate-650 dark:text-slate-300 block">១. ជ្រើសរើសប្រភេទអង្គធាតុរាវ៖</label>
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    {LIQUID_PRESETS.map((liq) => (
                      <button
                        key={liq.id}
                        type="button"
                        onClick={() => handlePresetSelect(liq.id)}
                        className={`py-1 px-0.5 text-[9px] rounded-lg border font-bold flex flex-col items-center justify-center transition-all ${
                          selectedPresetId === liq.id
                            ? 'bg-sky-50 border-sky-400 text-sky-800 dark:bg-sky-950/40 dark:border-sky-400 dark:text-sky-300 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-550'
                        }`}
                      >
                        <span className="truncate w-full text-center">{liq.name.split(' ')[0]}</span>
                        <span className="font-mono text-[8.5px] font-normal block opacity-75">ρ={liq.density}</span>
                      </button>
                    ))}
                    {/* Manual button */}
                    <button
                      type="button"
                      onClick={() => setSelectedPresetId('custom')}
                      className={`py-1 px-0.5 text-[9px] rounded-lg border font-bold flex flex-col items-center justify-center transition-all ${
                        selectedPresetId === 'custom'
                          ? 'bg-teal-50 border-teal-500 text-teal-800 dark:bg-teal-950/40 dark:border-teal-400 dark:text-teal-300 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-550'
                      }`}
                    >
                      <span className="block font-bold">កំណត់ផ្ទាល់</span>
                      <span className="font-mono text-[8.5px] block font-normal text-slate-450">&rho;_own</span>
                    </button>
                  </div>
                </div>

                {/* Density Input Slider (with typing input) */}
                <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 text-slate-700 dark:text-slate-350">
                    <span>ដង់ស៊ីតេ &rho; (Density):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={density}
                        onChange={(e) => handleDensityChange(Number(e.target.value))}
                        className="w-16 px-1 border border-slate-250 dark:border-slate-850 rounded text-center text-xs font-bold font-mono text-indigo-650 bg-white dark:bg-slate-950"
                        min="100"
                        max="2500"
                      />
                      <span className="font-bold text-slate-500 text-[10px]">kg/m³</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2200"
                    step="10"
                    value={density}
                    onChange={(e) => handleDensityChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-550"
                  />
                </div>

                {/* Depth Slider & input */}
                <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span>កម្ពស់/ជម្រៅជាតិរាវ h (Depth):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={depth}
                        onChange={(e) => setDepth(Math.max(0, Math.min(5, Number(e.target.value))))}
                        className="w-14 px-1 border border-slate-250 dark:border-slate-855 rounded text-center text-xs font-bold font-mono text-sky-650 bg-white dark:bg-slate-950"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                      <span className="font-bold text-slate-500 text-[10px]">ម៉ែត្រ (m)</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.05"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* Gravity silder & input */}
                <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span>សំទុះទំនាញផែនដី g (Gravity):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={g}
                        onChange={(e) => setG(Math.max(0.1, Math.min(30, Number(e.target.value))))}
                        className="w-14 px-1 border border-slate-250 dark:border-slate-855 rounded text-center text-xs font-bold font-mono text-indigo-650 bg-white dark:bg-slate-950"
                        min="0.1"
                        max="30"
                        step="0.1"
                      />
                      <span className="font-bold text-slate-500 text-[10px]">m/s²</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.1"
                    value={g}
                    onChange={(e) => setG(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* Atmospheric pressure slider & input */}
                <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span>សម្ពាធបរិយាកាស P_atm:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={pAtm}
                        onChange={(e) => setPAtm(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-1 border border-slate-250 dark:border-slate-855 rounded text-center text-[10px] font-bold font-mono text-emerald-650 bg-white dark:bg-slate-950"
                        min="0"
                      />
                      <span className="font-bold text-slate-500 text-[10px]">Pa</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={pAtm}
                    onChange={(e) => setPAtm(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-550 animate-fade-in"
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    <button
                      type="button"
                      onClick={() => setPAtm(101325)}
                      className="px-2 py-0.5 rounded text-[8px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-250"
                    >
                      P_atm ស្តង់ដារ (101.3 kPa)
                    </button>
                    {/* Switch/Checkbox for adding atmosphere to total */}
                    <label className="flex items-center gap-1 text-[10px] select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeAtm}
                        onChange={(e) => setIncludeAtm(e.target.checked)}
                        className="accent-teal-500"
                      />
                      <span className="font-bold text-slate-650">បូកបញ្ចូលក្នុង Pសរុប</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            ) : (
              // GAS SLIDERS
              <motion.div
                key="gas-controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Temperature slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-orange-500" /> សីតុណ្ហភាព (T) :</span>
                    <span className="text-orange-600 dark:text-orange-400 font-mono text-sm font-bold">{temperature} K</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="600" 
                    value={temperature} 
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-orange-655"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>100 K (ត្រជាក់ខ្លាំង)</span>
                    <span>600 K (ក្ដៅខ្លាំង)</span>
                  </div>
                </div>

                {/* Volume slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span className="flex items-center gap-1"><Box className="w-3.5 h-3.5 text-blue-500" /> មាឌធុងផ្ទុក (V) :</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">{volume.toFixed(1)} L</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5"
                    value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-amber-550"
                  />
                </div>

                {/* Particle quantity moles/count */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-705 dark:text-slate-350">
                    <span className="flex items-center gap-1"><PlusCircle className="w-3.5 h-3.5 text-green-500" /> បរិមាណម៉ូលេគុល (n) :</span>
                    <span className="text-green-600 dark:text-green-400 font-mono text-sm font-bold">{moleculesCount} ភាគល្អិត</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={moleculesCount} 
                    onChange={(e) => setMoleculesCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-green-655"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Formula card inside Control Panel */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-sky-400" />
            <h4 className="font-bold text-slate-200">វិភាគរូបមន្តមេរៀន</h4>
          </div>

          {subTab === 'liquid' ? (
            <div>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs border border-slate-850 mb-4 text-center">
                <div className="font-bold text-sky-400 text-base">P_liq = &rho; · g · h</div>
                <div className="text-[10px] text-slate-400 mt-2 text-left space-y-1">
                  <div>• <span className="text-yellow-405 font-bold">&rho;</span> : ដង់ស៊ីតេជាតិរាវ (គិតជា kg/m³)</div>
                  <div>• <span className="text-yellow-405 font-bold">g</span> : សំទុះទំនាញ (គិតជា m/s²)</div>
                  <div>• <span className="text-yellow-405 font-bold">h</span> : ជម្រៅជាតិរាវពីគូសផ្ទៃមកដល់បាត (m)</div>
                </div>
              </div>
              <p className="text-xs text-slate-350 leading-relaxed text-left">
                📢 <span className="font-bold text-sky-400">គន្លឹះយល់ដឹង៖</span> សម្ពាធក្នុងទឹកមិនអាស្រ័យលើ <span className="text-yellow-400">ទំងន់សរុប ឬរូបរាងរបស់ធុង</span> ឡើយ! វាអាស្រ័យលើ <span className="text-amber-400">ដង់ស៊ីតេរាវ</span> និង <span className="text-amber-450 font-extrabold">ជម្រៅពិតប្រាកដ</span> តែប៉ុណ្ណោះ។ កាន់តែជ្រៅ សម្ពាធកាន់តែខ្លាំង!
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs border border-slate-850 mb-3 text-center">
                <div className="font-bold text-orange-400 text-base">P = n · R · T / V</div>
                <div className="text-[10px] text-slate-400 mt-2 text-left space-y-1">
                  <div>• <span className="text-orange-400 font-bold">n</span>: ចំនួនម៉ូលេគុល (moles particles)</div>
                  <div>• <span className="text-orange-400 font-bold">T</span>: សីតុណ្ហភាពគិតជា កែវិន (K)</div>
                  <div>• <span className="text-orange-400 font-bold">V</span>: មាឌរបស់ធុងផ្ទុក (Liters)</div>
                </div>
              </div>
              <p className="text-xs text-slate-355 leading-relaxed text-left">
                📢 <span className="font-bold text-orange-400">គន្លឹះយល់ដឹង៖</span> ឧស្ម័នបង្កើតសម្ពាធដោយការ <span className="text-amber-400">បុកទង្គិចញឹកញាប់របស់ម៉ូលេគុល</span> ទៅនឹងជញ្ជាំងធុង។ បើកំដៅ <span className="text-amber-400">T</span> កាន់តែខ្ពស់ ម៉ូលេគុលទង្គិចរហ័ស ធ្វើឲ្យសម្ពាធកើនឡើង។ បើមាឌធុង <span className="text-amber-400">V</span> កាន់តែតូច ទំហំប៉ះទង្គិចក៏កាន់តែចង្អៀត ធ្វើឱ្យសម្ពាធកើនឡើង។
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
