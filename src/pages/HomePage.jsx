import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const scrollToService = (e) => {
    e.preventDefault();
    const section = document.getElementById("service");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-[80vh] pt-36 pb-10 bg-gray-100">
      {/* Hero Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-wrap justify-center items-center rounded-lg py-10 bg-[#159030]">
            <div className="w-full md:w-1/2 px-5 md:px-0">
              <h1 className="text-xl md:text-4xl font-bold text-white">Reservasi Dokter dari Rumah, Lebih Mudah dan Cepat</h1>
              <p className="my-4 md:my-6 text-[12px] md:text-lg text-white">
                Akses layanan reservasi dokter kapan saja, dari mana <br /> saja, tanpa harus ke klinik.
              </p>
              <a href="#service">
                <Button onClick={scrollToService} className="w-52 text-[#159030] bg-white hover:bg-gray-200">
                  Lihat Spesialisasi
                </Button>
              </a>
            </div>

            <div className="w-full md:w-1/3">
              <img src="/main.svg" alt="Main" width={300} className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Spesialisasi Section */}
      <section id="service">
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-col">
            <h2 className="flex justify-center items-center text-2xl font-semibold pt-20 pb-5 text-[#159030]">Layanan Spesialisasi</h2>

            <div className="flex flex-wrap justify-center items-center columns-3 gap-5">
              <ServiceCard img="/kebidanan.png" title="Kebidanan dan Kandungan" day="Senin - Sabtu" time="19.00 - 21.00" />
              <ServiceCard img="/kejiwaan.png" title="Kejiwaan" day="Setiap Hari" time="15.00 - Selesai" />
              <ServiceCard img="/tht.png" title="THT-KL" day="Setiap Hari" time="15.00 - Selesai" />
              <ServiceCard img="/bedah.png" title="Bedah" day="Setiap Hari" time="15.00 - Selesai" />
              <ServiceCard img="/jantung.png" title="Jantung" day="Setiap Hari" time="15.00 - Selesai" />
              <ServiceCard img="/umum.png" title="Umum" day="Setiap Hari" time="24 Jam" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
