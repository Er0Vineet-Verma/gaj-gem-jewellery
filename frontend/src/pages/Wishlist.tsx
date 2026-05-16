import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';

export default function Wishlist() {
  const { items } = useWishlist();
  return (
    <section className="py-12">
      <div className="container-x">
        <header className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] muted">Saved pieces</div>
            <h1 className="font-display text-4xl mt-1">Wishlist <span className="font-deva text-2xl muted">पसंद</span></h1>
          </div>
          <span className="text-sm muted">{items.length} piece{items.length === 1 ? '' : 's'}</span>
        </header>

        {!items.length ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 mx-auto rounded-full bg-stone/40 text-ruby-brand flex items-center justify-center mb-3"><Icon name="heart" /></div>
            <p className="muted">Nothing saved yet — tap the heart on any piece you love.</p>
            <Link to="/jewellery" className="btn btn-primary mt-4 inline-flex">Browse pieces <Icon name="arrow-right" size={16} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {items.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
