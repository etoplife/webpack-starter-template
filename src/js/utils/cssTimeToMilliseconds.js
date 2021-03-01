const cssTimeToMilliseconds = (timeString) => {
  const num = parseFloat(timeString);
  let unit = timeString.match(/m?s/);
  let milliseconds;

  if (unit) {
    [unit] = unit;
  }

  switch (unit) {
    case 's': // seconds
      milliseconds = num * 1000;
      break;
    case 'ms': // milliseconds
      milliseconds = num;
      break;
    default:
      milliseconds = 0;
      break;
  }

  return milliseconds;
};

export default cssTimeToMilliseconds;
