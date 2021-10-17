// rolls([3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6]);
// rolls([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]);
// rolls([6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
// rolls([10,9,1,5,5,7,2,10,10,10,9,0,8,2,9,1,10]);
// rolls([10, 8 , 0 , 5, 1,10,3,5,3,6,7,0,9,0,10,8]);
// rolls([10, 8 , 0 , 5, 1,10,3,5]);


const rolls = require('../src/bowling');


describe('calculate bowling score', () => {
  it('all frames are open', async () => {
    const pins = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
    expect(rolls(pins)).toBe(90); 
  });
  it('last frame strike', async () => {
    const pins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10];
    expect(rolls(pins)).toBe(30); 
  });
  it('one spare frame', async () => {
    const pins = [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(rolls(pins)).toBe(16); 
  });
  it('normal bowling game', async () => {
    const pins = [10,9,1,5,5,7,2,10,10,10,9,0,8,2,9,1,10];
    expect(rolls(pins)).toBe(187); 
  });
  it('the score in middle of the game', async () => {
    const pins = [10, 8 , 0 , 5, 1,10,3,5];
    expect(rolls(pins)).toBe(58); 
  });
});


