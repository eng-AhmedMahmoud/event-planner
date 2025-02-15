import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { EditEventPage } from '../EditEventPage';
import { useEvents } from '@/hooks/useEvents';

vi.mock('@/hooks/useEvents');

describe('EditEventPage', () => {
  const mockEvent = { id: '1', name: 'Test Event' };

  beforeEach(() => {
    (useEvents as Mock).mockReturnValue({
      state: { events: [mockEvent] },
    });
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/edit-event/1']}>
        <Routes>
          <Route path="/edit-event/:id" element={<EditEventPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Edit Event')).toBeInTheDocument();
  });

  it('redirects if event not found', () => {
    (useEvents as Mock).mockReturnValue({
      state: { events: [] },
    });

    render(
      <MemoryRouter initialEntries={['/edit-event/1']}>
        <Routes>
          <Route path="/edit-event/:id" element={<EditEventPage />} />
          <Route path="/events" element={<div>Redirected to Events</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Redirected to Events')).toBeInTheDocument();
  });
});
