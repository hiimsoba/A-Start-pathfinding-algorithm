class node {
  constructor(i, j, col) {
    this.i = i ;
    this.j = j ;
    this.x = j * w ;
    this.y = i * w ;
    this.obstacle = false ;
    this.f = 10000000 ;
    this.g = 10000000 ;
    this.col = col || color(100, 150, 255) ;
    this.neighbors = [] ;
    this.cameFrom = null ;
  }

  show(c) {
    if(c) {
      fill(c) ;
    } else if(this.obstacle) {
      fill(0) ;
    } else {
      fill(this.col) ;
    }
    stroke(0) ;
    strokeWeight(1) ;
    rect(this.x, this.y, w, w) ;
  }
}

function getNeighbors(i, j) {
  let res = [] ;
  if(i > 0) {
    res.push(grid[i - 1][j]) ;
  }
  if(j > 0) {
    res.push(grid[i][j - 1]) ;
  }
  if(i < rows - 1) {
    res.push(grid[i + 1][j]) ;
  }
  if(j < cols - 1) {
    res.push(grid[i][j + 1]) ;
  }
  if(i > 0 && j > 0) {
    res.push(grid[i - 1][j - 1]) ;
  }
  if(i > 0 && j < cols - 1) {
    res.push(grid[i - 1][j + 1]) ;
  }
  if(i < rows - 1 && j > 0) {
    res.push(grid[i + 1][j - 1]) ;
  }
  if(i < rows - 1 && j < cols - 1) {
    res.push(grid[i + 1][j + 1]) ;
  }
  return res ;
}

function initGrid() {
  grid = new Array(rows) ;
  for(let i = 0 ; i < rows ; i++) {
    grid[i] = new Array(cols) ;
    for(let j = 0 ; j < cols ; j++) {
      grid[i][j] = new node(i, j) ;
    }
  }
  for(let i = 0 ; i < rows ; i++) {
    for(let j = 0 ; j < cols ; j++) {
      grid[i][j].neighbors = getNeighbors(i, j) ;
    }
  }
}

function renderGrid() {
  for(let i = 0 ; i < rows ; i++) {
    for(let j = 0 ; j < cols ; j++) {
      grid[i][j].show() ;
    }
  }
}

function mouseDragged() {
  let x = mouseX ;
  let y = mouseY ;
  x /= w ;
  y /= w ;
  x = floor(x) ;
  y = floor(y) ;
  grid[y][x].obstacle = true ;
}

function isInArray(elt, arr) {
  for(el of arr) {
    if(el == elt) {
      return true ;
    }
  }
  return false ;
}

function genob(k) {
  for(let x = 0 ; x < k ; x++) {
    for(let i = 0 ; i < rows ; i++) {
      for(let j = 0 ; j < cols ; j++) {
        if(random(1) < 0.075 && grid[i][j] != start && grid[i][j] != end) {
          grid[i][j].obstacle = true ;
        }
      }
    }
  }
}
