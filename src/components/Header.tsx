import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
export function Header() {
  return (
    <header className="w-full bg-background py-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-foreground">
            Objectsguide<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="w-full md:max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl leading-5 bg-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
            placeholder="Search the encyclopedia..." />
          
        </div>

        {/* Utility Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted">
          <Link to="/" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Collections
          </Link>
          <button className="text-primary hover:text-primary/80 transition-colors font-semibold">
            Random Object
          </button>
        </nav>
      </div>
    </header>);

}