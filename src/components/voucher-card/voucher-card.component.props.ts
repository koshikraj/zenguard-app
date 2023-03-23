export interface VoucherCardComponentProps {
  title?: string;
  description?: string;
  redeemed?: boolean;
  source?: string;
  onClick?: (id: any) => any;
}
