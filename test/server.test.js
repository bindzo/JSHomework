const server = require('../src/rickandmorty');
const db = require('../utils/db');
describe('mysql test', () => {
  afterAll(() => {
    db.connection.end();
  });
  it('should resolve with all characters from db when query suceeds', async () => {
    jest.spyOn(db, 'callQuery').mockResolvedValue('abc');
    const mockRes = {
      send: jest.fn(),
    };
    await server.getAllCharFromDB(null, mockRes);
    expect(db.callQuery).toBeCalled();
    expect(mockRes.send).toBeCalledWith('abc');
  });
});