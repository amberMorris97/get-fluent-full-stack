import { afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AllPhrasesPage from './AllPhrasesPage';

const renderAllPhrasesPage = (props = {}) => {
    render(
        <MemoryRouter>
            <AllPhrasesPage 
              allPhrases={props.allPhrases ?? []}
            />
        </MemoryRouter>
    );
};

describe('AllPhrasesPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the page title and phrases table', () => {
        renderAllPhrasesPage({ allPhrases: [{ phrase: 'test phrase', translation: 'test translation' }]});

        expect(screen.getByText('All Phrases')).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
    });
});