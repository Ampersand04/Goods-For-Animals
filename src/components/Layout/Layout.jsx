import PropTypes from 'prop-types';
import { Header } from '..';

import styles from './Layout.module.scss';

export const Layout = ({ title, children }) => {
    return (
        <>
            <Header title={title} />
            <main className={styles.main}>{children}</main>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
};
