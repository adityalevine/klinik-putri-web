import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactCard = (props) => {
  const { icon: Icon, title, description, link } = props;

  return (
    <a href={link} target="_blank">
      <Card className="w-[350px] md:w-96 h-32 shadow-md mb-5 cursor-pointer">
        <CardHeader className="p-0">
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent className="flex justify-start text-sm p-10">
          <Icon className="w-10 h-10 mr-2" />
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-gray-500">{description}</p>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </a>
  );
};
