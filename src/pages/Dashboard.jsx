import MainLayout from "./layout/MainLayout";
import BreadCrumb from "../components/common/BreadCrumb";

const Dashboard = () => {

    return (
        <MainLayout>
            <BreadCrumb items={[{ title: "خانه" }, { title: "داشبورد" }]} />
            <div
                className="bg-white h-full p-6 rounded-lg"
            >
                اینجا داشبورد هست
            </div>
        </MainLayout>
    );
};

export default Dashboard;