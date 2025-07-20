export type RouteItem = {
  style: number;
  title: string;
  path?: string;
  subItems?: Omit<RouteItem, 'style'>[];
};

export const routes: RouteItem[] = [
  {
    style: 1,
    title: "For Companies",
    subItems: [
      {
        title: "How it Works",
        path: "/company-how-it-works",
      },
      {
        title: "Why Choose SaintHR Solutions",
        path: "/why-choose-us",
      },
    ],
  },
  {
    style: 1,
    title: "For Talents",
    subItems: [
      {
        title: "How it Works",
        path: "/talent-how-it-works",
      },
      {
        title: "Benefits",
        path: "/benefits",
      },
    ],
  },
  {
    style: 2,
    title: "About Us",
    subItems: [
      {
        title: "Support Us",
        path: "/support",
      },
      {
        title: "Blog",
        path: "/blog",
      },
    ],
  },
  {
    style: 3,
    title: "Blogs",
    path: "/blog",
  },
];
