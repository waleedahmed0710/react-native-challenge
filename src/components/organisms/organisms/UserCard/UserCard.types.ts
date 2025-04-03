import { StackUser } from "@/features/stackUsers/types";

export interface UserCardProps {
  user: StackUser;
  onEdit?: () => void;
  onDelete?: () => void;
}
