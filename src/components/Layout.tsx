import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Header } from './Header';
import { CategoryNav } from './CategoryNav';
import { CATEGORIES } from '../data/mock';
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-border py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                  Objectsguide<span className="text-primary">.</span>
                </span>
              </Link>
              <p className="text-muted text-sm leading-relaxed">
                The comprehensive online encyclopedia detailing the history,
                design, and taxonomy of everyday objects.
              </p>
            </div>

            {/* Categories */}
            <div className="md:col-span-2">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {CATEGORIES.map((cat) =>
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="text-sm text-muted hover:text-primary transition-colors">
                  
                    {cat.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-1">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Objectsguide
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted hover:text-primary transition-colors">
                    
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted hover:text-primary transition-colors">
                    
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted hover:text-primary transition-colors">
                    
                    Submit an Object
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted hover:text-primary transition-colors">
                    
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-muted text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} Objectsguide. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}