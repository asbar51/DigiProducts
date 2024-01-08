import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetOrdersQuery, useOrderMutation } from "../../services/postApi";
import { useGetProfileQuery } from "../../services/profileApi";

const PaypalPayment = ({id,quantity,price}) => {
    const [order,{data:theOrdes}] = useOrderMutation()
    let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
    let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()


    // const createOrder = async (id) => {
    //     // if (post.instructor == profile?.profile?.username) {
    //     //     alert("you are the intructor")
    //     // } else {
    //     console.log("order:",id);
    //     await order({id,body: { quantity, price }}).then(async (resp) => {
    //       console.log("the order: ",resp)
    //       await refetchOrders()
    //       await refetchProfile()
    //     })
    //     // }
    //   }

    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("http://localhost:3000/posts/api/orders", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            cart: [
              {
                quantity,
                price:price
              },
            ],
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      const onApprove = (data) => {
         // Order is captured on the server and the response is returned to the browser
         return fetch(`http://localhost:3000/posts/api/orders/${data.orderID}/capture`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
        .then((response) => {
            console.log("Payment successful");
            return response.json()
        })
        .then(order => console.log("order: ",order))
      };

      
    return ( 
        <PayPalButtons
            createOrder={(data,actions) => createOrder(data, actions)}
            onApprove={(data,actions) => onApprove(data, actions)}
        />
     );
}
 
export default PaypalPayment;