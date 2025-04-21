export const isOlderThanTwoDays = (timestamp: string | undefined): boolean => {
  if (!timestamp) return true;
  const savedDate = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - savedDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays > 2;
};
