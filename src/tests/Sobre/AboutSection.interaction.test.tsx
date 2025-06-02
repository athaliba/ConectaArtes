// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import AboutSection from '../../components/AboutSection';

// describe('AboutSection clickable elements', () => {
//   beforeEach(() => {
//     render(<AboutSection />);
//   });

//   test('email link is clickable and has correct href', async () => {
//     const emailLink = screen.getByRole('link', { name: /sitiogpt@gmail.com/i });
//     expect(emailLink).toBeInTheDocument();
//     expect(emailLink).toHaveAttribute('href', 'mailto:sitiogpt@gmail.com');

//     // Simula o clique (não tem efeito direto, mas garante que o link é clicável)
//     await userEvent.click(emailLink);
//   });
// });
