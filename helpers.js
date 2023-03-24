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

export { getDateGranularity };
