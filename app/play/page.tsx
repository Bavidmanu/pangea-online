'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { selectRandomCards, Card } from '@/lib/cardsConfig';

// Avatares (mismos del setup)
const AVATARS = [
  { id: 1, emoji: '🦁', name: 'León', color: 'bg-yellow-500' },
  { id: 2, emoji: '🐻', name: 'Oso', color: 'bg-amber-600' },
  { id: 3, emoji: '🐼', name: 'Panda', color: 'bg-slate-700' },
  { id: 4, emoji: '🦊', name: 'Zorro', color: 'bg-orange-500' },
  { id: 5, emoji: '🐯', name: 'Tigre', color: 'bg-orange-600' },
  { id: 6, emoji: '🐸', name: 'Rana', color: 'bg-green-500' },
  { id: 7, emoji: '🐨', name: 'Koala', color: 'bg-gray-500' },
  { id: 8, emoji: '🚗', name: 'Carro', color: 'bg-red-500' },
  { id: 9, emoji: '🗼', name: 'Torre', color: 'bg-indigo-500' },
  { id: 10, emoji: '⛵', name: 'Barco', color: 'bg-blue-400' },
  { id: 11, emoji: '✈️', name: 'Avión', color: 'bg-sky-500' },
  { id: 12, emoji: '🎩', name: 'Sombrero', color: 'bg-purple-600' },
  { id: 13, emoji: '👑', name: 'Corona', color: 'bg-yellow-400' },
  { id: 14, emoji: '⚓', name: 'Ancla', color: 'bg-slate-600' },
  { id: 15, emoji: '🎸', name: 'Guitarra', color: 'bg-red-600' },
  { id: 16, emoji: '🎭', name: 'Máscara', color: 'bg-pink-600' },
  { id: 17, emoji: '🏆', name: 'Trofeo', color: 'bg-amber-500' },
  { id: 18, emoji: '💎', name: 'Diamante', color: 'bg-cyan-400' },
  { id: 19, emoji: '🔥', name: 'Fuego', color: 'bg-orange-600' },
  { id: 20, emoji: '⭐', name: 'Estrella', color: 'bg-yellow-300' },
  { id: 21, emoji: '🌙', name: 'Luna', color: 'bg-indigo-400' },
  { id: 22, emoji: '☀️', name: 'Sol', color: 'bg-yellow-500' },
  { id: 23, emoji: '🎲', name: 'Dado', color: 'bg-gray-600' },
  { id: 24, emoji: '🎯', name: 'Diana', color: 'bg-red-500' },
];

