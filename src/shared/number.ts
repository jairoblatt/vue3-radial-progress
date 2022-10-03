import type { Numberish } from '@/types';

export function toNumber(val: Numberish) {
  return Number(val) || 0;
}
