export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string | number;
  section?: 'main' | 'clinical' | 'management' | 'system';
}
