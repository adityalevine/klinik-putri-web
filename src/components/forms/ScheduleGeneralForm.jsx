import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const ScheduleGeneralForm = (props) => {
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
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Waktu (WIT)</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan waktu" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Senin</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tuesday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Selasa</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wednesday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Rabu</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thursday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Kami</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="friday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Jumat</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saturday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Sabtu</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sunday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#159030]">Minggu</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama dokter" {...field} />
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
