import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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

const EditScheduleGeneralPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState({
    id: "",
    time: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm({
    defaultValues: {
      time: schedules.time || "",
      monday: schedules.monday || "",
      tuesday: schedules.tuesday || "",
      wednesday: schedules.wednesday || "",
      thursday: schedules.thursday || "",
      friday: schedules.friday || "",
      saturday: schedules.saturday || "",
      sunday: schedules.sunday || "",
    },
    resolver: zodResolver(scheduleFormSchema),
    reValidateMode: "onSubmit",
  });

  const fetchSchedule = async () => {
    try {
      const scheduleResponse = await axiosInstance.get("/schedules_general/" + params.scheduleGeneralId);
      setSchedules(scheduleResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditScheduleGeneral = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.patch("/schedules_general/" + params.scheduleGeneralId, {
        time: values.time,
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
        saturday: values.saturday,
        sunday: values.sunday,
      });

      toast.success("Berhasil mengedit jadwal dokter umum");
      setTimeout(() => {
        navigate("/admin/schedule/general");
      }, 2000);
    } catch (err) {
      toast.error("Gagal mengedit jadwal dokter umum. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchSchedule();
  }, []);

  // Mount & Update
  useEffect(() => {
    if (schedules.id) {
      form.reset({
        time: schedules.time || "",
        monday: schedules.monday || "",
        tuesday: schedules.tuesday || "",
        wednesday: schedules.wednesday || "",
        thursday: schedules.thursday || "",
        friday: schedules.friday || "",
        saturday: schedules.saturday || "",
        sunday: schedules.sunday || "",
      });
    }
  }, [schedules, form]);

  return (
    <AdminLayout title="Edit Jadwal Dokter Umum">
      {/* Form */}
      <ScheduleGeneralForm cardTitle="Edit Jadwal Dokter Umum" form={form} state={isLoading} onSubmit={handleEditScheduleGeneral} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default EditScheduleGeneralPage;
