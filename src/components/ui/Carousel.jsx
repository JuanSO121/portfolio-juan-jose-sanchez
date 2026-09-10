import { useCallback, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Galería con scroll-snap nativo: las capturas van en fila y la
 * siguiente asoma por el borde, que es la señal de que hay más. El
 * desplazamiento lo hace el navegador, así que hereda gratis el
 * momentum del trackpad, el gesto táctil y el teclado.
 */
const Carousel = ({ images, title, accent }) => {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const n = images.length;

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIdx(best);
  }, []);

  const scrollTo = (i) => {
    const child = trackRef.current?.children[i];
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  if (!n) {
    return (
      <div className="flex aspect-[21/9] items-center justify-center border-b border-line bg-stage p-5">
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-line">
          <p className="text-sm text-faint">Capturas pendientes</p>
        </div>
      </div>
    );
  }

  const single = n === 1;

  return (
    <div className="relative border-b border-line bg-stage">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth p-5"
      >
        {images.map((src, i) => (
          <figure
            key={src}
            className={`aspect-[16/10] shrink-0 snap-center overflow-hidden rounded-lg border border-line bg-bg ${
              single ? 'w-full' : 'w-[88%] sm:w-[64%] lg:w-[46%]'
            }`}
          >
            <img
              src={src}
              alt={`${title}: captura ${i + 1} de ${n}`}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>

      {!single && (
        <div className="flex items-center gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, idx - 1))}
            disabled={idx === 0}
            aria-label="Captura anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-multimedia hover:text-multimedia disabled:opacity-35 disabled:hover:border-line disabled:hover:text-muted"
          >
            <FaChevronLeft size={11} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(Math.min(n - 1, idx + 1))}
            disabled={idx === n - 1}
            aria-label="Captura siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-multimedia hover:text-multimedia disabled:opacity-35 disabled:hover:border-line disabled:hover:text-muted"
          >
            <FaChevronRight size={11} />
          </button>

          <div className="ml-1 flex flex-1 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Ver captura ${i + 1}`}
                aria-current={i === idx}
                className="h-1 flex-1 rounded-full transition-colors duration-300"
                style={{ background: i === idx ? `rgb(${accent})` : 'rgb(var(--line))' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;