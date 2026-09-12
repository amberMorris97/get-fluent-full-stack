import { afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router';
import generatePhrase from '../../utils/generatePhrase';
import FlashcardPage from './FlashcardPage';
import parseFlashcards from '../../utils/parseFlashcards';

vi.mock('../common/Card', () => ({
    default: ({ type, phrase, flipped, onClick }) => (
        <div data-testid="card">Card</div>
    )
}));

vi.mock('../common/Button', () => ({
    default: ({ label, onClick }) => (
        <button onClick={onClick} data-testId="button">Button</button>
    )
}));

vi.mock('../../utils/generatePhrase', () => ({
    default: vi.fn(),
}));

vi.mock('../../utils/parseFlashcards', () => ({
    default: vi.fn(),
}));

const renderFlashcardPage = () => {
    render(
        <MemoryRouter>
            <FlashcardPage />
        </MemoryRouter>
    );
};

describe('FlashcardPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the empty flashcards state when there are no flashcards', () => {
        parseFlashcards.mockReturnValue([]);
        generatePhrase.mockReturnValue(null);

        renderFlashcardPage();
        expect(screen.queryByText('Your Flashcards')).not.toBeInTheDocument();
    });

    it('renders the flashcards when they are available', () => {
        const flashcards = [{ id: 1, phrase: 'test phrase' }];
        parseFlashcards.mockReturnValue(flashcards);
        generatePhrase.mockReturnValue(flashcards[0]);
        
        renderFlashcardPage();

        expect(screen.getByText('Your Flashcards')).toBeInTheDocument();
        expect(screen.getByTestId('card')).toBeInTheDocument();
    });
});