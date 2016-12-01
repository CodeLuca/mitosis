var cells = [];
var maxSize = 60;

function setup() {
  var canvas = createCanvas(windowWidth - 100, windowHeight - 100);
  canvas.parent('holder');

  cells.push(new Cell(width / 2 - 75, height / 2 - 75, 20, 'white', 'red'));
  cells.push(new Cell(width / 2 + 75, height / 2 + 75, 20, 'white', 'purple'));
  noStroke();
}

function draw() {
  background('#333');
  textSize(32);
  fill('white');
  text("Cell Count: " + cells.length, 0, height - 20);
  cells.forEach(function(currentCell) {
    currentCell.move();
  });
}

function mousePressed() {
  cells.forEach(function(currentCell) {
    currentCell.clicked();
  });
}

function Cell(x, y, size, cellColor, chromoColor) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.cellColor = cellColor;
  this.chromoColor = chromoColor;
  this.chromoSize = 0.25;
  this.splitting = false;

  this.show = function() {
    if(!this.splitting)
      fill(this.cellColor);
    else
      fill('yellow')
    ellipse(this.x, this.y, this.size, this.size)
    fill(this.chromoColor);
    ellipse(this.x, this.y, this.size * this.chromoSize, this.size * this.chromoSize)
  }

  this.move = function() {
    var newX = this.x, newY = this.y;

    if(floor(random(0, 2)) === 1)
      newX += random(5);
    else
      newX -= random(5);


    if(floor(random(0, 2)) === 1)
      newY += random(5);
    else
      newY -= random(5);

    this.x = constrain(newX, 0, width);
    this.y = constrain(newY, 0, height);

    if(this.size <= maxSize) {
      this.size += 0.2;
    }

    if(this.splitting) {
      if(this.chromoSize < 0.75) {
        this.chromoSize += 0.005;
      } else if(this.chromoSize >= 0.75) {
        cells.push(new Cell(this.x, this.y, this.size / 2, this.cellColor, this.chromoColor));
        this.size /= 2;
        this.splitting = false;
        this.chromoSize = 0.25;
      }
    }

    this.show();
  }

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.size && this.size >= maxSize) {
      this.splitting = true;
    }
  }
}