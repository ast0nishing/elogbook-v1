/** @format */
import moment from "moment";
export const userData = [
  {
    name: "Jan",
    "Active User": 4000,
  },
  {
    name: "Feb",
    "Active User": 3000,
  },
  {
    name: "Mar",
    "Active User": 5000,
  },
  {
    name: "Apr",
    "Active User": 4000,
  },
  {
    name: "May",
    "Active User": 3000,
  },
  {
    name: "Jun",
    "Active User": 2000,
  },
  {
    name: "Jul",
    "Active User": 4000,
  },
  {
    name: "Agu",
    "Active User": 3000,
  },
  {
    name: "Sep",
    "Active User": 4000,
  },
  {
    name: "Oct",
    "Active User": 1000,
  },
  {
    name: "Nov",
    "Active User": 4000,
  },
  {
    name: "Dec",
    "Active User": 3000,
  },
];

export const courseData = [
  {
    name: "Jan",
    Sales: 4000,
  },
  {
    name: "Feb",
    Sales: 3000,
  },
  {
    name: "Mar",
    Sales: 5000,
  },
];

export const logbooks = [
  {
    class: "6",
    fromWeek: "1",
    toWeek: "2",
    subjects: [
      {
        course: "Data Science",
        teacher: "Giang",
        block: [
          {
            weekDay: "Monday",
            time: "8:00",
            comment: "Good",
            grade: "A",
          },
          {
            weekDay: "Monday",
            time: "10:00",
            comment: "Good",
            grade: "A",
          },
        ],
      },
      {
        course: "Data Analysis",
        teacher: "Giang",
        block: [
          {
            weekDay: "Monday",
            time: "8:00",
            comment: "Good",
            grade: "A",
          },
          {
            weekDay: "Monday",
            time: "10:00",
            comment: "Good",
            grade: "A",
          },
        ],
      },
    ],
  },
  {
    class: "6",
    fromWeek: "1",
    toWeek: "-1",
    subjects: [
      {
        course: "Data Science",
        teacher: "Giang",
        block: [
          {
            weekDay: "Monday",
            time: "8:00",
            comment: "NA",
            grade: "NA",
          },
          {
            weekDay: "Monday",
            time: "10:00",
            comment: "NA",
            grade: "NA",
          },
        ],
      },
      {
        course: "Data Analysis",
        teacher: "Giang",
        block: [
          {
            weekDay: "Monday",
            time: "8:00",
            comment: "NA",
            grade: "NA",
          },
          {
            weekDay: "Monday",
            time: "10:00",
            comment: "NA",
            grade: "NA",
          },
        ],
      },
    ],
  },
];

export const lessons = [
  {
    id: "1",
    name: "Introduction 1",
    stt: "1",
    course: "Data science",
  },
  {
    id: "2",
    name: "Introduction 1",
    stt: "2",
    course: "Data science",
  },
  {
    id: "3",
    name: "Introduction 1",
    stt: "1",
    course: "Data analysis",
  },
  {
    id: "4",
    name: "Introduction 2",
    stt: "2",
    course: "Data analysis",
  },
];

export const courses = [
  {
    id: "1",
    code: "1",
    name: "Data Science",
  },
  {
    id: "2",
    code: "2",
    name: "Data Analysis",
  },
  {
    id: "3",
    code: "3",
    name: "Data Science",
  },
];

export const classes = [
  {
    id: "1",
    school: "TTS",
    name: "6",
    academicyear: "2019-2020",
  },
  {
    id: "2",
    school: "TTS",
    name: "7",
    academicyear: "2019-2020",
  },
  {
    id: "3",
    school: "TPMS",
    name: "6",
    academicyear: "2019-2020",
  },
  {
    id: "4",
    school: "TPMS",
    name: "7",
    academicyear: "2019-2020",
  },
];

export const schools = [
  {
    id: "1",
    username: "TTS",
    password: "12345",
    name: "TTS",
    role: "school",
    province: "Vinh Long",
    district: "Mang Thit",
    town: "Cai Nhum",
    street: "NA",
    streetNo: "NA",
  },
  {
    id: "2",
    username: "TPMS",
    password: "12345",
    name: "TPMS",
    role: "school",
    province: "Vinh Long",
    district: "Mang Thit",
    town: "Cai Nhum",
    street: "NA",
    streetNo: "NA",
  },
];

export const teachers = [
  {
    id: "1",
    username: "Giang",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "teacher",
    major: "Data Science",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "6",
  },
  {
    id: "2",
    username: "Nguyen",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "teacher",
    major: "Data Analysis",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "7",
  },
  {
    id: "3",
    username: "Tan",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "teacher",
    major: "Data Science",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "6",
  },
  {
    id: "4",
    username: "Thanh",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "teacher",
    major: "Data Science",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "7",
  },
];

export const students = [
  {
    id: "1",
    username: "Giang",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "6",
  },
  {
    id: "2",
    username: "Nguyen",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "6",
  },
  {
    id: "3",
    username: "Tan",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "7",
  },
  {
    id: "4",
    username: "Thanh",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TPMS",
    class: "7",
  },
  {
    id: "5",
    username: "Hgnaig",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "6",
  },
  {
    id: "6",
    username: "Hnaht",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "6",
  },
  {
    id: "7",
    username: "Nat",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "7",
  },
  {
    id: "8",
    username: "Neuygn",
    password: "12345",
    name: "Nguyen Tan Thanh Giang",
    role: "student",
    address: "Vinh Long",
    phoneNumber: "0354002059",
    email: "nttg8100@gmail.com",
    school: "TTS",
    class: "7",
  },
];

export const timetables = [
  {
    monday: [
      {
        id: 1,
        name: "Homework",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },

      {
        id: 2,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T09:30:00"),
        endTime: moment("2018-02-23T11:00:00"),
      },
      {
        id: 3,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T15:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
  },
  {
    tuesday: [
      {
        id: 5,
        name: "Homework",
        type: "custom",
        startTime: moment("2018-02-22T09:30:00"),
        endTime: moment("2018-02-22T11:30:00"),
      },
      {
        id: 6,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T12:00:00"),
        endTime: moment("2018-02-23T13:00:00"),
      },
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T13:30:00"),
        endTime: moment("2018-02-23T14:30:00"),
      },
      {
        id: 8,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T15:30:00"),
        endTime: moment("2018-02-23T17:30:00"),
      },
    ],
  },
  {
    wednesday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T13:30:00"),
        endTime: moment("2018-02-23T14:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
  },
  {
    thursday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T09:30:00"),
        endTime: moment("2018-02-23T12:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T18:30:00"),
      },
    ],
    friday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T14:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
  },
  {
    saturday: [
      {
        id: 7,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T08:30:00"),
        endTime: moment("2018-02-23T09:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T16:30:00"),
        endTime: moment("2018-02-22T17:30:00"),
      },
    ],
  },
  { sunday: [] },
];
