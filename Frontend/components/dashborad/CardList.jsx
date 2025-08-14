import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const AppCardList = ({ title, data }) => {
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">
        {title === "Latest Transactions"
          ? "Latest Transactions"
          : "Latest Projects"}
      </h1>
      <div className="flex flex-col gap-2">
        {data?.map((item, index) => (
          <Card
            key={index}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className={`w-12 h-12 flex items-center justify-center border rounded-sm relative overflow-hidden font-bold ${title === "Latest Transactions" ? 'bg-[#FF9500]' : 'bg-[#FF7139]'} `}>
              {title === "Latest Transactions" ? "INV" : "Pro"}
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium ">
                {item.name}
              </CardTitle>
              <Badge variant="secondary">{item.detail}</Badge>
            </CardContent>
            <CardFooter className="p-0 text-xs">{item.value}.00</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppCardList;
