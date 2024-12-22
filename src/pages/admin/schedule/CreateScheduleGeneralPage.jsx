import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ScheduleGeneralForm } from "@/components/forms/ScheduleGeneralForm";

const scheduleFormSchema = z.object({
  time: z.string().min(1, "Waktu kerja tidak boleh kosong"),
  monday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  tuesday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  wednesday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  thursday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  friday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  saturday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  sunday: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
});

const CreateScheduleGeneralPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      time: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    resolver: zodResolver(scheduleFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateScheduleGeneral = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.post("/schedules_general", {
        time: values.time,
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
        saturday: values.saturday,
        sunday: values.sunday,
      });

      toast.success("Berhasil membuat jadwal dokter umum");
      form.reset();
      setTimeout(() => {
        navigate("/admin/schedule/general");
      }, 2000);
    } catch (err) {
      toast.error("Gagal membuat jadwal dokter umum. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Buat Jadwal Dokter Umum">
      {/* Form */}
      <ScheduleGeneralForm cardTitle="Tambahkan Jadwal Dokter baru" form={form} state={isLoading} onSubmit={handleCreateScheduleGeneral} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default CreateScheduleGeneralPage;
