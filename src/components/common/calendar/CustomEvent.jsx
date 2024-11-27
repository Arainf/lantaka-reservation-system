import React from 'react';

export function CustomEvent({ event }) {
  return (
    <div className="truncate px-1 hover:opacity-80 transition-opacity cursor-pointer">
      <span className="font-medium">{event.title}</span>
    </div>
  );
}