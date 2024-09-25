interface TitleProps {
  title: string;
}
const SectionTitle = ({ title }: TitleProps) => {
  return (
    <h2 className="text-5xl text-center font-bold py-16 mb-4 font-dancingScript capitalize">
      {title}
    </h2>
  );
};

export default SectionTitle;
