export const getTrainings = () => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetch " + response.statusText);
    } else {
      return response.json();
    }
  });
};

export const addTrainings = (newTraining) => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTraining),
    }
  ).then((response) => {
    if (!response.ok) throw new Error("Error when adding a new training");
    return response.json();
  });
};
