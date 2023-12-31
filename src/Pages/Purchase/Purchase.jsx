import { json, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const Purchase = () => {
    const { Count, _id, FoodCategory,Quantity, Email, FoodImage, FoodName, Price, ShortDescription, LongDescription } = useLoaderData()
    const navigate = useNavigate()
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const buyerName = user?.displayName

    const newCount = Count + 1;

  console.log("this is the quantity",Quantity);

    const handlePurchase = e => {
        e.preventDefault()
        const foodName = e.target.foodName.value;
        const price = e.target.price.value;
        const quantity = e.target.quantity.value;
        const buyerName = e.target.buyerName.value;
        const buyingDate = e.target.buyingDate.value;
        const buyerEmail = e.target.buyerEmail.value;
        const product = {foodName,FoodImage, price, quantity, buyerEmail, buyerName, buyingDate};
       
      const newQuantity = parseInt(quantity)

      if(newQuantity <= 0  ||  newQuantity > Quantity){
        Swal.fire({
            title: "Error!",
            text: `Invalid quantity selected. available quantity is ${Quantity} `,
            icon: "error",
          });
          return;
      }

      if (Email === buyerEmail) {
        Swal.fire({
          title: "Error!",
          text: "You cannot purchase your own added food items.",
          icon: "error",
        });
        return;
      }


        //for add to cart in the another collection of database
        fetch('https://restuarent-management.vercel.app/api/v1/cart',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
            //for update count
            fetch(`https://restuarent-management.vercel.app/api/v1/update-count/${_id}`,{
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({Count:newCount})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data){
                    Swal.fire({
                        title: "Good job!",
                        text: "Purchase completed!",
                        icon: "success"
                      });
                }
            })

                // navigate('/')

            }
        })


    }
    return (
        <div className="md:px-32 md:py-20">
            <Helmet>
            <title>Granny | purchase</title>
            </Helmet>
            <form onSubmit={handlePurchase}>
                <div className=" card p-10 text-white grid md:grid-cols-3 grid-cols-1 bg-black">
                    {/* Name field */}

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Food Name</span>
                        </label>
                        <input name="foodName" defaultValue={FoodName} type="text" placeholder="Food Name" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Price</span>
                        </label>
                        <input name="price" defaultValue={Price} type="text" placeholder="price" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white" >Quantity</span>
                        </label>
                        <input type="number" required min={0} name="quantity" placeholder="Quantity" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white"> Buyer Name </span>
                        </label>
                        <input name="buyerName" defaultValue={buyerName} type="text" readOnly placeholder=" Buyer Email" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">  Buying Date</span>
                        </label>
                        <input name="buyingDate" defaultValue={formattedDate} type="text" readOnly placeholder="  Buying Date" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white"> Buyer Email</span>
                        </label>
                        <input name="buyerEmail" defaultValue={email} type="email" readOnly placeholder=" Buyer Email" className="input text-red-700 input-bordered w-full max-w-xs" />
                    </div>


                    <div className="col-span-full  mx-auto mt-4">
                        <input type="submit" value='purchase' className="btn  btn-white" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Purchase;