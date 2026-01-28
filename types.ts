
export interface RaffleNumber {
  id: number;
  status: 'available' | 'selected' | 'sold';
  ownerName?: string;
  ownerPhone?: string;
}

export interface RaffleState {
  numbers: RaffleNumber[];
  selectedIds: number[];
  pricePerNumber: number;
  pixKey: string;
}

export interface PixPayload {
  numbers: number[];
  totalAmount: number;
  copyPasteKey: string;
}
