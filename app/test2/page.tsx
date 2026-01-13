'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Test2Page() {
  // Parámetros del grid
  const [size, setSize] = useState(100); // Tamaño base del hexágono en px
  const [ratio, setRatio] = useState(1.1547); // Ratio altura/ancho
  const [spacing, setSpacing] = useState(2); // Espaciado entre hexágonos en px (reducido)
  const [borderRadius, setBorderRadius] = useState(8); // Border radius en px
  
  // Clip path horizontal y vertical
  const [clipH, setClipH] = useState(28); // Clip horizontal (puntos laterales)
  const [clipV, setClipV] = useState(3); // Clip vertical (puntos superior/inferior)
  
  // Tipo de grid
  const [gridType, setGridType] = useState<'square' | 'rectangle'>('square');
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);

  // Calcular dimensiones
  const hexWidth = size;
  const hexHeight = size * ratio;
  
  // Calcular el overlap vertical (25% de la altura según el artículo)
  const overlapPercent = 0.2886; // 25% aproximadamente
  const marginBottom = spacing - size * overlapPercent;
  
  // Calcular el factor F para el shape-outside
  const factorF = size * 1.732 + 4 * spacing - 1;
  
  // Generar el clip-path
  const clipPath = `polygon(0% ${clipH}%, 0% ${100 - clipH}%, 50% ${100 - clipV}%, 100% ${100 - clipH}%, 100% ${clipH}%, 50% ${clipV}%)`;

  // Generar array de hexágonos
  const totalHexagons = rows * cols;
  const hexagons = Array.from({ length: totalHexagons }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Pangea - Test de Grid Hexagonal
        </h1>

        {/* Panel de controles superior */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tipo de Grid */}
            <div className="space-y-2">
              <label className="text-white font-medium block">Tipo de Grid</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setGridType('square');
                    setRows(9);
                    setCols(9);
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gridType === 'square'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Cuadrado 9×9
                </button>
                <button
                  onClick={() => {
                    setGridType('rectangle');
                    setRows(6);
                    setCols(12);
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gridType === 'rectangle'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Rectangular 6×12
                </button>
              </div>
            </div>

            {/* Filas */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Filas</span>
                <span className="text-pink-400">{rows}</span>
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Columnas */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Columnas</span>
                <span className="text-pink-400">{cols}</span>
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Size (Tamaño base)</span>
                <span className="text-pink-400">{size}px</span>
              </label>
              <input
                type="range"
                min="30"
                max="200"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Ratio */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Ratio (Altura/Ancho)</span>
                <span className="text-pink-400">{ratio.toFixed(4)}</span>
              </label>
              <input
                type="range"
                min="1.0"
                max="1.3"
                step="0.0001"
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Spacing */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Spacing (Espaciado)</span>
                <span className="text-pink-400">{spacing}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Border Radius</span>
                <span className="text-pink-400">{borderRadius}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Clip H */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Clip H (Horizontal)</span>
                <span className="text-pink-400">{clipH}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={clipH}
                onChange={(e) => setClipH(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Clip V */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Clip V (Vertical)</span>
                <span className="text-pink-400">{clipV}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={clipV}
                onChange={(e) => setClipV(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Botón Reset */}
            <div className="space-y-2 flex items-end">
              <button
                onClick={() => {
                  setSize(100);
                  setRatio(1.1547);
                  setSpacing(2);
                  setClipH(28);
                  setClipV(3);
                  setBorderRadius(8);
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Reset Valores
              </button>
            </div>
          </div>

          {/* Info técnica */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Ancho:</span>
                <span className="text-pink-400 ml-2 font-mono">{hexWidth}px</span>
              </div>
              <div>
                <span className="text-gray-400">Alto:</span>
                <span className="text-pink-400 ml-2 font-mono">{hexHeight.toFixed(2)}px</span>
              </div>
              <div>
                <span className="text-gray-400">Margin Bottom:</span>
                <span className="text-pink-400 ml-2 font-mono">{marginBottom.toFixed(2)}px</span>
              </div>
              <div>
                <span className="text-gray-400">Factor F:</span>
                <span className="text-pink-400 ml-2 font-mono">{factorF.toFixed(2)}px</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-400 text-sm">Clip Path:</span>
              <div className="bg-gray-900 p-3 rounded-lg mt-2">
                <code className="text-green-400 text-xs break-all">{clipPath}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de hexágonos */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 overflow-auto">
          <div className="flex justify-center">
            <div
              className="relative"
              style={{
                fontSize: 0, // Elimina espacio en blanco entre inline-block
              }}
            >
              {/* Pseudo-elemento flotante para el offset */}
              <div
                style={{
                  width: `${size / 2 + spacing}px`,
                  float: 'left',
                  height: '120%',
                  background: `repeating-linear-gradient(transparent 0 calc(${factorF}px - 3px), rgba(0,0,0,0.3) 0 ${factorF}px)`,
                  shapeOutside: `repeating-linear-gradient(transparent 0 calc(${factorF}px - 3px), #000 0 ${factorF}px)`,
                }}
              />
              
              {/* Hexágonos */}
              {hexagons.map((index) => (
                <div
                  key={index}
                  style={{
                    width: `${hexWidth}px`,
                    height: `${hexHeight}px`,
                    margin: `${spacing}px`,
                    marginBottom: `${marginBottom}px`,
                    display: 'inline-block',
                    clipPath: clipPath,
                    position: 'relative',
                    borderRadius: `${borderRadius}px`,
                  }}
                  className="bg-pink-400 overflow-hidden"
                >
                  <Image
                    src="/images/cards/card_back.webp"
                    alt={`Hexagon ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            📐 Información del Grid
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
            <div>
              <strong className="text-pink-400">Shape-outside:</strong> Usa un gradiente repetitivo para desplazar las filas pares
            </div>
            <div>
              <strong className="text-pink-400">Float:</strong> El pseudo-elemento flotante crea el patrón escalonado
            </div>
            <div>
              <strong className="text-pink-400">Overlap:</strong> Margin-bottom negativo para que las filas se superpongan
            </div>
            <div>
              <strong className="text-pink-400">Total hexágonos:</strong> {totalHexagons} ({rows} × {cols})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}