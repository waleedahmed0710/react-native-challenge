import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { useGetUsersQuery } from "@/features/stackUsers/stackUsersApi";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addOverride,
  removeOverride,
  resetOverrides,
} from "@/features/stackUsers/localOverridesSlice";
import type { StackUser } from "@/features/stackUsers/types";
import { UserCard } from "@/components/organisms/organisms/UserCard/UserCard.component";
import Toast from "react-native-toast-message";
import { useDeleteUserMutation } from "@/features/stackUsers/stackUsersApi";

export default function UsersScreen() {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<StackUser[]>([]);
  const { data, isFetching, refetch } = useGetUsersQuery(page);
  const overrides = useAppSelector((state) => state.stackUserOverrides);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (data?.items?.length) {
      setAllUsers((prev) => [
        ...prev,
        ...data.items.filter(
          (item) => !prev.find((u) => u.user_id === item.user_id)
        ),
      ]);
    }
  }, [data]);

  const mergedUsers = allUsers
    .map((user) => overrides[user.user_id] || user)
    .filter((user) => !user.__deleted);

  const handleEdit = useCallback(
    (id?: number) => () => {
      id && router.navigate(`/users/edit/${id}`);
    },
    []
  );

  const handleDelete = useCallback(
    (user: StackUser) => async () => {
      console.log("Deleting user", user);
      dispatch(addOverride({ ...user, __deleted: true }));

      try {
        await deleteUser(user.user_id).unwrap();
      } catch (err) {
        dispatch(removeOverride(user.user_id));
        Toast.show({
          type: "error",
          text1: "Delete failed",
          text2: "StackOverflow does not allow deleting users.",
        });
      }
    },
    []
  );

  const handleRefresh = useCallback(() => {
    dispatch(resetOverrides());
    setAllUsers([]);
    setPage(1);
    refetch();
  }, []);

  if (!mergedUsers.length && isFetching) {
    return <ActivityIndicator />;
  }

  if (!mergedUsers.length) {
    return <Text>No users found</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Stack Overflow Users" }} />
      <Column fullWidth flex={1} style={{ padding: 16 }}>
        <FlatList
          data={mergedUsers}
          keyExtractor={(item) => item.user_id?.toString() ?? ""}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onDelete={handleDelete(item)}
              onEdit={handleEdit(item.user_id)}
            />
          )}
          onEndReached={() => setPage((p) => p + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? <ActivityIndicator /> : <Spacer size={24} />
          }
          onRefresh={handleRefresh}
          refreshing={isFetching}
        />
      </Column>
    </>
  );
}
