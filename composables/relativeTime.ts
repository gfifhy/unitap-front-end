export const relativeTime = val => {

  const [ rel, abs ] = timeDifference(val)

  if (abs < 0) {
    const datetime = new Date(val)
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    return [`${datetime.getFullYear()}-${addZero(datetime.getMonth() + 1)}-${addZero(datetime.getDate())} ${addZero(datetime.getHours())}:${addZero(datetime.getMinutes())}`, false];
  } else {
    return [rel, true]
  }

}

const timeDifference = (previous) => {

    const current = new Date
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    previous = new Date(previous)

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
         const t = Math.round(elapsed/1000)
         return [t + ' seconds ago', t]
    }

    else if (elapsed < msPerHour) {
         const t = Math.round(elapsed/msPerMinute)
         return [t + ' minutes ago', t]
    }

    else if (elapsed < msPerDay ) {
         const t = Math.round(elapsed/msPerHour)
         return [t + ' hours ago', t]
    }

    else if (elapsed < msPerMonth) {
        const t = Math.round(elapsed/msPerDay)
        return ['approximately ' + t + ' days ago', t]
    }

    else if (elapsed < msPerYear) {
        const t = Math.round(elapsed/msPerMonth)
        return ['approximately ' + t + ' months ago', t]
    }

    else {
        const t = Math.round(elapsed/msPerYear)
        return ['approximately ' + t + ' years ago', t]
    }
}