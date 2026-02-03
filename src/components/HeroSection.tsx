const HeroSection = () => {
  return (
    <section className="relative w-full h-screen">
      <picture>
        <source 
          media="(min-width: 768px)" 
          srcSet="/images/hero-desktop.webp" 
          type="image/webp"
        />
        <source 
          media="(max-width: 767px)" 
          srcSet="/images/hero-mobile.webp" 
          type="image/webp"
        />
        <img
          src="/images/hero-desktop.webp"
          alt="Hero Banner"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </picture>

      {/* ...existing hero content overlay... */}
    </section>
  );
};

export default HeroSection;
