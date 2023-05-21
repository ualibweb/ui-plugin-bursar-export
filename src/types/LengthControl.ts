export default interface LengthControl {
  drawerOpen?: boolean;

  character: string;
  length: string;
  direction: 'LEFT' | 'RIGHT';
  truncate: boolean;
}
