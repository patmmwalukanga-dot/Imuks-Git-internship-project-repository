export const ROLES = ['Admin', 'Manager', 'Viewer'] as const;

export const CATEGORIES = ['Security', 'Compliance', 'Operations'] as const;

export const STATUSES = ['Active', 'Pending', 'Inactive'] as const;

export const API_ENDPOINTS = {
  RECORDS: '/api/records',
} as const;

export const DELETE_CONFIRM_MESSAGE = 'Are you sure you want to delete this asset?';

// UI Texts for page.tsx
export const PAGE_TITLE = 'Asset records';
export const PAGE_SUBTITLE = 'Manage all system assets';
export const ADD_ASSET_BUTTON = '+ Add asset';
export const SEARCH_PLACEHOLDER = 'Search by name, category or status...';
export const LOADING_ASSETS = 'Loading assets...';

// Stats Cards for page.tsx
export const STAT_TOTAL_ASSETS = 'Total assets';
export const STAT_ACTIVE = 'Active';
export const STAT_PENDING = 'Pending';

// UI Texts for record-modal.tsx
export const MODAL_TITLE_EDIT = 'Edit asset';
export const MODAL_TITLE_ADD = 'Add new asset';
export const CLOSE_ICON = '✕';
export const FIELD_LABEL_NAME = 'Asset name *';
export const FIELD_LABEL_CATEGORY = 'Category *';
export const FIELD_LABEL_DESCRIPTION = 'Description *';
export const FIELD_LABEL_STATUS = 'Status *';
export const FIELD_LABEL_ROLE = 'Assigned role';
export const FIELD_LABEL_EMAIL = 'Email *';

export const PLACEHOLDER_NAME = 'e.g. Asset #1004';
export const PLACEHOLDER_DESCRIPTION = 'Brief description...';
export const PLACEHOLDER_EMAIL = 'email@greenshield.com';

export const BUTTON_CANCEL = 'Cancel';
export const BUTTON_SAVE_ASSET = 'Save asset';

// Validation Error Messages
export const ERROR_NAME_REQUIRED = 'Asset name is required';
export const ERROR_EMAIL_REQUIRED = 'Email is required';
export const ERROR_EMAIL_INVALID = 'Enter a valid email address';
export const ERROR_DESCRIPTION_REQUIRED = 'Description is required';

// UI Texts for records-table.tsx
export const TABLE_HEADERS = ['Name', 'Category', 'Status', 'Role', 'Email', 'Created', 'Actions'] as const;
export const BUTTON_EDIT = 'Edit';
export const BUTTON_DELETE = 'Delete';
export const EMPTY_STATE_MESSAGE = 'No assets found. Click "Add asset" to create one.';

// UI Texts for sidebar.tsx
export const LOGO_ICON_TEXT = 'G';
export const LOGO_TITLE = 'GreenShield';
export const LOGO_SUBTITLE = 'Secure. Reliable.';

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: '⊞' },
  { label: 'Records', icon: '◫' },
  { label: 'Users', icon: '👤' },
  { label: 'Reports', icon: '📊' },
  { label: 'Settings', icon: '⚙️' },
] as const;

export const BUTTON_LIGHT_THEME = '☀ Light theme';
export const BUTTON_DARK_THEME = '🌙 Dark theme';

export const USER_AVATAR_TEXT = 'A';
export const USER_NAME = 'Admin User';
export const USER_ROLE = 'Administrator';
