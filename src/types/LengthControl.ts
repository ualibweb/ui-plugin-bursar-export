export default interface LengthControl {
  character: string;
  length: number;
  direction: 'LEFT' | 'RIGHT';
  truncate: boolean;
}
