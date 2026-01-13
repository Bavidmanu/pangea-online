'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CardsPage() {
  const router = useRouter();
  const [numCards, setNumCards] = useState<number>(36);
  const [customInput, setCustomInput] = useState<string>('36');
  const [players, setPlayers] = useState<any[]>([]);
  const [deckType, setDeckType] = useState<string>('');
  const [maxCards, setMaxCards] = useState<number>(249);

  useEffect(() => {
    const savedPlayers = sessionStorage.getItem('players');
    const savedDeckType = sessionStorage.getItem('deckType');
    
    if (!savedPlayers || !savedDeckType) {
      router.push('/setup');
      return;
    }
    
    setPlayers(JSON.parse(savedPlayers));
    setDeckType(savedDeckType);
    
    // Establecer máximo de cartas según el mazo
    const max = savedDeckType === 'original' ? 199 : savedDeckType === 'previa' ? 50 : 249;
    setMaxCards(max);
  }, [router]);

  const handleStartGame = () => {
    sessionStorage.setItem('numCards', numCards.toString());
    router.push('/play');
  };

  const handleBack = () => {
    router.push('/deck');
  };

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num >= 9 && num <= maxCards) {
      setNumCards(num);
    }
  };

  // Cantidades recomendadas que forman grids rectangulares más estéticos
  const recommendedOptions = [
    { cards: 20, grid: '4×5', aspect: 'Rectangular' },
    { cards: 24, grid: '4×6', aspect: 'Rectangular' },
    { cards: 30, grid: '5×6', aspect: 'Rectangular' },
    { cards: 36, grid: '6×6', aspect: 'Cuadrado' },
    { cards: 42, grid: '6×7', aspect: 'Rectangular' },
    { cards: 48, grid: '6×8', aspect: 'Rectangular' },
    { cards: 56, grid: '7×8', aspect: 'Rectangular' },
    { cards: 64, grid: '8×8', aspect: 'Cuadrado' },
    { cards: 72, grid: '8×9', aspect: 'Rectangular' },
  ];

  const getDeckName = () => {
    switch(deckType) {
      case 'original': return 'Pangea Original';
      case 'previa': return 'Pangea La Previa';
      case 'remix': return 'Remix';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🎴 ¿CUÁNTAS CARTAS? 🎴
          </h1>
          <p className="text-xl text-pink-200 font-semibold">
            Selecciona la cantidad de cartas para jugar
          </p>
        </div>

        {/* Info de jugadores y mazo */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border-2 border-purple-400/50">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-3 flex-wrap">
              {players.map((player, index) => (
                <div key={index} className="bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-xl">🎮</span>
                  <span className="text-white font-semibold text-sm">{player.name}</span>
                </div>
              ))}
            </div>
            <div className="bg-pink-500/30 rounded-xl px-4 py-2">
              <span className="text-white font-bold">📚 {getDeckName()}</span>
            </div>
          </div>
        </div>

        {/* Cantidades recomendadas */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border-4 border-pink-400/50 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Cantidades Recomendadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recommendedOptions.map((option) => (
              <button
                key={option.cards}
                onClick={() => {
                  setNumCards(option.cards);
                  setCustomInput(option.cards.toString());
                }}
                className={`
                  group relative py-6 px-4 rounded-2xl transition-all transform hover:scale-105
                  ${numCards === option.cards
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500 shadow-2xl scale-105 ring-4 ring-yellow-400'
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                <div className="text-4xl font-bold text-white mb-1">
                  {option.cards}
                </div>
                <div className="text-sm text-pink-100 font-semibold">
                  {option.grid}
                </div>
                <div className="text-xs text-pink-200 mt-1">
                  {option.aspect}
                </div>
                
                {numCards === option.cards && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-sm">✓</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Input personalizado */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-pink-400/30">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            O ingresa una cantidad personalizada
          </h3>
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              min="9"
              max={maxCards}
              value={customInput}
              onChange={(e) => handleCustomInputChange(e.target.value)}
              className="w-32 px-6 py-4 rounded-xl text-3xl font-bold text-center bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:border-pink-400 focus:outline-none"
              placeholder="36"
            />
            <span className="text-2xl text-white font-semibold">cartas</span>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm text-pink-200">
            <span>Mínimo: 9</span>
            <span>•</span>
            <span>Máximo: {maxCards}</span>
          </div>
        </div>

        {/* Info de distribución */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-3 text-center">
            📊 Distribución de colores
          </h3>
          <p className="text-center text-pink-200 text-sm mb-4">
            Las {numCards} cartas se distribuirán proporcionalmente entre los 5 colores
          </p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { name: 'Amarillo', emoji: '💛' },
              { name: 'Azul', emoji: '💙' },
              { name: 'Morado', emoji: '💜' },
              { name: 'Naranja', emoji: '🧡' },
              { name: 'Rosado', emoji: '💗' },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div className="text-3xl mb-1">{color.emoji}</div>
                <div className="text-xs text-pink-200">{color.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className="text-2xl font-bold py-4 px-12 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all transform hover:scale-105"
          >
            ← Volver
          </button>
          <button
            onClick={handleStartGame}
            className="text-3xl font-bold py-4 px-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 shadow-2xl hover:shadow-pink-500/50 transition-all transform"
          >
            ¡Jugar! 🎮
          </button>
        </div>
      </div>
    </div>
  );
}