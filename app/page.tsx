'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  // Cartas de ejemplo para el parallax (mezcla de colores)
  const sampleCards = [
    { color: 'amarillo', deck: 'Pangea_Original', number: 3, speed: 'slower' },
    { color: 'azul', deck: 'Pangea_Original', number: 1, speed: 'faster' },
    { color: 'morado', deck: 'Pangea_La_Previa', number: 209, speed: 'slower1' },
    { color: 'naranja', deck: 'Pangea_Original', number: 11, speed: 'fastest' },
    { color: 'rosado', deck: 'Pangea_La_Previa', number: 201, speed: 'slower2' },
    { color: 'amarillo', deck: 'Pangea_La_Previa', number: 224, speed: 'faster1' },
    { color: 'azul', deck: 'Pangea_Original', number: 4, speed: 'vertical' },
    { color: 'morado', deck: 'Pangea_Original', number: 6, speed: 'slower-down' },
    { color: 'naranja', deck: 'Pangea_La_Previa', number: 216, speed: 'faster' },
    { color: 'rosado', deck: 'Pangea_Original', number: 2, speed: 'slower' },
    { color: 'amarillo', deck: 'Pangea_Original', number: 7, speed: 'fastest' },
    { color: 'azul', deck: 'Pangea_La_Previa', number: 238, speed: 'last' },
  ];

  return (
    <div className="parallax-external">
      {/* Scroll container horizontal */}
      <div className="parallax-horizontal-scroll">
        {sampleCards.map((card, index) => (
          <div key={index} className={`parallax-img-wrapper ${card.speed}`}>
            <div className="parallax-card-link">
              <Image
                src={`/images/cards/${card.color}/${card.deck}/Thumb/card_${card.number}_thumb.webp`}
                alt={`${card.color} card`}
                width={400}
                height={462}
                className="parallax-card-image"
                priority={index < 4}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Título y botón de inicio */}
      <div className="parallax-content">
        <div className="parallax-title-wrapper">
          <h1 className="parallax-main-title">PANGEA</h1>
          <p className="parallax-subtitle">El juego de cartas hexagonales</p>
          <button
            onClick={() => router.push('/setup')}
            className="parallax-start-button"
          >
            ¡Comenzar a Jugar! 🎮
          </button>
        </div>
        <p className="parallax-scroll-info">Scroll →</p>
      </div>

      <style jsx global>{`
        /* Reset y estilos globales para parallax */
        .parallax-external {
          overflow: hidden;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .parallax-horizontal-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100vh;
          transform: rotate(-90deg) translate3d(0, -100vh, 0);
          transform-origin: right top;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          height: 100vw;
          perspective: 1px;
          transform-style: preserve-3d;
          padding-bottom: 10rem;
        }

        /* Ocultar scrollbar */
        .parallax-horizontal-scroll::-webkit-scrollbar {
          width: 1px;
          height: 1px;
        }

        /* Contenedores de imágenes */
        .parallax-img-wrapper {
          transform: rotate(90deg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          transform-origin: 50% 50%;
          transform: rotate(90deg) translateZ(.1px) scale(0.9) translateX(0px) translateY(-3vh);
          transition: 1s;
        }

        .parallax-img-wrapper:hover {
          min-height: 65vh;
          transform: rotate(90deg) translateZ(.1px) scale(1.0) translateX(0px) translateY(-3vh);
        }

        /* Clases de velocidad para parallax */
        .slower {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(0%) translateY(-10vh);
        }

        .slower1 {
          transform: rotate(90deg) translateZ(-.25px) scale(1.05) translateX(0%) translateY(8vh);
        }

        .slower2 {
          transform: rotate(90deg) translateZ(-.3px) scale(1.3) translateX(0%) translateY(2vh);
        }

        .slower-down {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(0%) translateY(16vh);
        }

        .faster {
          transform: rotate(90deg) translateZ(.15px) scale(0.8) translateX(0%) translateY(14vh);
        }

        .faster1 {
          transform: rotate(90deg) translateZ(.05px) scale(0.8) translateX(0%) translateY(10vh);
        }

        .fastest {
          transform: rotate(90deg) translateZ(.22px) scale(0.7) translateX(-10vh) translateY(-15vh);
        }

        .vertical {
          transform: rotate(90deg) translateZ(-.15px) scale(1.15) translateX(0%) translateY(0%);
        }

        .last {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(25vh) translateY(-8vh);
        }

        /* Estilos de cartas */
        .parallax-card-link {
          overflow: hidden;
          display: block;
          padding: 4px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(10px);
          box-shadow: 0px 12px 50px rgba(0, 0, 0, 0.4);
          border-radius: 24px;
          clip-path: polygon(0% 28%, 0% 72%, 50% 97%, 100% 72%, 100% 28%, 50% 3%);
          transition: 0.5s;
        }

        .parallax-card-link:hover {
          transform: scale(1.05);
          box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.6);
        }

        .parallax-card-image {
          max-width: 45vh;
          max-height: 50vh;
          transition: .5s;
          vertical-align: top;
          border-radius: 20px;
          clip-path: polygon(0% 28%, 0% 72%, 50% 97%, 100% 72%, 100% 28%, 50% 3%);
        }

        /* Contenido superpuesto */
        .parallax-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 10;
        }

        .parallax-title-wrapper {
          text-align: center;
          pointer-events: auto;
        }

        .parallax-main-title {
          font-family: 'Merriweather', serif;
          font-size: 8rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          margin: 0;
          letter-spacing: 0.1em;
          animation: float 3s ease-in-out infinite;
        }

        .parallax-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 1rem 0 2rem 0;
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        .parallax-start-button {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          padding: 1.5rem 3rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(245, 87, 108, 0.4);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .parallax-start-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(245, 87, 108, 0.6);
        }

        .parallax-start-button:active {
          transform: translateY(-2px);
        }

        .parallax-scroll-info {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Raleway', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: white;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          opacity: 0.7;
          animation: bounce-horizontal 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateY(-50%) translateX(0px);
          }
          50% {
            transform: translateY(-50%) translateX(10px);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .parallax-main-title {
            font-size: 4rem;
          }

          .parallax-subtitle {
            font-size: 1rem;
          }

          .parallax-start-button {
            font-size: 1.2rem;
            padding: 1rem 2rem;
          }

          .parallax-scroll-info {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}