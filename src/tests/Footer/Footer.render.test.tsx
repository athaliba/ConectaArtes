import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer component', () => {
  test('renderiza todos os desenvolvedores com seus links e imagens', () => {
    render(<Footer />);

    const devs = [
      { name: 'Bianca Andrade', github: 'https://github.com/biaag10' },
      { name: 'Julia Ierseve', github: 'https://github.com/juliaiervese' },
      { name: 'Pedro Lima', github: 'https://github.com/PPedrinho' },
      { name: 'Rafael Althabia', github: 'https://github.com/athaliba' },
    ];

    devs.forEach(({ name, github }) => {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', github);

      const img = screen.getByAltText(new RegExp(name, 'i'));
      expect(img).toBeInTheDocument();
    });
  });
});
