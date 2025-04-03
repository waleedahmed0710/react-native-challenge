import { Stack, useLocalSearchParams } from "expo-router";
import { useGetUsersQuery } from "@/features/stackUsers/stackUsersApi";
import { useAppSelector } from "@/store/hooks";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Image, ActivityIndicator } from "react-native";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);

  const { data, isLoading } = useGetUsersQuery(1);
  const overrides = useAppSelector((state) => state.stackUserOverrides);
  const user =
    overrides[numericId] || data?.items?.find((u) => u.user_id === numericId);

  if (isLoading || !user) return <ActivityIndicator />;

  return (
    <>
      <Stack.Screen options={{ headerTitle: "User Details View" }} />
      <Column fullWidth style={{ padding: 16 }}>
        <Image
          source={{ uri: user.profile_image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text variant="heading">{user.display_name}</Text>
        <Text>Reputation: {user.reputation}</Text>
        <Text>Location: {user.location || "N/A"}</Text>
      </Column>
    </>
  );
}
