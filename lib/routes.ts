export const routes = {
  home: () => "/",
  courses: () => "/courses",
  course: (slug: string) => `/courses/${slug}`,
  lesson: (slug: string, startSeconds?: number) =>
    startSeconds && startSeconds > 0
      ? `/lessons/${slug}?t=${Math.floor(startSeconds)}`
      : `/lessons/${slug}`,
  instructor: (slug: string) => `/instructors/${slug}`,
  myLearning: () => "/my-learning",
};
