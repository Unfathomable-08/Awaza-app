import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const hp = (percentage: number) => {
  return (percentage * deviceHeight) / 100; // Like vh in css
};

const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100; // Like vw in css
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

export { hp, wp, deviceHeight, deviceWidth, timeAgo };
