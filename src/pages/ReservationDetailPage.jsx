import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import SelectTime from "@/components/SelectTime";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";

const FormSchema = z.object({
  date: z.date({
    required_error: "Hari reservasi dokter diperlukan",
  }),
});

const ReservationDetailPage = () => {
  const params = useParams();
  const [reservation, setReservation] = useState({
    id: 0,
    img: "",
    specialization: "",
    day: "",
    time: "",
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const userSelector = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const fetchReservations = async () => {
    try {
      const reservationResponse = await axiosInstance.get("/reservations/" + params.reservationId);
      setReservation(reservationResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReservation = async (values) => {
    try {
      const reservationResponse = await axiosInstance.post("/history", {
        userId: userSelector.id,
        date: format(values.date, "yyyy-MM-dd", { locale: localeId }),
        time: values.time,
        specialization: values.specialization,
      });
      console.log(reservationResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <main className="min-h-[80vh] pt-20 pb-10 bg-gray-100">
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Reservation Header Section */}
      <section className="bg-[#159030] text-white py-10">
        <div className="container mx-auto px-5 md:px-32 text-center">
          <h2 className="text-2xl font-semibold mb-5">Detail Spesialis</h2>

          {/* Breadcrumb */}
          <Breadcrumb className="flex justify-center items-center">
            <BreadcrumbList className="text-white">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-bold">Detail Spesialis</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Reservation Content Section */}
      <section>
        <div className="container mx-auto px-5 md:px-32 mt-10">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2">
              <h2>Tanggal dan Waktu Konsultasi</h2>

              {/* Form, Popover & Calendar*/}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleReservation)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel />
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={"outline"} className={`w-[240px] pl-3 text-left font-normal border-[#159030] text-[#159030] bg-white hover:bg-[#159030] hover:text-white`}>
                                {field.value ? format(field.value, "dd-MM-yyyy", { locale: localeId }) : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>

                <div className="flex flex-col justify-center items-center columns-5">
                  {/* Mengirim waktu yang dipilih ke state */}
                  <SelectTime onTimeSelect={handleTimeSelect} />
                </div>
              </Form>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center -mt-[375px]">
              <Card className="w-2/3">
                <CardHeader>
                  <CardTitle className="text-center">Dokter {reservation.specialization}</CardTitle>
                  <CardDescription />
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p>{reservation.day}</p>
                  <p>{reservation.time}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={form.handleSubmit(handleReservation)} className="w-full bg-[#159030] hover:bg-green-700">
                    Buat Reservasi
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservationDetailPage;
