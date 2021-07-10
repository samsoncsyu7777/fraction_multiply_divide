export function getValues1LayerArray(array1Layer) {//common function
  console.log(array1Layer)
  let tmp1Layer = [];
  array1Layer.forEach(element => {
    console.log(element.stringValue)
    switch (element.valueType) {
      case "stringValue": { tmp1Layer.push(element.stringValue); break; }
      case "integerValue": { tmp1Layer.push(parseInt(element.integerValue, 10)); break; }
      default: { }
    }
  });
  return tmp1Layer;
};

export function getValues2LayerArray(array2Layer) {//common function
  let tmp2Layer = [];
  array2Layer.forEach(element => {
    tmp2Layer.push(getValues1LayerArray(element));
  });
  return tmp2Layer;
};

export function getValues3LayerArray(array3Layer) {//common function
  let tmp3Layer = [];
  array3Layer.forEach(element => {
    tmp3Layer.push(getValues2LayerArray(element));
  });
  return tmp3Layer;
};

export function compare2LayerArray(arrayA, arrayB) {//common function
  let tmpCorrect = true;
  if (arrayA.length === arrayB.length) {
    let i;
    for (i = 0; i < arrayA.length; i++) {
      if (arrayA[i].length === arrayB[i].length) {
        let j;
        for (j = 0; j < arrayA[i].length; j++) {
          if (arrayA[i][j] != arrayB[i][j]) {
            tmpCorrect = false;
            return tmpCorrect;
          }
        }
        if (!tmpCorrect) {
          return tmpCorrect;
        }
      } else { return false; }
    }
    return tmpCorrect;
  } else { return false; }
}

export function calculateTotalScoreForUnit(tmpObject, setScoreTotalForUnit) {//a
  console.log("calculateTotalScoreForUnit");
  let scoreTotal = 0;
  for (let x in tmpObject) {
    if (x === "exam") {
      scoreTotal += tmpObject[x];
    } else {
      for (let y in tmpObject[x]) {
        for (let z in tmpObject[x][y]) {
          scoreTotal += tmpObject[x][y][z];
        }
      }
    }
  }
  console.log(Math.round(scoreTotal));
  setScoreTotalForUnit(Math.round(scoreTotal));
}

export function findIndex(thisArray, thisfunction) {
  let index = -1;
  for(let i = 0; i < thisArray.length; i++) {
    if (thisfunction(thisArray[i])) {
      index = i;
      i = thisArray.length;
    }
  }
  return index;
}

export function includes(thisArray, thisElement) {
  let isIncludes = false;
  if (thisArray.indexOf(thisElement) > -1) {
    isIncludes = true;
  }
  /*for(let i = 0; i < thisArray.length; i++) {
    if (thisArray[i] === thisElement) {
      isIncludes = true;
      i = thisArray.length;
    }
  }*/
  return isIncludes;
}