import authOptions from '@/app/auth/auth-options';
import { createIssueSchema, patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
//import { delay } from '@/app/utils/delay';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  console.log({ session });
  if (!session) {
    return NextResponse.json({}, { status: 401, statusText: 'Unauthorized' });
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 }); // Bad Request
  }

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid user.' },
        { status: 400, statusText: 'Bad request.' }
      );
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json(
      { error: 'Invalid Issue. Not Found.' },
      { status: 404 }
    ); // Not Found
  }

  // will only update fields which have value
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue); // 202 Ok
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // await delay(2000);

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({
      error: 'Invalid issue. No such issue in database',
    });
  }

  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}
