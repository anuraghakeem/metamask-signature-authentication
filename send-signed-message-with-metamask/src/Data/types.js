const types = {
  Data: [
    { name: "owner", type: "address" },
    { name: "token", type: "string" },
    { name: "contract", type: "address" },
    { name: "timestamp", type: "uint256" },
  ],
  Item: [{ name: "data", type: "Data" }],
};

export default types;
