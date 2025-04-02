"use client";

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

// Dynamically import the Scene component with no SSR
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-0 bg-[#050816] flex items-center justify-center">
      <div className="text-white text-xl max-w-md text-center">
        <div className="mb-6 text-2xl font-bold">Initializing Digital Environment</div>
        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 absolute left-0 top-0 animate-loading-pulse" style={{width: '70%'}}></div>
        </div>
        <p className="mt-4 text-blue-300 text-sm">Preparing geometric elements...</p>
      </div>
    </div>
  )
});

export default function SceneWrapper({ onSectionChange }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Check WebGL compatibility
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
    
    if (!hasWebGL) {
      setError("WebGL is required for this experience but isn't supported by your browser.");
    } else {
      // Simulate loading progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
        }
        setLoadingProgress(progress);
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Handle scene loading
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      window.dispatchEvent(new CustomEvent('scene-loaded'));
    }, 3000);
    
    const handlePageScroll = (e) => {
      if (onSectionChange) {
        onSectionChange(e.detail.section);
      }
    };
    
    window.addEventListener('page-scrolled', handlePageScroll);
    
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('page-scrolled', handlePageScroll);
    };
  }, [onSectionChange]);

  if (error) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-0 bg-[#050816] flex items-center justify-center">
        <div className="text-white text-center p-8 max-w-md bg-red-900/40 backdrop-blur-md rounded-lg border border-red-500/30">
          <h2 className="text-2xl mb-4 font-bold">3D Environment Error</h2>
          <p className="mb-4">{error}</p>
          <p className="mt-4 text-gray-300">Please try using a modern browser like Chrome, Firefox, or Edge.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-0 bg-[#050816] flex items-center justify-center">
          <div className="text-white text-xl max-w-md text-center">
            <div className="mb-6 text-2xl font-bold">Initializing Digital Environment</div>
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{width: `${loadingProgress}%`}}></div>
            </div>
            <p className="mt-4 text-blue-300 text-sm">{loadingProgress < 100 ? 'Loading assets...' : 'Rendering scene...'}</p>
          </div>
        </div>
      }>
        <Scene onSectionChange={onSectionChange} />
      </Suspense>
      
      {!isLoaded && (
        <div className="fixed bottom-4 right-4 bg-black/70 backdrop-blur-md text-white p-4 rounded-lg z-50 border border-blue-500/30">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
            <p>Initializing digital environment...</p>
          </div>
        </div>
      )}
    </>
  );
}
