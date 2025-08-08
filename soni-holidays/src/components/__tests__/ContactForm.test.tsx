import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true })) as any);

describe('ContactForm', () => {
  it('validates and submits', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), 'Raj');
    await userEvent.type(screen.getByLabelText(/Email/i), 'raj@example.com');
    await userEvent.type(screen.getByLabelText(/Phone/i), '+91 7892353175');
    await userEvent.type(screen.getByLabelText(/Destination/i), 'Manali');
    await userEvent.type(screen.getByLabelText(/Message/i), 'Plan a trip');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(global.fetch).toHaveBeenCalled();
  });
});