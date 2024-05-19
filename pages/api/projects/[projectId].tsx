import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { Project, MailingList, EmailTemplate, User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

/*
 * GET Request: Get the project specified by the projectId in the URL.
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

  res.status(200);
  res.send({ fullProject });
}
