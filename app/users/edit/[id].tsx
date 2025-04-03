import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { localUserSchema, LocalUserForm } from "@/forms/localUserSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOverride } from "@/features/stackUsers/localOverridesSlice";
import { useDeleteUserMutation } from "@/features/stackUsers/stackUsersApi";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { TextInput } from "@/components/atoms/ui/TextInput/TextInput.component";
import { Button } from "@/components/atoms/ui/Button/Button.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import Toast from "react-native-toast-message";

export default function EditUserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = Number(id);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) =>
      state.stackUserOverrides[userId] ||
      state.stackUsersApi.queries[`getUsers(${1})`]?.data?.items?.find(
        (u) => u.user_id === userId
      )
  );

  const [editUser] = useDeleteUserMutation(); // fake PUT

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalUserForm>({
    resolver: zodResolver(localUserSchema),
    defaultValues: {
      display_name: user?.display_name ?? "",
      reputation: user?.reputation ?? 0,
      location: user?.location ?? "",
    },
  });

  const onSubmit = async (form: LocalUserForm) => {
    if (!user) return;

    const updated = { ...user, ...form };
    dispatch(addOverride(updated));

    try {
      await editUser(user.user_id).unwrap();
    } catch {
      Toast.show({
        type: "error",
        text1: "Edit failed",
        text2: "StackOverflow API does not support edits.",
      });
    }

    router.back();
  };

  return (
    <Column fullWidth style={{ padding: 16 }}>
      <Text variant="heading">Edit User</Text>
      <Spacer size={12} />

      <TextInput
        label="Name"
        defaultValue={user?.display_name}
        onChangeText={(val) => setValue("display_name", val)}
        error={errors.display_name?.message}
      />

      <Spacer size={8} />
      <TextInput
        label="Reputation"
        keyboardType="numeric"
        defaultValue={user?.reputation?.toString()}
        onChangeText={(val) => setValue("reputation", Number(val))}
        error={errors.reputation?.message}
      />

      <Spacer size={8} />
      <TextInput
        label="Location"
        defaultValue={user?.location}
        onChangeText={(val) => setValue("location", val)}
      />

      <Spacer size={16} />
      <Button title="Save Changes" onPress={handleSubmit(onSubmit)} />
    </Column>
  );
}
