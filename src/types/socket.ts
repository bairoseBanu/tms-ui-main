export interface Socket {
  on(event: string, callback: (...args: unknown[]) => void): this;
  emit(event: string, ...args: unknown[]): void;
  off: (event: string) => void;
}
