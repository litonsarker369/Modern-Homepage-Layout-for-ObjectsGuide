import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  BookOpen,
  Tag,
  Lightbulb,
  Briefcase,
  Maximize2,
  Award,
  DollarSign,
  AlertTriangle,
  ShieldAlert,
  Layers,
  ArrowRight,
  Home
} from 'lucide-react';
import { CATEGORIES, OBJECTS } from '../data/mock';
import { ObjectCard } from '../components/ObjectCard';

const portabilityIcons: Record<string, string> = {
  portable: '📦',
  'semi-portable': '🔄',
  fixed: '🏠'
};

const sizeClassIcons: Record<string, string> = {
  small: 'S',
  medium: 'M',
  large: 'L'
};

const experienceLevelIcons: Record<string, string> = {
  none: '●',
  basic: '●●',
  skilled: '●●●'
};

const priceTierIcons: Record<string, string> = {
  low: '$',
  medium: '$$',
  high: '$$$'
};

const riskLevelColors: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200'
};

const riskLevelLabels: Record<string, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk'
};

const safetyWarningIcons: Record<string, string> = {
  'sharp edges': '🔪',
  'heat exposure': '🔥',
  'electrical hazard': '⚡',
  'choking hazard': '🫧',
  'toxic or chemical exposure': '☠️',
  'fire hazard': '🧯',
  'pressure hazard': '💨',
  'heavy object': '⚖️',
  'moving parts': '⚙️',
  'requires supervision': '👁️'
};

export function ObjectPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const object = OBJECTS.find((o) => o.id === objectId) || OBJECTS[0];
  const category = CATEGORIES.find((c) => c.id === object.categoryId) || CATEGORIES[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'facts'>('overview');

  let relatedObjects = OBJECTS.filter((o) => o.categoryId === object.categoryId && o.id !== object.id);
  if (relatedObjects.length < 3) {
    const otherObjects = OBJECTS.filter((o) => o.categoryId !== object.categoryId);
    relatedObjects = [...relatedObjects, ...otherObjects].slice(0, 3);
  } else {
    relatedObjects = relatedObjects.slice(0, 3);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <Link to={`/category/${category.id}`} className="text-slate-500 hover:text-blue-600 transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-medium">{object.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Image & Classification */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Image */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-200">
              <div className="aspect-square relative">
                <img
                  src={object.image}
                  alt={object.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Scientific Classification */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Scientific Classification
              </h3>
              <dl className="space-y-3">
                {Object.entries(object.taxonomy).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <dt className="text-slate-500 capitalize text-sm">{key}</dt>
                    <dd className="font-semibold text-slate-900 text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-7">
            {/* Header */}
            <div className="mb-8">
              <Link
                to={`/category/${category.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-blue-200 transition-colors mb-4"
              >
                {category.name}
              </Link>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
                {object.name}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {object.shortDesc}
              </p>
            </div>

            {/* Taxonomy Grid - Modern Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              
              {/* Portability */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Portability</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{portabilityIcons[object.portability]}</span>
                  <span className="font-semibold text-slate-900 capitalize">{object.portability}</span>
                </div>
              </div>

              {/* Size Class */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                    {sizeClassIcons[object.sizeClass]}
                  </span>
                  <span className="font-semibold text-slate-900 capitalize">{object.sizeClass}</span>
                </div>
              </div>

              {/* Experience Level */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold tracking-wider">{experienceLevelIcons[object.experienceLevel]}</span>
                  <span className="font-semibold text-slate-900 capitalize">{object.experienceLevel}</span>
                </div>
              </div>

              {/* Price Tier */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</span>
                </div>
                <div className="font-bold text-slate-900">
                  <span className="text-lg">{priceTierIcons[object.priceTier]}</span>
                  <span className="text-sm text-slate-500 ml-1 capitalize">{object.priceTier}</span>
                </div>
              </div>

              {/* Risk Level */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk</span>
                </div>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${riskLevelColors[object.riskLevel]}`}>
                  {riskLevelLabels[object.riskLevel]}
                </span>
              </div>

              {/* Safety Count */}
              {object.safetyWarnings.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Safety</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {object.safetyWarnings.slice(0, 3).map((w) => (
                      <span key={w} className="text-lg" title={w}>{safetyWarningIcons[w]}</span>
                    ))}
                    {object.safetyWarnings.length > 3 && (
                      <span className="text-sm text-slate-500">+{object.safetyWarnings.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Safety Warnings Section */}
            {object.safetyWarnings.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-5 border border-red-200 mb-6">
                <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                  Safety Warnings
                </h3>
                <div className="flex flex-wrap gap-2">
                  {object.safetyWarnings.map((warning) => (
                    <span
                      key={warning}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-xl text-sm font-medium"
                    >
                      <span>{safetyWarningIcons[warning]}</span>
                      <span className="capitalize">{warning}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Common Variations */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-600" />
                Common Variations
              </h3>
              <div className="flex flex-wrap gap-2">
                {object.commonVariations.map((variation) => (
                  <span
                    key={variation}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default"
                  >
                    {variation}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'specs', label: 'Specifications' },
                  { id: 'facts', label: 'Did You Know?' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none"
                  >
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {object.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Era</span>
                        <span className="font-semibold text-slate-900">{object.era}</span>
                      </div>
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Portability</span>
                        <span className="font-semibold text-slate-900 capitalize flex items-center gap-1">
                          {portabilityIcons[object.portability]} {object.portability}
                        </span>
                      </div>
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Size Class</span>
                        <span className="font-semibold text-slate-900 capitalize">{object.sizeClass}</span>
                      </div>
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Experience</span>
                        <span className="font-semibold text-slate-900 capitalize">{object.experienceLevel}</span>
                      </div>
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Price Tier</span>
                        <span className="font-semibold text-slate-900">
                          {priceTierIcons[object.priceTier]} ({object.priceTier})
                        </span>
                      </div>
                      <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between">
                        <span className="text-slate-500 text-sm">Risk Level</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${riskLevelColors[object.riskLevel]}`}>
                          {riskLevelLabels[object.riskLevel]}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'facts' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {object.funFacts.map((fact, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100"
                      >
                        <div className="flex-shrink-0">
                          <Lightbulb className="w-6 h-6 text-amber-500" />
                        </div>
                        <p className="text-slate-700 leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Related Tags */}
            <div className="mt-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-blue-600" />
                Related Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {object.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Objects */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-slate-900">
              More in {category.name}
            </h2>
            <Link
              to={`/category/${category.id}`}
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedObjects.map((obj, i) => (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ObjectCard object={obj} compact={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
