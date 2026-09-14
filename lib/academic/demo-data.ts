export type AcademicSource = {
  title: string;
  type: "student_record" | "academic_document";
};

export type AcademicContext = {
  text: string;
  sources: AcademicSource[];
};

export function getDemoAcademicContext(
  intent: string,
  studentId: string,
): AcademicContext {
  const student = `Authenticated student: ${studentId}
Programme: MSc Cyber Security
Semester: 1`;
  const contexts: Record<string, { text: string; source: AcademicSource }> = {
    exam: {
      text: `${student}
Next exam: Cyber Security on 18 September at 10:30 AM, Room 204.
Exam guidance: carry your university ID card and arrive 15 minutes early.`,
      source: { title: "Examination Schedule", type: "academic_document" },
    },
    attendance: {
      text: `${student}
Overall attendance: 82%, currently in good standing.
Cloud Security attendance is close to the warning threshold.`,
      source: { title: "Student Attendance Record", type: "student_record" },
    },
    assignment: {
      text: `${student}
There are 2 pending assignments. Network Security is due this week.`,
      source: { title: "Assignment Tracker", type: "student_record" },
    },
    timetable: {
      text: `${student}
The timetable is available for the current semester. No additional timetable entries are available in the demo record.`,
      source: { title: "Semester Timetable", type: "academic_document" },
    },
    notice: {
      text: `${student}
Recent notices include examination hall guidelines, extended library hours during exam week, and the semester project submission window.`,
      source: { title: "Student Notices", type: "academic_document" },
    },
    event: {
      text: `${student}
There are 3 upcoming academic events this month.`,
      source: { title: "Academic Events Calendar", type: "academic_document" },
    },
    library: {
      text: `${student}
Library information is available through the university library catalogue. No specific book availability was found for this question.`,
      source: { title: "University Library Catalogue", type: "academic_document" },
    },
    syllabus: {
      text: `${student}
Syllabus details are available for the MSc Cyber Security Semester 1 modules. No specific module outline was found for this question.`,
      source: { title: "MSc Cyber Security Syllabus", type: "academic_document" },
    },
    academic_policy: {
      text: `${student}
The available examination guidance says to carry a university ID card and arrive 15 minutes early. No broader policy was found for this question.`,
      source: { title: "Academic Policies and Guidelines", type: "academic_document" },
    },
    study_help: {
      text: `${student}
The Academic Copilot can explain technical concepts and help create study plans. University-specific claims must be supported by an academic source.`,
      source: { title: "Academic Study Support", type: "academic_document" },
    },
    general_academic: {
      text: `${student}
Available student information includes the current programme, semester, examinations, attendance, assignments, notices, events, and study support.`,
      source: { title: "Student Academic Overview", type: "student_record" },
    },
  };
  const result = contexts[intent];
  return result ? { text: result.text, sources: [result.source] } : { text: "", sources: [] };
}
