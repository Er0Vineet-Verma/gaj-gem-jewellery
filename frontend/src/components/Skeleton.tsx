import type { CSSProperties } from 'react';

function Bone({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`skeleton rounded-xl ${className}`} style={style} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Bone className="aspect-[4/5] rounded-none" />
      <div className="p-3 sm:p-4 space-y-2">
        <Bone className="h-5 w-3/4" />
        <Bone className="h-3 w-1/2" />
        <Bone className="h-3 w-full" />
        <div className="flex items-end justify-between pt-1">
          <div className="space-y-1">
            <Bone className="h-2.5 w-8" />
            <Bone className="h-5 w-20" />
          </div>
          <Bone className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="py-10">
      <div className="container-x">
        <Bone className="h-3.5 w-56 mb-5" />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Bone className="aspect-square rounded-3xl" />
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[0, 1, 2, 3].map(i => <Bone key={i} className="aspect-square rounded-2xl" />)}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-3 pt-2">
            <Bone className="h-9 w-3/4" />
            <Bone className="h-5 w-1/2" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-4/5" />
            <Bone className="h-10 w-1/3 mt-4 rounded-full" />
            <div className="flex gap-2 pt-2">
              {[140, 110, 155].map(w => (
                <Bone key={w} className="h-11 rounded-full" style={{ width: w }} />
              ))}
            </div>
            <div className="space-y-2 pt-2">
              {[0, 1, 2, 3].map(i => <Bone key={i} className="h-4 w-full" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GemCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Bone className="h-52 rounded-none" />
      <div className="p-5 space-y-2.5">
        <Bone className="h-3 w-24" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-4/5" />
        <div className="flex gap-2 pt-1">
          <Bone className="h-5 w-16 rounded-full" />
          <Bone className="h-5 w-16 rounded-full" />
        </div>
        <Bone className="h-4 w-32 mt-1" />
      </div>
    </div>
  );
}
