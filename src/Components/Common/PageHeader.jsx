function PageHeader({ pageSubTitle, pageTitle }) {
  return (
    <div className="bg-[#07332F]">
      <div className="pt-44 pb-12 md:pt-[30vh] md:text-start text-center mx-auto md:pb-24 md:pl-28 text-white">
        <p className="text-base md:text-xl">{pageSubTitle}</p>
        <h1 className="text-3xl md:text-5xl md:font-black">{pageTitle}</h1>
      </div>
    </div>
  );
}

export default PageHeader;
