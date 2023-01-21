const findPathDFS = (i, j) =>{
  if(i==desRow && j==desCol) return true;
  if(i<0 || i>=rows || j<0 || j>=cols || isVisited[i][j]) return false;

  isVisited[i][j] = true;
  setTimeout(() =>
  {
    let id = createID(i,j);
    let ele = document.getElementById(id);
    if(ele.className == "box") ele.className = "box yellow";
  }, currentSpeed);

  currentSpeed += incSpeed;
  return findPathDFS(i+1, j) || findPathDFS(i-1, j) || findPathDFS(i, j+1) || findPathDFS(i, j-1);
}

const DFS = (speed) =>{
  isVisited = [];
  currentSpeed = speed;
  incSpeed = speed;

  for(let i=0; i<rows; i++)
  {
    let array = [];
    for(let j=0; j<cols; j++)
    {
      let id = createID(i,j);
      let ele = document.getElementById(id);
      if(ele.className == "box" || ele.className == "box red") array.push(false);
      else array.push(true);
    }
    isVisited.push(array);
  }

  findPathDFS(srcRow, srcCol);
}