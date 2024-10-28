import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { Project, MailingList, EmailTemplate, User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

/*
 * GET Request: Get the project specified by the projectId in the URL.
 * DELETE Request: Delete the project specified by the projectId in the URL.
 */

export type FullProject = Project & {
    users: User[];
    admins: User[];
    lists: MailingList[];
    templates: EmailTemplate[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ fullProject: FullProject | null }>
) {
  const token = await getToken({ req });
  const projectId = req.query.projectId;

  if (!token || !projectId) {
    res.status(401);
    res.send({ fullProject: null });
    return;
  }

  const fullProject: FullProject | null = await prisma.project.findFirst({
    where: {
      projectId: projectId as string,
      users: {
        some: {
          email: token.email,
        },
      },
    },
    include: {
      users: true,
      admins: true,
      lists: true,
      templates: true,
    },
  });

  if (!fullProject) {
    res.status(404);
    res.send({ fullProject: null });
    return;
  }

  if (req.method === 'DELETE')
  {
    // Prisma's cascading delete will take care of deleting all the associated data
    await prisma.project.delete({
      where: {
        id: projectId as string,
      },
    });
  }
  else if (req.method !== 'GET') {
    res.status(200);
    res.send({ fullProject });
  }
  else
  {
    res.status(405);
    res.send({ fullProject: null });
  }
}
