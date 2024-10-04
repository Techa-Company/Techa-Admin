import { Breadcrumb } from "antd";
import PropTypes from "prop-types";

const BreadCrumb = ({ items }) => {
    return (
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            {
                items.map((item, index) => {
                    return (
                        <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    )
                })
            }
        </Breadcrumb>
    );
};

BreadCrumb.propTypes = {
    items: PropTypes.array
}

export default BreadCrumb;