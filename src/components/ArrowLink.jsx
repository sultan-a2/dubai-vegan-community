export default function ArrowLink({ children, className = '', direction = 'right', ...props }) {
  return <a className={`arrow-link ${className}`.trim()} {...props}>{children}<svg aria-hidden="true" data-direction={direction} width="26" height="26" viewBox="0 0 26 26" fill="none"><path d={direction === 'up' ? 'M13 24V3m-8 8 8-8 8 8' : 'M2 13h21m-8-8 8 8-8 8'} stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg></a>
}
