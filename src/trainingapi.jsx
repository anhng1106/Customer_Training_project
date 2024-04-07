export const getTrainings = () => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetch " + response.statusText);
    } else {
      return response.json();
    }
  });
};

export const getCustomerTraining = () => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/{id}/customer"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetch " + response.statusText);
    } else {
      return response.json();
    }
  });
};
