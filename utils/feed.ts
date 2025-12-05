import { getFeed } from "./post";
import { Alert } from "react-native";

type LoadFeedParams = {
  isLoadMore?: boolean;
  loading: boolean;
  setLoading: (val: boolean) => void;
  refreshing: boolean;
  setRefreshing: (val: boolean) => void;
  hasMore: boolean;
  setHasMore: (val: boolean) => void;
  cursor: string | null;
  setCursor: (val: string | null) => void;
  setPosts: (updater: any) => void;
};

export const loadFeed = async ({
  isLoadMore = false,
  loading,
  setLoading,
  refreshing,
  setRefreshing,
  hasMore,
  setHasMore,
  cursor,
  setCursor,
  setPosts,
}: LoadFeedParams) => {

  if (loading || (!isLoadMore && refreshing)) return;
  if (isLoadMore && !hasMore) return;

  if (isLoadMore) setLoading(true);
  else setRefreshing(true);

  try {
    const data = await getFeed(isLoadMore ? cursor ?? undefined : undefined);

    if (isLoadMore) {
      setPosts((prev: any) => [...prev, ...data.posts]);
    } else {
      setPosts(data.posts);
    }

    setCursor(data.nextCursor);
    setHasMore(data.hasMore);
  } catch (err: any) {
    Alert.alert("Error", err.message);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};
