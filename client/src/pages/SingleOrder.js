import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../utils/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { formatOrderTime } from "../utils/helpers";
const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    const handleGetSingleOrder = async () => {
      try {
        const data = await getSingleOrder(orderId);
        console.log(data.order);
        setOrder(data.order);
        console.log(order);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetSingleOrder();
  }, []);

  if (!order) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex border border-gray flex-col justify-start items-start  px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className="flex justify-start item-start space-y-2 gap-7 mb-10">
                <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Order #{orderId}
                </h1>
                <p className="text-sm font-medium leading-6 text-gray-600">
                  Placed: {formatOrderTime(order.OrderPlacedTime)}
                </p>
                <p className="text-sm font-medium leading-6 text-gray-600">
                  Expected: {formatOrderTime(order.ExpectedReadyTime)}
                </p>
              </div>
              {order?.Items?.length > 1
                ? order?.Items?.map((item) => (
                    <div className="mt-6 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                      <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-lg font-semibold leading-6 text-gray-800">
                            {item.Description}
                          </h3>
                          <div className="flex justify-start items-start flex-col">
                            {item?.Modifiers.length > 1
                              ? item?.Modifiers.map((modifier) => (
                                  <p>
                                    <b>{modifier.Quantity}x</b>{" "}
                                    {modifier.Description}
                                  </p>
                                ))
                              : ""}
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6 text-gray-800">
                         x{item.Quantity}
                          </p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                            ${item.SellingPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : "no items"}
            </div>
            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex border  border-gray flex-col px-4 py-6 md:p-6 xl:p-8 w-full  space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-baseleading-4 text-gray-600">
                      ${order.Totals.SubTotal}
                    </p>
                  </div>
                  {/* <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">STUDENT</span></p>
                                    <p className="text-baseleading-4 text-gray-600">-$28.00 (50%)</p>
                                </div> */}
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Delivery
                    </p>
                    <p className="text-baseleading-4 text-gray-600">
                      ${order.Totals.Delivery}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-basefont-semibold leading-4 text-gray-600">
                    ${order.Totals.Total}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col border  border-gray ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    className="w-12 h-12"
                    src="https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {order.Customer.FirstName} {order.Customer.LastName}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img
                    className=""
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                    alt="email"
                  />
                  <p className="cursor-pointer text-sm leading-5 ">
                    {order.Customer.Email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Delivery Address
                    </p>
                    <p className="w-48 lg:w-fullxl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {order.DeliveryAddress?.StreetAddress1},{" "}
                      {order.DeliveryAddress?.City}
                    </p>
                  </div>
                  {/* <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                    <p className="w-48 lg:w-fullxl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                </div> */}
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button className="mt-6 md:mt-0  py-5 hover:bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    Print Production Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
