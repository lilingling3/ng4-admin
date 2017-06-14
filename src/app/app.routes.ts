import { LoginComponent } from './login/login.component';
import { AppErrorComponent } from './error/app.error.component';
import { ZtreeDemoComponent } from './z-tree/z-tree.component';
import { PrimengComponent } from './primeng/primeng.component'

export const appRoutes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	// {
	// 	path: '',
	// 	redirectTo: 'workentry',
	// 	pathMatch: 'full'
	// },
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'tree',
		component: ZtreeDemoComponent
	},
	{
		path: 'primeng',
		component: PrimengComponent
	},
	{
		path: 'workentry',
    loadChildren: './workentry/workentry.module#WorkentryModule'
	},
  {
    path: "error/:message",
    component: AppErrorComponent
  },
  {
    path: '**', // fallback router must in the last
    component: LoginComponent
  }
];
