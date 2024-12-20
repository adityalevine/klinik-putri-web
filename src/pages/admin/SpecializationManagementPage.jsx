import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Toaster, toast } from "react-hot-toast";
import { SpecializationAddForm } from "@/components/forms/SpecializationAddForm";
import { SpecializationEditForm } from "@/components/forms/SpecializationEditForm";

const SpecializationManagementPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // New state for Edit dialog
  const [selectedSpecialization, setSelectedSpecialization] = useState(null); // Store selected specialization
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
  const handleEditDialogOpen = (specialization, userId) => {
    setSelectedSpecialization(specialization);
    setSelectedUserId(userId);
    setIsEditDialogOpen(true); // Open the edit dialog
  };
  const handleEditDialogClose = () => setIsEditDialogOpen(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reservations, setReservations] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [specializationName, setSpecializationName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);

    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);

    setSearchParams(searchParams);
  };

  const searchSpecialization = () => {
    if (specializationName) {
      searchParams.set("search", specializationName);

      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");

      setSearchParams(searchParams);
    }
  };

  const fetchReservations = async () => {
    try {
      setIsLoading(true);

      const userResponse = await axiosInstance.get("/reservations", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          specialization: searchParams.get("search"),
        },
      });

      setHasNextPage(Boolean(userResponse.data.next));
      setReservations(userResponse.data.data);
      setLastPage(userResponse.data.last);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount & Update
  useEffect(() => {
    if (searchParams.get("page")) {
      fetchReservations();
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
    <AdminLayout
      title="Daftar Layanan Spesialisasi"
      rightSection={
        <Button onClick={handleDialogOpen} className="w-28 bg-[#159030] hover:bg-green-700">
          <IoAdd className="h-6 w-6 mr-2" />
          Tambah
        </Button>
      }
    >
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dialog Tambah Spesialisasi */}
      <SpecializationAddForm isOpen={isDialogOpen} onClose={handleDialogClose} />

      {/* Dialog Edit Spesialisasi */}
      {selectedSpecialization && selectedUserId && <SpecializationEditForm isOpen={isEditDialogOpen} onClose={handleEditDialogClose} specialization={selectedSpecialization} userId={selectedUserId} />}

      {/* Search */}
      <div className="mb-8">
        <Label>Cari Nama Spesialisasi</Label>
        <div className="flex gap-4">
          <Input value={specializationName} onChange={(e) => setSpecializationName(e.target.value)} className="w-[250px] lg:w-[400px]" placeholder="Cari spesialisasi..." />
          <Button onClick={searchSpecialization} className="bg-[#159030] hover:bg-green-700">
            Cari
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="p-4 text-center border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-black">No</TableHead>
            <TableHead className="text-center text-black">Spesialisasi</TableHead>
            <TableHead className="text-center text-black">Jam Layanan</TableHead>
            <TableHead className="text-center text-black">Hari</TableHead>
            <TableHead className="text-center text-black">Status</TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
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
            {reservations.map((reservation, index) => {
              return (
                <TableRow key={reservation.id}>
                  <TableCell>{(Number(searchParams.get("page")) - 1) * 5 + index + 1}</TableCell>
                  <TableCell>{reservation.specialization}</TableCell>
                  <TableCell>{reservation.desc_time}</TableCell>
                  <TableCell>{reservation.desc_day}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>
                    <Link>
                      <Button onClick={() => handleEditDialogOpen(reservation.specialization, reservation.id)} variant="outline" size="icon" className="text-white hover:text-white bg-[#159030] hover:bg-green-700">
                        <Edit className="h-6 w-6" />
                      </Button>
                    </Link>
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

export default SpecializationManagementPage;
