import MandalaIndex from '@/components/MandalaIndex';

export default function MandalaPage({ params }: { params: { id: string } }) {
  return <MandalaIndex mandala={parseInt(params.id)} />;
}

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}