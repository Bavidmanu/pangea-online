// Configuración de todas las cartas disponibles por color y mazo

export const CARDS_CONFIG = {
  amarillo: {
    Pangea_La_Previa: [224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237],
    Pangea_Original: [3, 7, 10, 16, 19, 21, 22, 35, 36, 42, 44, 45, 55, 57, 72, 73, 75, 87, 92, 94, 95, 96, 102, 106, 109, 114, 124, 125, 126, 127, 132, 140, 144, 150, 153, 154, 157, 159, 160, 161, 166, 173, 183, 185, 190, 193, 195],
  },
  azul: {
    Pangea_La_Previa: [238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
    Pangea_Original: [1, 4, 14, 17, 20, 25, 26, 27, 28, 29, 30, 31, 32, 33, 39, 41, 47, 51, 54, 56, 58, 61, 62, 63, 64, 66, 68, 69, 71, 74, 83, 89, 90, 101, 104, 107, 108, 111, 112, 113, 115, 116, 118, 130, 136, 138, 139, 141, 147, 148, 156, 163, 165, 167, 168, 172, 177, 184, 196, 198],
  },
  morado: {
    Pangea_La_Previa: [209, 210, 211, 212, 213, 214, 215],
    Pangea_Original: [6, 8, 12, 13, 15, 49, 53, 59, 60, 65, 70, 76, 78, 82, 84, 117, 119, 121, 123, 128, 129, 131, 134, 143, 149, 151, 158, 169, 174, 178, 181, 187],
  },
  naranja: {
    Pangea_La_Previa: [216, 217, 218, 219, 220, 221, 222, 223],
    Pangea_Original: [11, 18, 38, 40, 43, 46, 50, 52, 67, 77, 80, 81, 86, 88, 93, 98, 99, 100, 103, 110, 120, 122, 135, 146, 170, 171, 176, 179, 182, 186, 188, 189, 194],
  },
  rosado: {
    Pangea_La_Previa: [201, 202, 203, 204, 205, 206, 207, 208],
    Pangea_Original: [2, 5, 9, 23, 24, 34, 37, 48, 79, 85, 91, 97, 105, 133, 137, 142, 145, 152, 155, 162, 164, 175, 180, 191, 192, 197, 199],
  },
};

export type ColorType = keyof typeof CARDS_CONFIG;
export type DeckType = 'Pangea_Original' | 'Pangea_La_Previa';

// Proporciones por color según el mazo
export const COLOR_PROPORTIONS = {
  Pangea_La_Previa: {
    amarillo: 0.28,
    azul: 0.26,
    morado: 0.14,
    naranja: 0.16,
    rosado: 0.16,
  },
  Pangea_Original: {
    amarillo: 0.2362,
    azul: 0.3015,
    morado: 0.1608,
    naranja: 0.1658,
    rosado: 0.1357,
  },
};

export interface Card {
  id: string;
  color: ColorType;
  deck: DeckType;
  cardNumber: number;
  flipped: boolean;
}

// Función para seleccionar cartas aleatoriamente respetando proporciones
export function selectRandomCards(totalCards: number, deckType: 'original' | 'previa' | 'remix'): Card[] {
  const selectedCards: Card[] = [];
  const usedCards = new Set<string>();

  // Determinar qué mazos usar
  const decksToUse: DeckType[] = 
    deckType === 'remix' 
      ? ['Pangea_Original', 'Pangea_La_Previa']
      : deckType === 'original'
      ? ['Pangea_Original']
      : ['Pangea_La_Previa'];

  // Calcular proporción promedio si es remix
  const getColorProportion = (color: ColorType): number => {
    if (deckType === 'remix') {
      return (COLOR_PROPORTIONS.Pangea_Original[color] + COLOR_PROPORTIONS.Pangea_La_Previa[color]) / 2;
    }
    return deckType === 'original' 
      ? COLOR_PROPORTIONS.Pangea_Original[color]
      : COLOR_PROPORTIONS.Pangea_La_Previa[color];
  };

  // Calcular cuántas cartas de cada color
  const colors: ColorType[] = ['amarillo', 'azul', 'morado', 'naranja', 'rosado'];
  const cardsPerColor: Record<ColorType, number> = {} as any;
  
  let remaining = totalCards;
  colors.forEach((color, index) => {
    if (index === colors.length - 1) {
      // Última color: asignar todas las cartas restantes
      cardsPerColor[color] = remaining;
    } else {
      const proportion = getColorProportion(color);
      const count = Math.round(totalCards * proportion);
      cardsPerColor[color] = count;
      remaining -= count;
    }
  });

  // Seleccionar cartas aleatorias de cada color
  colors.forEach(color => {
    const neededCards = cardsPerColor[color];
    let selectedForColor = 0;

    // Mezclar mazos aleatoriamente si es remix
    const shuffledDecks = [...decksToUse].sort(() => Math.random() - 0.5);

    for (const deck of shuffledDecks) {
      if (selectedForColor >= neededCards) break;

      const availableCards = [...CARDS_CONFIG[color][deck]];
      // Mezclar cartas disponibles
      availableCards.sort(() => Math.random() - 0.5);

      for (const cardNumber of availableCards) {
        if (selectedForColor >= neededCards) break;

        const cardId = `${color}-${deck}-${cardNumber}`;
        if (!usedCards.has(cardId)) {
          selectedCards.push({
            id: cardId,
            color,
            deck,
            cardNumber,
            flipped: false,
          });
          usedCards.add(cardId);
          selectedForColor++;
        }
      }
    }
  });

  // Mezclar todas las cartas seleccionadas
  return selectedCards.sort(() => Math.random() - 0.5);
}