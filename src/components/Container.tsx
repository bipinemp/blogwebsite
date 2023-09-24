interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-28 2xl:px-52">
      {children}
    </div>
  );
}
