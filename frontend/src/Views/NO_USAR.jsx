import { Link } from "react-router-dom";
import React,{useState} from "react";
import { RxArchive } from "react-icons/rx";
import { MdMiscellaneousServices,MdDashboard,MdOutlineLogout,MdOutlineMenu,MdOutlineClose} from "react-icons/md";
import { AiFillCreditCard,AiOutlineUserSwitch,AiFillShop } from "react-icons/ai";
import imageTasks from '../assets/Img/img-tasks.svg';



function Dashboard() {

const [sidebar, setSideBar] = useState(false)
const handleSidebar = () => {setSideBar(!sidebar)}
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-6'>
        {/* SIDEBAR */}
        <div className={`bg-white fixed lg:static w-[80%] md:w-[40%]  lg:w-full top-0 z-50 ${sidebar ? "-left-0" : "-left-full"} -left-full w-full h-full overflow-y-scroll col-span-1 p-8 border-r transition-all`}>
            {/* LOGOTIPO */}
            <div className=" flex items-center  p-8">
                <img className="w-[50px] " src="Images/logo2niux.png" alt="" />
                <h1 className='uppercase font-bold'>NIUX</h1>
            </div>

            
            <div className="flex flex-col">
                {/*  MENU */}
            <nav>
            <ul>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <MdDashboard/>Dashboard                   
            </Link>
                </li>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <RxArchive/>Tickets                  
            </Link>
                </li>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <AiFillCreditCard/>Pedidos                 
            </Link>
                </li>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <AiOutlineUserSwitch/>Usuarios                   
            </Link>
                </li>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <AiFillShop/>Productos                   
            </Link>
                </li>
                <li>
                <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <MdMiscellaneousServices/>Servicios                  
            </Link>
                </li>
            
            </ul>
            </nav>
            {/* IMG AND LOGOUT */}
            <div>
            <img src={imageTasks} className="p-6 w-25" />
            <Link to="#" className="flex items-center gap-2 p-4 hover:text-white hover:bg-purple-400 rounded-lg transition-colors text-gray-500 font-poppins font-semibold">
            <MdOutlineLogout/>Logout                  
            </Link>
            </div>
            </div>
            
        
        </div>
        {/* Boton menú Movil */}
        <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-purple-400 p-2 text-white rounded-full text-2xl">
            {sidebar ? <MdOutlineClose/> : <MdOutlineMenu/>}
        </button>

        <div className="col-span-5 bg-gray-300">
            {/* HEADER */}
            <header>
                {/* SEARCH */}
                <form action="">
                    <div>
                        <input type="text" id="" />
                    </div>
                </form>
            </header>
        </div>
        
    </div>
  )
}

export default Dashboard