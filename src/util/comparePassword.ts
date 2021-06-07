import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  secret: string,
  hashFromDb: string,
): Promise<boolean> => {
  // const newHash = hashFromDb.replace(/^\$2y(.+)$/i, '$2a$1');
  const response: boolean = await bcrypt.compare(secret, hashFromDb);
  return response;
};
