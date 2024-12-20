import { ReservationCard } from "@/components/ReservationCard";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const scrollToService = (e) => {
    e.preventDefault();
    const section = document.getElementById("service");
    section.scrollIntoView({ behavior: "smooth" });
  };

  const [reservations, setReservations] = useState([]);

  const reservationsList = reservations.map((reservation) => {
    return (
      <ReservationCard key={reservation.id} id={reservation.id} image_url={reservation.image_url} specialization={reservation.specialization} desc_day={reservation.desc_day} desc_time={reservation.desc_time} status={reservation.status} />
    );
  });

  const fetchReservations = async () => {
    try {
      const reservationsResponse = await axiosInstance.get("/reservations");

      setReservations(reservationsResponse.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // Mount
  useEffect(() => {
    fetchReservations();
  }, []);

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

            <div className="flex flex-wrap justify-center items-center columns-3 gap-5">{reservationsList}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
