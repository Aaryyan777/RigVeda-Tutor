import HymnViewer from '@/components/HymnViewer';

export default function HymnPage({ params }: { params: { mandala: string; sukta: string } }) {
  return <HymnViewer mandala={parseInt(params.mandala)} sukta={parseInt(params.sukta)} />;
}

export function generateStaticParams() {
  // Generate paths for common hymns to enable static generation
  const paths = [];
  for (let m = 1; m <= 10; m++) {
    for (let s = 1; s <= 20; s++) {
      paths.push({ mandala: m.toString(), sukta: s.toString() });
    }
  }
  return paths;
}