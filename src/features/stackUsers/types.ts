export interface StackUser {
  user_id: number;
  display_name: string;
  reputation: number;
  profile_image?: string;
  location?: string;
  __deleted?: boolean;
}
