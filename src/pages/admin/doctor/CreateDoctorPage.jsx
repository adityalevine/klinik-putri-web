import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DoctorForm } from "@/components/forms/DoctorForm";

const doctorFormSchema = z.object({
  name: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  specialization: z.string().min(1, "Pilih layanan spesialisasi"),
  status: z.string().min(1, "Pilih status layanan"),
});

const CreateDoctorPage = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      specialization: "",
      status: "",
    },
    resolver: zodResolver(doctorFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateDoctor = async (values) => {
    try {
      setIsLoading(true);

      const doctorResponse = await axiosInstance.get("/doctors", {
        params: {
          name: values.name,
        },
      });

      if (doctorResponse.data.length) {
        toast.error("Nama Dokter sudah digunakan");
        return;
      }

      await axiosInstance.post("/doctors", {
        name: values.name,
        specialization: values.specialization,
        status: values.status,
      });

      toast.success("Berhasil membuat dokter");
      form.reset();
      setTimeout(() => {
        navigate("/admin/doctor");
      }, 2000);
    } catch (err) {
      toast.error("Gagal membuat dokter. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Buat Dokter">
      {/* Form */}
      <DoctorForm cardTitle="Tambahkan Dokter baru" form={form} state={IsLoading} onSubmit={handleCreateDoctor} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default CreateDoctorPage;
