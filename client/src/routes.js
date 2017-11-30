import Base from './Base';
import LandingPage from './containers/LandingPage';
import DashboardPage from './containers/DashboardPage';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/dashboard',
      component: DashboardPage
    }
  ]
};

export default routes;
