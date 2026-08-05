type Props = { onDirection: (x: number, y: number) => void; disabled?: boolean };

export default function TouchControls({ onDirection, disabled = false }: Props) {
  const control = (label: string, symbol: string, x: number, y: number, className = "") => (
    <button
      type="button"
      className={className}
      aria-label={label}
      disabled={disabled}
      onPointerDown={(event) => { event.preventDefault(); onDirection(x, y); }}
    >{symbol}</button>
  );

  return (
    <div className="touch" aria-label="Touch controls">
      {control("Move up", "▲", 0, -1, "touchUp")}
      {control("Move left", "◀", -1, 0, "touchLeft")}
      <div className="touchCore" aria-hidden="true" />
      {control("Move right", "▶", 1, 0, "touchRight")}
      {control("Move down", "▼", 0, 1, "touchDown")}
    </div>
  );
}
