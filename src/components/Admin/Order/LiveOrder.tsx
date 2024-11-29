"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import sampleorder from "../../../../sampleorder.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const LiveOrder = () => {
  const [liveOrder, setLiveOrder] = useState(sampleorder);

  const handleOrderReady = (id: string, orderStatus: string) => {
    setLiveOrder((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, orderStatus: orderStatus } : item
      )
    );
  };

  const OrderItems = ({ items }: { items: any[] }) => (
    <>
      {items.map((elem) => (
        <div className="flex justify-between mb-10" key={elem.id}>
          <div className="flex flex-col gap-2">
            <div className="capitalize">
              {elem.quantity} &#10799; {elem.name}
            </div>
            <span className="capitalize">{elem.vegNonVeg}</span>
            {elem?.variety?.map((variety: any) => (
              <span className="capitalize" key={variety.id}>
                Variety: {variety.name}
              </span>
            ))}
            {elem?.addons?.map((addon: any) => (
              <span className="capitalize" key={addon.id}>
                Addons: {addon.name}
              </span>
            ))}
          </div>
          <div className="capitalize">{`₹${elem.total_price}`}</div>
        </div>
      ))}
    </>
  );

  const OrderDetails = ({
    item,
    buttonText,
  }: {
    item: any;
    buttonText: string;
  }) => (
    <AccordionItem value={item.id} key={item.id}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-10 sm:gap-32">
            <Badge className="capitalize">{item.orderStatus}</Badge>
            <div>{item.createdAt}</div>
          </div>
          <div className="flex justify-between sm:gap-32">
            <div>{`ID:${item.id}`}</div>
            <div className="capitalize">{item.selectAddress.fullname}</div>
          </div>
          <div className="flex justify-between sm:gap-32">
            <div className="flex truncate w-40 md:w-96 capitalize">
              {item.items.map((elem: any, index: number) => (
                <span key={elem.id}>
                  {elem.quantity} &#10799; {elem.name}
                  {index < item.items.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div>{`₹${item.final_price}`}</div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Button
          className="capitalize"
          onClick={() => handleOrderReady(item.id, buttonText)}
        >
          {`Order ${buttonText}`}
        </Button>
        <Separator className="my-4" />
        <p className="mb-5">Order Details</p>
        <OrderItems items={item.items} />
        <div className="flex justify-between">
          <div>
            Total Bill
            <Badge className="capitalize ml-2">{item.paymentStatus}</Badge>
          </div>
          <p>{`₹${item.final_price}`}</p>
        </div>
        <Separator className="my-4" />
        <div className="mb-5">Customer Details</div>
        <div className="flex flex-col gap-2">
          <div className="capitalize">{`Name: ${item.selectAddress.fullname}`}</div>
          <div>{`Order placed till date: ${item.order_placed + 1}`}</div>
          <div className="capitalize">{`Address: ${item.selectAddress.address}, ${item.selectAddress.city}`}</div>
          <div>{`Phone: ${item.selectAddress.phone}`}</div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  console.log(liveOrder);

  return (
    <Tabs defaultValue="preparing" className="w-full p-5">
      <TabsList>
        <TabsTrigger value="preparing">Preparing</TabsTrigger>
        <TabsTrigger value="ready">Ready</TabsTrigger>
        <TabsTrigger value="pickup">Pickup</TabsTrigger>
      </TabsList>
      <TabsContent value="preparing" className="flex justify-center mt-10">
        <Accordion type="single" collapsible className="w-full md:w-[600px]">
          {liveOrder.map(
            (item) =>
              item.orderStatus === "preparing" && (
                <OrderDetails key={item.id} item={item} buttonText="ready" />
              )
          )}
        </Accordion>
      </TabsContent>
      <TabsContent value="ready" className="flex justify-center">
        <Accordion type="single" collapsible className="w-full md:w-[600px]">
          {liveOrder.map(
            (item) =>
              item.orderStatus === "ready" && (
                <OrderDetails key={item.id} item={item} buttonText="pickup" />
              )
          )}
        </Accordion>
      </TabsContent>
      <TabsContent value="pickup" className="flex justify-center">
        <Accordion type="single" collapsible className="w-full md:w-[600px]">
          {liveOrder.map(
            (item) =>
              item.orderStatus === "pickup" && (
                <OrderDetails
                  key={item.id}
                  item={item}
                  buttonText="delivered"
                />
              )
          )}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};

export default LiveOrder;
