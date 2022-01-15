const e = require('express');
const express = require('express');
const Data = require('./Component/Data');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (request, respond) => {
  respond.sendFile(path.resolve(__dirname, './Component/Home.html'));
});
app.get('/api/students', (request, respond) => {
  console.log('All student record');
  respond.send({ response: 'true', data: Data });
});
app.get('/api/student', (request, respond) => {
  const { name } = request.query;
  let AllData = [...Data];
  if (name) {
    AllData = AllData.filter((item) => {
      return item.name.startsWith(name);
    });
  }
  respond.send({ response: 'true', data: AllData });
});
app.get('/api/students/Subject', (request, respond) => {
  const { subject } = request.query;
  let enrollStudent = [...Data];
  if (subject) {
    SubjectWiseFilter = enrollStudent.filter((item) => item.study === subject);
    Student = SubjectWiseFilter.map((item) => {
      const { id, name, study } = item;
      return { id, name, study };
    });
  }
  respond.send({ response: 'true', data: Student });
});
app.get('/api/student/hobbies', (request, respond) => {
  const { name } = request.query;
  let FindStudent = [...Data];
  if (name) {
    student = FindStudent.find((item) => item.name === name);
  }
  if (student.hasOwnProperty('hobbies')) {
    respond.send({
      response: 'true',
      data: { name: student.name, hobbies: student.hobbies },
    });
  } else {
    respond.send({ response: 'false', data: `${student.name} has no hobbies` });
  }
});
// to insert student data
app.post('/api/student', (request, respond) => {
  const { id, study, resident, name, hobbies, moto } = request.body;
  if (name) {
    const NewUser = {
      id: id,
      name: name,
      resident: resident,
      study: study,
      hobbies: hobbies,
      moto: moto,
    };
    respond.send({ respnse: 'true', data: NewUser });
  } else {
    respond.send('please enter the student data');
  }
});
app.listen(8080, () => {
  console.log('Server Started');
});
// to update student record
app.put('/api/student/name=:name', (request, respond) => {
  const { name } = request.params;
  const { resident } = request.body;
  let AllData = [...Data];
  if (name) {
    student = AllData.find((item) => item.name === name);
  }
  const updatedRecord = {
    id: student.id,
    name: student.name,
    resident: resident,
    study: student.study,
    hobbies: student.hobbies,
    moto: student.moto,
  };
  respond.send({ response: 'true', data: updatedRecord });
});
app.delete('/api/student/name=:name', (request, respond) => {
  const { name } = request.params;
  let AllData = [...Data];
  if (name) {
    student = AllData.filter((item) => item.name !== name);
    return respond.send({ response: 'true', data: student });
  }
});
