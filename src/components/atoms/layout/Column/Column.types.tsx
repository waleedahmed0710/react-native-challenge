import { ViewProps, FlexAlignType } from "react-native";

export interface ColumnProps extends ViewProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  alignItems?: FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  flex?: number;
}
