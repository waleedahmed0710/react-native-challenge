import { authService } from '../src/services/auth.service';
import { baseApi } from '../src/api/baseApi';

// Mock the baseApi
jest.mock('../src/api/baseApi', () => ({
    baseApi: {
        post: jest.fn(),
    },
}));

describe('Auth Service', () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should call the login endpoint with correct parameters', async () => {
            // Setup the mock response
            const mockResponse = {
                data: {
                    data: { id: 1, email: 'test@example.com' },
                    token: 'jwt-token-123'
                }
            };

            (baseApi.post as jest.Mock).mockResolvedValueOnce(mockResponse);

            // Call the login function
            const result = await authService.login('test@example.com', 'password123');

            // Check if baseApi.post was called correctly
            expect(baseApi.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@example.com',
                password: 'password123'
            });

            // Check if the function returns the expected result
            expect(result).toEqual({
                success: true,
                data: { id: 1, email: 'test@example.com' },
                token: 'jwt-token-123'
            });
        });

        it('should throw an error when login fails', async () => {
            // Setup the mock to reject with an error
            const mockError = new Error('Login failed');
            (baseApi.post as jest.Mock).mockRejectedValueOnce(mockError);

            // Expect the login function to throw an error
            await expect(authService.login('test@example.com', 'wrong-password'))
                .rejects
                .toThrow('Login failed');

            // Check if baseApi.post was called
            expect(baseApi.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@example.com',
                password: 'wrong-password'
            });
        });
    });

    describe('register', () => {
        it('should call the register endpoint with correct parameters', async () => {
            // Setup the mock response
            const mockResponse = {
                data: {
                    data: {
                        id: 1,
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john.doe@example.com'
                    },
                    token: 'jwt-token-456'
                }
            };

            (baseApi.post as jest.Mock).mockResolvedValueOnce(mockResponse);

            // Call the register function
            const result = await authService.register(
                'John',
                'Doe',
                'john.doe@example.com',
                'securePassword123'
            );

            // Check if baseApi.post was called correctly
            expect(baseApi.post).toHaveBeenCalledWith('/auth/register', {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'securePassword123'
            });

            // Check if the function returns the expected result
            expect(result).toEqual({
                success: true,
                data: {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com'
                },
                token: 'jwt-token-456'
            });
        });

        it('should throw an error when registration fails', async () => {
            // Setup the mock to reject with an error
            const mockError = new Error('Email already exists');
            (baseApi.post as jest.Mock).mockRejectedValueOnce(mockError);

            // Expect the register function to throw an error
            await expect(authService.register(
                'John',
                'Doe',
                'existing@example.com',
                'password123'
            ))
                .rejects
                .toThrow('Email already exists');

            // Check if baseApi.post was called
            expect(baseApi.post).toHaveBeenCalledWith('/auth/register', {
                first_name: 'John',
                last_name: 'Doe',
                email: 'existing@example.com',
                password: 'password123'
            });
        });
    });
});