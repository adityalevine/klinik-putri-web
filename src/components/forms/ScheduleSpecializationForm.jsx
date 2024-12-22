import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

export const ScheduleSpecializationForm = (props) => {
  const { cardTitle, form, state, onSubmit } = props;

  return (
    <Form {...form}>
      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[540px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#159030]">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Layanan Spesialisasi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih spesialisasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kebidanan dan Kandungan">Kebidanan dan Kandungan</SelectItem>
                        <SelectItem value="Kejiwaan">Kejiwaan</SelectItem>
                        <SelectItem value="Bedah">Bedah</SelectItem>
                        <SelectItem value="THT-KL">THT-KL</SelectItem>
                        <SelectItem value="Jantung">Jantung</SelectItem>
                        <SelectItem value="Umum">Umum</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Nama Dokter Spesialisasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
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
                  <FormLabel className="text-[#159030]">Hari Kerja</FormLabel>
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
              name="desc_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Waktu Kerja</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan waktu" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={state} type="submit" className="w-full bg-[#159030] hover:bg-green-700">
              {state ? "Proses..." : "Simpan"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};