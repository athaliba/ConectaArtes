import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../../components/Footer';

describe('Footer interaction tests', () => {
  test('os links dos desenvolvedores são clicáveis e possuem href correto', async () => {
    render(<Footer />);

    const devs = [
      { name: 'Bianca Andrade', github: 'https://github.com/biaag10' },
      { name: 'Julia Ierseve', github: 'https://github.com/juliaiervese' },
      { name: 'Pedro Lima', github: 'https://github.com/PPedrinho' },
      { name: 'Rafael Althabia', github: 'https://github.com/athaliba' },
    ];

    for (const { name, github } of devs) {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', github);

      // Simula o clique no link
      await userEvent.click(link);

      // Não podemos testar navegação real, mas garantimos que o link existe e é clicável
    }
  });
});
