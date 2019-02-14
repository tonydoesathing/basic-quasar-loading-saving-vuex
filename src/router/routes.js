
const routes = [
  /* {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  }, */
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
    ],
  },
  {
    path: '/Post/:id',
    name: 'Post',
    component: () => import('pages/Post.vue'),
  },
  {
    path: '/NewPost',
    component: () => import('layouts/NewPostLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NewPost.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
