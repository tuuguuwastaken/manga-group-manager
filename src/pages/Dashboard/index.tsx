import { useEffect } from "react";
import { useCurrentGroup } from "../../hooks/group";

const Dashboard = () => {
  const { config } = useCurrentGroup()

  useEffect(() => {
    console.log("CONFIG",config)
  }, [config])
  
  return <>Dashboard</>;
};

export default Dashboard;
