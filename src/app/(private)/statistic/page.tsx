import StatisticComponent from "@/components/statisticComponent";
import Unauthorized from "@/components/unauthorized";
import { url, endpoints } from "@/constants/api";
import { roles } from "@/constants/roles";
import { permissionRoutes } from "@/lib/auth/roles";

export default async function Statistic() {
  let history = null;
  try {
    const res = await fetch(`${url}${endpoints.history}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("error em buscar histórico");

    const ht = await res.json();

    history = ht.data;
  } catch (error) {
    console.log(error);
    throw new Error("error em buscar histórico");
  }

  const allowed = [roles.OWNER, roles.MANAGER];
  const resAllowed = await permissionRoutes(allowed);

  if (!resAllowed) {
    return <Unauthorized />;
  }

  return (
    <section id="panel" className="min-h-screen flex flex-col gap-5 p-5">
      <StatisticComponent history={history} />
    </section>
  );
}
