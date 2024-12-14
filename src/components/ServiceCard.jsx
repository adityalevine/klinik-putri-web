import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceCard = (props) => {
  const { img, title, day, time } = props;

  return (
    <Card className="shadow-md mb-5">
      <CardHeader className="p-0">
        <img src={img} alt="Layanan Spesialisasi" width={326} className="rounded-lg" />
        <CardTitle className="ms-6 text-lg text-[#159030]">{title}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex justify-between text-sm mt-2">
        <p>{day}</p>
        <p>{time}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link to="/login">
          <Button className="w-28 bg-[#159030] hover:bg-green-700">Reservasi</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
