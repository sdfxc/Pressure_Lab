/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LabTab } from './types';
import SolidPressure from './components/SolidPressure';
import FluidPressure from './components/FluidPressure';
import PascalPressure from './components/PascalPressure';
import AtmosphericPressure from './components/AtmosphericPressure';
import LabQuiz from './components/LabQuiz';
import { 
  Square, 
  Droplet, 
  Settings2, 
  Compass, 
  HelpCircle, 
  GraduationCap, 
  Moon, 
  Sun,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<LabTab>('solid');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          
          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-650 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                កម្មវិធីពិសោធន៍រូបវិទ្យាស្តីពី «សម្ពាធ»
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                ស្វែងយល់តាមរយៈការសាកល្បងនិងលេងដោយសេរី (Physics Pressure Lab)
              </p>
            </div>
          </div>

          {/* Theme & Meta widgets top right */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode toggle button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              title={darkMode ? "ប្តូរទៅ Light Mode" : "ប្តូរទៅ Dark Mode"}
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-610" />}
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Navigation Tabs Selector list */}
        <div className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-1 shadow-sm">
          
          <button
            onClick={() => setActiveTab('solid')}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'solid'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Square className="w-4 h-4" />
            ១. សម្ពាធនៃអង្គធាតុរឹង
          </button>

          <button
            onClick={() => setActiveTab('fluid')}
            className={`flex-1 min-w-[124px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'fluid'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Droplet className="w-4 h-4 text-sky-500" />
            ២. សម្ពាធក្នុងសន្ទនីយ (រាវ-ឧស្ម័ន)
          </button>

          <button
            onClick={() => setActiveTab('pascal')}
            className={`flex-1 min-w-[124px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'pascal'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Settings2 className="w-4 h-4 text-emerald-500" />
            ៣. ការបញ្ជូនសម្ពាធ (ច្បាប់ប៉ាស្កាល់)
          </button>

          <button
            onClick={() => setActiveTab('atmosphere')}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'atmosphere'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-500" />
            ៤. សម្ពាធបរិយាកាស
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-505/20'
                : 'text-indigo-650 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
            }`}
          >
            <Award className="w-4 h-4 text-indigo-500" />
            ៥. តេស្តសមត្ថភាព (Quiz)
          </button>

        </div>

        {/* Tab content panel container */}
        <div className="w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'solid' && <SolidPressure />}
              {activeTab === 'fluid' && <FluidPressure />}
              {activeTab === 'pascal' && <PascalPressure />}
              {activeTab === 'atmosphere' && <AtmosphericPressure />}
              {activeTab === 'quiz' && <LabQuiz />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Unified informational section footer footer */}
        <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-inner tracking-wide leading-relaxed">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850 text-indigo-500 shrink-0">
              <HelpCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <h4 className="font-black text-sm text-slate-800 dark:text-slate-100">📖 ការណែនាំស្តីពីមន្ទីរពិសោធន៍និម្មិត</h4>
              <p className="text-slate-600 dark:text-slate-350">
                មន្ទីរពិសោធន៍និម្មិតនេះត្រូវបានរៀបចំឡើងជូនសិស្សានុសិស្សក្នុងការវាយតម្លៃយល់ដឹង អំពីមេរៀនសម្ពាធនៃរូបវិទ្យាថ្នាក់ទី៩ និងថ្នាក់វិទ្យាល័យ។ 
                អ្នកសិក្សាអាចផ្លាស់ប្តូរតម្លៃម៉ាស ផ្ទៃបាត ដង់ស៊ីតេ និងកម្រាស់កម្ពស់ដើម្បីសង្កេតមើលបាតុភូតរូបវិទ្យាជាក់ស្តែងភ្លាមៗ។
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Small subtle footer bar */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-850 text-center text-xs text-slate-400 dark:text-slate-500 font-mono">
        © {new Date().getFullYear()} ពិសោធន៍សម្ពាធរូបវិទ្យា - Google AI Studio Build - ភាសាខ្មែរ
      </footer>

    </div>
  );
}
