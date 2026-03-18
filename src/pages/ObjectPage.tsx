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
  Layers
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
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
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
  const { objectId } = useParams<{
    objectId: string;
  }>();
  const object = OBJECTS.find((o) => o.id === objectId) || OBJECTS[0];
  const category =
    CATEGORIES.find((c) => c.id === object.categoryId) || CATEGORIES[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'facts'>(
    'overview'
  );

  let relatedObjects = OBJECTS.filter(
    (o) => o.categoryId === object.categoryId && o.id !== object.id
  );
  if (relatedObjects.length < 3) {
    const otherObjects = OBJECTS.filter(
      (o) => o.categoryId !== object.categoryId
    );
    relatedObjects = [...relatedObjects, ...otherObjects].slice(0, 3);
  } else {
    relatedObjects = relatedObjects.slice(0, 3);
  }

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.5
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex text-sm text-muted mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link
              to={`/category/${category.id}`}
              className="hover:text-foreground transition-colors">
              {category.name}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="text-foreground font-medium" aria-current="page">
            {object.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="aspect-square w-full bg-nav relative">
              <img
                src={object.image}
                alt={object.name}
                className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-nav border border-border rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <BookOpen className="w-4 h-4 text-primary" />
              Scientific Classification
            </h3>
            <dl className="space-y-3 text-sm">
              {Object.entries(object.taxonomy).map(([key, value]) =>
                <div key={key} className="flex justify-between items-center">
                  <dt className="text-muted capitalize">{key}</dt>
                  <dd className="font-medium text-foreground">{value}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                to={`/category/${category.id}`}
                className="px-3 py-1 bg-white border border-border text-secondary text-xs font-bold uppercase tracking-wider rounded-md hover:border-primary hover:text-primary transition-colors">
                {category.name}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {object.name}
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              {object.shortDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">Portability</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{portabilityIcons[object.portability]}</span>
                <span className="font-medium text-foreground text-sm capitalize">{object.portability}</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Maximize2 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">Size Class</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-bold text-sm w-6 h-6 rounded flex items-center justify-center">
                  {sizeClassIcons[object.sizeClass]}
                </span>
                <span className="font-medium text-foreground text-sm capitalize">{object.sizeClass}</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">{experienceLevelIcons[object.experienceLevel]}</span>
                <span className="font-medium text-foreground text-sm capitalize">{object.experienceLevel}</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">Price Tier</span>
              </div>
              <div className="font-medium text-foreground text-sm">
                {priceTierIcons[object.priceTier]}
                <span className="text-muted ml-1 capitalize">{object.priceTier}</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">Risk Level</span>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${riskLevelColors[object.riskLevel]}`}>
                {riskLevelLabels[object.riskLevel]}
              </span>
            </div>

            {object.safetyWarnings.length > 0 && (
              <div className="bg-white border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted">Safety</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {object.safetyWarnings.slice(0, 2).map((warning) => (
                    <span key={warning} className="text-sm" title={warning}>
                      {safetyWarningIcons[warning]}
                    </span>
                  ))}
                  {object.safetyWarnings.length > 2 && (
                    <span className="text-xs text-muted">+{object.safetyWarnings.length - 2}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Safety Warnings
            </h3>
            {object.safetyWarnings.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {object.safetyWarnings.map((warning) => (
                  <span
                    key={warning}
                    className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                    <span>{safetyWarningIcons[warning]}</span>
                    <span className="capitalize">{warning}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm italic">No safety warnings for this item.</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Common Variations
            </h3>
            <div className="flex flex-wrap gap-2">
              {object.commonVariations.map((variation) => (
                <span
                  key={variation}
                  className="px-3 py-1.5 bg-white border border-border text-muted text-sm rounded-lg hover:border-primary hover:text-primary transition-colors cursor-default">
                  {variation}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div
              className="flex space-x-8 border-b border-border mb-6"
              role="tablist">
              {[
                {
                  id: 'overview',
                  label: 'Overview'
                },
                {
                  id: 'specs',
                  label: 'Specifications'
                },
                {
                  id: 'facts',
                  label: 'Did You Know?'
                }].
                map((tab) =>
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-sm font-medium relative transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-muted hover:text-foreground'}`}>
                    {tab.label}
                    {activeTab === tab.id &&
                      <motion.div
                        layoutId="tabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    }
                  </button>
              )}
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'overview' &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="prose prose-slate max-w-none">
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {object.description}
                  </p>
                </motion.div>
              }

              {activeTab === 'specs' &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Era</span>
                      <span className="font-medium text-foreground text-sm">
                        {object.era}
                      </span>
                    </div>
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Portability</span>
                      <span className="font-medium text-foreground text-sm capitalize flex items-center gap-1">
                        <span>{portabilityIcons[object.portability]}</span>
                        {object.portability}
                      </span>
                    </div>
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Size Class</span>
                      <span className="font-medium text-foreground text-sm capitalize">
                        {object.sizeClass}
                      </span>
                    </div>
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Experience Level</span>
                      <span className="font-medium text-foreground text-sm capitalize">
                        {object.experienceLevel}
                      </span>
                    </div>
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Price Tier</span>
                      <span className="font-medium text-foreground text-sm">
                        {priceTierIcons[object.priceTier]} ({object.priceTier})
                      </span>
                    </div>
                    <div className="py-3 border-b border-border flex justify-between">
                      <span className="text-muted text-sm">Risk Level</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${riskLevelColors[object.riskLevel]}`}>
                        {riskLevelLabels[object.riskLevel]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              }

              {activeTab === 'facts' &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="space-y-4">
                  {object.funFacts.map((fact, i) =>
                    <div
                      key={i}
                      className="flex gap-4 p-4 bg-nav rounded-xl border border-border">
                      <div className="flex-shrink-0 mt-0.5">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {fact}
                      </p>
                    </div>
                  )}
                </motion.div>
              }
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {object.tags?.map((tag) =>
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white border border-border text-muted text-sm rounded-lg hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  {tag}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-border">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          More in {category.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedObjects.map((obj, i) =>
            <motion.div
              key={obj.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}>
              <ObjectCard object={obj} compact={true} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>);
}
