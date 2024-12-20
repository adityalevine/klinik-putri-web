import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

const specializationFormSchema = z.object({
  image_url: z.string().url("URL gambar tidak valid").nonempty("Gambar harus diunggah"),
  specialization: z.string().nonempty("Layanan spesialisasi harus diisi"),
  desc_time: z.string().nonempty("Jam layanan harus diisi"),
  desc_day: z.string().nonempty("Hari layanan harus diisi"),
  status: z.string().nonempty("Status layanan harus dipilih"),
});

export const SpecializationAddForm = ({ isOpen, onClose }) => {
  const [IsLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      image_url: "",
      specialization: "",
      desc_time: "",
      desc_day: "",
      status: "",
    },
    resolver: zodResolver(specializationFormSchema),
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
        toast.error("Specialization is already taken");
        return;
      }

      await axiosInstance.post("/reservations", {
        image_url: values.image_url,
        specialization: values.specialization,
        desc_time: values.desc_time,
        desc_day: values.desc_day,
        status: values.status,
      });

      toast.success("Berhasil membuat spesialisasi");
      form.reset();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      toast.error("Gagal membuat spesialisasi. Silakan coba lagi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="h-20 flex justify-center px-10 bg-[#159030] text-white rounded-t">
            <DialogTitle className="text-2xl font-semibold">Tambah Data</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateSpecialization)} className="space-y-4 px-10">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan url" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layanan Spesialisasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan spesialisasi" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Layanan</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan jam" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari Layanan</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan hari" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Layanan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pb-4">
                <Button type="button" variant="outline" className="w-28 text-[#159030] hover:text-[#159030] border-[#159030]" onClick={onClose}>
                  Batal
                </Button>
                <Button disabled={IsLoading} onClick={form.handleSubmit(handleCreateSpecialization)} type="submit" className="w-28 bg-[#159030] hover:bg-green-700">
                  {IsLoading ? "Proses..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
