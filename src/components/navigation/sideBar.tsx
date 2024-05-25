import React from "react";
import { RiUserLine, RiTrophyLine, RiChat4Line, RiSwordLine , RiArrowGoBackLine } from "react-icons/ri";

const Sidebar: React.FC<{ setActiveComponent: (component: string) => void }> = ({ setActiveComponent }) => {
  const menuItems = [
    { text: "Enanos", icon: RiUserLine, component: 'Enanos' },
    { text: "Simulation", icon: RiTrophyLine, component: 'Simulation' },
    { text: "Fights", icon: RiSwordLine, component: 'Fights' },
    { text: "Foro", icon: RiChat4Line, component: 'Foro' },
  ];

  return (
    <div className="fixed top-16 left-0 h-full w-64 bg-green-500 z-50 overflow-y-auto">
      <div className="flex flex-col h-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center h-16 w-full text-white cursor-pointer transition duration-300 hover:bg-green-600 pl-4"
            onClick={() => setActiveComponent(item.component)} 
          >
            <item.icon className="text-xl mr-4" />
            <span>{item.text}</span>
          </button>
        ))}
        <div className="mt-auto">
          <div className="absolute bottom-20 w-full">
            <button className="flex items-center h-16 w-full text-white cursor-pointer transition duration-300 hover:bg-green-600 pl-4">
              <RiArrowGoBackLine className="text-xl mr-4" />
              <span>LogOut</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
