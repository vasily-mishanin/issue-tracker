import { createIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
//import { delay } from '@/app/utils/delay';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 }); // Bad Request
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

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue); // 202 Ok
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // await delay(2000);
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
