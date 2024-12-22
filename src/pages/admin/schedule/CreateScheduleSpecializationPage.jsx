import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ScheduleSpecializationForm } from "@/components/forms/ScheduleSpecializationForm";

const scheduleFormSchema = z.object({
  doctor: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  specialization: z.string().min(1, "Pilih layanan spesialisasi"),
  desc_day: z.string().min(1, "Hari kerja tidak boleh kosong"),
  desc_time: z.string().min(1, "Waktu kerja tidak boleh kosong"),
});

const CreateScheduleSpecializationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      doctor: "",
      specialization: "",
      desc_day: "",
      desc_time: "",
    },
    resolver: zodResolver(scheduleFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateScheduleSpecialization = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.post("/schedules_specialization", {
        doctor: values.doctor,
        specialization: values.specialization,
        desc_day: values.desc_day,
        desc_time: values.desc_time,
      });

      toast.success("Berhasil membuat jadwal dokter spesialisasi");
      form.reset();
      setTimeout(() => {
        navigate("/admin/schedule/specialization");
      }, 2000);
    } catch (err) {
      toast.error("Gagal membuat jadwal dokter spesialisasi. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Buat Jadwal Dokter Spesialisasi">
      {/* Form */}
      <ScheduleSpecializationForm cardTitle="Tambahkan Jadwal Dokter baru" form={form} state={isLoading} onSubmit={handleCreateScheduleSpecialization} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default CreateScheduleSpecializationPage;
