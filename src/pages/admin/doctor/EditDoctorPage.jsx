import { AdminLayout } from "@/components/layout/AdminLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { DoctorForm } from "@/components/forms/DoctorForm";

const doctorFormSchema = z.object({
  name: z.string().min(3, "Nama terlalu pendek").max(50, "Nama terlalu panjang"),
  specialization: z.string().min(1, "Spesialisasi tidak boleh kosong"),
  status: z.string().min(1, "Pilih status layanan"),
});

const EditDoctorPage = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    specialization: "",
    status: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm({
    defaultValues: {
      name: doctor.name || "",
      specialization: doctor.specialization || "",
      status: doctor.status || "",
    },
    resolver: zodResolver(doctorFormSchema),
    reValidateMode: "onSubmit",
  });

  const fetchDoctor = async () => {
    try {
      const doctorResponse = await axiosInstance.get("/doctors/" + params.doctorId);
      setDoctor(doctorResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditDoctor = async (values) => {
    try {
      setIsLoading(true);

      await axiosInstance.patch("/doctors/" + params.doctorId, {
        name: values.name,
        specialization: values.specialization,
        status: values.status,
      });

      toast.success("Berhasil mengedit dokter");
      setTimeout(() => {
        navigate("/admin/doctor");
      }, 2000);
    } catch (err) {
      toast.error("Gagal mengedit dokter. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount
  useEffect(() => {
    fetchDoctor();
  }, []);

  // Mount
  useEffect(() => {
    if (doctor.id) {
      form.reset({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        status: doctor.status || "",
      });
    }
  }, [doctor, form]);

  return (
    <AdminLayout title="Edit Dokter">
      {/* Form */}
      <DoctorForm cardTitle="Edit Dokter" form={form} state={IsLoading} onSubmit={handleEditDoctor} />

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminLayout>
  );
};

export default EditDoctorPage;
