document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-btn');
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = ['orange', 'red', 'purple', 'green', 'blue', 'pink', 'yellow'];

  // The Pieces
  const jPiece = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [0, width, width + 1, width + 2],
  ];

  const lPiece = [
    [0, 1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2],
  ];

  const sPiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const zPiece = [
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
  ];

  const tPiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oPiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iPiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const thePieces = [jPiece, lPiece, sPiece, zPiece, tPiece, oPiece, iPiece];

  let currentPosition = 4;
  let currentRotation = 0;

  // Randomly select a piece and its first rotation
  let random = Math.floor(Math.random() * thePieces.length);
  let current = thePieces[random][currentRotation];

  // Draw the piece
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('piece');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  // Undraw the piece
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('piece');
      squares[currentPosition + index].style.backgroundColor = '';
    });
  }

  // Assign codes to key-press
  function control(evt) {
    if (evt.key === 'ArrowLeft') {
      moveLeft();
    } else if (evt.key === 'ArrowRight') {
      moveRight();
    } else if (evt.key === 'ArrowDown') {
      moveDown();
    } else if (evt.key === 'ArrowUp') {
      rotate();
    }
  }
  document.addEventListener('keydown', control);

  // Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Freeze function
  function freeze() {
    if (
      current.some(index =>
        squares[currentPosition + index + width].classList.contains('taken')
      )
    ) {
      current.forEach(index =>
        squares[currentPosition + index].classList.add('taken')
      );
      // Start a new piece falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * thePieces.length);
      current = thePieces[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // Move pieces left unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      index => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (
      current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  // Move pieces right unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      index => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) {
      currentPosition += 1;
    }

    if (
      current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  // Rotate pieces
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = thePieces[random][currentRotation];
    draw();
  }

  // Show up next piece in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;

  // the pieces without the rotation
  const upNextPiece = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // jPiece
    [0, 1, displayWidth + 1, displayWidth * 2 + 1], // lPiece
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // sPiece
    [1, displayWidth + 1, displayWidth, displayWidth * 2], // zPiece
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tPiece
    [0, 1, displayWidth, displayWidth + 1], // oPiece
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iPiece
  ];
  // display the shape in the mini-grid display
  function displayShape() {
    // remove any trace of a piece from the entire mini-grid
    displaySquares.forEach(square => {
      square.classList.remove('piece');
      square.style.backgroundColor = '';
    });
    upNextPiece[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('piece');
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }

  // Add functionality to the Start button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * thePieces.length);
      displayShape();
    }
  });

  // Add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('piece');
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }

  // Game Over
  function gameOver() {
    if (
      current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      scoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }
});
