export interface HttpStatus {
    reason: string;
    type: StatusType;
  }

export type StatusType = 'success' | 'error';
