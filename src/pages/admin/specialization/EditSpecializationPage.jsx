import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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

const EditSpecializationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [specialization, setSpecialization] = useState({
    id: "",
    image: "",
    specialization: "",
    desc_time: "",
    desc_day: "",
    status: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm({
    defaultValues: {
      image: specialization.image || "",
      specialization: specialization.specialization || "",
      desc_time: specialization.desc_time || "",
      desc_day: specialization.desc_day || "",
      status: specialization.status || "",
    },
    resolver: zodResolver(specializationFormSchema),
    reValidateMode: "onSubmit",
  });

  const fetchSpecialization = async () => {
    try {
      const specializationResponse = await axiosInstance.get("/reservations/" + params.specializationId);
      setSpecialization(specializationResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSpecialization = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.patch("/reservations/" + params.specializationId, {
        image: values.image,
        specialization: values.specialization,
        desc_time: values.desc_time,
        desc_day: values.desc_day,
        status: values.status,
      });

      toast.success("Berhasil mengedit spesialisasi");
      setTimeout(() => {
        navigate("/admin/specialization");
      }, 2000);
    } catch (err) {
      toast.error("Gagal mengedit spesialisasi. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchSpecialization();
  }, []);

  // Mount & Update
  useEffect(() => {
    if (specialization.id) {
      form.reset({
        image: specialization.image || "",
        specialization: specialization.specialization || "",
        desc_time: specialization.desc_time || "",
        desc_day: specialization.desc_day || "",
        status: specialization.status || "",
      });
    }
  }, [specialization, form]);

  return (
    <AdminLayout title="Edit Spesialisasi">
      {/* Form */}
      <SpecializationForm cardTitle="Edit Spesialisasi" form={form} state={isLoading} onSubmit={handleEditSpecialization} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default EditSpecializationPage;
