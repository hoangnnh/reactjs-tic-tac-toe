export const detectWinner = (squares) => {
  const winningConditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
};

export const getSquareCoordinates = (square) => {
  switch (square) {
    case 0:
      return {
        col: 1,
        row: 1,
      };
    case 1:
      return {
        col: 2,
        row: 1,
      };
    case 2:
      return {
        col: 3,
        row: 1,
      };
    case 3:
      return {
        col: 1,
        row: 2,
      };
    case 4:
      return {
        col: 2,
        row: 2,
      };
    case 5:
      return {
        col: 3,
        row: 2,
      };
    case 6:
      return {
        col: 1,
        row: 3,
      };
    case 7:
      return {
        col: 2,
        row: 3,
      };
    case 8:
      return {
        col: 3,
        row: 3,
      };
  }
};
