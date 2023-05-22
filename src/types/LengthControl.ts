export default interface LengthControl {
  drawerOpen?: boolean;

  character: string;
  length: string;
  direction: 'FRONT' | 'BACK';
  truncate: boolean;
}
