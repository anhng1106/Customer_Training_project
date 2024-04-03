export const getCustomers = () => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetch " + response.statusText);
    } else {
      return response.json();
    }
  });
};
