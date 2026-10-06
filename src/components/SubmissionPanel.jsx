import '../collection.css'

export default function SubmissionPanel({ kind = 'Recipe', image }) {
  return <section className="submission-panel" id="submit" aria-labelledby="submission-title"><div className="wrap submission-layout">
    <div className="submission-copy"><h2 id="submission-title">{kind === 'Recipe' ? 'What’s cooking\nin your kitchen?' : kind === 'Product' ? 'Found something\nworth sharing?' : 'Share something\nwith the community.'}</h2><p>{kind === 'Recipe' ? 'Share the recipe you keep coming back to. Include ingredients, directions and what makes it yours.' : kind === 'Product' ? 'Tell us what it is, where you found it and why you’d recommend it.' : 'A recipe, a place, a product or your business. Help someone else find their next favourite.'}</p><p className="submission-note">Form preview. Submissions aren’t open yet. Nothing entered here is sent or saved.</p>{image && <img className="submission-community-photo" src={image.src} alt={image.alt} loading="lazy" />}</div>
    <form className="submission-form" onSubmit={(event) => event.preventDefault()} aria-label="Community submission preview">
      <div className="submission-row"><label>Your name<input name="name" autoComplete="name" /></label><label>Email<input name="email" type="email" autoComplete="email" /></label></div>
      <fieldset className="submission-type"><legend>What would you like to share?</legend><div>{['Recipe', 'Product', 'Place', 'Business'].map((option) => <label key={option}><input type="radio" name="kind" value={option} defaultChecked={option === (kind === 'Community' ? 'Recipe' : kind)} /><span>{option}</span></label>)}</div></fieldset>
      <label>Tell us about it<textarea name="message" rows="4" /></label>
      <label>Link <span>(optional)</span><input name="link" type="url" placeholder="https://" /></label>
      <button type="submit" disabled>Submissions opening soon <span aria-hidden="true">→</span></button>
    </form>
  </div></section>
}
