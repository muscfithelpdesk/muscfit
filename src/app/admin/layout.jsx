'use client';

import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import PropTypes from 'prop-types';

export default function AdminLayout({ children }) {
    return (
        <AdminAuthGuard>
            {children}
        </AdminAuthGuard>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
