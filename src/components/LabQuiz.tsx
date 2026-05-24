/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { BookOpen, CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, Sparkles, HelpCircle } from 'lucide-react';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "តើកត្តាពីរអ្វីខ្លះដែលកំណត់ទំហំសម្ពាធនៃអង្គធាតុរឹងនៅលើផ្ទៃប៉ះមួយ?",
    options: [
      "ម៉ាសសរុប និងកម្រាស់នៃផ្ទៃទ្រ",
      "កម្លាំងសង្កត់កែង (F) និងផ្ទៃក្រឡាដែលរងសម្ពាធ (A)",
      "ដង់ស៊ីតេនៃអង្គធាតុ និងសំទុះទំនាញ g",
      "មាឌ និងសីតុណ្ហភាពនៃអង្គធាតុរឹង"
    ],
    correctIndex: 1,
    explanation: "សម្ពាធនៃអង្គធាតុរឹងត្រូវបានគណនីយតាមរូបមន្ត P = F / A ដែល F ជាកម្លាំងសង្កត់កែង (គិតជា N) និង A ជាផ្ទៃរងសង្កត់ (គិតជា m²)"
  },
  {
    id: 2,
    question: "[លំហាត់គណនា] ដុំដែកមួយមានម៉ាស m = 6 kg រៀបចំជាផ្ទៃបាតមានទំហំជ្រុង 2cm × 3cm = 6 cm² = 0.0006 m²។ យក g = 10 m/s²។ តើដុំដែកនេះសង្កត់លើផ្ទៃខ្សាច់នូវសម្ពាធ P ប៉ុន្មាន?",
    options: [
      "1,000 Pa (1 kPa)",
      "10,000 Pa (10 kPa)",
      "100,000 Pa (100 kPa)",
      "600,000 Pa (600 kPa)"
    ],
    correctIndex: 2,
    explanation: "កម្លាំងសង្កត់កែង F = m × g = 6 × 10 = 60 N។ ផ្ទៃបាត A = 0.0006 m²។ នាំអោយសម្ពាធ P = F / A = 60 / 0.0006 = 100,000 Pa (ឬ 100 kPa)។"
  },
  {
    id: 3,
    question: "[PISA-Test សំណួរស្វែងយល់] គេមានដុំឥដ្ឋមួយដង់ស៊ីតេស្មើគ្នា កំពុងសង្កត់លើផ្ទៃតុ។ ប្រសិនបើគេកាត់ដុំឥដ្ឋនោះជាពីរចំណែកស្មើៗគ្នាបញ្ឈរ តើចំណែកនីមួយៗបង្កើតសម្ពាធនៅលើតុប្រែប្រួលដូចម្តេចធៀបនឹងដុំឥដ្ឋដើម?",
    options: [
      "សម្ពាធថយចុះពាក់កណ្តាល (សល់ P/2)",
      "សម្ពាធរក្សានៅដដែលមិនប្រែប្រួល (P ដដែល)",
      "សម្ពាធកើនឡើងទ្វេដង (ក្លាយជា 2P)",
      "សម្ពាធធ្លាក់ចុះសូន្យភ្លាមៗ"
    ],
    correctIndex: 1,
    explanation: "នៅពេលកាត់ជាពីរស្មើគ្នាតាមបញ្ឈរ៖ ម៉ាសថយចុះពាក់កណ្តាល (កម្លាំង F ថយចុះ ២ដង) និងផ្ទៃប៉ះ A ក៏ថយចុះ ២ដងដូចគ្នា។ តាមរបៀប P = (F/2)/(A/2) = F / A គឺនាំអោយ សម្ពាធរក្សាថេរស្មើនឹងសម្ពាធដើមដដែល!"
  },
  {
    id: 4,
    question: "[PISA-Test ទំនប់ទំនប់ទឹក] ទំនប់វារីអគ្គិសនីដ៏ធំមួយទប់ទឹកបានជំរៅ h = 10m។ ប្រសិនបើមាឌទឹកក្នុងបឹងខាងក្រោយទំនប់កើនឡើង ៣ដង ប៉ុន្តែកម្ពស់ទឹកនៅរក្សា ១០ម៉ែត្រដដែល តើសម្ពាធទឹកដែលសង្កត់ទៅលើបាតទំនប់មានការប្រែប្រួលដែរឬទេ?",
    options: [
      "កើនឡើង ៣ដង តាមមាឌទឹក",
      "រក្សាថេរដដែល ព្រោះកម្ពស់ h និងដង់ស៊ីតេ ρ មិនផ្លាស់ប្តូរ",
      "ថយចុះ ៣ដង ព្រោះកម្លាំងបែកចែកគ្នា",
      "ប្រែប្រួលទៅតាមរូបរាងរបស់ទំនប់"
    ],
    correctIndex: 1,
    explanation: "តាមរូបមន្តសម្ពាធអ៊ីដ្រូស្តាទិច P = ρ · g · h សម្ពាធក្នុងទឹកអាស្រ័យតែលើប្រភេទដង់ស៊ីតេរាវ (ρ) និងជម្រៅពិតប្រាកដ (h) តែប៉ុណ្ណោះ មិនអាស្រ័យលើមាឌទឹកសរុប ឬរូបរាងធុងឡើយ។ ដូចនេះសម្ពាធនៅថេរដដែល។"
  },
  {
    id: 5,
    question: "[លំហាត់ជាក់ស្តែង] អ្នកមុជទឹកម្នាក់បានចុះទៅក្នុងទឹកសមុទ្រដែលមានដង់ស៊ីតេ ρ = 1025 kg/m³ ដល់ជម្រៅ h = 20m។ យក g = 10 m/s²។ តើសម្ពាធអ៊ីដ្រូស្តាទិចដែលសង្កត់លើអ្នកមុជទឹកនោះមានតម្លៃប៉ុន្មាន?",
    options: [
      "20,500 Pa (20.5 kPa)",
      "205,000 Pa (205 kPa)",
      "102,500 Pa (102.5 kPa)",
      "2,050,000 Pa (2.05 MPa)"
    ],
    correctIndex: 1,
    explanation: "សម្ពាធអ៊ីដ្រូស្តាទិច P_liq = ρ · g · h = 1025 · 10 · 20 = 205,000 Pa (ឬ 205 kPa)។"
  },
  {
    id: 6,
    question: "[PISA-Test សម្ពាធខ្យល់] នៅពេលយើងជញ្ជក់ទឹកក្រូចតាមរយៈបំពង់បឺត តើដំណើរការនេះជោគជ័យដោយសារមូលហេតុរូបវិទ្យាអ្វី?",
    options: [
      "កម្លាំងទាញសួតរបស់យើងជញ្ជក់ទឹកឡើងផ្ទាល់",
      "ការជញ្ជក់បង្កើតលំហខ្វះខ្យល់ក្នុងបំពង់ ហើយសម្ពាធបរិយាកាសខាងក្រៅសង្កត់លើផ្ទៃកែវរុញទឹកឡើងមកលើ",
      "ទំនាញដីថយចុះក្នុងបំពង់",
      "ដង់ស៊ីតេទឹកក្រូចថយចុះពេលត្រូវបឺត"
    ],
    correctIndex: 1,
    explanation: "ពេលយើងបឺតខ្យល់ចេញពីបំពង់ សម្ពាធខ្យល់ក្នុងបំពង់ថយចុះបង្កើតជាទំនេរ។ សម្ពាធបរិយាកាសខាងក្រៅដែលមានតម្លៃធំជាង បានសង្កត់លើផ្ទៃទឹកក្រូចក្នុងកែវ រុញវាឱ្យឡើងតាមបំពង់ចូលក្នុងមាត់យើង។"
  },
  {
    id: 7,
    question: "[PISA-Test ម៉ាស៊ីនលើកអ៊ីដ្រូលីក] ប្រព័ន្ធអ៊ីដ្រូលីកមួយមានផ្ទៃ Piston តូច A₁ = 5 cm² និង Piston ធំ A₂ = 150 cm² (ផលធៀបកើនឡើង ៣០ដង)។ បើគេផ្តល់កម្លាំងច្រាន F₁ = 200 N នៅវាល់ piston តូច តើគេអាចលើកឡានតូចដែលមានទម្ងន់ 5000 N បានដែរឬទេ?",
    options: [
      "មិនអាចទេ ព្រោះកម្លាំងទទួលបានត្រឹមតែ 1000 N",
      "អាចទៅរួច ព្រោះកម្លាំងបង្កើតឡើង F₂ កើនឡើងដល់ 6000 N ដែលធំជាង 5000 N",
      "មិនអាចទេ ព្រោះច្បាប់ប៉ាស្កាល់រក្សាកម្លាំង F ថេរដដែល",
      "អាចទៅរួច ដោយសារសម្ពាធក្នុង Piston ធំធ្លាក់ចុះសូន្យ"
    ],
    correctIndex: 1,
    explanation: "តាមច្បាប់ប៉ាស្កាល់ F₂ = F₁ × (A₂ / A₁) = 200 × (150 / 5) = 200 × 30 = 6000 N។ ដោយសារ F₂ = 6000 N ធំជាង 5000 N ដូចនេះឡានត្រូវបានលើកឡើងដោយជោគជ័យ។"
  },
  {
    id: 8,
    question: "យោងតាមច្បាប់ប៉ាស្កាល់ (Pascal's Law) កាលណាគេផ្តល់សម្ពាធបន្ថែមត្រង់កន្លែងណាមួយនៃអង្គធាតុរាវដែលនៅក្នុងធុងបិទជិត តើសម្ពាធនេះនឹងបញ្ជូនទៅរបៀបណា?",
    options: [
      "បញ្ជូនទៅតែទិសដៅខាងក្រោមប៉ុណ្ណោះ",
      "បញ្ជូនទៅគ្រប់ទីកន្លែង និងគ្រប់ផ្នែកទាំងអស់នៃអង្គធាតុរាវដោយស្មើគ្នា និងទាំងស្រុង",
      "ថយចុះនៅពេលវាទៅដល់ជញ្ជាំងធុង",
      "កាត់បន្ថយដើម្បីបង្កើតតុល្យភាព"
    ],
    correctIndex: 1,
    explanation: "ច្បាប់ប៉ាស្កាល់ចែងថា សម្ពាធបន្ថែមលើសន្ទនីយ៍នៅក្នុងធុងបិទជិត ត្រូវបានបញ្ជូនទាំងស្រុង និងស្មើគ្នាក្នុងគ្រប់ទិសទីទៅគ្រប់ភាគល្អិតនៃសន្ទនីយ៍ និងជញ្ជាំងធុង។"
  },
  {
    id: 9,
    question: "[សំណួររូបមន្ត និងប្រវត្តគោលការណ៍] បារ៉ូម៉ែត្ររបស់ Torricelli ប្រើប្រាស់សារធាតុបារតទ្រតម្កើងកម្ពស់ 760 mmHg។ ប្រសិនបើគេជំនួសបារតដោយទឹកវិញ (ដែលមានដង់ស៊ីតេតូចជាងបារត ១៣.៦ដង) តើកម្ពស់សសរទឹកក្នុងកំពង់កែវនឹងមានតម្លៃប៉ុន្មាននៅសម្ពាធបរិយាកាសធម្មតា?",
    options: [
      "ប្រហែល ០.៧៦ ម៉ែត្រ (76 cm)",
      "ប្រហែល ១.៣៦ ម៉ែត្រ",
      "ប្រហែល ១០.៣ ម៉ែត្រ (10.3 m)",
      "ប្រហែល ១០០ ម៉ែត្រ"
    ],
    correctIndex: 2,
    explanation: "ដោយសារដង់ស៊ីតេទឹកតូចជាងបារត ១៣.៦ដង កម្ពស់សសរទឹកត្រូវតែកើនឡើង ១៣.៦ដងដើម្បីបង្កើតសម្ពាធទប់ស្មើគ្នា៖ h_water = 0.76m × 13.6 ≈ 10.3 ម៉ែត្រ។ នេះជាការបញ្ជាក់ថាហេតុអ្វីគេមិនប្រើទឹកក្នុងបារ៉ូម៉ែត្រព្រោះបំពង់ត្រូវមានប្រវែងវែងពេក។"
  },
  {
    id: 10,
    question: "[PISA-Test ការពិសោធន៍កំប៉ុងដែក] ហេតុអ្វីកំប៉ុងអាលុយមីញ៉ូមដែលត្រូវបានដុតកម្តៅដោយចំហាយទឹកក្ដៅ រួចគ្របជិតយ៉ាងណែន ស្រាប់តែស្រុតក្រឡឹបកំពិតភ្លាមៗនៅពេលគេស្រោចទឹកត្រជាក់ពីលើ?",
    options: [
      "មកពីកម្លាំងកម្តៅពីក្នុងកំប៉ុងរុញវាចេញ",
      "ចំហាយទឹកក្ដៅខាងក្នុងត្រជាក់ចុះបង្កជាដំណក់ទឹកភ្លាមៗ បង្កើតជាលំហសុញ្ញកាស (vacuum) ធ្វើអោយសម្ពាធបរិយាកាសខាងក្រៅដ៏ខ្លាំងសង្កត់កំទេចវា",
      "ទឹកកកបានបង្កើនសីតុណ្ហភាពខាងក្នុងកំប៉ុង",
      "កំប៉ុងដែកនោះរលាយដោយសារប្រតិកម្មគីមីរវាងទឹកនិងលោហៈ"
    ],
    correctIndex: 1,
    explanation: "ពេលស្រោចទឹកកក ចំហាយទឹកក្តៅខាងក្នុងកំប៉ុងបានកកកកជាទឹកយ៉ាងឆាប់រហ័ស ធ្វើឱ្យសម្ពាធខាងក្នុង (P_inside) ធ្លាក់ចុះស្ទើរស្មើនឹងសូន្យ។ សម្ពាធខ្យល់ខាងក្រៅដ៏ធំ (P_outside ≈ 101 kPa) បានកម្រិតសង្កត់កំប៉ុងអោយកំពិតក្រញី។"
  },
  {
    id: 11,
    question: "កែវពីរមានទំហំបាតប៉ុនគ្នា ត្រូវបានបំពេញដោយទឹករំអិលពីរប្រភេទក្នុងជម្រៅកម្ពស់ h ស្មើគ្នា៖ កែវទី១ បំពេញដោយទឹក (&rho; = 1000 kg/m³) កែវទី២ បំពេញដោយទឹកឃ្មុំ (&rho; = 1420 kg/m³)។ តើបាតកែវមួយណាទទួលសម្ពាធទឹកខ្លាំងជាង?",
    options: [
      "កែវទី១ (ទឹក) ព្រោះវាហូរលឿនជាង",
      "កែវទី២ (ទឹកឃ្មុំ) ព្រោះវាមានដង់ស៊ីតេ ρ ធំជាង",
      "ស្មើគ្នា ព្រោះកម្ពស់ជាតិរាវ h ស្មើគ្នា",
      "មិនអាចកំណត់បានឡើយសោត"
    ],
    correctIndex: 1,
    explanation: "តាមរូបមន្ត P = ρ · g · h ដោយ g និង h ស្មើគ្នា នោះសម្ពាធអ៊ីដ្រូស្តាទិចសមាមាត្រផ្ទាល់នឹងដង់ស៊ីតេរាវ ρ។ ទឹកឃ្មុំមានដង់ស៊ីតេធំជាងទឹក នាំឱ្យបាតកែវទី២មានសម្ពាធខ្លាំងជាង។"
  },
  {
    id: 12,
    question: "[PISA-Test សំណួរពិតប្រាកដ] នារីម្នាក់មានទម្ងន់ m = 50 kg ពាក់ស្បែកជើងកែងចោតដែលមានផ្ទៃប៉ះបាតតុល្យការសរុប A = 0.001 m² និងកូនដំរីមួយក្បាលទម្ងន់ m = 150 kg មានផ្ទៃបាតជើងទាំងបួនសរុប A = 0.1 m²។ តើនរណាបង្កសម្ពាធសង្កត់ខ្លាំងជាងទៅលើកម្រាលតុ?",
    options: [
      "ដំរី បង្កើតសម្ពាធច្រើនជាងព្រោះវាធ្ងន់ជាង ៣ដង",
      "នារីពាក់ស្បែកជើងកែងចោត បង្កើតសម្ពាធខ្លាំងជាងដំរីជាង ៣០ដង ព្រោះផ្ទៃបាតស្បែកជើងរបស់នាងតូចខ្លាំង",
      "ស្មើគ្នា ព្រោះទម្ងន់វត្ថុនិងផ្ទៃប៉ះសមាមាត្រគ្នា",
      "មិនមានសម្ពាធកើតឡើងលើកម្រាលឡើយ"
    ],
    correctIndex: 1,
    explanation: "P_woman = (50 × 10) / 0.001 = 500,000 Pa! P_elephant = (150 × 10) / 0.1 = 15,000 Pa! ដូច្នេះនារីពាក់ស្បែកជើងកែងចោតសង្កត់សម្ពាធខ្លាំងជាងដំរីជាង ៣០ដង ដែលងាយនឹងធ្វើឱ្យខូចខាតកម្រាលឈើ។"
  },
  {
    id: 13,
    question: "[PISA-Test ផលមេកានិច] តើត្រូវកំណត់ផលធៀបផ្ទៃ piston ប្រព័ន្ធ hydraulic (A₂ / A₁) ស្មើនឹងប៉ុន្មានដើម្បីអោយសិស្សម្នាក់ទម្ងន់ 45 kg (450N) អាចទប់លំនឹងឬលើកសេះធំមួយក្បាលដែលមានទម្ងន់ 900 kg (9000N) បាន?",
    options: [
      "ផលធៀបស្មើ ២ដង (A₂/A₁ = 2)",
      "ផលធៀបស្មើ ១០ដង (A₂/A₁ = 10)",
      "ផលធៀបស្មើ ២០ដង (A₂/A₁ = 20)",
      "ផលធៀបស្មើ ២០០ដង (A₂/A₁ = 200)"
    ],
    correctIndex: 2,
    explanation: "តាមច្បាប់ប៉ាស្កាល់ F₂ / F₁ = A₂ / A₁ នាំឱ្យ 9000N / 450N = 20 ដង។ ដូច្នេះគេត្រូវជ្រើសរើស Piston ធំមានទំហំផ្ទៃ ២០ដងនៃ Piston តូចទើបអាចលើកសេះបានសម្រេច។"
  },
  {
    id: 14,
    question: "[PISA-Test យន្តហោះកម្ពស់ខ្ពស់] ដបទឹកជ័រមួយត្រូវបានបិទគ្របជិតយ៉ាងណែននៅលើឡានហោះក្នុងរយៈកម្ពស់ ១០០០០ម៉ែត្រ។ នៅពេលយន្តហោះចុះចតដល់គោកធម្មតា (នីវ៉ូសមុទ្រ) គេសង្កេតឃើញដបទឹកនោះស្វិតកំពិតចូលគ្នា។ មកពីមូលហេតុរូបវិទ្យាអ្វី?",
    options: [
      "មកពីកម្តៅនៅលើអាកាសធ្លាក់ចុះ",
      "សម្ពាធបរិយាកាសទាបត្រូវបានជាប់ខាងក្នុងដប ឯសម្ពាធខ្យល់នៅដីមានកម្លាំងធំជាងឆ្ងាយ សង្កត់ដបឱ្យកំពិតចូលគ្នា",
      "ទឹកនៅក្នុងដបហួតបាត់បង់អស់",
      "ដង់ស៊ីតេជ័រប្រែប្រួលដោយសារកំហាប់អុកស៊ីសែន"
    ],
    correctIndex: 1,
    explanation: "នៅរយៈកម្ពស់ខ្ពស់ សម្ពាធខ្យល់ស្តើង (ទាប) ត្រូវបានជាប់ក្នុងដប។ ពេលចុះដល់ដី សម្ពាធបរិយាកាសដ៏ខ្លាំងខាងក្រៅ (P_atm ≈ 101.3 kPa) ដែលធំជាង បានសង្កត់ដបឱ្យរួមស្វិតចូលគ្នា។"
  },
  {
    id: 15,
    question: "គេយកដុំដែកម៉ាស 10kg និងដុំឈើម៉ាស 10kg ដែលមានរូបរាងនិងទំហំផ្ទៃបាតប៉ះពាល់ស្មើគ្នាទាំងស្រុង ទៅដាក់នៅលើផ្ទៃខ្សាច់ទន់។ តើដុំមួយណាដែលស្រុតទៅក្នុងខ្សាច់ជ្រៅជាង?",
    options: [
      "ដុំដែក ស្រុតជ្រៅជាងព្រោះដង់ស៊ីតេវាធ្ងន់ជាងឈើ",
      "ដុំឈើ ស្រុតជ្រៅជាងព្រោះដីទ្រទ្រង់វាមានសភាពយឺត",
      "ស្រុតជ្រៅស្មើគ្នា ព្រោះម៉ាស (ទម្ងន់) និងទំហំផ្ទៃបាតស្មើគ្នា បង្កើតសម្ពាធ P ស្មើគ្នា",
      "មិនមានដុំណាស្រុតទៅក្នុងខ្សាច់ឡើយ"
    ],
    correctIndex: 2,
    explanation: "ជម្រៅនៃការស្រុតរបស់អង្គធាតុរឹងលើផ្ទៃទ្រស្រុតត្រូវបានកំណត់ដោយសម្ពាធ (P = F/A) មិនមែនដង់ស៊ីតេទោលឡើយ។ ដោយសារពួកវាមានទម្ងន់ស្មើគ្នា (10kg × g) និងផ្ទៃបាតស្មើគ្នា នាំឱ្យសម្ពាធស្មើគ្នា បង្កឱ្យកម្រិតស្រុតស្មើគ្នាដដែល។"
  }
];

