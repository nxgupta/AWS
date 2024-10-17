module.exports.handler = async (events) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({message: "bye from the lambda function"}),
  }
}
