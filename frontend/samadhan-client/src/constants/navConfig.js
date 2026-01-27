export const NAV_ITEMS = {
  USER: [
    {
      label: 'Home',
      path: '/',
      icon: 'FaHome',
    },
    {
      label: 'Dashboard',
      path: '/user/home/dashboard',
    },
    {
      label: 'Raise Grievance',
      path: '/user/home/raise-grievance',
    },
    {
      label: 'My Grievances',
      path: '/user/home/my-grievances',
    },
    {
      label: 'Notifications',
      path: '/user/home/notifications',
      icon: 'FaBell',
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'FaUser',
    },
  ],

  ADMIN: [
    {
      label: 'Dashboard',
      path: '/user/home/dashboard',
    },
    {
      label: 'Manage Authorities',
      path: '/admin/manage-authority',
    },
    {
      label: 'Manage Issues',
      path: '/admin/manage-issues',
    },
  ],

  AUTHORITY: [
    {
      label: 'Dashboard',
      path: '/user/home/dashboard',
    },
      {
      label: 'Assigned Grievances',
      path: '/authority/assigned-grievances',
    },
    {
      label: 'Reports',
      path: '/authority/reports',
    },
  ],
};
