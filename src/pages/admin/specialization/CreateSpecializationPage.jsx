import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SpecializationForm } from "@/components/forms/SpecializationForm";

const specializationFormSchema = z.object({
  image: z
    .string()
    .nonempty("Harap pilih gambar untuk diunggah")
    .optional()
    .refine((base64) => !base64 || base64.startsWith("data:image/"), "Hanya string gambar yang valid yang diperbolehkan"),
  specialization: z.string().min(1, "Spesialisasi tidak boleh kosong"),
  desc_time: z.string().min(1, "Jam layanan tidak boleh kosong"),
  desc_day: z.string().min(1, "Hari layanan tidak boleh kosong"),
  status: z.string().min(1, "Pilih status layanan"),
});

const CreateSpecializationPage = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      image: "",
      specialization: "",
      desc_time: "",
      desc_day: "",
      status: "",
    },
    resolver: zodResolver(specializationFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateSpecialization = async (values) => {
    try {
      setIsLoading(true);

      const specializationResponse = await axiosInstance.get("/reservations", {
        params: {
          specialization: values.specialization,
        },
      });

      if (specializationResponse.data.length) {
        toast.error("Spesialisasi sudah digunakan");
        return;
      }

      await axiosInstance.post("/reservations", {
        image: values.image,
        specialization: values.specialization,
        desc_time: values.desc_time,
        desc_day: values.desc_day,
        status: values.status,
      });

      toast.success("Berhasil membuat spesialisasi");
      form.reset();
      setTimeout(() => {
        navigate("/admin/specialization");
      }, 2000);
    } catch (err) {
      toast.error("Gagal membuat spesialisasi. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Buat Spesialisasi">
      {/* Form */}
      <SpecializationForm cardTitle="Tambahkan spesialisasi baru" form={form} state={IsLoading} onSubmit={handleCreateSpecialization} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default CreateSpecializationPage;
