export default interface LengthControl {
  panelOpen?: boolean;

  character: string;
  length: string;
  direction: 'LEFT' | 'RIGHT';
  truncate: boolean;
}
