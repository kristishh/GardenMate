import { FirestoreTimestamp } from "../types/index";

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formatFirestoreTimestamp = (timestamp: FirestoreTimestamp): string => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};