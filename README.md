# Pat Rapp

[Pat Rapp](https://play.battlesnake.com/u/tphummel/pat-rapp/) is my fourth [battlesnake](https://play.battlesnake.com).

## "Features"

- Plays [Wrapped Mode](https://docs.battlesnake.com/references/game-modes#wrapped).
- Will avoid snakes' current position if possible.
- Will avoid going head to head with a snake.
- Will look one move ahead to avoid danger.
- Will avoid hazard sauce.
- Will eat adjacent food if safe.

## Usage

run locally:
```
DEBUG=1 node local.js
```

curl example:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"game":{"id":"f59488b9-b159-45b0-ae2e-221648b1aa58","timeout":500},"turn":35,"board":{"height":11,"width":11,"food":[{"x":10,"y":4},{"x":5,"y":5},{"x":4,"y":4},{"x":2,"y":5},{"x":6,"y":2},{"x":4,"y":2},{"x":4,"y":0},{"x":6,"y":6}],"hazards":[],"snakes":[{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}]},"you":{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}}' \
  http://localhost:8080/move
  ```

  play locally against a remote snake using the [battlesnake rules cli](https://github.com/BattlesnakeOfficial/rules):
  ```
  battlesnake play --viewmap --gametype wrapped --name local --url http://localhost:8080
  ```

## What does the name mean?

[Pat Rapp](https://www.baseball-reference.com/players/r/rapppa01.shtml) is a professional baseball player. A player who "wraps".
