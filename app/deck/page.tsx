'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type DeckType = 'original' | 'previa' | 'remix';

export default function DeckPage() {
  const router = useRouter();
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const savedPlayers = sessionStorage.getItem('players');
    if (!savedPlayers) {
      router.push('/setup');
      return;
    }
    setPlayers(JSON.parse(savedPlayers));
  }, [router]);

  const handleContinue = () => {
    if (!selectedDeck) return;
    sessionStorage.setItem('deckType', selectedDeck);
    router.push('/cards');
  };

  const handleBack = () => {
    router.push('/setup');
  };

  const decks = [
    {
      id: 'original' as DeckType,
      name: 'Pangea Original',
      description: 'El mazo clásico con 199 cartas',
      emoji: '🎴',
      color: 'from-blue-500 to-purple-500',
      cards: 199,
    },
    {
      id: 'previa' as DeckType,
      name: 'Pangea La Previa',
      description: 'El mazo de la previa con 50 cartas',
      emoji: '🍻',
      color: 'from-pink-500 to-red-500',
      cards: 50,
    },
    {
      id: 'remix' as DeckType,
      name: 'Remix',
      description: '¡Combina ambos mazos! 249 cartas',
      emoji: '🎊',
      color: 'from-yellow-500 to-orange-500',
      cards: 249,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 SELECCIONA TU MAZO 🎮
          </h1>
          <p className="text-2xl text-pink-200 font-semibold">
            ¿Con qué mazo quieres jugar?
          </p>
        </div>

        {/* Resumen de jugadores */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8 border-2 border-purple-400/50">
          <div className="flex justify-center gap-3 flex-wrap">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <span className="text-xl">🎮</span>
                <span className="text-white font-semibold text-sm">{player.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selección de mazos */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {decks.map((deck) => (
            <button
              key={deck.id}
              onClick={() => setSelectedDeck(deck.id)}
              className={`
                group relative p-8 rounded-3xl transition-all transform hover:scale-105
                ${selectedDeck === deck.id
                  ? `bg-gradient-to-br ${deck.color} shadow-2xl scale-105 ring-4 ring-yellow-400`
                  : 'bg-white/20 hover:bg-white/30'
                }
              `}
            >
              {/* Emoji grande */}
              <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">
                {deck.emoji}
              </div>

              {/* Nombre del mazo */}
              <h3 className="text-3xl font-bold text-white mb-3">
                {deck.name}
              </h3>

              {/* Descripción */}
              <p className="text-pink-100 text-lg mb-4">
                {deck.description}
              </p>

              {/* Número de cartas */}
              <div className="bg-black/30 rounded-xl px-4 py-2 inline-block">
                <span className="text-yellow-300 font-bold text-xl">
                  {deck.cards} cartas
                </span>
              </div>

              {/* Indicador de selección */}
              {selectedDeck === deck.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Info de colores */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            🎨 Colores de cartas
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { name: 'Amarillo', color: 'bg-yellow-500', emoji: '💛' },
              { name: 'Azul', color: 'bg-blue-500', emoji: '💙' },
              { name: 'Morado', color: 'bg-purple-500', emoji: '💜' },
              { name: 'Naranja', color: 'bg-orange-500', emoji: '🧡' },
              { name: 'Rosado', color: 'bg-pink-500', emoji: '💗' },
            ].map((color) => (
              <div key={color.name} className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
                <span className="text-2xl">{color.emoji}</span>
                <span className="text-white font-semibold">{color.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-pink-200 mt-4 text-sm">
            Las cartas se distribuyen proporcionalmente por color
          </p>
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
            onClick={handleContinue}
            disabled={!selectedDeck}
            className={`
              text-3xl font-bold py-4 px-16 rounded-2xl transition-all transform
              ${selectedDeck
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 shadow-2xl hover:shadow-pink-500/50'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }
            `}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}