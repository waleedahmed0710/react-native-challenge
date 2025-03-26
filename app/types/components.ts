export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export type FilterType = 'all' | 'completed' | 'deleted';

export interface FilterButtonsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalTodos: number;
  completedTodos: number;
  deletedTodos: number;
}
