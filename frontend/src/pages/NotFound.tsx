import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-x text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-stone/40 text-gold-deep flex items-center justify-center"><Icon name="gem" /></div>
        <h1 className="font-display text-5xl mt-5">404</h1>
        <p className="muted mt-2">This page has slipped out of the tray.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">Back to home <Icon name="arrow-right" size={16} /></Link>
          <Link to="/jewellery" className="btn btn-ghost">Browse pieces</Link>
        </div>
      </div>
    </section>
  );
}
