const data = [
  {
    result: "incomplete",
    receiver: "Demaryius Thomas",
    distance: 0.7,
  },
  {
    result: "complete",
    receiver: "Tim Patrick",
    distance: 0.9,
  },
  {
    result: "complete",
    receiver: "Demaryius Thomas",
    distance: 0.3,
  },
  {
    result: "incomplete",
    receiver: "Tim Patrick",
    distance: 0.9,
  },
  {
    result: "incomplete",
    receiver: "Tim Patrick",
    distance: 0.8,
  },
  {
    result: "complete",
    receiver: "Demaryius Thomas",
    distance: 0.1,
  },
  {
    result: "interception",
    receiver: "Demaryius Thomas",
    distance: 0.4,
  },
];

// Most complete
const aggregateTotal = (data) =>
  data.reduce((receivers, current) => {
    if (!receivers[current.receiver]) {
      receivers[current.receiver] = {
        total: 0,
        complete: 0,
      };
    }

    const { complete: prevComplete, total: prevTotal } =
      receivers[current.receiver];

    const receiver = current.receiver;

    return {
      ...receivers,
      [receiver]: {
        complete:
          current.result === "complete" ? prevComplete + 1 : prevComplete,
        total: prevTotal + 1,
      },
    };
  }, {});

const getBestPercentage = (data) =>
  Object.entries(aggregateTotal(data)).reduce(
    (best, curr) => {
      const [player, values] = curr;
      const bestPercentage = best.value.slice(0, -1);

      const currPercentage = (values.complete / values.total) * 100;

      return bestPercentage > currPercentage
        ? best
        : { player, value: currPercentage + "%" };
    },
    { player: "Unknown", value: "0%" }
  );

// Longest Distance
const getLongDistancePass = (data) =>
  data.reduce(
    (best, curr) => {
      return best.value > curr.distance
        ? best
        : { player: curr.receiver, value: curr.distance };
    },
    { player: "Unknown", value: 0 }
  );

const mostCompletePercentage = getBestPercentage(data);

const longDistancePass = getLongDistancePass(data);

console.log(mostCompletePercentage);

console.log(longDistancePass);
