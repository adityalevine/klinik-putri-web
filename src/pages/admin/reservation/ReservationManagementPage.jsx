import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoCheckmark } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Toaster, toast } from "react-hot-toast";

const ReservationManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [histories, setHistories] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);

    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);

    setSearchParams(searchParams);
  };

  const searchUser = () => {
    if (userName) {
      searchParams.set("search", userName);

      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");

      setSearchParams(searchParams);
    }
  };

  const fetchHistories = async () => {
    try {
      setIsLoading(true);

      const userResponse = await axiosInstance.get("/history", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          name: searchParams.get("search"),
        },
      });

      setHasNextPage(Boolean(userResponse.data.next));
      setHistories(userResponse.data.data);
      setLastPage(userResponse.data.last);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async (historyId) => {
    try {
      await axiosInstance.delete("/history/" + historyId);

      toast.success("Berhasil menghapus");
      fetchHistories();
    } catch (err) {
      toast.error("Gagal menghapus. Silakan coba lagi");
      console.log(err);
    }
  };

  const handleCheckHistory = async (historyId) => {
    try {
      await axiosInstance.patch("/history/" + historyId, {
        status: "Selesai",
      });

      toast.success("Status berhasil diperbarui");
      fetchHistories();
    } catch (err) {
      toast.error("Gagal memperbarui status. Silakan coba lagi");
      console.log(err);
    }
  };

  // Mount & Update
  useEffect(() => {
    if (searchParams.get("page")) {
      fetchHistories();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  // Mount & Update
  useEffect(() => {
    if (!searchParams.get("page") || Number(searchParams.get("page")) < 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else if (lastPage && Number(searchParams.get("page")) > lastPage) {
      searchParams.set("page", lastPage);
      setSearchParams(searchParams);
    }
  }, [lastPage]);

  return (
    <AdminLayout title="Riwayat Reservasi Pasien">
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Search */}
      <div className="mb-8">
        <Label>Cari Nama Pasien</Label>
        <div className="flex gap-4">
          <Input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-[250px] lg:w-[400px]" placeholder="Cari pasien..." />
          <Button onClick={searchUser} className="bg-[#159030] hover:bg-green-700">
            Cari
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="p-4 text-center border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-black">No</TableHead>
            <TableHead className="text-center text-black">Tanggal</TableHead>
            <TableHead className="text-center text-black">Waktu</TableHead>
            <TableHead className="text-center text-black">Spesialisasi</TableHead>
            <TableHead className="text-center text-black">Pasien</TableHead>
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
            {histories.map((history, index) => {
              return (
                <TableRow key={history.id}>
                  <TableCell>{(Number(searchParams.get("page")) - 1) * 5 + index + 1}</TableCell>
                  <TableCell>{history.date}</TableCell>
                  <TableCell>{history.time}</TableCell>
                  <TableCell>{history.specialization}</TableCell>
                  <TableCell>{history.name}</TableCell>
                  <TableCell>{history.status}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2 ">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash className="h-6 w-6" />
                          </Button>
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
                      <Button
                        onClick={() => handleCheckHistory(history.id)}
                        variant="outline"
                        size="icon"
                        className={`text-white hover:text-white ${history.status === "Proses" ? "bg-gray-400 hover:bg-green-700" : "bg-[#159030] hover:bg-green-700"}`}
                      >
                        <IoCheckmark className="h-6 w-6" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <Button disabled={searchParams.get("page") == 1} onClick={handlePreviousPage} variant="ghost">
              <ChevronLeft className="w-6 h-6 mr-2" />
              Sebelumnya
            </Button>
          </PaginationItem>

          <PaginationItem className="mx-8 font-semibold">Halaman {searchParams.get("page")}</PaginationItem>

          <PaginationItem>
            <Button disabled={!hasNextPage} onClick={handleNextPage} variant="ghost">
              Berikutnya <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default ReservationManagementPage;