function SectionTitle({ heading, subHeading }) {
  return (
    <div className="text-center max-w-screen-xl mx-auto px-2">
      <h1 className="text-xl md:text-4xl font-bold">-----{heading}-----</h1>
      <p className="md:text-base text-sm">{subHeading}</p>
    </div>
  );
}

export default SectionTitle;
