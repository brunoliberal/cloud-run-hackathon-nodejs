const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const max_range = 3;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body);
  var move;  
  var my_url = req.body._links.self.href;

  var max_x = req.body.arena.dims[0];
  var max_y = req.body.arena.dims[1];

  var state = req.body.arena.state;

  var cur_pos_x = state[my_url].x;
  var cur_pos_y = state[my_url].y;
  var cur_dir = state[my_url].direction;

  if (not_in_perimter(max_x, max_y, cur_pos_x, cur_pos_y)) {
    res.send('F');
    return;
  }

  if (facing_wall(max_x, max_y, cur_pos_x, cur_pos_y, cur_dir)) {
    res.send('L');
    return;
  }

//   for (let i = 0; i < state.length; i++) {
//     var enemy = state[i];
//     var enemy_pos_x = enemy.x;
//     var enemy_pos_y = enemy.y;
//     var x_diff = Math.abs(cur_pos_x - enemy_pos_x);
//     var y_diff = Math.abs(cur_pos_y - enemy_pos_y);

//     if (target_available(req, i)) {
//         if (cur_pos_x == enemy_pos_x) {
//             if (cur_dir == 'N' ) {

//             } else if (cur_dir == 'S') {
    
//             } else if (cur_dir == 'W') {
    
//             } else {
//                 move = 'T';
//             }
//         } else if (cur_pos_y == enemy_pos_y) {
//             if (cur_dir == 'N' ) {

//             } else if (cur_dir == 'S') {
    
//             } else if (cur_dir == 'W') {
    
//             } else {
//                 move = 'T';
//             }
//         }
//     }
 
//   }

  const moves = ['F', 'T', 'L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

function facing_wall(max_x, max_y, cur_pos_x, cur_pos_y, cur_dir) {
    return (cur_pos_x == 0 && cur_dir == 'N') || (cur_pos_x == max_x - 1 && cur_dir == 'E') || (cur_pos_y == 0 && cur_dir == 'W') || (cur_pos_y == max_y - 1 && cur_dir == 'S'); 
}

function not_in_perimter(max_x, max_y, cur_pos_x, cur_pos_y) {
    return cur_pos_x != max_x -1 || cur_pos_x != 0 || cur_pos_y != max_y - 1 || cur_pos_y != 0;
}

function target_available(req, i) {
    var my_url = req.body._links.self.href;
    var state = req.body.arena.state;

    var cur_pos_x = state[my_url].x;
    var cur_pos_y = state[my_url].y;

    var enemy = state[i];
    var enemy_pos_x = enemy.x;
    var enemy_pos_y = enemy.y;
    var x_diff = Math.abs(cur_pos_x - enemy_pos_x);
    var y_diff = Math.abs(cur_pos_y - enemy_pos_y);

    return (cur_pos_x == enemy_pos_x && y_diff < max_range) || (cur_pos_y == enemy_pos_y && x_diff < max_range);
}

app.listen(process.env.PORT || 8080);
