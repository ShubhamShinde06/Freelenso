"use client";

import {
  useInvoiceGetFullSingleQuery,
  useProjectGetAllQuery,
} from "@/store/api/apiSlice";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { MdLocalPrintshop } from "react-icons/md";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function InvoicePrintSendPage() {
  const params = useParams();
  const id = params.id;
  const User = useSelector((state) => state?.globalState?.User);
  const userId = User?._id;
  const { data: singleData } = useInvoiceGetFullSingleQuery(id, { skip: !id });
  const { data: projects } = useProjectGetAllQuery(userId, { skip: !userId });
  const project = projects?.data;

  const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");
  const invoice = {
    number: singleData?.data.INV,
    date: formatDate(singleData?.data.createdAt),
    dueDate: formatDate(singleData?.data.dueDate),
    billedTo: {
      name: "Studio Shodwe",
      address: "123 Anywhere St., Any City",
      email: singleData?.data.user?.userEmail || "",
    },
    from: {
      name: `${singleData?.data.client?.firstName || ""} ${
        singleData?.data.client?.lastName || ""
      }`,
      address: singleData?.data.client?.address || "",
      email: singleData?.data.client?.email || "",
    },
    items: Array.isArray(singleData?.data.items)
      ? singleData.data.items.map((item) => {
          const projectName =
            project?.find((p) => String(p._id) === String(item.project))
              ?.projectName || "";

          return {
            project: projectName,
            hours: item.hours || "",
            rate: item.rate || "",
            total: item.total || "",
          };
        })
      : [
          {
            project: "",
            hours: "",
            rate: "",
            total: "",
          },
        ],
    phoneNo: singleData?.data?.client.mobileNo,
    subTotal: singleData?.data?.subtotal,
    tax: singleData?.data?.tax,
    discount: singleData?.data.discount,
    total: singleData?.data.grandTotal || 0,
    paymentMethod: "Cash",
    note: singleData?.data.notes || "Thank you for choosing us!",
  };

  console.log(singleData)

  return (
   <div className="w-full h-screen flex flex-col ">
  {/* Action Buttons (Sticky on top) */}
  <div className="sticky top-0 z-10 bg-black w-full flex flex-wrap gap-3 p-3 items-center justify-center border-b border-gray-200 print:hidden">
    
    {/* Print Button */}
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
    >
      <MdLocalPrintshop />
      <span className="text-base">Print</span>
    </button>

    {/* Gmail Button */}
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
    >
      <SiGmail />
      <span className="text-base">Share via Mail</span>
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${invoice.phoneNo}?text=${encodeURIComponent(`http://localhost:3000/invoice-print-send/${invoice.id}`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
    >
      <IoLogoWhatsapp />
      <span className="text-base">Share on WhatsApp</span>
    </a>
  </div>

  {/* Scrollable Invoice Area */}
  <div className="flex-1 overflow-y-auto p-4 flex justify-center print:p-0">
    <div className="w-full lg:w-2/4 bg-white text-black rounded shadow p-6 relative">
      
      {/* Invoice Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs text-gray-700">{invoice.number}</div>
          <div className="text-4xl font-extrabold tracking-tight text-gray-900">INVOICE</div>
        </div>
        <div className="w-20 h-20 relative">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${invoice.number}`}
            alt="QR CODE"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="mb-2"><strong>Date:</strong> {invoice.date}</div>
      <div className="mb-4"><strong>Due By:</strong> {invoice.dueDate}</div>

      {/* Billing Info */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <strong>Billed to:</strong>
          <div>{invoice.billedTo.name}</div>
          <div>{invoice.billedTo.address}</div>
          <div>{invoice.billedTo.email}</div>
        </div>
        <div>
          <strong>From:</strong>
          <div>{invoice.from.name}</div>
          <div>{invoice.from.address}</div>
          <div>{invoice.from.email}</div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left px-2 py-1 font-semibold">Item</th>
              <th className="text-right px-2 py-1 font-semibold">Hours</th>
              <th className="text-right px-2 py-1 font-semibold">Price</th>
              <th className="text-right px-2 py-1 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="px-2 py-1">{item.project}</td>
                <td className="px-2 py-1 text-right">{item.hours}</td>
                <td className="px-2 py-1 text-right">{item.rate}.00</td>
                <td className="px-2 py-1 text-right">{item.total}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex flex-col items-end mt-6">
        {[
          ["SubTotal", invoice.subTotal],
          ["Tax", invoice.tax],
          ["Discount", invoice.discount]
        ].map(([label, value]) => (
          <div key={label} className="w-full sm:w-1/3 flex justify-between">
            <span className="font-bold">{label}</span>
            <span>{value}.00</span>
          </div>
        ))}
        <div className="w-full sm:w-1/3 flex justify-between border-t mt-2 font-bold">
          <span>Total</span>
          <span>{invoice.total}.00</span>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6">
        <strong>Note:</strong> {invoice.note}
      </div>
    </div>
  </div>
</div>

  );
}
