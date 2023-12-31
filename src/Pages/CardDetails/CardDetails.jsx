
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useParams } from "react-router-dom";

const CardDetails = () => {
    const { id } = useParams()
    const { Count, _id, FoodCategory,Name,Country, FoodImage, FoodName, Price, ShortDescription, LongDescription } = useLoaderData()

    console.log(id);

    return (
        <div className="flex justify-center items-center">
            <Helmet>
            <title>Granny|food details</title>
            </Helmet>
            <div className="card w-96 my-32 bg-base-100 shadow-xl">
    
                <figure><img src={FoodImage} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{FoodName}</h2>
                    <p>Category: {FoodCategory}</p>
                    <p>Price: {Price}</p>
                    <p>Made By: {Name}</p>
                    <p>Country: {Country}</p>
                    <p>{LongDescription}</p>
                    <div className="card-actions justify-center w-full">
                    <Link to={`/purchase/${_id}`}><button className="btn btn-neutral">order</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;