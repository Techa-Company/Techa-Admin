import { theme } from "antd";
import MainLayout from "./layout/MainLayout";
import BreadCrumb from "../components/BreadCrumb";

const Dashboard = () => {

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    return (
        <MainLayout>
            <BreadCrumb items={["خانه", "داشبورد"]} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                ggg
            </div>
        </MainLayout>
    );
};

export default Dashboard;