import { motion, useReducedMotion } from 'framer-motion';

/**
 * Revelado por palabras: cada una sube desde detrás de una máscara.
 * Solo se usa en el h1, una vez, al cargar.
 */
const RevealText = ({ text, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

export default RevealText;