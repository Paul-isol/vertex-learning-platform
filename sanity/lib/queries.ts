import { defineQuery } from 'next-sanity'

// Catalog / list of courses
export const COURSES_LIST_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    "instructor": instructor->{
      _id,
      name,
      "slug": slug.current,
      photo
    },
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`)

// Course slugs for static generation
export const COURSE_SLUGS_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Course detail by slug
export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes[]{
      _key,
      icon,
      title,
      description
    },
    "instructor": instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise,
      bio
    },
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    "totalDuration": math::sum(modules[].lessons[]->duration),
    "lessonCount": count(modules[].lessons[]),
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview
      }
    }
  }
`)

// Lesson slugs for static generation
export const LESSON_SLUGS_QUERY = defineQuery(`
  *[_type == "lesson" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Lesson detail by slug with parent course derived by reverse reference
export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0]{
      _id,
      title,
      "slug": slug.current,
      modules[]{
        _key,
        title,
        summary,
        lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          freePreview
        }
      },
      instructor->{
        _id,
        name,
        "slug": slug.current,
        photo
      }
    }
  }
`)

// Instructors list
export const INSTRUCTORS_LIST_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

// Instructor detail by slug with courses taught
export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      price,
      popular,
      studentCount,
      "category": category->{
        _id,
        title,
        "slug": slug.current
      },
      "moduleCount": count(modules),
      "totalDuration": math::sum(modules[].lessons[]->duration)
    }
  }
`)

// Categories list for filters
export const CATEGORIES_LIST_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)
