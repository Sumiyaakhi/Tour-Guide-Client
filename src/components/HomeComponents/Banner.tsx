const Banner: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen md:mt-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(https://www.smarttrip.it/assets/home_1.jpg)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 ">
        <div className="flex py-20 flex-col h-full justify-center items-center text-center  px-6 md:px-12 max-w-5xl mx-auto bg-white/10 backdrop-blur-md">
          <h1 className="text-teal-500 text-4xl md:text-6xl font-bold font-brand">
            Travel Smarter, Not Harder
          </h1>
          <p className="text-white text-lg md:text-xl mt-4 max-w-3xl font-body">
            Are you ready for the most incredible semester of your life?
            Studying abroad in Europe is a once-in-a-lifetime opportunity to
            experience the beauty and diversity of another side of the world! It
            is important to make the most of your study abroad experience, and
            that is why Smart Trip is here to help. Sit back, relax, and let us
            take care of the planning. Fill your weekends with exotic adventures
            to Budapest, Interlaken, Munich, and Prague!
          </p>
        </div>
      </div>

      {/* Dots for slider */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full" />
        <div className="w-3 h-3 bg-orange-500 rounded-full" />
      </div>
    </div>
  );
};

export default Banner;
