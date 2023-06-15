export function generatePrimaryKey() {
  const now = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${now}${randomNumber}`;
}

