import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { Project } from '@prisma/client';

/*
 * POST Request: Create a new project and return its ID.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ newProject: Project | null }>
) {

  if (req.method !== 'POST') {
    res.status(405);
    res.send({ newProject: null });
    return;
  }

  const token = await getToken({ req });

  if (!token || !token.email) {
    res.status(401);
    res.send({ newProject: null });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user || !user.email) {
    res.status(401);
    res.send({ newProject: null });
    return;
  }

  try {
    const projectName = req.body.projectName;

    const newProject = await prisma.project.create({
    data: {
        projectName: projectName,
        users: {
          connect: {
            email: user.email,
          },
        },
      },
    });

    res.status(200);
    res.send({ newProject });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send({ newProject: null});
    return;
  }
}
