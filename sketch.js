let grid ;

let start ;
let end ;

let w = 30 ;

let rows ;
let cols ;

let path = [] ;

let solve = false ;

let obsButton ;

function setup() {
  createCanvas(600, 600) ;
  rows = height / w ;
  cols = width / w ;
  initGrid() ;
  createP("") ;
  solveButton = createButton("Solve!") ;
  solveButton.mousePressed(slv) ;
  obsButton = createButton("Add obstacles!") ;
  obsButton.mousePressed(genob) ;
  start = grid[0][0] ;
  end = grid[rows - 1][cols - 1] ;

  start.g = 0 ;
  start.f = heuristic(start, end) ;
  openSet.push(start) ;
}

function heuristic(start, end) {
  return dist(start.x, start.y, end.x, end.y) ;
}

let closedSet = [] ;
let openSet = [] ;

function minimum_f() {
  let nod = grid[0][0] ;
  let min = grid[0][0].f ;
  for(let i = 0 ; i < rows ; i++) {
    for(let j = 0 ; j < cols ; j++) {
      if(min > grid[i][j].f && !grid[i][j].obstacle && !isInArray(grid[i][j], closedSet)) {
        min = grid[i][j].f ;
        nod = grid[i][j] ;
      }
    }
  }
  return nod ;
}

function removeFrom(arr, elt) {
  for(let i = 0 ; i < arr.length ; i++) {
    if(elt == arr[i]) {
      arr.splice(i, 1) ;
      return ;
    }
  }
}

function draw() {
  background(0) ;
  renderGrid() ;
  if(solve) {
    if(openSet.length > 0) {
      curr = minimum_f() ;
      let temp = curr ;
      path = [] ;
      path.push(temp) ;
      while(temp.cameFrom) {
        path.push(temp.cameFrom) ;
        temp = temp.cameFrom ;
      }
      if(curr == end) {
        console.log("DONE!") ;
        noLoop() ;
      }
      removeFrom(openSet, curr) ;
      closedSet.push(curr) ;
      for(neighbor of curr.neighbors) {
        if(isInArray(neighbor, closedSet) || neighbor.obstacle) {
          continue ;
        }
        if(!isInArray(neighbor, openSet)) {
          openSet.push(neighbor) ;
        }
        let auxg = curr.g + 1 ;
        if(auxg >= neighbor.g) {
          continue ;
        }
        curr.show(color(0, 255, 0)) ;
        neighbor.cameFrom = curr ;
        neighbor.g = auxg ;
        neighbor.f = neighbor.g + heuristic(neighbor, end) ;
      }
    }
  }
  for(let i = 0 ; i < path.length ; i++) {
    path[i].show(color(100, 255, 50)) ;
  }
}

let changedCells = [] ;

function makeObstacles() {
  if(mouseIsPressed) {
    let x = mouseX ;
    let y = mouseY ;
    x /= w ;
    y /= w ;
    x = floor(x) ;
    y = floor(y) ;
    if(x < 0 || y < 0) {
      return ;
    }
    if(x > rows - 1 || y > cols - 1) {
      return ;
    }

    if(!grid[y][x].hasChanged) {
      grid[y][x].obstacle = !grid[y][x].obstacle ;
      grid[y][x].hasChanged = true ;
      changedCells.push(grid[y][x]) ;
      grid[y][x].show() ;
    }
  } else {
    if(changedCells.length > 0) {
      for(let i = 0 ; i < changedCells.length ; i++) {
        changedCells[i].hasChanged = false ;
      }
      changedCells = [] ;
    }
  }
}

function slv() {
  solve = true ;
}

function genob(k) {
  if(!k) k = 1 ;
  if(typeof k !== "number") {
    k = 1 ;
  }
  for(let x = 0 ; x < k ; x++) {
    for(let i = 0 ; i < rows ; i++) {
      for(let j = 0 ; j < cols ; j++) {
        if(random(1) < 0.075 && grid[i][j] != start && grid[i][j] != end) {
          grid[i][j].obstacle = true ;
          grid[i][j].show() ;
        }
      }
    }
  }
}
