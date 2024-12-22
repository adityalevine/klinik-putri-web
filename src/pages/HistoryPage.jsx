import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "@/components/ui/spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SignedInPage } from "@/components/guard/SignedInPage";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userSelector = useSelector((state) => state.user);

  const handleDeleteHistory = async (historyId) => {
    try {
      await axiosInstance.delete("/history/" + historyId);

      toast.success("Berhasil menghapus");
      fetchHistory();
    } catch (err) {
      toast.error("Gagal menghapus. Silakan coba lagi");
      console.log(err);
    }
  };

  const handleCancel = async (historyId) => {
    try {
      await axiosInstance.patch("/history/" + historyId, {
        status: "Batal",
      });

      toast.success("Reservasi berhasil dibatalkan");
      fetchHistory();
    } catch (err) {
      toast.error("Gagal membatalkan reservasi. Silakan coba lagi");
      console.log(err);
    }
  };

  const fetchHistory = async () => {
    try {
      setIsLoading(true);

      const historyResponse = await axiosInstance.get("/history", {
        params: {
          userId: userSelector.id,
        },
      });

      setHistories(historyResponse.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <SignedInPage>
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
              {isLoading ? (
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
                        {history.status === "Selesai" ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="w-28 bg-[#159030] hover:bg-green-700">Hapus</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Reservarsi</AlertDialogTitle>
                                <AlertDialogDescription>Apakah Anda yakin ingin menghapus?</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  onClick={() => {
                                    handleDeleteHistory(history.id);
                                  }}
                                >
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Button disabled={history.status === "Batal"} onClick={() => handleCancel(history.id)} className="w-28 bg-[#159030] hover:bg-green-700">
                            Batalkan
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </section>
      </main>
    </SignedInPage>
  );
};

export default HistoryPage;
