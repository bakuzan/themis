import { NextResponse } from 'next/server';

import { getIssueRepeatDetailItems } from '@/database/stats';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const detailItems = getIssueRepeatDetailItems(id);

  return NextResponse.json(detailItems);
}
