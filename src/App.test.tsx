import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// @ts-ignore
global.fetch = vi.fn();

describe('SpaceX Launches App', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="portal"></div>';
    vi.clearAllMocks();
  });

  it('отображает заголовок и список после загрузки', async () => {
    const mockLaunches = [
      {
        flight_number: 1,
        mission_name: 'Falcon Sat',
        rocket: { rocket_name: 'Falcon 1' },
        links: { mission_patch_small: null, mission_patch: null },
        details: 'Some details',
        launch_date_unix: 12345,
      },
    ];

    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockLaunches),
    });

    render(<App />);

   
    expect(screen.getByText(/SpaseX Launches 2020/i)).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByText('Falcon Sat')).toBeInTheDocument();
    });
  });

  it('открывает модальное окно при клике на кнопку', async () => {
    const mockLaunches = [
      {
        flight_number: 1,
        mission_name: 'Falcon Sat',
        rocket: { rocket_name: 'Falcon 1' },
        links: { mission_patch_small: null, mission_patch: null },
        details: 'Some details',
        launch_date_unix: 12345,
      },
    ];

    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockLaunches),
    });

    render(<App />);

    const button = await screen.findByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Some details')).toBeInTheDocument();
    });
  });
  it('закрывает модальное окно при клике на оверлей', async () => {
    const mockLaunches = [
      {
        flight_number: 1,
        mission_name: 'Falcon Sat',
        rocket: { rocket_name: 'Falcon 1' },
        links: { mission_patch_small: null, mission_patch: null },
        details: 'Some details',
        launch_date_unix: 12345,
      },
    ];

    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockLaunches),
    });

    render(<App />);
    const button = await screen.findByRole('button');
    fireEvent.click(button);

    const overlay = await screen.findByRole('overlay');

    fireEvent.click(overlay);

    await waitFor(() => {
      expect(screen.queryByText('Some details')).not.toBeInTheDocument();
    });
  });
});
