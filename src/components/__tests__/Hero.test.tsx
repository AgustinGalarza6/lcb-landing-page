import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';

// Mock matchMedia for window since framer-motion might use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock framer motion to prevent animation issues in jsdom
vi.mock('framer-motion', () => {
  const React = require('react');
  const Dummy = React.forwardRef((props: any, ref: any) => {
    const { children, initial, animate, transition, whileInView, viewport, style, ...rest } = props;
    return React.createElement('div', { ref, ...rest }, children);
  });
  return {
    motion: {
      div: Dummy,
      h1: Dummy,
      p: Dummy,
      span: Dummy,
      section: Dummy
    },
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  };
});

describe('Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />);
    expect(screen.getByText('LA CASA')).toBeInTheDocument();
    expect(screen.getByText('DE LA')).toBeInTheDocument();
    expect(screen.getByText('BENDICIÓN')).toBeInTheDocument();
  });

  it('contains call to action links', () => {
    render(<Hero />);
    expect(screen.getByText(/planificá tu visita/i)).toBeInTheDocument();
    expect(screen.getByText(/ver prédicas/i)).toBeInTheDocument();
  });
});
