import { PrismaClient } from "@prisma/client";
import { loadCourses, loadQuestions } from "../lib/domain/questions";

const prisma = new PrismaClient();

async function main() {
  const questions = loadQuestions();
  const courses = loadCourses();

  // Questions (option labels stored for reference; scoring lives in code).
  for (const q of questions) {
    const optionsJson = q.options
      ? JSON.stringify(q.options.map((o) => ({ value: o.value, label: o.label })))
      : null;
    await prisma.question.upsert({
      where: { no: q.no },
      update: {
        question: q.question,
        type: q.type,
        area: q.area,
        required: q.required,
        optionsJson,
      },
      create: {
        no: q.no,
        question: q.question,
        type: q.type,
        area: q.area,
        required: q.required,
        optionsJson,
      },
    });
  }

  // Remove questions that are no longer part of the (reduced) seed.
  const keptNos = questions.map((q) => q.no);
  await prisma.answer.deleteMany({ where: { questionNo: { notIn: keptNos } } });
  await prisma.question.deleteMany({ where: { no: { notIn: keptNos } } });

  // Courses.
  for (const c of courses) {
    await prisma.course.upsert({
      where: { courseId: c.courseId },
      update: {
        category: c.category,
        title: c.title,
        type: c.type,
        target: c.target,
        suggestedLevel: c.suggestedLevel,
        recommendedFor: c.recommendedFor,
        notRecommendedFor: c.notRecommendedFor,
        isRepresentative: c.isRepresentative,
      },
      create: {
        courseId: c.courseId,
        category: c.category,
        title: c.title,
        type: c.type,
        target: c.target,
        suggestedLevel: c.suggestedLevel,
        recommendedFor: c.recommendedFor,
        notRecommendedFor: c.notRecommendedFor,
        isRepresentative: c.isRepresentative,
      },
    });
  }

  // Default admin user record (auth is by shared secret; this is for notes).
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin" },
  });

  console.log(
    `Seeded ${questions.length} questions, ${courses.length} courses, 1 admin.`
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
