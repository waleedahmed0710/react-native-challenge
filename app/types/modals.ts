interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onTitleChange: (text: string) => void;
  isCompleted: boolean;
  onCompletedChange: (completed: boolean) => void;
  onUpdate: () => void;
  onDelete: () => void;
  updateLoading: boolean;
}

export default TodoModalProps;
