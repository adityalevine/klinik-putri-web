import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nama terlalu pendek")
    .max(50, "Nama terlalu panjang")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf dan spasi"),
  username: z
    .string()
    .min(3, "Username kurang dari 3 karakter")
    .max(16, "Username lebih dari 16 karakter")
    .regex(/^[a-z0-9]+$/, "Username hanya boleh berisi huruf kecil dan angka."),
  password: z.string().min(8, "Password kurang dari 8 karakter"),
});

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      role: "User",
      name: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = (values) => {
    alert(values);
    console.log(values);
  };

  return (
    <main className="min-h-[80vh] pt-36 pb-10 bg-gray-100">
      <section>
        <div className="container mx-auto px-5 md:px-32">
          <div className="flex flex-col justify-center items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-lg">
                <Card className="p-5">
                  <CardHeader>
                    <CardTitle className="text-center">
                      <h1>Registrasi</h1>
                    </CardTitle>
                    <CardDescription />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan Nama" {...field} />
                          </FormControl>
                          <FormDescription>Nama wajib diisi dan hanya boleh mengandung huruf alfabet</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan Username" {...field} />
                          </FormControl>
                          <FormDescription>Username harus terdiri dari 3 hingga 16 karakter</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kata Sandi</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan Kata Sandi" {...field} type="password" />
                          </FormControl>
                          <FormDescription>Kata sandi harus terdiri dari minimal 8 karakter</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-col w-full">
                      <Button type="submit">Registrasi</Button>
                      <div className="text-center mt-4">
                        <p className="text-gray-500">
                          Sudah punya akun?
                          <Link to="/login">
                            <Button variant="link" className="p-1">
                              Masuk
                            </Button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
