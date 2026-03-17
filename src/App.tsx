import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ObjectPage } from './pages/ObjectPage';
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="object/:objectId" element={<ObjectPage />} />
        </Route>
      </Routes>
    </Router>);

}