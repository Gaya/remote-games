import shortid from 'shortid';

let currentRooms: string[] = [];

export function createRoom(): string {
  const id = shortid.generate();

  currentRooms = [...currentRooms, id];

  return id;
}
