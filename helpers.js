const getDateGranularity = (fromDate, toDate) => {
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = oneDay * 7;

  const diffInMilliseconds = endDate - startDate;

  if (diffInMilliseconds === 0) {
    return "hour";
  } else if (diffInMilliseconds < oneDay * 30) {
    return "day";
  } else if (diffInMilliseconds < oneWeek * 26) {
    return "week";
  } else {
    return "month";
  }
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const COLORS = shuffle([
  "violet",
  "red",
  "teal",
  "yellow",
  "rose",
  "cyan",
  "amber",
  "lime",
]);

export { getDateGranularity, COLORS };
