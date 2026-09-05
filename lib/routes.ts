export const routes = {
  home: () => "/",
  courses: () => "/courses",
  course: (slug: string) => `/courses/${slug}`,
  lesson: (slug: string) => `/lessons/${slug}`,
  instructor: (slug: string) => `/instructors/${slug}`,
  myLearning: () => "/my-learning",
};
