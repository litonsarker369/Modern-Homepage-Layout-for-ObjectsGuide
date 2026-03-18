import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mock';
interface ObjectCardProps {
  object: {
    id: string;
    categoryId: string;
    name: string;
    shortDesc: string;
    image: string;
    tags: string[];
  };
  compact?: boolean;
}
export function ObjectCard({ object, compact = false }: ObjectCardProps) {
  const category = CATEGORIES.find((c) => c.id === object.categoryId);
  const Icon = category?.icon;
  return (
    <Link to={`/object/${object.id}`} className="block group h-full">
      <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-subtle group-hover:border-primary/30 h-full flex flex-col">
        <div
          className={`${compact ? 'aspect-[3/2]' : 'aspect-[4/3]'} w-full overflow-hidden bg-nav relative`}>
          
          <img
            src={object.image}
            alt={object.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          {!compact &&
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-foreground flex items-center gap-1.5 shadow-sm">
              {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
              {category?.name}
            </div>
          }
        </div>
        <div className={`${compact ? 'p-3' : 'p-5'} flex flex-col flex-grow`}>
          {compact && category &&
          <div className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
              {category.name}
            </div>
          }
          <h3
            className={`font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors ${compact ? 'text-base' : 'text-xl'}`}>
            
            {object.name}
          </h3>
          <p
            className={`text-muted line-clamp-2 flex-grow ${compact ? 'text-xs mb-0' : 'text-sm mb-4'}`}>
            
            {object.shortDesc}
          </p>
          {!compact &&
          <div className="flex flex-wrap gap-2 mt-auto">
              {object.tags.slice(0, 2).map((tag) =>
            <span
              key={tag}
              className="px-2 py-1 bg-nav text-secondary text-xs font-medium rounded-md">
              
                  {tag}
                </span>
            )}
            </div>
          }
        </div>
      </div>
    </Link>);

}