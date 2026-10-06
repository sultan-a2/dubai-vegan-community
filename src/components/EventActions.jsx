import SiteIcon from './SiteIcon.jsx'

export default function EventActions({ event, organiser = false }) {
  const detailsUrl = `${import.meta.env.BASE_URL}events.html?event=${event.id}#event-details`
  const paymentUrl = event.paymentEnabled && /^https:\/\//i.test(event.ziinaUrl || '') ? event.ziinaUrl : null

  return <div className="event-actions" aria-label={`Links for ${event.title}`}>
    <a className="event-action" href={organiser ? event.url : detailsUrl} {...(organiser ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>View event<SiteIcon name="arrow" size={18} /></a>
    {paymentUrl && <a className="event-action is-payment" href={paymentUrl} target="_blank" rel="noopener noreferrer">Pay here<SiteIcon name="arrow" size={18} /></a>}
  </div>
}
