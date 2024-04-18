import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { Project } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

/*
 * GET Request: Get all projects that the user is a part of.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ projects: Project[] }>
) {
  const token = await getToken({ req });
  const { ticketId } = req.body;

  if (!token) {
    res.status(401);
    res.send({ projects: [] });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: token?.email || '',
    },
    include: {
      
    },
  });

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!user || !ticket || (!user.admin && !user.mentor)) {
    res.status(401);
    res.send({ ticket: null });
    return;
  }

  if (user.claimedTicket || ticket.claimantId) {
    res.status(400);
    res.send({ ticket: null });
    return;
  }

  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      claimantName: user.name,
      claimedTime: new Date(),
      claimant: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  res.status(200);
  res.send({ ticket: ticket });
}
