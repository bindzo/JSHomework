const rolls = (pins) => {
  let score = 0;
  let numThrow = 0;
  let currentPins = 10;
  let frame = 1;
  for(let i = 0;i< pins.length;i++) {
    let nextThrow = pins[i+1] ? pins[i+1] : 0;
    if(numThrow === 0) {
      if(pins[i] === 10) { //strike
        let ThrowAfterward = pins[i+2] ? pins[i+2] : 0;
        score += pins[i] + nextThrow + ThrowAfterward; 
        numThrow = 0;
        if(frame === 10) { //strike at frame 10
          break;
        }
        frame++;
      }else { // first throw
        score += pins[i];
        currentPins -= pins[i];
        numThrow++;
      }
    } else {
      if(currentPins - pins[i] === 0) {  //spare
        score += pins[i] + nextThrow;      
        if(frame === 10) { //spare at frame 10
          break;
        }
      } else { //open
        score += pins[i];  
      }
      numThrow = 0;
      currentPins = 10;
      frame++;
    }
    
  }
  return score;
};


module.exports = rolls;