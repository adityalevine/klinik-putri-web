import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="min-h-[80vh] pt-36 pb-10 bg-gray-100">
      {/* Hero Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="bg-white shadow-md rounded-lg py-16 md:py-20 px-6 md:px-10 bg-[url('/example.png')]">
            <h1 className="text-xl md:text-4xl font-bold">
              Reservasi Dokter dari Rumah,
              <br /> Lebih Mudah dan Cepat
            </h1>
            <p className="text-gray-500 my-4 md:my-6 text-[12px] md:text-lg">
              Akses layanan reservasi dokter kapan saja, dari mana <br /> saja, tanpa harus ke klinik.
            </p>
            <Link to="/jadwal-dokter">
              <Button className="px-6 py-3 text-base md:text-lg">Reservasi Sekarang</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan Spesialisasi Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-col">
            <h2 className="flex justify-center items-center text-2xl font-semibold pt-10 pb-5">Layanan Spesialisasi</h2>

            <div className="flex flex-wrap justify-center items-center columns-3 gap-5">
              <ServiceCard img="/kebidanan.png" service="Kebidanan dan Kandungan" day="Senin - Sabtu" time="19.00 - 21.00" />

              <ServiceCard img="/kebidanan.png" service="Kejiwaan" day="Setiap Hari" time="15.00 - Selesai" />

              <ServiceCard img="/kebidanan.png" service="THT-KL" day="Setiap Hari" time="15.00 - Selesai" />

              <ServiceCard img="/kebidanan.png" service="Bedah" day="Setiap Hari" time="15.00 - Selesai" />

              <ServiceCard img="/kebidanan.png" service="Umum" day="Setiap Hari" time="24 Jam" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
