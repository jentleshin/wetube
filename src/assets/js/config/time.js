export const timeToString = (data, timeFormat) => {
  const time = Math.floor(data);
  const format = (time) => String(time).padStart(2, "0");
  const second = format(time % 60);
  const minute = format((time - (time % 60)) / 60);
  const hour = format((time - (time % 3600)) / 3600);

  if (timeFormat) {
    return `${hour}:${minute}:${second}`;
  } else {
    return `${minute}:${second}`;
  }
};

export const timeFormat = (data) => {
  const time = Math.floor(data);
  return time - (time % 3600) ? true : false;
};
