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

    const object = data.aaData.map((data) => {
      const dados = { nome: data[0], grupo: data[1], curso: data[3] };
      return console.log(data);
    });

    return res.status(200).json(data.aaData[1]);
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
