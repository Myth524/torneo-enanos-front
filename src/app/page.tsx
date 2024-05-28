'use client'

import React, { useState } from "react";
import Login from "@/components/login/login";
import Sidebar from "@/components/navigation/sideBar";
import Topbar from "@/components/navigation/topBar";
import Enanos from "@/components/enanos/enanos";
import Fights from "@/components/fights/fights";
import Foro from "@/components/foro/foro";
import Simulation from "@/components/simulation/simulation";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Enanos');

  let RenderedComponent;
  switch (activeComponent) {
    case 'Enanos':
      RenderedComponent = Enanos;
      break;
   case 'Simulation' :
      RenderedComponent = Simulation;
      break;   
    case 'Fights' :
      RenderedComponent = Fights;
      break;
    case 'Foro' :
      RenderedComponent = Foro;
      break;  

      default:
      RenderedComponent = Enanos;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar setActiveComponent={setActiveComponent} />
        <RenderedComponent />
      </div>
    </div>
  );
};

export default Home;