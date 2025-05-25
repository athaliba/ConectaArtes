import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

Object.defineProperty(window, 'location', {
  configurable: true,
  value: {
    ...window.location,
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  },
});

const originalConsoleError = console.error;

console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Not implemented: navigation (except hash changes)')
  ) {
    // Suprime esse erro específico e não exibe no console
    return;
  }
  // Para todos os outros erros, mantém o comportamento normal
  originalConsoleError(...args);
};
