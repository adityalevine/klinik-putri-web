import Spinner from "@/components/ui/spinner";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

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

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);

      const scheduleResponse = await axiosInstance.get("/schedules_specialization");

      setSchedules(scheduleResponse.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <main className="min-h-[80vh] pt-36 pb-10 bg-gray-100">
      {/* Dokter Umum & Spesialis Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-[#159030]">Dokter Umum</h2>
            <p className="text-xs md:text-sm my-6">Jadwal Dokter Umum 25 November - 1 Desember 2024</p>

            {/* Table */}
            <Table className="border text-center">
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
                <TableRow>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center pt-10">
            <h2 className="text-2xl font-semibold text-[#159030]">Dokter Spesialis</h2>
            <p className="text-xs md:text-sm my-6">Jadwal Dokter Spesialis Tahun 2024</p>

            {/* Table */}
            <Table className="border text-center">
              <TableCaption />
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-black">Spesialis</TableHead>
                  <TableHead className="text-center text-black">Nama Dokter</TableHead>
                  <TableHead className="text-center text-black">Hari</TableHead>
                  <TableHead className="text-center text-black">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              {IsLoading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.specialization}</TableCell>
                      <TableCell>{schedule.doctor}</TableCell>
                      <TableCell>{schedule.desc_day}</TableCell>
                      <TableCell>{schedule.desc_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SchedulePage;
