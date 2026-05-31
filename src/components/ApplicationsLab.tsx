import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  HelpCircle,
  Sparkles, 
  Lightbulb, 
  Gauge,
  Layers,
  Flame,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  BookOpen,
  Info,
  Eye,
  Play,
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Tool style & Scenario state interfaces
type SectionTab = 'formula' | 'scenarios' | 'tractor';
type SoilType = 'mud' | 'sand';
type WheelType = 'narrow' | 'wide';

export default function ApplicationsLab() {
  // Current active section
  const [activeTab, setActiveTab] = useState<SectionTab>('formula');

  // ==========================================
  // SECTION 1: INTERACTIVE FORMULA LAB STATES
  // ==========================================
  const [force, setForce] = useState<number>(200); // 10N to 500N
  const [area, setArea] = useState<number>(4);    // 1m² to 10m²

  // Calculate live pressure P = F / A
  const pressure = force / area;

  // Calculate dynamic typography font sizes in rem for P = F / A equations according to physical changes
  // F (Force) maps from 10 to 500 N to font size 1.2rem to 4.2rem
  // A (Area) maps from 1 to 10 m² to font size 1.2rem to 4.2rem
  // P (Pressure) maps from 1 to 500 Pa to font size 1.2rem to 5.2rem (with log/power damping for aesthetic balance)
  const fSize = 1.2 + ((force - 10) / 490) * 3.0;
  const aSize = 1.2 + ((area - 1) / 9) * 3.0;
  
  // Power layout damping for P to avoid scaling too fast but still clearly visible
  const pSize = 1.2 + Math.pow((pressure - 1) / 499, 0.5) * 4.0;

  // ==========================================
  // SECTION 2: REAL-WORLD PRESSURE SCENARIOS STATES
  // ==========================================
  const [activeScenarioId, setActiveScenarioId] = useState<number>(0);
  const [pressureMapActive, setPressureMapActive] = useState<boolean>(false);

  // Scenarios data
  const scenarios = [
    {
      id: 0,
      title: 'ការជិះស្គីទឹកកក (Ice Skiing)',
      subtitle: 'ផ្ទៃប៉ះធំ ➡ សម្ពាធទាប',
      effect: 'រារាំងការលិចលង់ដីភក់ និងព្រិល',
      explanation: 'បន្ទះក្តារស្គីជិះលើទឹកកកមានប្រវែងវែង និងផ្ទៃក្រឡា (Area A) ធំទូលាយ។ ទំហំធំបែបនេះជួយបែងចែកទម្ងន់ខ្លួនរបស់មនុស្ស (Force F) ឱ្យបែកខ្ញែកលើផ្ទៃធំ ដែលធ្វើឱ្យសម្ពាធ (Pressure P) ថយចុះជាអប្បបរមា។ លទ្ធផលគឺអ្នកសិក្សាអាចរអិលខ្លួនទៅមុខដោយសេរី ដោយមិនផុងខ្លួនចូលទៅក្នុងធ្លាក់ទឹកកកទន់ៗឡើយ។',
      contactDesc: 'ផ្ទៃក្រឡារលោងវែង រាលដាលពេញបាតស្បែកជើងស្គី',
      svgType: 'skiing',
      glowStyle: {
        width: '85%',
        height: '14px',
        bottom: '10px',
        left: '7.5%',
        borderRadius: '5px',
      }
    },
    {
      id: 1,
      title: 'កាំបិតកាត់បន្លែ (Kitchen Knife)',
      subtitle: 'ផ្ទៃប៉ះតូចបំផុត ➡ សម្ពាធខ្ពស់ខ្លាំង',
      effect: 'កាត់មុតធ្លាយ និងកាត់ដាច់ភ្លាមៗ',
      explanation: 'មុខផ្លែកាំបិតត្រូវបានសម្រួចអោយស្តើងបំផុត ដែលធ្វើអោយផ្ទៃក្រឡាប៉ះពាល់ត្រង់ចំណុចប៉ះ (Area A) មានទំហំជិតស្មើនឹងសូន្យ។ នៅពេលយើងសង្កត់កម្លាំង (Force F) ត្រឹមតែបន្តិចបន្តួច វានឹងបង្កើតបាននូវសម្ពាធ (Pressure P) ដ៏មហិមាដែលមុតទម្លុះសរសៃបន្លែ ការ៉ុត ឬសាច់ដាច់ចេញពីគ្នាយ៉ាងទាន់ចិត្ត។',
      contactDesc: 'ខ្សែបន្ទាត់មុខកាំបិតមុតស្រួចតូចស្តើងស្រួច',
      svgType: 'knife',
      glowStyle: {
        width: '6px',
        height: '110px',
        bottom: '25px',
        left: '48.5%',
        borderRadius: '4px',
      }
    },
    {
      id: 2,
      title: 'ពូថៅកាប់អុស (Ax Splitter)',
      subtitle: 'មុខរាងប្លង់ទ្រេតផ្តុំកម្លាំង ➡ សម្ពាធខ្ពស់',
      effect: 'ពុះផ្ដាច់សរសៃឈើរឹងៗបង្កើនការបំបែក',
      explanation: 'ពូថៅមានមុខស្រួចស្តើងនៅផ្នែកចុង និងរីកធំជាប្លង់ទ្រេតនៅផ្នែកខ្នង។ រចនាសម្ព័ន្ធប្លង់ទ្រេតមុតនេះផ្ដុំកម្លាំងប៉ះទង្គិចទាំងអស់ដែលកើតចេញពីការយោលកាប់ មកផ្តុំគ្នានៅលើផ្នែកប៉ះរាងខ្សែបន្ទាត់តូចខ្លាំង។ សម្ពាធមហិមាបង្កើតឡើងនៅចំណុចនោះនឹងពុះច្រៀកកំណាត់ឈើរឹងៗចេញជាពីរកម្ទេចដោយស្រួល។',
      contactDesc: 'ចំណុចមុតស្រួចក្រូចឆ្មារសង្កត់ត្រង់កាប់ឈើ',
      svgType: 'ax',
      glowStyle: {
        width: '28px',
        height: '28px',
        bottom: '26px',
        left: '47.1%',
        borderRadius: '50%',
      }
    },
    {
      id: 3,
      title: 'ចបកាប់ដី (Agricultural Hoe)',
      subtitle: 'មុខដាប់ស្តើងកាត់ដីហាប់ ➡ សម្ពាធខ្ពស់',
      effect: 'កាប់ទម្លុះដីចាក់ឫសយ៉ាងរលូន',
      explanation: 'ចបកាប់ដីកសិកម្មរចនាឡើងឱ្យមានមុខកាត់ដែកប៉ះដីស្រួចស្តើង និងទទឹងសំប៉ែតសមល្មម។ ការកាត់បន្ថយផ្ទៃក្រឡា A ត្រង់មុខចប បង្កើតបានជាសម្ពាធសង្កត់ដីដ៏មុតខ្លាំងនៅពេលអ្នកប្រើកម្លាំងជម្រុញវាចុះក្រោម។ នេះអនុញ្ញាតអោយចបមុតចូលទៅក្នុងស្រទាប់ដីហាប់រឹងៗបានយ៉ាងជ្រៅ និងមិនសូវហត់កម្លាំង។',
      contactDesc: 'ដែកមុខចបស្តើងប៉ះផែនដីខាងក្រោម',
      svgType: 'hoe',
      glowStyle: {
        width: '74px',
        height: '10px',
        bottom: '15px',
        left: '42%',
        borderRadius: '3px',
      }
    }
  ];

  // ==========================================
  // SECTION 3: TRACTOR MINI-GAME STATES
  // ==========================================
  const [wheelType, setWheelType] = useState<WheelType>('narrow');
  const [terrain, setTerrain] = useState<SoilType>('mud');
  const [cargoWeight, setCargoWeight] = useState<number>(4500); // 1000kg to 8000kg
  
  // Game control states
  const [gameState, setGameState] = useState<'idle' | 'driving' | 'stuck' | 'success'>('idle');
  const [driveProgress, setDriveProgress] = useState<number>(0);
  const [gameMessage, setGameMessage] = useState<string>('');

  // Game physical thresholds
  // Narrow wheels area = 2.0 m², Wide wheels area = 8.0 m²
  // Force (F) in Newtons = CargoWeight * 9.8 ~ Weight * 10
  // Sinking threshold pressure: 25,000 Pa (25 kPa)
  const calculateTractorPressure = () => {
    const cargoArea = wheelType === 'narrow' ? 2.5 : 8.0;
    const forceN = cargoWeight * 10; // F = m * g (assume g = 10)
    return forceN / cargoArea;
  };

  const handleStartGame = () => {
    if (gameState === 'driving') return;
    
    // Set driving state
    setGameState('driving');
    setDriveProgress(0);
    setGameMessage('');

    const calculatedP = calculateTractorPressure();
    // Decide if it will sink (Threshold is 23,000 Pa)
    const isDestinedToFail = calculatedP > 23000;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setDriveProgress(currentProgress);

      // If destined to fail, get stuck at 45% progress
      if (isDestinedToFail && currentProgress >= 46) {
        clearInterval(interval);
        setGameState('stuck');
        setGameMessage(`❌ ផុងកង់ហើយ! សម្ពាធសង្កត់គណនាឃើញ ${calculatedP.toLocaleString('km-KH')} Pa (កម្លាំងសរុប ${(cargoWeight * 10).toLocaleString('km-KH')} N ចែកលើផ្ទៃសំបកកង់ ២.៥ m²) ដែលលើសពីសមត្ថភាពទ្រទ្រង់របស់ដី។ កង់តូចចង្អៀត + ទម្ងន់ធ្ងន់ពេក = សម្ពាធខ្លាំងសាហាវ ធ្វើឱ្យត្រាក់ទ័រលិចផុងលែងទៅមុខរួច!`);
      }

      // If success, complete all the way to 100%
      if (!isDestinedToFail && currentProgress >= 100) {
        clearInterval(interval);
        setGameState('success');
        setGameMessage(`🎉 ជោគជ័យដ៏អស្ចារ្យ! សម្ពាធសង្កត់គណនាឃើញតែ ${calculatedP.toLocaleString('km-KH')} Pa ប៉ុណ្ណោះ (កម្លាំងសរុប ${(cargoWeight * 10).toLocaleString('km-KH')} N ចែកលើផ្ទៃទ្រកង់ដ៏ធំល្វឹងល្វើយ ៨.០ m²)។ កង់ត្រាក់ទ័រធំៗជួយបន្ថយសម្ពាធសង្កត់ចុះមកទាបខ្លាំង ជួយឱ្យត្រាក់ទ័របើកឆ្លងកាត់បានយ៉ាងរលូន ដោយមិនផុងឡើយ!`);
      }
    }, 45);
  };

  const handleResetGame = () => {
    setGameState('idle');
    setDriveProgress(0);
    setGameMessage('');
  };

  return (
    <div className="flex flex-col gap-6" id="applications-lab-root" style={{ fontFamily: 'var(--font-sans)', contentVisibility: 'auto' }}>
      
      {/* Visual Header containing Pedagogical Navigation Sub-Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-650 dark:text-indigo-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            ការអនុវត្ត និងមន្ទីរពិសោធន៍
          </span>
          <h2 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl mt-1.5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            ការអនុវត្តជាក់ស្តែង & ហ្គេមរូបវិទ្យា
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            សាកល្បងលេងនិងរៀនអំពីសម្ពាធ $P = F/A$ តាមរយៈរូបមន្ត បាតុភូតក្រៅជីវិត និងហ្គេមឡានត្រាក់ទ័រឆ្លងភក់
          </p>
        </div>

        {/* 3 tabs in Khmer */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-105 dark:bg-slate-950 rounded-2xl w-full md:w-auto border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('formula')}
            className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'formula' 
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            🧪 រូបមន្តគន្លឹះ
          </button>
          
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'scenarios' 
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            📸 ជីវភាពជាក់ស្តែង
          </button>

          <button
            onClick={() => setActiveTab('tractor')}
            className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'tractor'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            🚜 ហ្គេមគំរូ
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TAB 1: INTERACTIVE FORMULA LAB */}
        {activeTab === 'formula' && (
          <motion.div
            key="formula-active-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            
            {/* Left Controls & Visual Diagram (Col 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Formula and Description Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-tr-3xl pointer-events-none" />
                
                <h3 className="text-sm font-extrabold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  ផ្នែកទី ១៖ ស្វែងយល់អំពីរូបមន្តគ្រឹះរូបវិទ្យា
                </h3>
                
                <div className="mt-4 bg-slate-50 dark:bg-slate-950/45 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Big Mathematical Equation representation */}
                  <div className="flex flex-col items-center min-w-[200px]">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-center select-none">
                      រូបមន្តសម្ពាធគ្រឹះ
                    </span>
                    <div className="flex items-center justify-center gap-4 mt-2.5 min-h-[140px]">
                      <span 
                        className="font-black text-rose-500 dark:text-rose-400 drop-shadow-sm select-none transition-all duration-100 ease-out"
                        style={{ fontSize: `${pSize}rem`, lineHeight: 1 }}
                      >
                        P
                      </span>
                      <span className="text-3xl font-bold text-slate-400 select-none">=</span>
                      <div className="flex flex-col items-center justify-center">
                        <span 
                          className="font-black text-indigo-600 dark:text-indigo-400 select-none transition-all duration-100 ease-out"
                          style={{ fontSize: `${fSize}rem`, lineHeight: 1 }}
                        >
                          F
                        </span>
                        <div 
                          className="h-1 bg-slate-350 dark:bg-slate-705 my-1.5 rounded transition-all duration-100 ease-out" 
                          style={{ width: `${Math.max(fSize, aSize) * 1.5}rem` }}
                        />
                        <span 
                          className="font-black text-amber-500 select-none transition-all duration-100 ease-out"
                          style={{ fontSize: `${aSize}rem`, lineHeight: 1 }}
                        >
                          A
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formula translation legends */}
                  <div className="flex-1 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="font-extrabold text-rose-500 w-5 text-center">P</div>
                      <div>
                        <span className="font-bold">សម្ពាធ (Pressure):</span> វាស់ជា <span className="font-extrabold text-rose-600 font-mono">Pascals (Pa)</span> ឬ <span className="font-mono text-slate-500 font-bold">N/m²</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="font-extrabold text-indigo-600 dark:text-indigo-400 w-5 text-center">F</div>
                      <div>
                        <span className="font-bold">កម្លាំងសង្កត់កែង (Force):</span> វាស់ជា <span className="font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">Newtons (N)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="font-extrabold text-amber-500 w-5 text-center">A</div>
                      <div>
                        <span className="font-bold">ផ្ទៃក្រឡារងសម្ពាធ (Area):</span> វាស់ជា <span className="font-extrabold text-amber-500 font-mono">m²</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic Live Visual Diagram and Laboratory Sandbox */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h4 className="font-extrabold text-slate-850 dark:text-white text-sm flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full inline-block animate-ping" />
                    ដ្យាក្រាមរូបវិទ្យា៖ វ៉ិចទ័រកម្លាំង សង្កត់លើផ្ទៃក្រឡា
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    សង្កេតកម្រាស់ព្រួញកម្លាំង $F$ (ក្រាស់/ស្តើង) និងទំហំផ្ទៃបាត $A$ ព្រមទាំងកំហាប់ពណ៌ក្រហម (កំហាប់សម្ពាធ $P$)
                  </p>
                </div>

                {/* Physics Stage (SVG driven) */}
                <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-[260px] relative flex items-between justify-center overflow-hidden">
                  
                  {/* Dynamic Grid Background overlay */}
                  <div className="absolute inset-0 opacity-15 dark:opacity-5 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }} />

                  {/* SVG Container holding Interactive physics objects */}
                  <svg className="w-full h-full max-w-lg select-none z-10" viewBox="0 0 400 240">
                    
                    {/* Definitions for Glow / Shading Filter effects */}
                    <defs>
                      <radialGradient id="pressureGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={Math.min(0.9, pressure / 120)} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Ground Layer background */}
                    <rect x="0" y="190" width="400" height="50" fill="#e2e8f0" className="dark:fill-slate-800/60" />
                    <line x1="0" y1="190" x2="400" y2="190" stroke="#cbd5e1" strokeWidth="2" className="dark:stroke-slate-700" />

                    {/* Pressure Radial Glow Overlay representing pressure concentration */}
                    <rect 
                      x={200 - (area * 18)} 
                      y="140" 
                      width={area * 36} 
                      height="100" 
                      fill="url(#pressureGlow)" 
                      className="transition-all duration-200 pointer-events-none"
                    />

                    {/* Surface Block (A) resting on ground */}
                    <g className="transition-all duration-300">
                      {/* Dynamic width based on Area value */}
                      <rect 
                        x={200 - (area * 18)} 
                        y="150" 
                        width={area * 36} 
                        height="40" 
                        rx="6"
                        fill={pressure > 150 ? '#fee2e2' : pressure > 45 ? '#ffedd5' : '#ecfdf5'}
                        stroke={pressure > 150 ? '#ef4444' : pressure > 45 ? '#f97316' : '#10b981'}
                        strokeWidth="2.5"
                        className="transition-colors duration-300 shadow"
                      />

                      {/* Pattern Dots Overlay. Dots frequency indicates density, but represented here elegantly */}
                      <text 
                        x="200" 
                        y="175" 
                        textAnchor="middle" 
                        className={`text-[11px] font-black transition-colors duration-305 ${
                          pressure > 150 ? 'fill-red-700 dark:fill-red-400' : pressure > 45 ? 'fill-orange-700 dark:fill-orange-400' : 'fill-teal-700 dark:fill-teal-400'
                        }`}
                      >
                        ផ្ទៃប៉ះ A = {area} m²
                      </text>
                    </g>

                    {/* Vector Arrow representing Force (F) pointing down onto block */}
                    <g className="transition-all duration-200">
                      {/* Thicker strokeWidth, different color based on force.
                          F/10 determines arrow thickness. */}
                      
                      {/* Arrow Line body */}
                      <line 
                        x1="200" 
                        y1="25" 
                        x2="200" 
                        y2="135" 
                        stroke={force > 350 ? '#dc2626' : force > 150 ? '#e11d48' : '#fda4af'} 
                        strokeWidth={4 + (force / 34)} 
                        strokeLinecap="round"
                        className="transition-all duration-200"
                      />

                      {/* Arrow Head */}
                      <polygon 
                        points={`
                          200,150 
                          ${200 - (6 + (force / 55))},134 
                          ${200 + (6 + (force / 55))},134
                        `}
                        fill={force > 350 ? '#dc2626' : force > 155 ? '#e11d48' : '#fda4af'}
                        className="transition-all duration-200"
                      />

                      {/* Label of Force */}
                      <rect 
                        x="150" 
                        y="50" 
                        width="100" 
                        height="24" 
                        rx="6" 
                        fill="#1e293b" 
                        className="dark:fill-slate-950"
                      />
                      <text 
                        x="200" 
                        y="66" 
                        textAnchor="middle" 
                        fill="#ffffff" 
                        className="text-[10px] font-mono font-black"
                      >
                        F = {force} N (កម្លាំង)
                      </text>
                    </g>

                    {/* Concentrated load indicators at boundary contact interface */}
                    <line 
                      x1={200 - (area * 18)} 
                      y1="150" 
                      x2={200 + (area * 18)} 
                      y2="150" 
                      stroke="#f43f5e" 
                      strokeWidth={Math.min(8, 1 + (pressure / 25))} 
                      strokeDasharray="4,4" 
                      className="transition-all duration-200"
                    />

                  </svg>

                  {/* Dynamic Alert Banner based on high pressure concentration */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 py-1.5 px-3 rounded-full text-[10px] font-black pointer-events-none shadow flex items-center gap-1.5 z-25">
                    {pressure > 150 ? (
                      <>
                        <span className="w-2 h-2 bg-red-650 rounded-full animate-ping" />
                        <span className="text-red-700 dark:text-red-400 font-extrabold text-[10px]">កំហាប់សម្ពាធខ្ពស់ខ្លាំង 🟥</span>
                      </>
                    ) : pressure > 45 ? (
                      <>
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                        <span className="text-orange-700 dark:text-orange-400 font-extrabold text-[10px]">សម្ពាធមធ្យមស្រាល 🟧</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px]">សម្ពាធទាបសុវត្ថិភាព 🟩</span>
                      </>
                    )}
                  </div>

                </div>

                {/* Spliced Sliders Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  
                  {/* Force (F) Controller */}
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-850 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded-lg flex items-center justify-center font-bold">F</span>
                        កម្លាំងសង្កត់កែង (Force, F)
                      </span>
                      <span className="text-indigo-700 dark:text-indigo-400 font-mono text-xs font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                        {force} N (ញូតុន)
                      </span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      step="5"
                      value={force} 
                      onChange={(e) => setForce(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg cursor-pointer"
                      id="force-range-slider"
                    />

                    <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-semibold select-none">
                      <span>10 N (ស្រាល)</span>
                      <span>250 N (មធ្យម)</span>
                      <span>500 N (ធ្ងន់ខ្លាំង)</span>
                    </div>
                  </div>

                  {/* Area (A) Controller */}
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-850 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 rounded-lg flex items-center justify-center font-bold">A</span>
                        ផ្ទៃក្រឡារងសម្ពាធ (Area, A)
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-mono text-xs font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                        {area} m² (ម៉ែត្រការ៉េ)
                      </span>
                    </div>

                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="1"
                      value={area} 
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-855 rounded-lg cursor-pointer"
                      id="area-range-slider"
                    />

                    <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-semibold select-none">
                      <span>1 m² (ចង្អៀតស្រួច)</span>
                      <span>5 m² (មធ្យម)</span>
                      <span>10 m² (ធំទូលាយ)</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Gauge and Scientific Explanations (Col 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Dynamic Gauge Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="font-extrabold text-xs text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" />
                    នាឡិកាផលិតផលសម្ពាធ (Pressure Outputs)
                  </span>
                </div>

                <div className="text-center py-4 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase select-none">សម្ពាធដែលបានគណនា</span>
                  
                  {/* Digital Premium Counter */}
                  <span className="text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white mt-2">
                    {pressure.toFixed(1)}
                  </span>
                  
                  <span className="text-xs bg-rose-50 dark:bg-rose-950/50 text-rose-650 dark:text-rose-400 font-bold px-3 py-1 rounded-full mt-2.5">
                    Pascal (Pa) ឬ N/m²
                  </span>
                </div>

                {/* Conceptual feedback bullet list */}
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                  <h5 className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300">
                    💡 លទ្ធផលវិភាគបែបវិទ្យាសាស្ត្រ៖
                  </h5>
                  
                  <div className="text-[11px] space-y-2.5 leading-relaxed text-slate-600 dark:text-slate-405 font-medium">
                    {/* Proportional to Force explain */}
                    <p className={`p-2 rounded-xl border transition-all ${
                      force > 300 
                        ? 'bg-red-50/50 border-red-200 text-red-750 dark:bg-red-950/20 dark:border-red-900/60 dark:text-red-300' 
                        : 'bg-white border-slate-250 dark:bg-slate-900 dark:border-slate-800'
                    }`}>
                      <span className="font-bold text-[11px] block text-slate-800 dark:text-white mb-0.5">សមាមាត្រផ្ទាល់នឹង កម្លាំង F៖</span>
                      នៅពេល <span className="font-bold text-rose-500">កម្លាំង F កើនឡើង</span> ដល់ {force}N ធ្វើអោយសម្ពាធ P កើនឡើងធំទៅតាមនោះដែរ ព្រោះកម្លាំងសង្កត់ផ្ទុកកាន់តែធ្ងន់។
                    </p>

                    {/* Inversely proportional explain */}
                    <p className={`p-2 rounded-xl border transition-all ${
                      area > 6 
                        ? 'bg-emerald-55/70 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-300' 
                        : area <= 2 
                        ? 'bg-orange-55/70 border-orange-200 text-orange-800 dark:bg-orange-950/20 dark:border-orange-900/60 dark:text-orange-300' 
                        : 'bg-white border-slate-250 dark:bg-slate-900 dark:border-slate-800'
                    }`}>
                      <span className="font-bold text-[11px] block text-slate-800 dark:text-white mb-0.5">ច្រាសសមាមាត្រនឹង ផ្ទៃ Area A៖</span>
                      {area > 6 ? (
                        <>នៅពេល <span className="font-bold text-emerald-600">ផ្ទៃក្រឡា A កើនឡើង</span> ដល់ {area}m² សម្ពាធ P នឹងថយចុះយ៉ាងលឿន ព្រោះកម្លាំងរបស់វត្ថុរាបស្មើត្រូវបានរាលដាលពង្រីកពាសពេញផ្ទៃធំទូលាយ។</>
                      ) : area <= 2 ? (
                        <>នៅពេល <span className="font-bold text-orange-600">ផ្ទៃក្រឡា A ថយចុះតូចបំផុត</span> នៅត្រឹម {area}m² នាំឱ្យសម្ពាធ P កើនឡើងខ្ពស់ ព្រោះកម្លាំងត្រូវបានសន្សំផ្ដុំតែលើបាតចង្អៀតស្រួចមួយចំនុចប៉ុណ្ណោះ។</>
                      ) : (
                        <>នៅពេល <span className="font-bold text-slate-700 dark:text-slate-300">ផ្ទៃក្រឡា A បង្រួម ឬពង្រីក</span> សម្ពាធ P នឹងប្រែប្រួលច្រាសពីនោះ (ផ្ទៃ A កាន់តែតូច សម្ពាធ P កាន់តែធំ)។</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal bg-slate-100/70 dark:bg-slate-950 p-2 text-center rounded-xl font-medium border border-slate-150 dark:border-slate-850">
                  📢 <b>ពិសោធន៍សប្បាយៗ៖</b> សាកល្បងកំណត់កម្លាំង F អតិបរមា (500N) រួចអូសផ្ទៃ A អោយតូចបំផុត (1m²) ដើម្បីបង្កើតសម្ពាធអតិបរិមា ៥០០ Pa!
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* TAB 2: REAL-WORLD SCENARIOS WITH PRESSURE MAP */}
        {activeTab === 'scenarios' && (
          <motion.div
            key="scenarios-active-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Gallery Controller Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-850 dark:text-white text-base">
                  ផ្នែកទី ២៖ វិចិត្រសាលករណីសិក្សាសម្ពាធក្នុងជីវិតជាក់ស្តែង
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  ជ្រើសរើសករណីសិក្សាទាំង ៤ ខាងក្រោម ដើម្បីសង្កេតមើលរចនាសម្ព័ន្ធបាតប៉ះពាល់ និងការផ្តុំកម្លាំង
                </p>
              </div>

              {/* Dynamic Pressure Map Toggle overlay */}
              <button
                onClick={() => setPressureMapActive(!pressureMapActive)}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-black transition-all ${
                  pressureMapActive 
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                    : 'bg-slate-100 hover:bg-slate-205 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-white'
                }`}
              >
                <Layers className={`w-4 h-4 ${pressureMapActive ? 'animate-bounce' : ''}`} />
                {pressureMapActive ? '✨ បិទផែនទីសម្ពាធ (Pressure Map Active)' : '🔍 បើកផែនទីសម្ពាធ (Pressure Map Overlay)'}
              </button>
            </div>

            {/* Inner Grid: Scenario Cards Selection and detailed explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: 4 Tab Selector Cards (Col 5) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {scenarios.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveScenarioId(item.id)}
                    className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-1.5 relative overflow-hidden ${
                      activeScenarioId === item.id 
                        ? 'bg-indigo-650 text-white border-indigo-700 shadow dark:bg-indigo-900' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {/* Tiny decorative tag */}
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-max ${
                      activeScenarioId === item.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400'
                    }`}>
                      {item.subtitle}
                    </span>

                    <span className="font-extrabold text-sm sm:text-base">{item.title}</span>
                    <span className={`text-xs ${activeScenarioId === item.id ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                      {item.effect}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Column: Master Illustration & Mathematical Explanation (Col 7) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                
                {/* SVG/Graphic Frame */}
                <div className="bg-slate-50 dark:bg-slate-950/65 border border-slate-200 dark:border-slate-850 rounded-2xl h-[240px] relative overflow-hidden flex items-center justify-center">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />

                  {/* Render the selected Graphic SVG based on activeScenarioId */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScenarioId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      {/* Graphics Generator */}
                      {scenarios[activeScenarioId].svgType === 'skiing' && (
                        <svg className="w-64 h-48 select-none" viewBox="0 0 200 160">
                          {/* Snow Level line */}
                          <line x1="20" y1="130" x2="180" y2="130" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                          <rect x="20" y="130" width="160" height="20" fill="#f1f5f9" opacity="0.6" />
                          
                          {/* Skis Board representation */}
                          <path d="M 30,123 L 160,123 C 168,123 172,120 174,115" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" fill="none" />
                          
                          {/* Shoes / Ski Boots */}
                          <rect x="70" y="99" width="40" height="20" rx="4" fill="#1e293b" />
                          <circle cx="110" cy="109" r="10" fill="#15803d" />
                          
                          {/* Ski Stick indicator for balance */}
                          <line x1="120" y1="60" x2="135" y2="123" stroke="#94a3b8" strokeWidth="2.5" />
                          <circle cx="120" cy="60" r="4" fill="#ef4444" />
                          
                          {/* Force distribution arrows - 4 small downward arrows representing dispersed pressure */}
                          <g className="text-indigo-500">
                            <line x1="50" y1="75" x2="50" y2="110" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                            <line x1="80" y1="75" x2="80" y2="110" stroke="#6366f1" strokeWidth="2" />
                            <line x1="110" y1="75" x2="110" y2="110" stroke="#6366f1" strokeWidth="2" />
                            <line x1="140" y1="75" x2="140" y2="110" stroke="#6366f1" strokeWidth="2" />

                            <polygon points="50,113 47,105 53,105" fill="#6366f1" />
                            <polygon points="80,113 77,105 83,105" fill="#6366f1" />
                            <polygon points="110,113 107,105 113,105" fill="#6366f1" />
                            <polygon points="140,113 137,105 143,105" fill="#6366f1" />
                          </g>
                        </svg>
                      )}

                      {scenarios[activeScenarioId].svgType === 'knife' && (
                        <svg className="w-64 h-48 select-none" viewBox="0 0 200 160">
                          {/* Vegetable to cut (Carrot) */}
                          <path d="M 40,115 C 40,105 160,105 160,115 Q 160,130 40,123" fill="#f97316" />
                          <circle cx="150" cy="115" r="7" fill="#22c55e" /> {/* green tail */}
                          
                          {/* Cutting Knife Blade */}
                          <g className="translate-y-[-10px] translate-x-12">
                            {/* Handle */}
                            <rect x="0" y="30" width="15" height="45" rx="3" fill="#78350f" transform="rotate(-15)" />
                            {/* Blade body */}
                            <path d="M 12,38 L 52,38 L 52,105 L 12,90 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
                            <line x1="50" y1="38" x2="50" y2="105" stroke="#ffffff" strokeWidth="1.5" />
                          </g>

                          {/* Concentrated Single strong force arrow pointing at knife tip */}
                          <line x1="102" y1="20" x2="102" y2="70" stroke="#dc2626" strokeWidth="4" />
                          <polygon points="102,78 97,68 107,68" fill="#dc2626" />
                        </svg>
                      )}

                      {scenarios[activeScenarioId].svgType === 'ax' && (
                        <svg className="w-64 h-48 select-none" viewBox="0 0 200 160">
                          {/* Wood log splits */}
                          <rect x="55" y="110" width="90" height="40" fill="#b45309" rx="3" />
                          <path d="M 100,100 L 100,150" stroke="#451a03" strokeWidth="4" /> {/* split gap */}
                          
                          {/* Wedge on ax head */}
                          <g className="translate-y-[-24px]">
                            {/* Handle */}
                            <path d="M 140,40 L 50,110" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
                            {/* Steel head */}
                            <path d="M 90,65 Q 100,60 110,65 L 115,100 Q 100,110 85,100 Z" fill="#475569" stroke="#94a3b8" />
                          </g>

                          {/* Massive collision force arrow */}
                          <line x1="100" y1="15" x2="100" y2="65" stroke="#b91c1c" strokeWidth="5.5" />
                          <polygon points="100,73 94,61 106,61" fill="#b91c1c" />
                        </svg>
                      )}

                      {scenarios[activeScenarioId].svgType === 'hoe' && (
                        <svg className="w-64 h-48 select-none" viewBox="0 0 200 160">
                          {/* Ground and Soil Block and Roots */}
                          <rect x="20" y="120" width="160" height="32" fill="#7c2d12" rx="4" />
                          <line x1="20" y1="120" x2="180" y2="120" stroke="#15803d" strokeWidth="2.5" /> {/* grass line */}
                          
                          {/* Agricultural Hoe */}
                          <g className="translate-x-12 translate-y-[-10px]">
                            {/* Long wooden pole */}
                            <path d="M 110,24 L 20,115" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
                            {/* Metal blade connection */}
                            <path d="M 33,101 L 28,124 Q 40,132 50,121 Z" fill="#334155" />
                          </g>

                          {/* Hit impact arrow */}
                          <line x1="72" y1="35" x2="72" y2="92" stroke="#dc2626" strokeWidth="4" />
                          <polygon points="72,100 68,89 76,89" fill="#dc2626" />
                        </svg>
                      )}

                      {/* PRESSURE MAP DECORATION OVERLAY */}
                      {pressureMapActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: [0.75, 0.95, 0.75],
                            scale: [0.97, 1.03, 0.97]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.2
                          }}
                          className="absolute bg-red-600/75 shadow-[0_0_20px_10px_rgba(239,68,68,0.7)] pointer-events-none"
                          style={scenarios[activeScenarioId].glowStyle}
                        />
                      )}

                    </motion.div>
                  </AnimatePresence>

                  {/* Dynamic map visual tooltip */}
                  {pressureMapActive && (
                    <div className="absolute bottom-3 bg-red-650 text-white text-[9px] font-black px-2.5 py-1 rounded-full animate-pulse uppercase tracking-wider">
                      📍 ផែនទីសម្ពាធ៖ {scenarios[activeScenarioId].contactDesc}
                    </div>
                  )}

                </div>

                {/* Pedography Explanation */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-650 dark:text-indigo-400 shrink-0" />
                    <h4 className="font-black text-slate-855 dark:text-white text-sm sm:text-base">
                      {scenarios[activeScenarioId].title} ({scenarios[activeScenarioId].subtitle})
                    </h4>
                  </div>
                  
                  <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                    {scenarios[activeScenarioId].explanation}
                  </p>

                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl text-[10.5px] text-slate-550 dark:text-slate-400 leading-relaxed flex flex-col gap-1.5">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">💡 គន្លឹះគិតបែបវិទ្យាសាស្ត្រ៖</span>
                    <p>
                      - បើចង់បាន <span className="font-extrabold text-rose-500">សម្ពាធតូច (P ថយ)</span> ទប់ទល់ការផុងខ្លួន ➡ ត្រូវពង្រីកផ្ទៃទ្រខាងក្រោម <span className="font-extrabold text-amber-500">Area A ឱ្យធំ</span> (ដូចជាបន្ទះក្តារស្គី ឬកង់ឡានធំៗ)។
                    </p>
                    <p>
                      - បើចង់បាន <span className="font-extrabold text-rose-500">សម្ពាធខ្ពស់ខ្លាំង (P កើន)</span> ងាយស្រួលទម្លុះឬកាត់កាប់ ➡ ត្រូវប្រឹងសម្រួច <span className="font-extrabold text-amber-500">Area A ឱ្យចង្អៀតតូចបំផុត</span> (ដូចជាកាំបិត ពូថៅ ឬចបកាប់)។
                    </p>
                  </div>
                </div>

              </div>
              
            </div>
            
          </motion.div>
        )}

        {/* TAB 3: TRACTOR MUD & SAND PHYSICS MINI-GAME */}
        {activeTab === 'tractor' && (
          <motion.div
            key="tractor-active-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            
            {/* Left Sandbox Control Panel (Col 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">
                    ⚙️ កំណត់លក្ខណៈរូបវិទ្យាត្រាក់ទ័រ
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    ជ្រើសរើសទំហំសំបកកង់ កម្រិតដីភក់ និងដឹកទំនិញ
                  </p>
                </div>

                {/* 1. Wheels Selection Toggle */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    ១. ជ្រើសរើសប្រភេទសំបកកង់ (Area A)៖
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Narrow wheels choice */}
                    <button
                      onClick={() => { setWheelType('narrow'); handleResetGame(); }}
                      disabled={gameState === 'driving'}
                      className={`p-3 rounded-2xl text-[11px] font-black transition-all flex flex-col items-center gap-1.5 border ${
                        wheelType === 'narrow'
                          ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                          : 'bg-white hover:bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="text-xl">🛞</span>
                      <span>កង់ធម្មតា (តូច)</span>
                      <span className="text-[9px] font-bold opacity-75">A = ២.៥ម៉ែត្រការ៉េ</span>
                    </button>

                    {/* Wide wheels choice */}
                    <button
                      onClick={() => { setWheelType('wide'); handleResetGame(); }}
                      disabled={gameState === 'driving'}
                      className={`p-3 rounded-2xl text-[11px] font-black transition-all flex flex-col items-center gap-1.5 border  ${
                        wheelType === 'wide'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-400'
                          : 'bg-white hover:bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="text-xl">🚜</span>
                      <span>កង់ត្រាក់ទ័រ (ធំ)</span>
                      <span className="text-[9px] font-bold opacity-75">A = ៨.០ម៉ែត្រការ៉េ</span>
                    </button>
                  </div>
                </div>

                {/* 2. Terrain style Selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    ២. វាលដីរារាំងដំណើរ៖
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setTerrain('mud'); handleResetGame(); }}
                      disabled={gameState === 'driving'}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        terrain === 'mud'
                          ? 'bg-amber-800 text-white border-amber-900'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      ដីភក់ខ្ទាតស្អិត 🌧️
                    </button>
                    <button
                      onClick={() => { setTerrain('sand'); handleResetGame(); }}
                      disabled={gameState === 'driving'}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        terrain === 'sand'
                          ? 'bg-yellow-600 text-white border-yellow-750'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      ដីខ្សាច់ម៉ដ្ឋក្តៅ ☀️
                    </button>
                  </div>
                </div>

                {/* 3. Force cargo weight loading slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-600 dark:text-slate-400">៣. ដឹកឥវ៉ាន់ធ្ងន់ (Force F)៖</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded font-black">
                      {cargoWeight.toLocaleString()} kg
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    step="500"
                    disabled={gameState === 'driving'}
                    value={cargoWeight}
                    onChange={(e) => { setCargoWeight(Number(e.target.value)); handleResetGame(); }}
                    className="w-full h-1.5 accent-indigo-650 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-bold leading-none select-none">
                    <span>1,000 kg (ស្រាល)</span>
                    <span>8,000 kg (ធ្ងន់ខ្លាំង)</span>
                  </div>
                </div>

                {/* Action Controls Form buttons */}
                <div className="flex gap-2.5 pt-2">
                  {gameState === 'idle' ? (
                    <button
                      onClick={handleStartGame}
                      className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1 text-center"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      បើកត្រាក់ទ័រឆ្លងកាត់ (START)
                    </button>
                  ) : (
                    <button
                      onClick={handleResetGame}
                      className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 text-center"
                    >
                      <RotateCcw className="w-4 h-4" />
                      កំណត់ឡើងវិញ (RESET)
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Right Interactive Laboratory Stage & Dynamic animations (Col 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
                <div>
                  <h4 className="font-extrabold text-slate-850 dark:text-white text-base flex items-center gap-2">
                    <Truck className="w-5 h-5 text-indigo-500" />
                    សង្វៀនសាកល្បង៖ ត្រាក់ទ័របើកឆ្លងកាត់វាលដីជ្រាយ
                  </h4>
                  <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">
                    សង្កេតកង់ឡាន និងចលនាល្បឿនរបស់វា។ ប្រសិនបើសម្ពាធគណនា ធំជាង <strong>23,000 Pascal</strong> ត្រាក់ទ័រនឹងផុងកង់លិចចុះមិនខាន!
                  </p>
                </div>

                {/* Visual game background frame */}
                <div className="bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl h-[240px] relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Sun / Sky animations element */}
                  <div className="p-4 flex justify-between z-10 select-none">
                    <span className="text-3xl animate-pulse">☀️</span>
                    <span className="text-2xl opacity-60">☁️</span>
                  </div>

                  {/* Sand/Mud physical rendering at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none flex flex-col justify-end">
                    
                    {/* Upper decorative edge representing dry terrain transition */}
                    <div className={`h-2 w-full transition-colors duration-200 ${
                      terrain === 'mud' ? 'bg-[#4a3329]' : 'bg-yellow-500/70'
                    }`} />

                    {/* Ground thickness */}
                    <div className={`h-24 w-full transition-colors duration-200 py-3 px-4 relative ${
                      terrain === 'mud' ? 'bg-[#5c4033]' : 'bg-yellow-400'
                    }`}>
                      {/* Deep Mud Splatters if stuck */}
                      {gameState === 'stuck' && (
                        <div className="absolute top-0 inset-x-0 h-4 bg-red-800/25 animate-pulse" />
                      )}
                    </div>

                  </div>

                  {/* TRACTOR PHYSICS OBJECT */}
                  <div className="absolute inset-x-4 bottom-[24px] h-[110px] z-20">
                    
                    {/* Animated Tractor Node with custom coordinates */}
                    <motion.div
                      style={{ 
                        left: `${driveProgress}%`,
                        x: '-50%' 
                      }}
                      animate={{
                        // Sinks by 16px if stuck, Jitters slightly
                        y: gameState === 'stuck' ? 18 : 0,
                        rotate: gameState === 'stuck' ? [0, -3, 3, -2, 2, 0] : gameState === 'driving' ? [0, -1, 1, 0] : 0
                      }}
                      transition={{
                        rotate: gameState === 'stuck' ? { repeat: Infinity, duration: 0.25 } : gameState === 'driving' ? { repeat: Infinity, duration: 0.12 } : { duration: 0.2 },
                        y: { type: 'spring', stiffness: 100, damping: 8 }
                      }}
                      className="absolute flex flex-col items-center"
                    >
                      {/* Live calculation banner overlay */}
                      <div className="bg-slate-950 text-white text-[9px] font-mono font-black py-0.5 px-2 rounded shadow-md whitespace-nowrap mb-1">
                        P = {Math.round(calculateTractorPressure()).toLocaleString()} Pa
                      </div>

                      {/* Tractor Cabin & Wheels */}
                      <div className="relative">
                        
                        {/* Cargo Load Indicator visual */}
                        <div 
                          className="absolute -top-7 left-1 px-1 bg-indigo-500 border border-indigo-600 rounded text-[9px] text-white font-extrabold shadow-sm transition-all duration-300"
                          style={{
                            transform: `scale(${0.65 + (cargoWeight / 12000)})`,
                            opacity: cargoWeight > 1000 ? 1 : 0
                          }}
                        >
                          📦 គីឡូ LOAD
                        </div>

                        {/* Truck Emoji itself */}
                        <div className="text-5xl leading-none filter drop-shadow select-none">
                          🚜
                        </div>

                        {/* Wheels overlays to show narrow vs wide tires distinctly */}
                        <div className="absolute bottom-[2px] inset-x-0 flex justify-between px-1">
                          
                          {/* Front wheel */}
                          <div 
                            className={`rounded-full bg-slate-900 border-2 border-slate-700 transition-all duration-300 ${
                              wheelType === 'wide' 
                                ? 'w-[16px] h-[16px] ring-2 ring-emerald-500' 
                                : 'w-[11px] h-[11px] ring-1 ring-red-400'
                            }`} 
                            style={{ 
                              animation: gameState === 'driving' ? 'spin 0.4s linear infinite' : 'none' 
                            }}
                          />

                          {/* Rear wheel */}
                          <div 
                            className={`rounded-full bg-slate-900 border-2 border-slate-700 transition-all duration-300 ${
                              wheelType === 'wide' 
                                ? 'w-[26px] h-[26px] translate-y-[-5px] ring-2 ring-emerald-500' 
                                : 'w-[19px] h-[19px] translate-y-[-2px] ring-1 ring-red-400'
                            }`} 
                            style={{ 
                              animation: gameState === 'driving' ? 'spin 0.3s linear infinite' : 'none' 
                            }}
                          />

                        </div>

                      </div>

                      {/* Splattering Mud Particles if stuck */}
                      {gameState === 'stuck' && (
                        <div className="absolute -bottom-1 flex gap-2">
                          <span className="text-xs animate-bounce">💦</span>
                          <span className="text-xs animate-ping">💨</span>
                          <span className="text-xs animate-bounce delay-100">💦</span>
                        </div>
                      )}

                    </motion.div>

                  </div>

                </div>

                {/* Live Mathematical Report with Khmer Translation explanations */}
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    {/* Live values metrics */}
                    <div className="flex gap-4 flex-wrap text-xs text-slate-700 dark:text-slate-300">
                      <div>
                        <span>កម្លាំងពិភពខាងក្រៅ (Force, F): </span>
                        <span className="font-mono font-black text-indigo-650 dark:text-indigo-400">
                          {(cargoWeight * 10).toLocaleString()} N
                        </span>
                      </div>
                      
                      <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                        <span>ផ្ទៃសំបកកង់ទ្រទ្រង់ (Area, A): </span>
                        <span className="font-mono font-black text-amber-500">
                          {wheelType === 'narrow' ? '២.៥ m² (ចង្អៀត)' : '៨.០ m² (ធំទូលាយ)'}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-black">
                      សម្ពាធគណនា P = {Math.round(calculateTractorPressure()).toLocaleString()} Pa
                    </div>

                  </div>

                  {/* Play Game State message display */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <AnimatePresence mode="wait">
                      {gameState === 'stuck' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-50/75 border border-red-200 p-4 rounded-xl text-red-800 dark:bg-red-950/20 dark:border-red-900/60 dark:text-red-400 flex items-start gap-3 text-xs leading-relaxed"
                        >
                          <XCircle className="w-5 h-5 text-red-650 shrink-0 mt-0.5 animate-bounce" />
                          <div>
                            <span className="font-black block text-sm mb-1">ត្រាក់ទ័រលិចផុងលែងទៅមុខរួច!</span>
                            <p className="font-semibold">{gameMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      {gameState === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-emerald-55/75 border border-emerald-250 p-4 rounded-xl text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-400 flex items-start gap-3 text-xs leading-relaxed"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-black block text-sm mb-1">ជោគជ័យដ៏ត្រចះត្រចង់!</span>
                            <p className="font-semibold">{gameMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      {gameState === 'driving' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-sky-50 dark:bg-sky-950/20 p-4 rounded-xl text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 text-xs"
                        >
                          <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-ping" />
                          <span className="font-extrabold">ត្រាក់ទ័រកំពុងធ្វើដំណើរឆ្លងកាត់ សូមរង់ចាំសង្កេត... ({driveProgress}%)</span>
                        </motion.div>
                      )}

                      {gameState === 'idle' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-xl text-slate-500 dark:text-slate-450 text-center text-xs font-bold"
                        >
                          ☝️ សូមចុចប៊ូតុង <b>«បើកត្រាក់ទ័រឆ្លងកាត់ (START)»</b> ខាងលើដើម្បីដំណើរការពិសោធន៍ច្នៃប្រឌិត!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Styled css spinners used explicitly on wheel animation rotation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
