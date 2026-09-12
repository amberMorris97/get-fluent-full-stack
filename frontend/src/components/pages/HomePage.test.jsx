import { afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router';
import generatePhrase from '../../utils/generatePhrase';

vi.mock('../common/Card', () => ({
    default: ({ type, phrase, flipped, onClick }) => (
        <div data-testid="card">Card</div>
    )
}));

const renderHomePage = (props = {}) => 
    render(
        <MemoryRouter>
            <HomePage 
              allPhrases={props.allPhrases ?? []}
              setCurrentPhrase={props.setCurrentPhrase ?? vi.fn()}
              currentPhrase={props.currentPhrase ?? null}
            />
        </MemoryRouter>
    );

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows a loading state if the current phrase is not available', () => {
        renderHomePage({ currentPhrase: null });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the phrase content when current phrase is available', () => {
        const phrase = { phrase: 'test phrase', translation: 'test translation' };
        renderHomePage({ currentPhrase: phrase });
        expect(screen.getByText("Pick up a new phrase everyday")).toBeInTheDocument();
        expect(screen.getByTestId("card")).toBeInTheDocument();
    });
});