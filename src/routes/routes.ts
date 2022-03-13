import axios from "axios";
import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const routes = Router();

routes.get(
  "/",

  async (req: Request, res: Response) => {
    const { data } = await axios.get(
      "https://drraulaboa.com.br/plataforma/support/index.php?action=commentPaginate&origin=adm",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Cookie: "PHPSESSID=e5rmeo6c5sclbl2slsbegb1220;",
        },
      }
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

    /*
    const result = supports.filter((dados) => {
      return dados.status === "1";
    });
    */

    return res.status(200).json(supports);
  }
);

routes.get("/finish", async (req: Request, res: Response) => {
  const { id_response } = req.headers;
  const respost = await axios.get(
    `https://drraulaboa.com.br/support/EndTicket/adm/${id_response}/`,
    {
      headers: {
        Cookie: "PHPSESSID=e5rmeo6c5sclbl2slsbegb1220;",
      },
    }
  );

  return res.sendStatus(respost.status);
});

export { routes };
