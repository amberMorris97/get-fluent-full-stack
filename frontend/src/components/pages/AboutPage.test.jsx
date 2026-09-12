import { afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AboutPage from './AboutPage';

const renderAboutPage = () => {
    render(
        <MemoryRouter>
            <AboutPage />
        </MemoryRouter>
    );
};

describe('AboutPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the title and about paragraph', () => {
        renderAboutPage();
        expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument();
        expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });
});