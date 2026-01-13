'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TestPage() {
  // Los 6 puntos del hexágono: polygon(x1 y1, x2 y2, x3 y3, x4 y4, x5 y5, x6 y6)
  // Punto 1: Izquierda superior (0%, y%)
  const [p1y, setP1y] = useState(25);
  
  // Punto 2: Izquierda inferior (0%, y%)
  const [p2y, setP2y] = useState(75);
  
  // Punto 3: Inferior centro (50%, y%)
  const [p3y, setP3y] = useState(100);
  
  // Punto 4: Derecha inferior (100%, y%)
  const [p4y, setP4y] = useState(75);
  
  // Punto 5: Derecha superior (100%, y%)
  const [p5y, setP5y] = useState(25);
  
  // Punto 6: Superior centro (50%, y%)
  const [p6y, setP6y] = useState(0);
  
  // Tamaño del hexágono para la prueba
  const [hexSize, setHexSize] = useState(300);
  
  // Border radius
  const [borderRadius, setBorderRadius] = useState(8);

  // Generar el clip-path con los 6 puntos
  const clipPath = `polygon(0% ${p1y}%, 0% ${p2y}%, 50% ${p3y}%, 100% ${p4y}%, 100% ${p5y}%, 50% ${p6y}%)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Pangea - Test de Recorte Hexagonal
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de visualización */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex items-center justify-center min-h-[600px]">
            <div className="relative">
              <div
                style={{
                  width: `${hexSize}px`,
                  height: `${hexSize * 1.1547}px`,
                  clipPath: clipPath,
                  position: 'relative',
                  borderRadius: `${borderRadius}px`,
                }}
                className="bg-pink-400 shadow-2xl overflow-hidden"
              >
                <Image
                  src="/images/cartas/card_back.webp"
                  alt="Card Back"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Indicadores de puntos (visual guide) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full">
                  {/* Labels de los puntos */}
                  <span className="absolute left-0 text-xs text-pink-400 font-mono" style={{top: `${p1y}%`, transform: 'translate(-120%, -50%)'}}>P1</span>
                  <span className="absolute left-0 text-xs text-pink-400 font-mono" style={{top: `${p2y}%`, transform: 'translate(-120%, -50%)'}}>P2</span>
                  <span className="absolute left-1/2 text-xs text-pink-400 font-mono" style={{top: `${p3y}%`, transform: 'translate(-50%, 120%)'}}>P3</span>
                  <span className="absolute right-0 text-xs text-pink-400 font-mono" style={{top: `${p4y}%`, transform: 'translate(120%, -50%)'}}>P4</span>
                  <span className="absolute right-0 text-xs text-pink-400 font-mono" style={{top: `${p5y}%`, transform: 'translate(120%, -50%)'}}>P5</span>
                  <span className="absolute left-1/2 text-xs text-pink-400 font-mono" style={{top: `${p6y}%`, transform: 'translate(-50%, -120%)'}}>P6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de controles */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 space-y-4 overflow-y-auto max-h-[800px]">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Controles de Recorte - 6 Puntos
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Ajusta los 6 vértices del hexágono para obtener el recorte perfecto
              </p>
            </div>

            {/* Tamaño del hexágono */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>Tamaño del Hexágono</span>
                <span className="text-pink-400">{hexSize}px</span>
              </label>
              <input
                type="range"
                min="150"
                max="500"
                value={hexSize}
                onChange={(e) => setHexSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            <div className="h-px bg-gray-700 my-6" />

            {/* Punto 1: Izquierda Superior */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P1: Izquierda Superior (0%, Y)</span>
                <span className="text-pink-400">{p1y}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={p1y}
                onChange={(e) => setP1y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Punto 2: Izquierda Inferior */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P2: Izquierda Inferior (0%, Y)</span>
                <span className="text-pink-400">{p2y}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={p2y}
                onChange={(e) => setP2y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Punto 3: Inferior Centro */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P3: Inferior Centro (50%, Y)</span>
                <span className="text-pink-400">{p3y}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={p3y}
                onChange={(e) => setP3y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Punto 4: Derecha Inferior */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P4: Derecha Inferior (100%, Y)</span>
                <span className="text-pink-400">{p4y}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={p4y}
                onChange={(e) => setP4y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Punto 5: Derecha Superior */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P5: Derecha Superior (100%, Y)</span>
                <span className="text-pink-400">{p5y}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={p5y}
                onChange={(e) => setP5y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Punto 6: Superior Centro */}
            <div className="space-y-2">
              <label className="text-white font-medium flex justify-between">
                <span>P6: Superior Centro (50%, Y)</span>
                <span className="text-pink-400">{p6y}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={p6y}
                onChange={(e) => setP6y(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            <div className="h-px bg-gray-700 my-6" />

            {/* Código CSS generado */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Código CSS generado:
              </label>
              <div className="bg-gray-900 p-4 rounded-lg">
                <code className="text-green-400 text-xs break-all">
                  clip-path: {clipPath};
                </code>
              </div>
            </div>

            {/* Valores numéricos */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Valores actuales:
              </label>
              <div className="bg-gray-900 p-4 rounded-lg text-xs font-mono text-gray-300 space-y-1">
                <div>P1: (0%, {p1y}%)</div>
                <div>P2: (0%, {p2y}%)</div>
                <div>P3: (50%, {p3y}%)</div>
                <div>P4: (100%, {p4y}%)</div>
                <div>P5: (100%, {p5y}%)</div>
                <div>P6: (50%, {p6y}%)</div>
              </div>
            </div>

            {/* Botón de reset */}
            <button
              onClick={() => {
                setP1y(25);
                setP2y(75);
                setP3y(100);
                setP4y(75);
                setP5y(25);
                setP6y(0);
                setHexSize(300);
              }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Resetear a Hexágono Perfecto
            </button>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            📝 Estructura del Hexágono
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>
              • Un hexágono perfecto tiene 6 vértices definidos por <span className="text-pink-400 font-mono">polygon()</span>
            </li>
            <li>
              • P1 y P2 controlan el lado izquierdo, P4 y P5 el lado derecho
            </li>
            <li>
              • P3 controla la punta inferior y P6 la punta superior
            </li>
            <li>
              • Valores por defecto: <span className="text-pink-400 font-mono">polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)</span>
            </li>
            <li>
              • El ratio de altura es <span className="text-pink-400 font-mono">1.1547</span> (altura = ancho × 1.1547)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}