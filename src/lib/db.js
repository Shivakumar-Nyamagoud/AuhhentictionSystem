import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'lib', 'users.json');

export function getUsers() {
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

export function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