export default function LabQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (optIdx: number) => {
    if (submitted) return;
    setSelectedOpt(optIdx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || submitted) return;
    setSubmitted(true);
    if (selectedOpt === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const pisaQuestionsCount = QUIZ_QUESTIONS.filter(q => q.question.includes('PISA-Test') || q.question.includes('គណនា')).length;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="lab-quiz-root" style={{ fontFamily: 'var(--font-sans)' }}>
      
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="quiz-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-5"
          >
            {/* Quiz progress view header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 dark:border-slate-900 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">កម្រងសំណួរវាស់ស្ទង់ចំណេះដឹង (Lab Quiz)</h3>
                  <span className="text-[10px] text-slate-400 font-bold block">សរុប ១៥ សំណួរ រួមបញ្ចូល ១០ លំហាត់ និងសំណួរបែប PISA សកល</span>
                </div>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 font-mono font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                សំណួរ {currentIdx + 1} នៃ {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Card Box */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-150 relative overflow-hidden">
              {currentQuestion.question.includes('PISA-Test') && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white rounded px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                  PISA Exam
                </div>
              )}
              {currentQuestion.question.includes('គណនា') && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                  លំហាត់រូបមន្ត
                </div>
              )}
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed pt-2">
                {currentQuestion.id}. {currentQuestion.question}
              </h4>
            </div>

            {/* MCQ Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((opt, i) => {
                let btnStyle = "border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-350";
                
                if (selectedOpt === i && !submitted) {
                  btnStyle = "border-indigo-500 bg-indigo-50/40 text-indigo-800 dark:border-indigo-400 dark:bg-indigo-950/20 dark:text-indigo-300";
                } else if (submitted) {
                  if (i === currentQuestion.correctIndex) {
                    btnStyle = "border-emerald-500 bg-emerald-50 dark:border-emerald-500/35 dark:bg-emerald-950/20 text-emerald-805 dark:text-emerald-300";
                  } else if (selectedOpt === i) {
                    btnStyle = "border-rose-500 bg-rose-50 dark:border-rose-500/35 dark:bg-rose-950/20 text-rose-805 dark:text-rose-300";
                  } else {
                    btnStyle = "border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-550";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    disabled={submitted}
                    className={`w-full text-left py-3 px-4 rounded-xl border text-xs font-bold transition flex justify-between items-center ${btnStyle}`}
                  >
                    <span className="leading-relaxed">{opt}</span>
                    {submitted && i === currentQuestion.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-1.5" />
                    )}
                    {submitted && selectedOpt === i && i !== currentQuestion.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-1.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer check indicator and expert explanation */}
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50/55 dark:bg-slate-900/60 p-4 rounded-xl border border-amber-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-normal"
              >
                <div className="flex items-center gap-1 text-slate-800 dark:text-slate-205 font-extrabold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>ការពន្យល់លម្អិតរូបមន្ត៖</span>
                </div>
                {currentQuestion.explanation}
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 dark:border-slate-900">
              <span className="text-[10px] text-slate-400 font-bold">ប្រឡងសន្សំ៖ {score}/{currentIdx} ចម្លើយត្រូវ</span>
              {!submitted ? (
                <button
                  type="button"
                  disabled={selectedOpt === null}
                  onClick={handleSubmit}
                  className="py-2.5 px-6 rounded-xl bg-indigo-650 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-900 dark:disabled:text-slate-600 transition text-white text-xs font-bold shadow-md"
                >
                  ផ្ទៀងផ្ទាត់ចម្លើយ
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-705 transition text-white text-xs font-bold flex items-center gap-1 shadow-md"
                >
                  {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'បញ្ចប់តេស្តទាំងស្រុង' : 'សំណួរបន្ទាប់'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          // --- END SCORE BOARD RENDER ---
          <motion.div
            key="score-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 flex flex-col items-center gap-5"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-950/40 rounded-full animate-ping opacity-60" />
              <div className="absolute inset-2 bg-indigo-50 dark:bg-indigo-900/60 rounded-full" />
              <Award className="w-16 h-16 text-indigo-600 dark:text-indigo-400 z-10" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-extrabold text-2xl text-slate-850 dark:text-slate-100">បានបញ្ចប់ទាំងស្រុងហើយ!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">លទ្ធផលតេស្តវាស់ស្ទង់សមត្ថភាព PISA សរុប៖</p>
            </div>

            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {score} / {QUIZ_QUESTIONS.length}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed px-4">
              {score === QUIZ_QUESTIONS.length 
                ? "🌟 អស្ចារ្យមែនទែន! អ្នកគឺជាអ្នកជំនាញរូបវិទ្យាសម្ពាធកម្រិតខ្ពស់។ អ្នកឆ្លើយត្រូវស្មើនឹង ១០០% ពេញក្នុងសំណួរ PISA test និងលំហាត់គណនា!"
                : score >= 10 
                ? "💡 លទ្ធផលល្អប្រសើរ! អ្នកបានយល់ដឹងពីសម្ពាធនៃអង្គធាតុរឹង សន្ទនីយ ការបញ្ជូនសម្ពាធ និងសម្ពាធបរិយាកាសបានយ៉ាងជ្រាលជ្រៅ។"
                : "📚 ល្អបង្គួរ! អ្នកអាចបន្តទៅសាកល្បងម៉ូឌែលពិសោធន៍ផ្សេងៗឡើងវិញ ដើម្បីពង្រឹងចំណេះដឹងឱ្យកាន់តែប្រសើរឡើង។"
              }
            </p>

            <button
              type="button"
              onClick={handleRestart}
              className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 mt-2"
            >
              <RotateCcw className="w-4 h-4" /> ធ្វើសាកល្បងម្ដងទៀត
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
