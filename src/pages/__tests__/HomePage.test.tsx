import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from '../HomePage';

describe('HomePage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to Event Planner')).toBeInTheDocument();
    expect(screen.getByText('View Events')).toBeInTheDocument();
    expect(screen.getByText('Create New Event')).toBeInTheDocument();
  });

  it('navigates to events page on button click', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const viewEventsButton = screen.getByText('View Events');
    fireEvent.click(viewEventsButton);

    expect(container.innerHTML).toMatch('View Events');
  });

  it('navigates to add event page on button click', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const createEventButton = screen.getByText('Create New Event');
    fireEvent.click(createEventButton);

    expect(container.innerHTML).toMatch('Create New Event');
  });
});
