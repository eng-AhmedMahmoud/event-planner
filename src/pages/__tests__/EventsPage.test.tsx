import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventsPage } from '../EventsPage';
import { EventProvider } from '@/context/EventProvider';
import { MemoryRouter } from 'react-router-dom';

describe('EventsPage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <EventProvider>
          <EventsPage />
        </EventProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Events');
  });
});
