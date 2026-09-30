export default function ArrowLink({ children, className = '', ...props }) {
  return <a className={`arrow-link ${className}`.trim()} {...props}>{children}<svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M2 13h21m-8-8 8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg></a>
}
