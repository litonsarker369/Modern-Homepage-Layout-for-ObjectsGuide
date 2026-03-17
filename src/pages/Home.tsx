import React, { useMemo, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { OBJECTS, CATEGORIES, TAGS, MATERIALS } from '../data/mock';
import { ObjectCard } from '../components/ObjectCard';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};
export function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setVisibleCount(8); // Reset count on filter change
  };
  const filteredObjects = useMemo(() => {
    return OBJECTS.filter((obj) => {
      const matchCategory = activeCategory ?
      obj.categoryId === activeCategory :
      true;
      const matchTags =
      activeTags.length > 0 ?
      activeTags.every((tag) => obj.tags.includes(tag)) :
      true;
      return matchCategory && matchTags;
    });
  }, [activeCategory, activeTags]);
  const displayedObjects = filteredObjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredObjects.length;
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="text-center max-w-3xl mx-auto mb-20 pt-8">
        
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
          Discover the anatomy of <br />
          <span className="text-primary italic">everyday objects.</span>
        </h1>
        <p className="text-lg text-muted mb-6">
          A comprehensive encyclopedia detailing the history, design, and
          taxonomy of the physical things that shape our world.
        </p>
        <p className="text-sm font-medium text-secondary uppercase tracking-widest">
          {OBJECTS.length} objects · {CATEGORIES.length} categories · Updated
          daily
        </p>
      </motion.section>

      {/* Category Grid */}
      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const count = OBJECTS.filter((o) => o.categoryId === cat.id).length;
            return (
              <motion.div key={cat.id} variants={itemVariants} custom={i}>
                <Link
                  to={`/category/${cat.id}`}
                  className="block h-full bg-white border border-border rounded-2xl p-5 hover:shadow-subtle hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 group">
                  
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted mb-3 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="text-xs font-medium text-secondary">
                    {count} Objects
                  </div>
                </Link>
              </motion.div>);

          })}
        </div>
      </motion.section>

      {/* Browse All Objects */}
      <motion.section
        variants={itemVariants}
        className="mb-24 scroll-mt-24"
        id="browse">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
            Browse Objects
            <span className="text-sm font-medium bg-nav text-secondary px-2.5 py-1 rounded-full border border-border">
              {filteredObjects.length}
            </span>
          </h2>
        </div>

        {/* Filters */}
        <div className="bg-white border border-border rounded-2xl p-4 md:p-6 mb-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null ? 'bg-primary text-white' : 'bg-nav text-muted hover:bg-border'}`}>
                
                All
              </button>
              {CATEGORIES.map((cat) =>
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-nav text-muted hover:bg-border'}`}>
                
                  {cat.name}
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.slice(0, 12).map((tag) =>
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${activeTags.includes(tag) ? 'bg-primary/10 border-primary text-primary font-medium' : 'bg-transparent border-border text-muted hover:border-muted'}`}>
                
                  {tag}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Object Grid */}
        {filteredObjects.length > 0 ?
        <>
            <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
              <AnimatePresence mode="popLayout">
                {displayedObjects.map((obj) =>
              <motion.div
                key={obj.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9
                }}
                transition={{
                  duration: 0.2
                }}>
                
                    <ObjectCard object={obj} />
                  </motion.div>
              )}
              </AnimatePresence>
            </motion.div>

            {hasMore &&
          <div className="mt-10 text-center">
                <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-6 py-3 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm">
              
                  Load More Objects
                </button>
              </div>
          }
          </> :

        <div className="text-center py-20 bg-white border border-border rounded-2xl">
            <Filter className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              No objects found
            </h3>
            <p className="text-muted mb-6">
              Try adjusting your filters to see more results.
            </p>
            <button
            onClick={() => {
              setActiveCategory(null);
              setActiveTags([]);
            }}
            className="text-primary font-medium hover:underline">
            
              Clear all filters
            </button>
          </div>
        }
      </motion.section>

      {/* Browse by Material */}
      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Materials Index
        </h2>
        <div className="flex flex-wrap gap-3">
          {MATERIALS.map((mat) => {
            const count = OBJECTS.filter((o) =>
            o.materials.includes(mat)
            ).length;
            if (count === 0) return null;
            return (
              <div
                key={mat}
                className="flex items-center bg-white border border-border rounded-full pl-4 pr-1 py-1 shadow-sm">
                
                <span className="text-sm font-medium text-foreground mr-3">
                  {mat}
                </span>
                <span className="bg-nav text-secondary text-xs font-bold px-2 py-1 rounded-full">
                  {count}
                </span>
              </div>);

          })}
        </div>
      </motion.section>

      {/* Encyclopedia Stats / Info */}
      <motion.section
        variants={itemVariants}
        className="bg-nav rounded-3xl p-8 md:p-12 border border-border flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="max-w-xl">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Structured like nature.
          </h2>
          <p className="text-muted">
            Just as biology categorizes life into kingdoms and species,
            Objectsguide applies a rigorous taxonomy to the artificial world.
            Every item is classified by domain, class, order, and family.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-1">
              10
            </div>
            <div className="text-sm font-medium text-secondary uppercase tracking-wider">
              Classes
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-1">
              42
            </div>
            <div className="text-sm font-medium text-secondary uppercase tracking-wider">
              Orders
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-1">
              {OBJECTS.length}
            </div>
            <div className="text-sm font-medium text-secondary uppercase tracking-wider">
              Objects
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>);

}