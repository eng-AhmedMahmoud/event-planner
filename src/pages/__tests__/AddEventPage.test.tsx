import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AddEventPage } from '../AddEventPage';
import { MemoryRouter } from 'react-router-dom';
import { EventProvider } from '../../context/EventProvider';

describe('AddEventPage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <EventProvider>
          <AddEventPage />
        </EventProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Create New Event')).toBeInTheDocument();
  });
});
