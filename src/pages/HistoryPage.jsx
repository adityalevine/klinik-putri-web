import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "@/components/ui/spinner";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [historyIsLoading, setHistoryIsLoading] = useState(false);
  const userSelector = useSelector((state) => state.user);

  const handleDelete = () => {};

  const ReservationsHistory = async () => {
    try {
      setHistoryIsLoading(true);

      const historyResponse = await axiosInstance.get("/reservations", {
        params: {
          userId: userSelector.id,
        },
      });
      setHistories(historyResponse.data);
    } catch (err) {
      console.log(err);
    } finally {
      setHistoryIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    ReservationsHistory();
  }, []);

  return (
    <main className="min-h-[80vh] pt-20 pb-10 bg-gray-100">
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* History Header Section */}
      <section className="bg-[#159030] text-white py-10">
        <div className="container mx-auto px-5 md:px-32 text-center">
          <h2 className="text-2xl font-semibold mb-5">Riwayat Reservasi</h2>

          {/* Breadcrumb */}
          <Breadcrumb className="flex justify-center items-center">
            <BreadcrumbList className="text-white">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-bold">Riwayat Reservasi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* History Content Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32 mt-10">
          {/* Table */}
          <Table className="border text-center">
            <TableCaption />
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-black">Tanggal</TableHead>
                <TableHead className="text-center text-black">Waktu</TableHead>
                <TableHead className="text-center text-black">Spesialisasi</TableHead>
                <TableHead className="text-center text-black">Nama</TableHead>
                <TableHead className="text-center text-black">Status</TableHead>
                <TableHead className="text-center text-black">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            {historyIsLoading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              <TableBody>
                {histories.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>{history.date}</TableCell>
                    <TableCell>{history.time}</TableCell>
                    <TableCell>{history.specialization}</TableCell>
                    <TableCell>{history.name}</TableCell>
                    <TableCell>{history.status}</TableCell>
                    <TableCell>
                      <Button className="w-28 bg-[#159030] hover:bg-green-700">Batalkan</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </section>
    </main>
  );
};

export default HistoryPage;
