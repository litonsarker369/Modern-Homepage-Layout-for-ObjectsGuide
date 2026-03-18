import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Sparkles, Layers, Search, ChevronDown } from 'lucide-react';
import { OBJECTS, CATEGORIES, TAGS } from '../data/mock';
import { ObjectCard } from '../components/ObjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setVisibleCount(8);
  };

  const filteredObjects = useMemo(() => {
    return OBJECTS.filter((obj) => {
      const matchCategory = activeCategory ? obj.categoryId === activeCategory : true;
      const matchTags = activeTags.length > 0 ? activeTags.every((tag) => obj.tags.includes(tag)) : true;
      return matchCategory && matchTags;
    });
  }, [activeCategory, activeTags]);

  const displayedObjects = filteredObjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredObjects.length;

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700">The Encyclopedia of Everyday Objects</span>
            </div>
          </motion.div>
          
          {/* Main Hero Content */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-6 leading-tight">
              Discover the anatomy of{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">everyday objects</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 4 298 10" stroke="url(#hero-gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="hero-gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#6366F1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              A comprehensive taxonomy documenting the history, design, and classification of the physical things that shape our world.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-blue-600">{OBJECTS.length}</div>
                <div className="text-sm text-slate-500 font-medium">Objects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-blue-600">{CATEGORIES.length}</div>
                <div className="text-sm text-slate-500 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-500 font-medium">Free</div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for any object..."
                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <span className="text-sm font-medium">Explore below</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Grid - Modern Cards */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                Browse Categories
              </h2>
              <p className="text-slate-500">Explore objects by their classification</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const count = OBJECTS.filter((o) => o.categoryId === cat.id).length;
              return (
                <motion.div key={cat.id} variants={itemVariants} custom={i}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="group block h-full bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                      {count} objects
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Featured Objects Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                Featured Objects
              </h2>
              <p className="text-slate-500">Handpicked essentials from our collection</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          <div className={`bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Category Filter Pills */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveCategory(null); setVisibleCount(8); }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === null ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setVisibleCount(8); }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${activeTags.includes(tag) ? 'bg-blue-100 border-blue-300 text-blue-700 font-semibold' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-slate-500">Showing</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              {filteredObjects.length}
            </span>
            <span className="text-sm text-slate-500">objects</span>
          </div>

          {/* Object Grid */}
          {filteredObjects.length > 0 ? (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedObjects.map((obj) => (
                    <motion.div
                      key={obj.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ObjectCard object={obj} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Load More Objects
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2">
                No objects found
              </h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => { setActiveCategory(null); setActiveTags([]); }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.section>

        {/* Taxonomy Info Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Scientific Classification
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Structured like nature.
                </h2>
                <p className="text-blue-100 text-lg">
                  Just as biology categorizes life into kingdoms and species, ObjectsGuide applies a rigorous taxonomy to the artificial world — every item classified by domain, class, order, and family.
                </p>
              </div>
              
              <div className="flex gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold mb-2">10</div>
                  <div className="text-sm font-medium text-blue-200 uppercase tracking-wider">Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold mb-2">42</div>
                  <div className="text-sm font-medium text-blue-200 uppercase tracking-wider">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold mb-2">{OBJECTS.length}</div>
                  <div className="text-sm font-medium text-blue-200 uppercase tracking-wider">Objects</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
