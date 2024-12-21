import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleSpecializationForm } from "@/components/forms/ScheduleSpecializationForm";

const scheduleFormSchema = z.object({
  doctor: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  specialization: z.string().min(1, "Spesialisasi tidak boleh kosong"),
  desc_day: z.string().min(1, "Hari kerja tidak boleh kosong"),
  desc_time: z.string().min(1, "Waktu kerja tidak boleh kosong"),
});

const EditScheduleSpecializationPage = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState({
    id: "",
    doctor: "",
    specialization: "",
    desc_day: "",
    desc_time: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm({
    defaultValues: {
      doctor: schedules.doctor || "",
      specialization: schedules.specialization || "",
      desc_day: schedules.desc_day || "",
      desc_time: schedules.desc_time || "",
    },
    resolver: zodResolver(scheduleFormSchema),
    reValidateMode: "onSubmit",
  });

  const fetchSchedule = async () => {
    try {
      const scheduleResponse = await axiosInstance.get("/schedules_specialization/" + params.scheduleSpecializationId);
      setSchedules(scheduleResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditScheduleSpecialization = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.patch("/schedules_specialization/" + params.scheduleSpecializationId, {
        doctor: values.doctor,
        specialization: values.specialization,
        desc_day: values.desc_day,
        desc_time: values.desc_time,
      });

      toast.success("Berhasil mengedit jadwal dokter spesialisasi");
      setTimeout(() => {
        navigate("/admin/schedule/specialization");
      }, 2000);
    } catch (err) {
      toast.error("Gagal mengedit jadwal dokter spesialisasi. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchSchedule();
  }, []);

  // Mount
  useEffect(() => {
    if (schedules.id) {
      form.reset({
        doctor: schedules.doctor || "",
        specialization: schedules.specialization || "",
        desc_day: schedules.desc_day || "",
        desc_time: schedules.desc_time || "",
      });
    }
  }, [schedules, form]);

  return (
    <AdminLayout title="Edit Jadwal Dokter Spesialisasi">
      {/* Form */}
      <ScheduleSpecializationForm cardTitle="Edit Jadwal Dokter Spesialisasi" form={form} state={IsLoading} onSubmit={handleEditScheduleSpecialization} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default EditScheduleSpecializationPage;
