import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
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

  if (!token) {
    res.status(401);
    res.send({ projects: [] });
    return;
  }

  const projects = await prisma.project.findMany({
    where: {
      users: {
        some: {
          email: token.email,
        },
      },
    },
  });

  res.status(200);
  res.send({ projects });
}
