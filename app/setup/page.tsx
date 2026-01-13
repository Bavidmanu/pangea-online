'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Avatares disponibles (emojis variados - animales, objetos, símbolos)
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

interface Player {
  id: number;
  name: string;
  avatarId: number;
}

export default function SetupPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [usedAvatarIds, setUsedAvatarIds] = useState<Set<number>>(new Set());
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus automático en el input
    inputRef.current?.focus();
  }, [players.length]);

  // Obtener avatar aleatorio que no esté usado
  const getRandomAvatar = () => {
    const availableAvatars = AVATARS.filter(av => !usedAvatarIds.has(av.id));
    if (availableAvatars.length === 0) {
      // Si todos están usados, permitir repetir
      return AVATARS[Math.floor(Math.random() * AVATARS.length)];
    }
    return availableAvatars[Math.floor(Math.random() * availableAvatars.length)];
  };

  // Agregar jugador
  const handleAddPlayer = () => {
    if (currentName.trim() === '') return;
    if (players.length >= 20) {
      alert('Máximo 20 jugadores');
      return;
    }

    const randomAvatar = getRandomAvatar();
    const newPlayer: Player = {
      id: Date.now(),
      name: currentName.trim(),
      avatarId: randomAvatar.id,
    };

    setPlayers([...players, newPlayer]);
    setUsedAvatarIds(new Set([...usedAvatarIds, randomAvatar.id]));
    setCurrentName('');
  };

  // Manejar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  // Remover jugador
  const handleRemovePlayer = (playerId: number) => {
    const player = players.find(p => p.id === playerId);
    if (player) {
      const newUsedIds = new Set(usedAvatarIds);
      newUsedIds.delete(player.avatarId);
      setUsedAvatarIds(newUsedIds);
    }
    setPlayers(players.filter(p => p.id !== playerId));
  };

  // Cambiar avatar
  const handleAvatarChange = (playerId: number, newAvatarId: number) => {
    const player = players.find(p => p.id === playerId);
    if (player) {
      const newUsedIds = new Set(usedAvatarIds);
      newUsedIds.delete(player.avatarId);
      newUsedIds.add(newAvatarId);
      setUsedAvatarIds(newUsedIds);
    }
    
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, avatarId: newAvatarId } : p
    ));
    setEditingPlayerId(null);
  };

  // Continuar
  const handleContinue = () => {
    if (players.length < 2) {
      alert('Necesitas al menos 2 jugadores');
      return;
    }
    sessionStorage.setItem('players', JSON.stringify(players));
    router.push('/deck');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 PANGEA 🎮
          </h1>
          <p className="text-2xl text-pink-200 font-semibold">
            Agrega los jugadores
          </p>
        </div>

        {/* Input para agregar jugador */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border-4 border-pink-400/50 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {players.length === 0 ? '¿Quién juega primero?' : `Jugador ${players.length + 1}`}
          </h2>
          <div className="flex gap-4">
            <input
              ref={inputRef}
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ingresa el nombre..."
              className="flex-1 px-6 py-4 rounded-xl text-2xl font-semibold text-center bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:border-pink-400 focus:outline-none"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-all text-xl"
            >
              Agregar ✓
            </button>
          </div>
          <p className="text-pink-200 text-sm text-center mt-4">
            Presiona Enter para agregar • {players.length}/20 jugadores
          </p>
        </div>

        {/* Lista de jugadores */}
        {players.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Jugadores ({players.length})
            </h3>
            <div className="space-y-3">
              {players.map((player) => {
                const avatar = AVATARS.find(a => a.id === player.avatarId);
                return (
                  <div
                    key={player.id}
                    className="bg-white/20 rounded-xl p-4 flex items-center justify-between hover:bg-white/30 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Avatar clickeable */}
                      <button
                        onClick={() => setEditingPlayerId(editingPlayerId === player.id ? null : player.id)}
                        className={`text-4xl ${avatar?.color} rounded-full p-3 shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                        title="Cambiar avatar"
                      >
                        {avatar?.emoji}
                      </button>
                      <span className="text-white font-bold text-xl">{player.name}</span>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold w-10 h-10 rounded-full transition-all flex items-center justify-center"
                    >
                      ×
                    </button>

                    {/* Selector de avatares */}
                    {editingPlayerId === player.id && (
                      <div className="absolute mt-2 bg-gray-900 rounded-xl p-4 shadow-2xl z-10 max-w-md">
                        <div className="grid grid-cols-6 gap-2">
                          {AVATARS.map((av) => (
                            <button
                              key={av.id}
                              onClick={() => handleAvatarChange(player.id, av.id)}
                              className={`text-3xl p-2 rounded-xl transition-all transform hover:scale-110 ${
                                player.avatarId === av.id
                                  ? `${av.color} ring-4 ring-yellow-400`
                                  : 'bg-white/20 hover:bg-white/30'
                              }`}
                              title={av.name}
                            >
                              {av.emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Botón continuar */}
        {players.length >= 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="text-3xl font-bold py-6 px-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 shadow-2xl hover:shadow-pink-500/50 transition-all transform"
            >
              ¡Continuar! →
            </button>
          </div>
        )}

        {/* Instrucciones */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 text-center">
            📝 Instrucciones
          </h3>
          <ul className="text-pink-200 text-sm space-y-2">
            <li>• Ingresa el nombre de cada jugador y presiona Enter</li>
            <li>• Se asignará un avatar aleatorio automáticamente</li>
            <li>• Click en el avatar para cambiarlo</li>
            <li>• Mínimo 2 jugadores, máximo 20</li>
          </ul>
        </div>
      </div>
    </div>
  );
}