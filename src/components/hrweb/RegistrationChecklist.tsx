type RegistrationChecklistProps = {
  className?: string;
};

export const RegistrationChecklist = ({ className }: RegistrationChecklistProps) => (
  <svg viewBox="0 0 240 280" aria-hidden="true" focusable="false" className={className}>
    <g opacity="0.18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M83 39H53a12 12 0 0 0-12 12v197a12 12 0 0 0 12 12h134a12 12 0 0 0 12-12V51a12 12 0 0 0-12-12h-30" />
      <path d="M102 28a18 18 0 0 1 36 0h13a6 6 0 0 1 6 6v20H83V34a6 6 0 0 1 6-6Z" />
      <path d="m64 99 10 10 19-23M110 98h62M110 110h40" />
      <path d="m64 157 10 10 19-23M110 156h62M110 168h47" />
      <path d="m64 215 10 10 19-23M110 214h62M110 226h34" />
    </g>
  </svg>
);