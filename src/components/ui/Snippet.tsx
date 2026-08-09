"use client";

import { useState } from "react";

interface Props {
  command: string;
  labels: { copy: string; copied: string };
}

/** A command you can take. The only interactive thing on a marketing page. */
export function Snippet({ command, labels }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be refused. The command is selectable text either way — which is
      // why it is text and not an image.
    }
  }

  return (
    <div className="surface flex items-center gap-3 px-4 py-3">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm">
        <span aria-hidden="true" className="mr-2 text-muted-foreground">
          $
        </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="focus-ring shrink-0 rounded-chip border border-hairline bg-surface-2 px-3 py-1 text-xs transition duration-1 ease-out hover:bg-surface-hover"
      >
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
