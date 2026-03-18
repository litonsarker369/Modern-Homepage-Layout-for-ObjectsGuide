import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, OBJECTS } from '../data/mock';
import { ObjectCard } from '../components/ObjectCard';
export function CategoryPage() {
  const { categoryId } = useParams<{
    categoryId: string;
  }>();
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const baseObjects = OBJECTS.filter((o) => o.categoryId === category.id);
  const Icon = category.icon;
  // Extract unique materials and tags for this category
  const availableMaterials = Array.from(
    new Set(baseObjects.flatMap((o) => o.materials))
  ).sort();
  const availableTags = Array.from(
    new Set(baseObjects.flatMap((o) => o.tags))
  ).sort();
  // State
  const [sortBy, setSortBy] = useState<'az' | 'newest' | 'popular'>('az');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Handlers
  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
    prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedTags([]);
  };
  // Filter and Sort Logic
  const filteredAndSortedObjects = useMemo(() => {
    let result = [...baseObjects];
    // Filter by materials
    if (selectedMaterials.length > 0) {
      result = result.filter((obj) =>
      obj.materials.some((m) => selectedMaterials.includes(m))
      );
    }
    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((obj) =>
      obj.tags.some((t) => selectedTags.includes(t))
      );
    }
    // Sort
    if (sortBy === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      result.reverse(); // Mocking newest by reversing array
    }
    // 'popular' keeps original order
    return result;
  }, [baseObjects, selectedMaterials, selectedTags, sortBy]);
  const activeFilterCount = selectedMaterials.length + selectedTags.length;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
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
          <li className="text-foreground font-medium" aria-current="page">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-nav rounded-xl flex items-center justify-center text-primary border border-border">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground">
              {category.name}
            </h1>
          </div>
          <p className="text-muted text-lg max-w-2xl">{category.description}</p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-white border border-border rounded-xl font-medium text-foreground">
          
          <SlidersHorizontal className="w-4 h-4" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {(isFilterOpen ||
          typeof window !== 'undefined' && window.innerWidth >= 1024) &&
          <motion.aside
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            className="w-full lg:w-64 flex-shrink-0 overflow-hidden lg:overflow-visible">
            
              <div className="bg-white border border-border rounded-2xl p-5 lg:sticky lg:top-24">
                <div className="flex items-center justify-between font-heading font-semibold text-foreground mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </div>
                  {activeFilterCount > 0 &&
                <button
                  onClick={clearFilters}
                  className="text-xs font-sans font-medium text-primary hover:underline">
                  
                      Clear all
                    </button>
                }
                </div>

                <div className="space-y-8">
                  {/* Sort */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
                      Sort By
                    </h3>
                    <div className="space-y-3">
                      {[
                    {
                      id: 'az',
                      label: 'Alphabetical (A-Z)'
                    },
                    {
                      id: 'newest',
                      label: 'Newest Added'
                    },
                    {
                      id: 'popular',
                      label: 'Most Popular'
                    }].
                    map((sort) =>
                    <label
                      key={sort.id}
                      className="flex items-center gap-3 cursor-pointer group">
                      
                          <input
                        type="radio"
                        name="sort"
                        checked={sortBy === sort.id}
                        onChange={() => setSortBy(sort.id as any)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary" />
                      
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {sort.label}
                          </span>
                        </label>
                    )}
                    </div>
                  </div>

                  {/* Materials */}
                  {availableMaterials.length > 0 &&
                <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
                        Material
                      </h3>
                      <div className="space-y-3">
                        {availableMaterials.map((mat) =>
                    <label
                      key={mat}
                      className="flex items-center gap-3 cursor-pointer group">
                      
                            <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary" />
                      
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                              {mat}
                            </span>
                          </label>
                    )}
                      </div>
                    </div>
                }

                  {/* Tags */}
                  {availableTags.length > 0 &&
                <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
                        Tags
                      </h3>
                      <div className="space-y-3">
                        {availableTags.map((tag) =>
                    <label
                      key={tag}
                      className="flex items-center gap-3 cursor-pointer group">
                      
                            <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary" />
                      
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                              {tag}
                            </span>
                          </label>
                    )}
                      </div>
                    </div>
                }
                </div>
              </div>
            </motion.aside>
          }
        </AnimatePresence>

        {/* Object Grid */}
        <div className="flex-grow">
          <div className="mb-4 text-sm font-medium text-muted">
            Showing {filteredAndSortedObjects.length} of {baseObjects.length}{' '}
            objects
          </div>

          {filteredAndSortedObjects.length > 0 ?
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
              <AnimatePresence mode="popLayout">
                {filteredAndSortedObjects.map((obj) =>
              <motion.div
                key={obj.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{
                  duration: 0.2
                }}>
                
                    <ObjectCard object={obj} />
                  </motion.div>
              )}
              </AnimatePresence>
            </motion.div> :

          <div className="text-center py-20 bg-white border border-border rounded-2xl">
              <Icon className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                No matching objects
              </h3>
              <p className="text-muted mb-6">
                Try removing some filters to see more results.
              </p>
              <button
              onClick={clearFilters}
              className="px-4 py-2 bg-nav text-foreground font-medium rounded-lg hover:bg-border transition-colors">
              
                Clear Filters
              </button>
            </div>
          }
        </div>
      </div>
    </motion.div>);

}