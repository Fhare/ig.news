import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);

  const users = [
    { id: 1, name: "Yago" },
    { id: 2, name: "Fabi" },
  ];

  return response.json(users);
};