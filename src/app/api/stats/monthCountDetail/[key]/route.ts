import { NextResponse } from 'next/server';

import { getMonthCountDetailItems } from '@/database/stats';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const key = (await params).key ?? '';
  const detailItems = getMonthCountDetailItems(key);

  return NextResponse.json(detailItems);
}
