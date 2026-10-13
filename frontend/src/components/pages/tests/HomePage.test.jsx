import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomePage from '../HomePage';
import { DataContext } from '../../../context/DataContext';
import { AuthContext } from '../../../context/AuthContext';
import generatePhrase from '../../../utils/generatePhrase';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock('../../../utils/generatePhrase', () => ({
    default: vi.fn(),
}));

const phrases = [
    { id: 1, haitianCreole: 'Bonjou', english: 'Good morning', pronunciation: 'bon-zhoo' },
    { id: 2, haitianCreole: 'Mèsi', english: 'Thank you', pronunciation: 'meh-see' },
];

const renderHomePage = ({
    isAuthenticated = false,
    allPhrases = phrases,
    addUserFlashcard = vi.fn().mockResolvedValue(),
    notify = vi.fn(),
} = {}) => {
    render(
        <AuthContext.Provider value={{ auth: { isAuthenticated } }}>
            <DataContext.Provider value={{ allPhrases, addUserFlashcard }}>
                <HomePage notify={notify} />
            </DataContext.Provider>
        </AuthContext.Provider>
    );

    return { addUserFlashcard, notify };
};

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        generatePhrase.mockReturnValue(phrases[0]);
    });

    it('renders the title and subtitle', () => {
        renderHomePage();

        expect(screen.getByRole('heading', { level: 1, name: 'Pick up a new phrase everyday' })).toBeInTheDocument();
        expect(screen.getByText('Learn phrases in Haitian Creole')).toBeInTheDocument();
    });

    it('displays a phrase generated from allPhrases', () => {
        renderHomePage();

        expect(generatePhrase).toHaveBeenCalledWith(phrases);
        expect(screen.getByText('Bonjou')).toBeInTheDocument();
        expect(screen.getByText('Good morning')).toBeInTheDocument();
        expect(screen.getByText('bon-zhoo')).toBeInTheDocument();
    });

    it('displays the fallback phrase when no phrase is available', () => {
        generatePhrase.mockReturnValue(null);
        renderHomePage({ allPhrases: null });

        expect(screen.getByText('Error loading the data')).toBeInTheDocument();
        expect(screen.getByText('Please refresh or try again later')).toBeInTheDocument();
    });

    it('shows a new phrase when "Next phrase" is clicked', async () => {
        const user = userEvent.setup();
        renderHomePage();

        generatePhrase.mockReturnValue(phrases[1]);
        await user.click(screen.getByRole('button', { name: 'Next phrase' }));

        expect(screen.getByText('Mèsi')).toBeInTheDocument();
        expect(screen.getByText('Thank you')).toBeInTheDocument();
        expect(screen.queryByText('Bonjou')).not.toBeInTheDocument();
    });

    describe('when the user is not authenticated', () => {
        it('shows a "Log In" button instead of "Add to flashcards"', () => {
            renderHomePage();

            expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Add to flashcards' })).not.toBeInTheDocument();
        });

        it('navigates to /login when "Log In" is clicked', async () => {
            const user = userEvent.setup();
            const { addUserFlashcard } = renderHomePage();

            await user.click(screen.getByRole('button', { name: 'Log In' }));

            expect(mockNavigate).toHaveBeenCalledWith('/login');
            expect(addUserFlashcard).not.toHaveBeenCalled();
        });
    });

    describe('when the user is authenticated', () => {
        it('shows an "Add to flashcards" button instead of "Log In"', () => {
            renderHomePage({ isAuthenticated: true });

            expect(screen.getByRole('button', { name: 'Add to flashcards' })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Log In' })).not.toBeInTheDocument();
        });

        it('adds the current phrase as a flashcard and notifies success', async () => {
            const user = userEvent.setup();
            const { addUserFlashcard, notify } = renderHomePage({ isAuthenticated: true });

            await user.click(screen.getByRole('button', { name: 'Add to flashcards' }));

            expect(addUserFlashcard).toHaveBeenCalledWith(1);
            await waitFor(() => expect(notify).toHaveBeenCalledWith(true, 'Flashcard added!'));
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        it('adds the newly displayed phrase after clicking "Next phrase"', async () => {
            const user = userEvent.setup();
            const { addUserFlashcard } = renderHomePage({ isAuthenticated: true });

            generatePhrase.mockReturnValue(phrases[1]);
            await user.click(screen.getByRole('button', { name: 'Next phrase' }));
            await user.click(screen.getByRole('button', { name: 'Add to flashcards' }));

            expect(addUserFlashcard).toHaveBeenCalledWith(2);
        });

        it('notifies when the flashcard already exists (409)', async () => {
            const user = userEvent.setup();
            const addUserFlashcard = vi.fn().mockRejectedValue({ response: { status: 409 } });
            const { notify } = renderHomePage({ isAuthenticated: true, addUserFlashcard });

            await user.click(screen.getByRole('button', { name: 'Add to flashcards' }));

            await waitFor(() => expect(notify).toHaveBeenCalledWith(false, 'Flashcard already exists!'));
        });

        it('notifies a generic error for other failures', async () => {
            const user = userEvent.setup();
            const addUserFlashcard = vi.fn().mockRejectedValue({ response: { status: 500 } });
            const { notify } = renderHomePage({ isAuthenticated: true, addUserFlashcard });

            await user.click(screen.getByRole('button', { name: 'Add to flashcards' }));

            await waitFor(() => expect(notify).toHaveBeenCalledWith(false, 'Error adding flashcard.'));
        });

        it('notifies a generic error when the error has no response', async () => {
            const user = userEvent.setup();
            const addUserFlashcard = vi.fn().mockRejectedValue(new Error('Network Error'));
            const { notify } = renderHomePage({ isAuthenticated: true, addUserFlashcard });

            await user.click(screen.getByRole('button', { name: 'Add to flashcards' }));

            await waitFor(() => expect(notify).toHaveBeenCalledWith(false, 'Error adding flashcard.'));
        });
    });
});
