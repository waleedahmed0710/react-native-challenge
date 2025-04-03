import React, { useCallback } from "react";
import { Image } from "react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { Pressable } from "react-native";

import { Text } from "@/components/atoms/ui/Text/Text.component";
import { Button } from "@/components/atoms/ui/Button/Button.component";
import { Row } from "@/components/atoms/layout/Row/Row.component";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { UserCardProps } from "./UserCard.types";
import { styles as customStyles } from "./UserCard.styles";
import { useStyles } from "react-native-unistyles";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  const { styles } = useStyles(customStyles);
  const router = useRouter();

  const handlePress = useCallback(
    () => router.push(`/users/${user.user_id}`),
    [user.user_id, router]
  );

  const renderRightActions = useCallback(
    () => (
      <Row
        style={styles.actionsContainer}
        alignItems="center"
        justifyContent="flex-end"
      >
        {onEdit && <Button title="Edit" onPress={onEdit} />}
        {onDelete && (
          <Button title="Delete" onPress={onDelete} variant="danger" />
        )}
      </Row>
    ),
    [onEdit, onDelete, styles.actionsContainer]
  );

  return (
    <Animated.View
      entering={FadeInRight.springify().mass(0.4)}
      exiting={FadeOutRight.duration(300)}
    >
      <Swipeable renderRightActions={renderRightActions}>
        <Pressable onPress={handlePress}>
          <Row style={styles.card} fullWidth alignItems="center">
            <Image source={{ uri: user.profile_image }} style={styles.avatar} />

            <Column flex={1}>
              <Text variant="subtitle">{user.display_name}</Text>
              <Text variant="caption">Reputation: {user.reputation}</Text>
            </Column>
          </Row>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};
