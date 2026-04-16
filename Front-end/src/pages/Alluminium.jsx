import React, { useEffect } from 'react';

export default function AluminumFrameCard() {
  useEffect(() => {
    // MetallicCSS - import only JavaScript
    import('metallicss');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      {/* Aluminum Frame Card - MetallicCSS */}
      <div 
        className="metallicss w-full max-w-2xl rounded-lg p-4"
        style={{ 
          backgroundColor: '#c0c0c0'
        }}
      >
        {/* Inner Content Card */}
        <div className="bg-white rounded-md p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Aluminum Frame Window
            </h1>
            <p className="text-gray-600 text-sm">
              Adaptive metallic texture with MetallicCSS
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex gap-4">
              {/* Left Column */}
              <div className="flex-1">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-md mb-3 flex items-center justify-center text-gray-500">
                  <span className="text-sm">Image Area</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This card features a realistic aluminum frame border powered by MetallicCSS. The metallic effect automatically adapts to size and border-radius.
                </p>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-3">
                <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">CLASS</p>
                  <p className="text-sm text-gray-800 font-mono">metallicss</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">COLOR</p>
                  <p className="text-sm text-gray-800">#c0c0c0 (Silver)</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">ADAPTIVE</p>
                  <p className="text-sm text-gray-800">Size & Radius</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Static Component • pnpm + MetallicCSS
              </p>
              <button className="px-4 py-2 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-800 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Note */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-500 max-w-xs">
        <p className="font-semibold mb-2">MetallicCSS Setup:</p>
        <ul className="space-y-1 text-gray-400 font-mono text-xs">
          <li>$ pnpm add metallicss</li>
          <li>✓ import('metallicss')</li>
          <li>✓ className="metallicss"</li>
          <li>✓ Auto-adapts to element</li>
        </ul>
      </div>
    </div>
  );
}