export default function PlayPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [cardSize, setCardSize] = useState(100); // Tamaño de las cartas en px
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  useEffect(() => {
    const savedPlayers = sessionStorage.getItem('players');
    const savedNumCards = sessionStorage.getItem('numCards');
    const savedDeckType = sessionStorage.getItem('deckType');

    if (!savedPlayers || !savedNumCards || !savedDeckType) {
      router.push('/setup');
      return;
    }

    setPlayers(JSON.parse(savedPlayers));
    const numCards = Number(savedNumCards);
    const deckType = savedDeckType as 'original' | 'previa' | 'remix';
    
    // Generar cartas aleatorias
    const selectedCards = selectRandomCards(numCards, deckType);
    setCards(selectedCards);
  }, [router]);

  const handleCardClick = (card: Card) => {
    if (flippedCards.has(card.id)) {
      // Si ya está volteada, mostrar en grande
      setSelectedCard(card);
    } else {
      // Voltear la carta
      setFlippedCards(new Set([...flippedCards, card.id]));
      
      // Pasar al siguiente jugador después de la animación
      setTimeout(() => {
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      }, 600);
    }
  };

  const getCardImagePath = (card: Card, size: 'Thumb' | 'Large') => {
    return `/images/cards/${card.color}/${card.deck}/${size}/card_${card.cardNumber}_${size.toLowerCase()}.webp`;
  };

  const increaseSize = () => {
    setCardSize(prev => Math.min(prev + 10, 200));
  };

  const decreaseSize = () => {
    setCardSize(prev => Math.max(prev - 10, 50));
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      alert('Necesitas al menos 2 jugadores');
      return;
    }
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    sessionStorage.setItem('players', JSON.stringify(newPlayers));
    
    // Ajustar índice del jugador actual si es necesario
    if (currentPlayerIndex >= newPlayers.length) {
      setCurrentPlayerIndex(0);
    }
  };

  const handleAddPlayer = (name: string) => {
    if (players.length >= 20) {
      alert('Máximo 20 jugadores');
      return;
    }
    const newPlayer = {
      id: Date.now(),
      name: name,
      avatarId: Math.floor(Math.random() * 24) + 1,
    };
    const newPlayers = [...players, newPlayer];
    setPlayers(newPlayers);
    sessionStorage.setItem('players', JSON.stringify(newPlayers));
  };

  const handleRandomCard = () => {
    // Obtener cartas no volteadas
    const unflippedCards = cards.filter(card => !flippedCards.has(card.id));
    
    if (unflippedCards.length === 0) {
      alert('¡Todas las cartas ya han sido volteadas!');
      return;
    }

    // Seleccionar una carta aleatoria
    const randomCard = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
    
    // Voltearla
    setFlippedCards(new Set([...flippedCards, randomCard.id]));
    
    // Pasar al siguiente jugador después de la animación
    setTimeout(() => {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    }, 600);
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-[1920px] mx-auto">
        {/* Header del juego */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border-2 border-pink-400/50">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Info del juego */}
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-white">🎮 PANGEA</h1>
              <div className="text-pink-300 font-semibold">
                {flippedCards.size} / {cards.length} cartas
              </div>
            </div>

            {/* Turno actual */}
            {currentPlayer && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl px-6 py-3 flex items-center gap-3 animate-pulse">
                <span className="text-3xl">
                  {AVATARS.find(av => av.id === currentPlayer.avatarId)?.emoji || '🎮'}
                </span>
                <div>
                  <div className="text-xs text-pink-100">Turno de</div>
                  <div className="text-xl font-bold text-white">{currentPlayer.name}</div>
                </div>
              </div>
            )}

            {/* Jugadores con opciones */}
            <div className="flex gap-2 flex-wrap items-center">
              {players.map((player, index) => {
                const avatar = AVATARS.find(av => av.id === player.avatarId);
                return (
                  <div
                    key={index}
                    className={`rounded-xl px-4 py-2 flex items-center gap-2 transition-all group relative ${
                      index === currentPlayerIndex
                        ? 'bg-pink-500 ring-2 ring-yellow-400 scale-105'
                        : 'bg-white/20'
                    }`}
                  >
                    <span className="text-xl">{avatar?.emoji || '🎮'}</span>
                    <span className="text-white font-semibold text-sm">{player.name}</span>
                    
                    {/* Botón eliminar (solo visible en hover) */}
                    {players.length > 2 && (
                      <button
                        onClick={() => handleRemovePlayer(index)}
                        className="opacity-0 group-hover:opacity-100 ml-2 bg-red-500 hover:bg-red-600 text-white font-bold w-6 h-6 rounded-full transition-all text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
              
              {/* Botón agregar jugador */}
              {players.length < 20 && (
                <button
                  onClick={() => setShowPlayerModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold w-10 h-10 rounded-full transition-all flex items-center justify-center text-2xl"
                  title="Agregar jugador"
                >
                  +
                </button>
              )}
            </div>

            {/* Botón volver */}
            <button
              onClick={() => router.push('/cards')}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-xl transition-all"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Controles de tamaño */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border-2 border-pink-400/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">Tamaño:</span>
            <button
              onClick={decreaseSize}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold w-10 h-10 rounded-lg transition-all flex items-center justify-center text-2xl"
            >
              −
            </button>
            <span className="text-pink-300 font-mono font-bold min-w-[60px] text-center">
              {cardSize}px
            </span>
            <button
              onClick={increaseSize}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold w-10 h-10 rounded-lg transition-all flex items-center justify-center text-2xl"
            >
              +
            </button>
          </div>

          {/* Botón carta aleatoria */}
          <button
            onClick={handleRandomCard}
            disabled={flippedCards.size === cards.length}
            className={`flex items-center gap-2 font-bold py-3 px-6 rounded-xl transition-all ${
              flippedCards.size === cards.length
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:scale-105 shadow-lg hover:shadow-yellow-500/50'
            }`}
          >
            🎲 Carta Aleatoria
          </button>
        </div>

        {/* Grid de hexágonos */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 overflow-auto">
          <div className="hexagon-main" style={{ '--s': `${cardSize}px` } as React.CSSProperties}>
            <div className="hexagon-container">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`hexagon-item ${flippedCards.has(card.id) ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(card)}
                >
                  {/* Cara frontal (card_back) */}
                  <div className="hexagon-face hexagon-front">
                    <Image
                      src="/images/cards/card_back.webp"
                      alt="Card back"
                      fill
                      className="hexagon-image"
                      priority
                    />
                  </div>
                  
                  {/* Cara trasera (carta real) */}
                  <div className="hexagon-face hexagon-back">
                    <Image
                      src={getCardImagePath(card, 'Thumb')}
                      alt={`Card ${card.id}`}
                      fill
                      className="hexagon-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de carta en grande */}
        {selectedCard && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div 
              className="relative w-[90vw] h-[90vh] max-w-[1400px] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute -top-6 -right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold z-10 shadow-2xl"
              >
                ×
              </button>
              <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-3xl">
                <Image
                  src={getCardImagePath(selectedCard, 'Large')}
                  alt={`Card ${selectedCard.id}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 inline-block">
                  <span className="text-white text-xl font-semibold capitalize">
                    {selectedCard.color} • {selectedCard.deck.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para agregar jugador */}
      {showPlayerModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPlayerModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Agregar Jugador
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('playerName') as string;
                if (name.trim()) {
                  handleAddPlayer(name.trim());
                  setShowPlayerModal(false);
                }
              }}
            >
              <input
                type="text"
                name="playerName"
                placeholder="Nombre del jugador"
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-xl font-semibold text-center bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:border-pink-400 focus:outline-none mb-4"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPlayerModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}