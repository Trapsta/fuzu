import { SunIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

const LocationCard = ({ location }: any) => {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h3 className="text-xl font-semibold leading-none text-default-600">
              32 C
            </h3>
            <SunIcon
              width={32}
              height={32}
              className="absolute top-2 right-2"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="mt-3 px-3 py-3 text-small text-default-400">
        <p className="font-bold">{location}</p>
      </CardBody>
    </Card>
  );
};

export default LocationCard;
