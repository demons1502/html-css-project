export const statusAppointment = (
  start,
  end,
  now,
  isCompleted,
  isEventActive
) => {
  if (isCompleted) {
    return activeComplete(isEventActive);
  } else {
    if (end < now) {
      return activeClose(isEventActive);
    } else {
      return activeWaiting(isEventActive);
    }
  }
};

const activeComplete = (active) => {
  if (!active) {
    return {
      color: '#3DBD77',
      backgroundColor: '#EFF9F8',
    };
  }
  return {
    color: '#fff',
    backgroundColor: '#3DBD77',
  };
};

const activeClose = (active) => {
  if (!active) {
    return {
      color: '#FF5855',
      backgroundColor: '#FFFAFA',
    };
  }

  return {
    color: '#fff',
    backgroundColor: '#FF5855',
  };
};

const activeWaiting = (active) => {
  if (!active) {
    return {
      color: '#F6CF47',
      backgroundColor: '#FFF8DE',
    };
  }

  return {
    color: '#fff',
    backgroundColor: '#F6CF47',
  };
};
