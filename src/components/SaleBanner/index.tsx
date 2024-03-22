const SaleBanner = () => {
  return (
    <div className="w-full bg-blue-500 text-white">
      <div className="overflow-hidden h-15  py-5 px-2 items-center overflow-hidden flex justify-around items-center">
        <div className="whitespace-nowrap py-2">🔥 Huge Sale - 50% Off Everything! 🔥</div>
        <div className="hidden md:inline whitespace-nowrap py-2">🔥 Huge Sale - 50% Off Everything! 🔥</div>
      </div>
    </div>
  );
};

export default SaleBanner;
