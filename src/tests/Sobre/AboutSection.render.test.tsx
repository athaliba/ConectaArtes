// import { render, screen } from '@testing-library/react';
// import AboutSection from '../../components/AboutSection';

// describe('AboutSection component', () => {
//   beforeEach(() => {
//     render(<AboutSection />);
//   });

//   test('renders all card titles', () => {
//     expect(screen.getByText(/tem uma ideia\?/i)).toBeInTheDocument();
//     expect(screen.getByText(/novas ideias chegando/i)).toBeInTheDocument();
//     expect(screen.getByText(/^equipe$/i)).toBeInTheDocument();
//     expect(screen.getByText(/sobre o rankeat/i)).toBeInTheDocument();
//   });

//   test('renders email link', () => {
//     const emailLink = screen.getByRole('link', { name: /sitiogpt@gmail.com/i });
//     expect(emailLink).toBeInTheDocument();
//     expect(emailLink).toHaveAttribute('href', 'mailto:sitiogpt@gmail.com');
//   });

//   test('renders team members names and images', () => {
//     ['Pedro Lima', 'Rafael Athaliba', 'Julia Ierseve', 'Bianca Andrade'].forEach((name) => {
//       expect(screen.getByText(new RegExp(name, 'i'))).toBeInTheDocument();
//     });

//     expect(screen.getByAltText(/pedro lima/i)).toBeInTheDocument();
//     expect(screen.getByAltText(/rafael athaliba/i)).toBeInTheDocument();
//     expect(screen.getByAltText(/julia ierseve/i)).toBeInTheDocument();
//     expect(screen.getByAltText(/bianca andrade/i)).toBeInTheDocument();
//   });

//   test('renders images with correct alt texts', () => {
//     ['Ideias', 'Novas ideias', 'Equipe', 'Sobre o projeto'].forEach((alt) => {
//       const imgs = screen.getAllByAltText(new RegExp(alt, 'i'));
//       expect(imgs.length).toBeGreaterThan(0);
//     });
//   });

//   test('renders project description text', () => {
//     expect(
//       screen.getByText(/o rankeat é um site feito para te ajudar a descobrir os melhores lugares para comer perto de você/i)
//     ).toBeInTheDocument();
//   });
// });
