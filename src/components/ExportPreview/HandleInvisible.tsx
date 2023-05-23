import React, { ReactNode } from 'react';

export function splitAdd(
  haystack: string | ReactNode,
  needle: string,
  replacement: ReactNode
): ReactNode[] {
  if (typeof haystack !== 'string') {
    return [haystack];
  }

  return haystack.split(needle).flatMap((piece, index, array) => {
    if (index === array.length - 1) {
      return [piece];
    }

    return [piece, replacement];
  });
}

function Invisible({ children }: { children: ReactNode }) {
  return <span style={{ color: 'gray' }}>{children}</span>;
}

export default function HandleInvisible({
  text,
  showInvisible,
}: {
  text: string;
  showInvisible: boolean;
}) {
  // add a <br /> after each newline, taking care to keep newlines intact
  let pieces: ReactNode[] = text.split('\n').flatMap((piece, index, array) => {
    if (index === array.length - 1) {
      return [piece];
    }

    return [piece, '\n', <br />];
  });

  // denote appropriately
  if (showInvisible) {
    pieces = pieces
      .flatMap((piece) => splitAdd(piece, '\r', <Invisible>\r</Invisible>))
      .flatMap((piece) => splitAdd(piece, '\n', <Invisible>\n</Invisible>))
      .flatMap((piece) => splitAdd(piece, '\t', <Invisible>\t</Invisible>))
      .flatMap((piece) => splitAdd(piece, ' ', <Invisible>•</Invisible>));
  }

  pieces = pieces.map((piece) => {
    if (typeof piece === 'string') {
      return piece.replaceAll('\n', '').replaceAll('\r', '');
    }
    return piece;
  });

  return <>{pieces}</>;
}
