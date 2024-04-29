import { FaPaintBrush } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const MyCraft = () => {

    const {user} = useAuth();
    const [data, setData] = useState([]);
    const [crafts,setCrafts] = useState([]);

    useEffect(() => {
        fetch(`https://artisan-alley-server-j4rfxbmvn-sifats-projects-19e6a574.vercel.app/craftsByEmail/${user?.email}`)
        .then(res => res.json())
        .then(result => {
            setData(result);
            setCrafts(result)
        })
        .catch(err => console.log(err))
    },[user])

    const handleCustomizationFilter = (event) => {
        const value = event.target.value;
        if (value === "Yes") {
          const filteredCrafts = data.filter(
            (item) => item.customization === "Yes"
          );
          setCrafts(filteredCrafts);
        } else if (value === "No") {
          const filteredCrafts = data.filter(
            (item) => item.customization === "No"
          );
          setCrafts(filteredCrafts);
        } else {
          setCrafts(data);
        }
      };

    //! delete:
    const handleDeleteCraft = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://artisan-alley-server-j4rfxbmvn-sifats-projects-19e6a574.vercel.app/crafts/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your painting has been deleted.",
                            icon: "success"
                        });
                        setCrafts(prevCrafts => prevCrafts.filter(craft => craft._id !== id));
                    }
                })
                .catch(err => console.log(err))
            }
          });
    }

    return (
        <div className="container my-[100px]">

        <div className="flex justify-center w-fit my-6 font-medium">
            <select
            onChange={handleCustomizationFilter}
            className="block appearance-none w-full border border-gray-400 hover:border-gray-400 px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline"
            >
            <option value="all">Show All</option>
            <option value="Yes">Customization: Yes</option>
            <option value="No">Customization: No</option>
            </select>
        </div>

            <div className='mt-5 md:mt-[30px] lg:mt-[40px] grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 space-y-4 md:space-y-0'>
                {
                    crafts?.map(d => {
                        const { _id,name,price,category,photo,stock,customization,rating } = d;
                        return (
                            <div key={_id} className='w-auto md:w-[338px] lg:w-[395px] relative font-lora'>
                                <div className='bg-base-300 p-5 rounded-md'>
                                    <img className='w-auto md:w-[338px] lg:w-[420px] h-auto md:h-[180px] lg:h-[250px] rounded-md object-cover mb-5' src={photo} />
                                    <div className='py-1 px-3 bg-black absolute top-[30px] right-[1.75rem] rounded-md'>
                                        <p className='text-[16px] font-medium text-white'>{stock}</p>
                                    </div>
                                    <h5 className='text-[23px] font-bold'>{name}</h5>
                                    <div className='flex font-medium gap-2'>
                                        <FaPaintBrush className='text-xl'/>
                                        <p className='text-base font-medium'>{category}</p>
                                    </div>
                                    <div className='flex justify-end mt-[-45px] mr-2'>
                                        <h6 className='border-2 border-black px-3 w-fit py-1 rounded-lg text-[18px] font-bold '>${price}</h6>
                                    </div>

                                    <div className="flex items-center justify-between my-5">
                                        <p><b>Customization: </b>{customization}</p>
                                        <div className="flex items-center gap-1">
                                            <IoStar/>
                                            <span>{rating}</span>
                                        </div>
                                    </div>

                                    <div className='flex justify-between'>
                                        <Link to={`/update/${_id}`}>
                                            <button className="bg-gradient-to-l from-rose-400 to-indigo-500 py-2 px-4 md:py-[9px] md:px-11 text-white md:text-base lg:text-xl font-medium rounded-lg">Update</button>
                                        </Link>
                                            <button onClick={() => handleDeleteCraft(_id)} className="bg-red-500  py-2 px-4 md:py-[9px] md:px-11 text-white md:text-base lg:text-xl font-medium rounded-lg">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default MyCraft;