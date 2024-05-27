'use client'

import React, { useState } from "react";
import Login from "@/components/login/login";
import Sidebar from "@/components/navigation/sideBar";
import Topbar from "@/components/navigation/topBar";
import Enanos from "@/components/enanos/enanos";
import Fights from "@/components/fights/fights";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Enanos');

  let RenderedComponent;
  switch (activeComponent) {
    case 'Enanos':
      RenderedComponent = Enanos;
      break;
      default:
      RenderedComponent = Enanos;
      break;
    case 'Fights' :
      RenderedComponent = Fights;
      break;
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