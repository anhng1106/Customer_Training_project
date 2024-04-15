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

export const addCustomers = (newCustomer) => {
  return fetch(
    "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCustomer),
    }
  ).then((response) => {
    if (!response.ok) throw new Error("Error when adding a new customer");
    return response.json();
  });
};
