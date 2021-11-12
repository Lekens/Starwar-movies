export const mockMoviesFile = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        list: mockMoviesFile
    };
});

export default mock;
