'use strict'

const tap = require('tap')

const { move } = require('./index.js')

tap.skip('Needs to be rewritten. avoid hazard sauce, simplest possible case', (t) => {
  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'c8cb622e-7bde-4bdf-b570-2303c83777c0',
          name: 'me',
          health: 99,
          length: 3,
          head: { x: 2, y: 10 },
          body: [
            { x: 2, y: 10 },
            { x: 1, y: 10 },
            { x: 0, y: 10 }
          ],
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      hazards: [
        { x: 3, y: 10 }
      ]
    },
    you: {
      head: { x: 2, y: 10 },
      body: [
        { x: 2, y: 10 },
        { x: 1, y: 10 },
        { x: 0, y: 10 }
      ],
      length: 3
    }
  }

  const expected = 'down'
  const result = move(game)
  const note = 'always choose south/down to avoid the hazard east/right'
  t.equal(result.move, expected, note)

  t.end()
})

tap.test('avoid head to head: one safe option', (t) => {
  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'c8cb622e-7bde-4bdf-b570-2303c83777c0',
          name: 'us',
          health: 99,
          length: 3,
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 4, y: 6 }
          ],
          latency: 0,
          shout: '',
          squad: ''
        },
        {
          id: 'opponent-123asd',
          name: 'them',
          health: 99,
          length: 3,
          head: { x: 6, y: 4 },
          body: [
            { x: 6, y: 4 },
            { x: 7, y: 4 },
            { x: 7, y: 3 }
          ],
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      hazards: []
    },
    you: {
      head: { x: 5, y: 5 },
      body: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 4, y: 6 }
      ],
      length: 3
    }
  }

  const expected = 'left'
  const result = move(game)
  const note = 'choose the one safe move that avoids potential head to head meetings'
  t.equal(result.move, expected, note)

  t.end()
})

tap.test('avoid head to head: two safe options', (t) => {
  const you = {
    head: { x: 9, y: 2 },
    body: [
      { x: 9, y: 2 },
      { x: 9, y: 1 },
      { x: 9, y: 0 }
    ],
    length: 3
  }

  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'c8cb622e-7bde-4bdf-b570-2303c83777c0',
          name: 'us',
          health: 99,
          length: 3,
          head: you.head,
          body: you.body,
          latency: 0,
          shout: '',
          squad: ''
        },
        {
          id: 'opponent-123asd',
          name: 'them',
          health: 99,
          length: 3,
          head: { x: 9, y: 4 },
          body: [
            { x: 9, y: 4 },
            { x: 9, y: 5 },
            { x: 9, y: 6 }
          ],
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      hazards: []
    },
    you: you
  }

  const result = move(game)
  const note = 'choose either left or right, the moves that avoids potential head to head meetings'
  t.ok(result.move === 'left' || result.move === 'right', note)
  t.ok(result.move !== 'up', note)

  t.end()
})

tap.test('avoid head to head: two safe options (#2)', (t) => {
  const you = {
    head: { x: 9, y: 7 },
    body: [
      { x: 9, y: 7 },
      { x: 9, y: 8 },
      { x: 10, y: 8 }
    ],
    length: 3
  }

  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'c8cb622e-7bde-4bdf-b570-2303c83777c0',
          name: 'us',
          health: 99,
          length: 3,
          head: you.head,
          body: you.body,
          latency: 0,
          shout: '',
          squad: ''
        },
        {
          id: 'opponent-123asd',
          name: 'them',
          health: 99,
          length: 3,
          head: { x: 9, y: 5 },
          body: [
            { x: 9, y: 5 },
            { x: 8, y: 5 },
            { x: 7, y: 5 },
            { x: 7, y: 6 },
            { x: 8, y: 6 }
          ],
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      hazards: []
    },
    you: you
  }

  const result = move(game)
  const note = 'choose either left or right, the moves that avoids potential head to head meetings'
  t.ok(result.move === 'left' || result.move === 'right', note)
  t.ok(result.move !== 'down', note)

  t.end()
})

tap.test('eat food if hungry', (t) => {
  const you = {
    head: { x: 5, y: 5 },
    body: [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 }
    ],
    health: 30
  }

  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'id',
          name: 'us',
          health: 30,
          length: 3,
          head: you.head,
          body: you.body,
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      food: [{ x: 4, y: 5 }],
      hazards: []
    },
    you: you
  }

  const result = move(game)
  const note = 'eat the food to the left'
  t.equal(result.move, 'left', note)
  t.end()
})

tap.test('attack smaller snake, head to head', (t) => {
  const you = {
    head: { x: 5, y: 5 },
    body: [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 6, y: 7 },
      { x: 7, y: 7 }
    ],
    length: 5,
    health: 77
  }

  const opp = {
    head: { x: 5, y: 3 },
    body: [
      { x: 5, y: 3 },
      { x: 5, y: 2 },
      { x: 5, y: 1 },
      { x: 4, y: 1 }
    ],
    length: 4,
    health: 88
  }

  const game = {
    board: {
      height: 11,
      width: 11,
      snakes: [
        {
          id: 'id',
          name: 'us',
          health: you.health,
          length: you.length,
          head: you.head,
          body: you.body,
          latency: 0,
          shout: '',
          squad: ''
        },
        {
          id: 'id2',
          name: 'them',
          health: opp.health,
          length: opp.length,
          head: opp.head,
          body: opp.body,
          latency: 0,
          shout: '',
          squad: ''
        }
      ],
      food: [],
      hazards: []
    },
    you: you
  }

  const result = move(game)
  const note = 'attack the smaller snake'
  t.equal(result.move, 'down', note)
  t.end()
})
