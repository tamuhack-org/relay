import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { MailingList } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

/*
 * GET Request: Get the mailing list specified by the projectId in the URL.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ mailinglist: MailingList | null }>
) {
  const token = await getToken({ req });
  const mailingListId = req.query.mailingListId;

  // TODO no auth is happening in any of these routes yet lol

  if (!token || !mailingListId) {
    res.status(401);
    res.send({ mailinglist: null });
    return;
  }

  const mailinglist: MailingList | null = await prisma.mailingList.findFirst({
    where: {
      id: Number(mailingListId),
    },
  });

  res.status(200);
  res.send({ mailinglist });
}
