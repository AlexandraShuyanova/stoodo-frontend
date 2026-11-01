import { render, screen } from '@testing-library/react';
import { AuthForm } from './AuthForm';
import userEvent from '@testing-library/user-event';

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../../services/StoodoService', () => ({
    useLoginMutation: () => [
        jest.fn(),
        { isLoading: false },
    ],
}));

describe('AuthForm', () => {
    it('renders login form', () => {
        render(
            <AuthForm
                onModeChange={jest.fn()}
                onSuccess={jest.fn()}
            />
        );

        expect(
            screen.getByRole('heading', { name: 'Welcome back' })
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Enter email')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Enter password')
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: 'Sign in' })
        ).toBeInTheDocument();
    });

    it('calls onModeChange when Create one is clicked', async () => {
        const user = userEvent.setup();
        const onModeChange = jest.fn();

        render(
            <AuthForm
                onModeChange={onModeChange}
                onSuccess={jest.fn()}
            />
        );

        const button = screen.getByRole('button', { name: 'Create one' });

        await user.click(button);

        expect(onModeChange).toHaveBeenCalledWith('register');
    });

    it('shows validation errors when fields are empty', async () => {
        const user = userEvent.setup();

        render(
            <AuthForm
                onModeChange={jest.fn()}
                onSuccess={jest.fn()}
            />
        );
        const button = screen.getByRole('button', { name: 'Sign in' });
        await user.click(button);

        expect(screen.getByRole('alert')).toHaveTextContent('All fields are required');
    })
});