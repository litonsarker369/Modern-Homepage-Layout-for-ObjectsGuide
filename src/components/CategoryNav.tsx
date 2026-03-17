import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/mock';
export function CategoryNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="w-full bg-nav border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex overflow-x-auto no-scrollbar py-3 items-center space-x-2">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = currentPath === `/category/${category.id}`;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`
                  relative flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${isActive ? 'text-primary' : 'text-muted hover:text-foreground hover:bg-black/5'}
                `}>
                
                {isActive &&
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }} />

                }
                <Icon className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">{category.name}</span>
              </Link>);

          })}
        </nav>
      </div>
    </div>);

}