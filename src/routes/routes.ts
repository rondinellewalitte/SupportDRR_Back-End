import axios from "axios";
import { Router, Request, Response } from "express";

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
        name: support[0],
        course: support[1],
        classroom: support[3],
        date_support: support[4],
        status: support[6],
        id_response: support[7],
        id_user: support[8],
        support: support[11],
      };
      return supports;
    });

    return res.status(200).json(supports);
  }
);

routes.get("/finish", async (req: Request, res: Response) => {
  const { id } = req.headers;

  const respost = await axios.get(
    `https://drraulaboa.com.br/support/EndTicket/adm/${id}/`,
    {
      headers: {
        Cookie: "PHPSESSID=e5rmeo6c5sclbl2slsbegb1220;",
      },
    }
  );

  console.log(respost.status);

  return res.status(200).json({ message: "OK" });
});

export { routes };
