/** JSON response contracts returned by backend/api-gateway. */

export interface ApiResponse<T> {
  status: number;
  code: number;
  message: string;
  data: T;
}

export interface MessageResponse {
  message: string;
}

export interface TokenResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_expires_in?: number;
}

export interface CsrfResponse {
  csrf_token: string;
}

export interface MeResponse {
  id: string;
  fullname: string;
  email: string;
  role_id: string;
  role_code: string;
}

export interface MenuResponse {
  id: string;
  code: string;
  name: string;
  route: string;
  icon?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
}

export interface MenuNodeResponse {
  id: string;
  code: string;
  name: string;
  route: string;
  icon?: string;
  sort_order: number;
  children: MenuNodeResponse[];
}

export interface GroupResponse {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GroupMemberResponse {
  group_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface GroupInvitationResponse {
  id: string;
  group_id: string;
  invited_user_id: string;
  invited_by: string;
  role: string;
  status: string;
  token: string;
  expired_at?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  id: string;
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSnapshotResponse {
  user_id: string;
  fullname: string;
  email: string;
}

export interface PersonalTransactionResponse {
  id: string;
  user: UserSnapshotResponse;
  category?: CategoryResponse;
  type: string;
  title: string;
  amount: string;
  currency: string;
  transaction_date: string;
  note?: string;
  created_at: string;
  updated_at: string;
}

export interface GroupPaymentResponse {
  id: string;
  user: UserSnapshotResponse;
  amount: string;
  note?: string;
  created_at: string;
}

export interface GroupSplitResponse {
  id: string;
  user: UserSnapshotResponse;
  split_type: string;
  split_value: string;
  share_amount: string;
  created_at: string;
}

export interface GroupTransactionResponse {
  id: string;
  group_id: string;
  group_name: string;
  category?: CategoryResponse;
  type: string;
  title: string;
  amount: string;
  currency: string;
  transaction_date: string;
  note?: string;
  created_by: UserSnapshotResponse;
  payments: GroupPaymentResponse[];
  splits: GroupSplitResponse[];
  created_at: string;
  updated_at: string;
}

export interface SettlementResponse {
  id: string;
  group_id: string;
  group_name: string;
  from_user: UserSnapshotResponse;
  to_user: UserSnapshotResponse;
  amount: string;
  currency: string;
  settled_at: string;
  note?: string;
  created_by: UserSnapshotResponse;
  created_at: string;
}

export interface MemberBalanceResponse {
  user: UserSnapshotResponse;
  paid: string;
  share: string;
  settlements_sent: string;
  settlements_received: string;
  net_balance: string;
}

export interface SettlementSuggestionResponse {
  from_user: UserSnapshotResponse;
  to_user: UserSnapshotResponse;
  amount: string;
  currency: string;
}

export interface GroupBalancesResponse {
  balances: MemberBalanceResponse[];
  suggestions: SettlementSuggestionResponse[];
}

export interface PaginatedPersonalTransactionsResponse {
  items: PersonalTransactionResponse[];
  total: number;
}

export interface PaginatedGroupTransactionsResponse {
  items: GroupTransactionResponse[];
  total: number;
}

export interface PaginatedSettlementsResponse {
  items: SettlementResponse[];
  total: number;
}

export interface ApiResponse<T> {
  status: number;
  code: number;
  message: string;
  data: T;
}
