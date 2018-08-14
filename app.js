function MarsRover(location, direction, grid, obstacles) {

  rover = this; 
  this.location = (location === undefined) ? [0, 0] : location;
  this.direction = (direction === undefined) ? 'N' : direction;
  this.grid = (grid === undefined) ? [100, 100] : grid;
  this.obstacles = (obstacles === undefined) ? [] : obstacles;
  this.status = 'OK';

  this.commands = function(commands) {
      if (commands === undefined) { // Getter
          return this.commandsArray;
      } else { // Setter
          for(var i = 0; i < commands.length; index++) {
              var command = commands[i];
              if (command === 'f' || command === 'b') {
                  if (!move(command)) break;
              } else if (command === 'l' || command === 'r') {
                  turn(command);
              }
          }
          resetLocation();
          this.commandsArray = commands;
      }
  }







  function resetLocation() {
      rover.location = [
          (rover.location[0] + rover.grid[0]) % rover.grid[0],
          (rover.location[1] + rover.grid[1]) % rover.grid[1]
      ]
  }






  function move(command) {
      var xIncrease = 0, yIncrease = 0;
      if (rover.direction === 'N') {
          yIncrease = -1;
      } else if (rover.direction === 'E') { // East
          xIncrease = 1;
      } else if (rover.direction === 'S') { // South
          yIncrease = 1;
      } else if (rover.direction === 'W') { // West
          xIncrease = -1;
      }
      if (command === 'b') { // Backward
          xIncrease *= -1;
          yIncrease *= -1;
      }
      var newLocation = [rover.location[0] + xIncrease, rover.location[1] + yIncrease];
      if (isObstacle(newLocation)) {
          return false;
      }
      rover.location = newLocation;
      return true;
  }







  function isObstacle(newLocation) {
      for(var i = 0; i < rover.obstacles.length; i++) {
          if (newLocation.toString() == rover.obstacles[i].toString()) {
              rover.status = 'obstacle';
              return true;
          }
      }
      return false;
  }






  function turn(command) {
      var directionNumber = directionAsNumber(rover.direction);
      if (command === 'l') { // Left
          directionNumber = (directionNumber + 4 - 1) % 4;
      } else { // Right
          directionNumber = (directionNumber + 1) % 4;
      }
      rover.direction = rover.directions[directionNumber];
  }

  this.directions = ['N', 'E', 'S', 'W'];





  function directionAsNumber(direction) {
      for(var i = 0; i < 4; i++) {
          if (rover.directions[i] === direction) return i;
      }
  }

}