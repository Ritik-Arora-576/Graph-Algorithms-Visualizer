const BFS = (speed) =>{
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
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
        if(ele.className == "box" || ele.className == "box green") array.push(false);
        else array.push(true);
        }
        isVisited.push(array);
    }

    let queue = []
    queue.push(createID(srcRow, srcCol));

    while(queue.length)
    {
        let id = queue.shift();
        let i = Number.parseInt(id.split("-")[0]);
        let j = Number.parseInt(id.split("-")[1]);

        if(i==desRow && j==desCol) break;

        setTimeout(() =>
        {
            let ele = document.getElementById(id);
            if(ele.className == "box") ele.className = "box yellow";
        }, currentSpeed);

        currentSpeed += incSpeed;

        for(let k=0; k<4; k++)
        {
            let row = i + dx[k];
            let col = j + dy[k];
            if(row>=0 && col>=0 && row<rows && col<cols && !isVisited[row][col])
            {
                queue.push(createID(row, col));
                isVisited[row][col] = true;
            }
        }
    }
}