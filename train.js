function FootBallPoints(wins, draws, losses) {
  return wins * 3 + draws * 1 + losses * 0;
}

// 3-marotaba wins = 9
// 4-marotaba draws = 4
// 2-marotaba losses = 0
console.log(FootBallPoints(3, 4, 2)); // 13
