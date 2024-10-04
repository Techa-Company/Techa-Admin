import { Breadcrumb } from "antd";
import PropTypes from "prop-types";

const BreadCrumb = ({ items }) => {
    return (
        <Breadcrumb
            items={items}
            style={{
                margin: '16px 0',
            }}
        />


    );
};

BreadCrumb.propTypes = {
    items: PropTypes.array
}

export default BreadCrumb;