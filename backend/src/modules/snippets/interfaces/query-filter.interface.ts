export interface QueryFilter {
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  tags?: string;
}
