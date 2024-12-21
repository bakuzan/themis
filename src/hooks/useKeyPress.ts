import { useEffect, useRef } from 'react';

export default function useKeyPress(
  keys: string | string[],
  handler: (ev: KeyboardEvent) => void
) {
  const eventListenerRef = useRef<(ev: KeyboardEvent) => void | null>(null);

  useEffect(() => {
    eventListenerRef.current = (event) => {
      const eventKey = event.key;
      if (Array.isArray(keys) ? keys.includes(eventKey) : keys === eventKey) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) =>
      eventListenerRef.current ? eventListenerRef.current(event) : null;

    window.addEventListener('keydown', eventListener);
    return () => window.removeEventListener('keydown', eventListener);
  }, []);
}
