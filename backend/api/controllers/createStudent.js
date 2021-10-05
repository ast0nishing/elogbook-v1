// username format: firstname.lastname.yield@schoolshortname

const usernameGenerator = async (firstname, lastname, yield, schoolShort) => {
  username = "afs";
  return username;
};

export default async (students, s_class, school, db) => {
  students.forEach(async (student) => {
    const { name, phoneNumber } = student;
    if (student.name & student.phoneNumber) console.log(student);
  });
};
