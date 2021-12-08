import { NextApiRequest, NextApiResponse } from "next"; // Tipagens do request e response;

// A rota será o nome do arquivo. No caso USERS.TS;

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Yago" },
    { id: 2, name: "Fabi" },
  ];

  return response.json(users);
};