const permissionKeysForMain = { link: false };
const permissionKeysForInnerSubMaster = { link: false, add: false, edit: false, delete: false, detail: false, import: false, export: false };
const permissionKeysForInnerSubMenus = { link: false, add: false, edit: false, delete: false, detail: false, import: false, export: false, download: false, approval: false };

const defaultRoleMenu: any = {
    mainMenu: {
        options: { ...permissionKeysForMain },
        items: [
            { key: 'dashboard', label: 'Dashboard', permissions: { ...permissionKeysForMain } },
            { key: 'master', label: 'Master', permissions: { ...permissionKeysForMain } },
            { key: 'documentation', label: 'Documentation', permissions: { ...permissionKeysForMain } },
            { key: 'businessProcess', label: 'Business Process', permissions: { ...permissionKeysForMain } },
            { key: 'userManagement', label: 'User Management', permissions: { ...permissionKeysForMain } },
            { key: 'tickets', label: 'Tickets', permissions: { ...permissionKeysForMain } },
            { key: 'reports', label: 'Reports', permissions: { ...permissionKeysForMain } },
            { key: 'helpSupport', label: 'Help & Support', permissions: { ...permissionKeysForMain } },
            // { key: 'help', label: 'Help', permissions: { ...permissionKeysForMain } },
        ]
    },

    innerMenu: {
        options: { ...permissionKeysForMain },
        items: [
            { key: 'company', mainMenu: 'Master', label: 'Company', permissions: { ...permissionKeysForMain } },
            { key: 'bom', mainMenu: 'Master', label: 'BOM', permissions: { ...permissionKeysForMain } },
            { key: 'warehouse', mainMenu: 'Master', label: 'Warehouse', permissions: { ...permissionKeysForMain } },
            { key: 'other', mainMenu: 'Master', label: 'Other', permissions: { ...permissionKeysForMain } },

            { key: 'tenderDocuments', mainMenu: 'Documentation', label: 'Tender Documents', permissions: { ...permissionKeysForMain } },
            { key: 'qualificationDocs', mainMenu: 'Documentation', label: 'Qualification Docs', permissions: { ...permissionKeysForMain } },
            // { key: 'financial', mainMenu: 'Documentation', label: 'Financial', permissions: { ...permissionKeysForMain } },
            { key: 'designDocuments', mainMenu: 'Documentation', label: 'Design Documents', permissions: { ...permissionKeysForMain } },

            { key: 'preSales', mainMenu: 'Business Process', label: 'Presales', permissions: { ...permissionKeysForMain } },
            { key: 'design', mainMenu: 'Business Process', label: 'Design', permissions: { ...permissionKeysForMain } },
            { key: 'designBOQ', mainMenu: 'Business Process', label: 'Design BOQ', permissions: { ...permissionKeysForMain } },
            { key: 'procurement', mainMenu: 'Business Process', label: 'Procurement', permissions: { ...permissionKeysForMain } },
            { key: 'storeLogistics', mainMenu: 'Business Process', label: 'Store & Logistics', permissions: { ...permissionKeysForMain } },
            { key: 'inventory', mainMenu: 'Business Process', label: 'Inventory', permissions: { ...permissionKeysForMain } },
            // { key: 'execution', mainMenu: 'Business Process', label: 'Execution', permissions: { link: false } },
            // some non-declare innerMenu are pending to add.
        ]
    },

    innerSubMenu: [
        {
            mainMenu: 'Master',
            options: { ...permissionKeysForInnerSubMaster },
            items: [
                { key: 'country', label: 'Country', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'state', label: 'State', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'district', label: 'District', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'company', label: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'department', label: 'Department', innerMenu: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'designation', label: 'Designation', innerMenu: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'companyFinancial', label: 'Company Financial', innerMenu: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'technicalAchievement', label: 'Technical Achievement', innerMenu: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'document', label: 'Document', innerMenu: 'Company', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'client', label: 'Client', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'bom', label: 'BOM', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'item', label: 'Item', innerMenu: 'BOM', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'vender', label: 'Vender', innerMenu: 'BOM', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'quickVender', label: 'Quick Vender', innerMenu: 'BOM', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'itemVenderLink', label: 'Item Vender Link', innerMenu: 'BOM', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'warehouse', label: 'Warehouse', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'itemLocation', label: 'Item Location', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'financialYear', label: 'Financial Year', innerMenu: 'Other', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'indirect', label: 'Indirect', innerMenu: 'Other', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'siteSurvey', label: 'Site Survey', innerMenu: 'Other', permissions: { ...permissionKeysForInnerSubMaster } },
            ]
        },

        {
            mainMenu: 'Documentation',
            options: { ...permissionKeysForInnerSubMenus },
            items: [
                { key: 'tender', label: 'Tender', innerMenu: 'Tender Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'amendments', label: 'Amendments', innerMenu: 'Tender Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'initialBoq', label: 'Initial BOQ', innerMenu: 'Tender Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'l1Schedule', label: 'L1 Schedule', innerMenu: 'Tender Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'balanceSheet', label: 'Balance Sheet', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'maat', label: 'MAAT', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'liquidAssets', label: 'Liquid Assets', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'bankCertificates', label: 'Bank Certificates', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'itr', label: 'ITR', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'registrationFee', label: 'Registration Fee', innerMenu: 'Financial', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'other', label: 'Other', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'securityDocuments', label: 'Security Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'mdlDocuments', label: 'MDL Documents', innerMenu: 'Design Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'drawingDocuments', label: 'Drawing Documents', innerMenu: 'Design Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'l2ScheduleDocuments', label: 'L2 Schedule Documents', innerMenu: 'Design Documents', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'finalBoqDocuments', label: 'Final BOQ Documents', innerMenu: 'Design Documents', permissions: { ...permissionKeysForInnerSubMenus } },
            ]
        },

        {
            mainMenu: 'Business Process',
            options: { ...permissionKeysForInnerSubMenus },
            items: [
                // Presales
                { key: 'tenderData', label: 'Tender Data', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'qualification', label: 'Qualification', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'preCostingSynopsis', label: 'Pre-Costing Synopsis', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'boqItems', label: 'BOQ Items', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'directCosting', label: 'Direct Costing', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'indirectCosting', label: 'Indirect Costing', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'costingSynopsis', label: 'Costing Synopsis', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'finalSynopsis', label: 'Final Synopsis', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'letterOfIntent', label: 'Letter of Intent', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'securityDeposit', label: 'Security Deposit', innerMenu: 'Presales', permissions: { ...permissionKeysForInnerSubMenus } },

                // Design
                { key: 'targetedBoq', label: 'Targeted BOQ', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'mdl', label: 'MDL', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'drawing', label: 'Drawing', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'l2Schedule', label: 'L2 Schedule', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'l2ScheduleApproval', label: 'L2 Schedule Approval', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'designBoq', label: 'Design BOQ', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'boqVersions', label: 'BOQ Versions', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'boqApprovals', label: 'BOQ Approvals', innerMenu: 'Design', permissions: { ...permissionKeysForInnerSubMenus } },

                // Procurement
                { key: 'approvalBoq', label: 'Approval BOQ', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'sendRfq', label: 'Send RFQ', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'proposalReceived', label: 'Proposal Received', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'approval', label: 'Approval', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'processPo', label: 'Process PO', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'viewPo', label: 'View PO', innerMenu: 'Procurement', permissions: { ...permissionKeysForInnerSubMenus } },

                // Store & Logistics
                { key: 'inventory', label: 'Inventory', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'auditRequest', label: 'Audit Request', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'auditApproval', label: 'Audit Approval', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'itemLedger', label: 'Item Ledger', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'materialReceipt', label: 'Material Receipt', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'materialIssuance', label: 'Material Issuance', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'warehouseTransfer', label: 'Warehouse Transfer', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'warehouseReceiving', label: 'Warehouse Receiving', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
                { key: 'pendencyReport', label: 'Pendency Report', innerMenu: 'Store & Logistics', permissions: { ...permissionKeysForInnerSubMenus } },
            ]
        },

        {
            mainMenu: 'User Management',
            options: { ...permissionKeysForInnerSubMaster },
            items: [
                { key: 'user', label: 'User', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'userLogs', label: 'User Logs', permissions: { ...permissionKeysForInnerSubMaster } },
                { key: 'userRoles', label: 'User Roles', permissions: { ...permissionKeysForInnerSubMaster } },
            ]
        },
    ]

};

export { defaultRoleMenu };