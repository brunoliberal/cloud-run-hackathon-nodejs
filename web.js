const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const max_range = 4;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  var my_url = req.body._links.self.href;

  var max_x = req.body.arena.dims[0];
  var max_y = req.body.arena.dims[1];

  var state = req.body.arena.state;

  var cur_pos_x = state[my_url].x;
  var cur_pos_y = state[my_url].y;
  var cur_dir = state[my_url].direction;

  for (const enemy in state) {
    if (enemy != my_url) {
        if (target_available(req, enemy)) {
            res.send('T');
            return;
          }
    }
  }

  const moves = ['F', 'L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

function target_available(req, i) {
    var my_url = req.body._links.self.href;
    var state = req.body.arena.state;

    var cur_pos_x = state[my_url].x;
    var cur_pos_y = state[my_url].y;
    var cur_dir = state[my_url].direction;

    var enemy = state[i];
    var enemy_pos_x = enemy.x;
    var enemy_pos_y = enemy.y;
    var x_diff = Math.abs(cur_pos_x - enemy_pos_x);
    var y_diff = Math.abs(cur_pos_y - enemy_pos_y);

    var enemy_pos_south = cur_pos_x == enemy_pos_x && enemy_pos_y > cur_pos_y;
    var enemy_pos_right = cur_pos_y == enemy_pos_y && enemy_pos_x > cur_pos_x;

    if (cur_pos_x == enemy_pos_x && y_diff < max_range) {
      if ((enemy_pos_south && cur_dir == 'S') || (!enemy_pos_south && cur_dir == 'N')) {
        return true;
      }
    }

    if (cur_pos_y == enemy_pos_y && x_diff < max_range) {
      if ((enemy_pos_right && cur_dir == 'E') || (!enemy_pos_right && cur_dir == 'W')) {
        return true;
      }
    }
    return false;
}

app.listen(process.env.PORT || 8080);
