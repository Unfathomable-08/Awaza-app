import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const hp = (percentage: number) => {
  return (percentage * deviceHeight) / 100; // Like vh in css
};

const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100; // Like vw in css
};

const timeAgo = (date: string | number | Date) => {
  if (!date) return 'now';

  const now = Date.now();
  const past = new Date(date).getTime();

  // Invalid date check
  if (isNaN(past)) return 'now';

  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 0) return 'now'; // Future date handling
  if (diffInSeconds < 60) return 'just now';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  return new Date(date).toLocaleDateString();
};

export { deviceHeight, deviceWidth, hp, timeAgo, wp };

