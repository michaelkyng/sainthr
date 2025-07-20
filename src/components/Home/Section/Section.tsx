import useTailwindConfig from '@/hooks/useTailwindConfig';

export default function Section({
  inverse=false,
  leftGrid,
  rightGrid,
}: Readonly<{
  inverse?: boolean;
  leftGrid: React.ReactNode;
  rightGrid: React.ReactNode;
}>) {
  const { containerWidth } = useTailwindConfig();
  return (
    <div className={containerWidth}>
      <div className={`grid grid-cols-1  py-25 h-auto gap-14 px-5 md:px-8 lg:px-10 ${inverse ? 'lg:grid-cols-[1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1fr]'}`}>
        <div className="flex flex-col gap-16 ">{leftGrid}</div>
        <div className="flex flex-col gap-16 ">{rightGrid}</div>
      </div>
    </div>
  );
}
