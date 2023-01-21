// add boxes of the graph grid
let grid = document.body.getElementsByClassName("grid")[0];

let rows = 13;
let cols = 40;
let srcRow;
let srcCol;
let desRow;
let desCol;

for(let i=0; i<rows; i++)
{
    let ele = document.createElement("div");
    ele.className = "grid-element"

    for(let j=0; j<cols; j++)
    {
        ele.insertAdjacentHTML("beforeend",`<div class="box" id="${i}-${j}" onmousedown="defineStructure(this.id)"></div>`);
    }

    grid.insertAdjacentElement("beforeend", ele);
}

let blocks = 0;
let src = null;
let dest = null;
let lock = false;

const defineStructure = (clicked_id) =>{
    if(blocks==0)
    {
        let ele = document.getElementById(clicked_id);
        ele.setAttribute("class", "box red");
        src = clicked_id;
        blocks++;
    }

    else if(blocks==1 && clicked_id!=src)
    {
        let ele = document.getElementById(clicked_id);
        ele.setAttribute("class", "box green");
        dest = clicked_id;
        blocks++;
    }

    else if(clicked_id!=src && clicked_id!=dest && !lock)
    {
        let ele = document.getElementById(clicked_id);
        ele.setAttribute("class", "box black");
    }
}

const reset = () =>{
    blocks = 0;
    src = null;
    dest = null;
    lock = false;

    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<cols;j++)
        {
            let id = i.toString()+'-'+j.toString();
            let ele = document.getElementById(id);
            ele.setAttribute("class", "box");
        }
    }
}

let isVisited;
let currentSpeed;
let incSpeed;

const createID = (i,j) =>{
  return i.toString()+'-'+j.toString();
}

const speed_dict = {"fast":70, "medium":100, "slow": 130};

const showPopup = (message) =>{
    lock = false;
    let ele = document.getElementById("pop-message");
    ele.innerText = message;
    ele = document.getElementById("pop-up");
    ele.style.display = "flex";
}

const run = () =>{
    lock = true;
    if(src == null) showPopup("Please Select the Starting and Final Point.");
    else if(dest == null) showPopup("Please Select the Final point.");
    srcRow = Number.parseInt(src.split("-")[0]);
    srcCol = Number.parseInt(src.split("-")[1]);
    desRow = Number.parseInt(dest.split("-")[0]);
    desCol = Number.parseInt(dest.split("-")[1]);
    let mode = document.getElementsByTagName("select");
    let algo = mode[0].value;
    let speed = speed_dict[mode[1].value];
    console.log(algo, speed);
    if(algo == "None") showPopup("Please select an Algorithm first.");
    else if(algo == "DFS") DFS(speed);
    else if(algo == "BFS") BFS(speed);
    else if(algo == "Astar") AStar(speed);
}

const ok = () =>{
    let ele = document.getElementById("pop-up");
    ele.style.display = "none";
}