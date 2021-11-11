import moviesController, {mockMoviesFile} from 'controllers/__mock__/movies';
jest.mock('../Shortener');


beforeEach(() => {
   moviesController.mockClear();
   mockMoviesFile.mockClear();
});
describe('Movies Controller', () => {
   test('list movies route controller',  async () => {
      const listCall = moviesController.mockReturnValueOnce();
      expect(listCall).toBeCalledTimes(0);
   })
});
