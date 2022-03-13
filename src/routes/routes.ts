import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { api } from "../services/api";

const routes = Router();

routes.get(
  "/",

  async (req: Request, res: Response) => {
    const { data } = await api.get(
      "/plataforma/support/index.php?action=commentPaginate&origin=adm"
    );

    const supports = data.aaData.map((support) => {
      const supports = {
        id: uuidv4(),
        name: support[0],
        course: support[1],
        classroom: support[2],
        date_support: support[3],
        status: support[5],
        id_response: support[6],
        id_user: support[7],
        support: support[11],
      };
      return supports;
    });
    return res.status(200).json(supports);
  }
);

routes.get("/finish", async (req: Request, res: Response) => {
  const { id_response } = req.headers;
  const respost = await api.get(`support/EndTicket/adm/${id_response}/`);
  return res.sendStatus(respost.status);
});

export { routes };
