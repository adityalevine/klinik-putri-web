import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const generalRaw = [
  {
    time: "08.00 - 14.00",
    days: ["dr. Loretha", "dr. Gally", "dr. Christin", "dr. Rona", "dr. Loretha", "dr. Loretha", "dr. Rona"],
  },
  {
    time: "14.00 - 21.00",
    days: ["dr. Loretha", "dr. Gally", "dr. Patrick", "dr. Rona", "dr. Christin", "dr. Patrick", "dr. Rona"],
  },
  {
    time: "21.00 - 08.00",
    days: ["dr. Rona", "dr. Gally", "dr. Patrick", "dr. Rona", "dr. Gally", "dr. Patrick", "dr. Rona"],
  },
];

const specialistRaw = [
  {
    specialty: "Kandungan",
    doctor: "dr. Imanuel. S. Auparay, Sp.O.G",
    days: "Senin - Sabtu",
    time: "19.00 - 21.00",
  },
  {
    specialty: "Kejiwaan",
    doctor: "dr. Octhavianti Palyngan Sp.KJ",
    days: "Setiap Hari",
    time: "15.00 - Selesai",
  },
  {
    specialty: "Bedah",
    doctor: "dr. Emmy Palingan.Sp.B",
    days: "Setiap Hari",
    time: "15.00 - Selesai",
  },
  {
    specialty: "THT-KL",
    doctor: "dr. Roland Mangonta.Sp.T.H.T.K.L",
    days: "Setiap Hari",
    time: "15.00 - Selesai",
  },
  {
    specialty: "Jantung",
    doctor: "dr. Rini Anastasia, Sp.JP",
    days: "Setiap Hari",
    time: "15.00 - Selesai",
  },
];

const SchedulePage = () => {
  return (
    <main className="min-h-[80vh] pt-36 pb-10 bg-gray-100">
      {/* Dokter Umum & Spesialis Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#159030]">Dokter Umum</h2>
            <p className="text-xs md:text-sm my-6">Jadwal Dokter Umum 25 November - 1 Desember 2024</p>

            {/* Table */}
            <Table className="border text-center bg-white">
              <TableCaption />
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-black">Waktu (WIT)</TableHead>
                  <TableHead className="text-center text-black">Senin</TableHead>
                  <TableHead className="text-center text-black">Selasa</TableHead>
                  <TableHead className="text-center text-black">Rabu</TableHead>
                  <TableHead className="text-center text-black">Kamis</TableHead>
                  <TableHead className="text-center text-black">Jumat</TableHead>
                  <TableHead className="text-center text-black">Sabtu</TableHead>
                  <TableHead className="text-center text-black">Minggu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generalRaw.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{schedule.time}</TableCell>
                    {schedule.days.map((doctor, dayIndex) => (
                      <TableCell key={dayIndex}>{doctor}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center pt-10">
            <h2 className="text-2xl font-semibold text-[#159030]">Dokter Spesialis</h2>
            <p className="text-xs md:text-sm my-6">Jadwal Dokter Spesialis Tahun 2024</p>

            {/* Table */}
            <Table className="border text-center bg-white">
              <TableCaption />
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-black">Spesialis</TableHead>
                  <TableHead className="text-center text-black">Nama Dokter</TableHead>
                  <TableHead className="text-center text-black">Hari</TableHead>
                  <TableHead className="text-center text-black">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialistRaw.map((specialist, index) => (
                  <TableRow key={index}>
                    <TableCell>{specialist.specialty}</TableCell>
                    <TableCell>{specialist.doctor}</TableCell>
                    <TableCell>{specialist.days}</TableCell>
                    <TableCell>{specialist.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SchedulePage;
