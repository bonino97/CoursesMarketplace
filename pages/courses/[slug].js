import { Modal } from "@components/common";
import { CourseHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "@content/fetcher";

const Course = ({ course }) => {
  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>

      <Keypoints />
      <Curriculum />
      <Modal />
    </>
  );
};

export const getStaticPaths = () => {
  const { data } = getAllCourses();
  return {
    paths: data.map((c) => ({
      params: { slug: c.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: { course },
  };
};

Course.Layout = BaseLayout;

export default Course;
