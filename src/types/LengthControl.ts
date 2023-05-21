export default interface LengthControl {
  character: string;
  length: string;
  direction: 'LEFT' | 'RIGHT';
  truncate: boolean;
}
