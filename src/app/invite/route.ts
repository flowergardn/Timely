import { NextApiRequest, NextApiResponse } from "next";

export function GET(res: NextApiResponse, req: NextApiRequest) {
  return Response.redirect(
    "https://discord.com/oauth2/authorize?client_id=1245772120991072369",
  );
}
