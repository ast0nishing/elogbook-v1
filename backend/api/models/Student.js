export default function (sequalize, Sequalize) {
  const Student = sequalize.define("student", {
    id: { type: Sequalize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequalize.STRING, allowNull: false },
    address: { type: Sequalize.STRING },
    phoneNumber: { type: Sequalize.INTEGER },
    email: { type: Sequalize.STRING },
  });
  return Student;
}
