module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "students",
    {
      student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 20],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
        allowNull: false,
      },
      favorite_class: {
        type: DataTypes.STRING,
        defaultValue: "Computer science",
      },
      school_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  const initializeStudent = () => {
    student
      .sync({ alter: true })
      .then(() => {
        console.log("student model synced successfully!");

        // bulk create
        const bulkCreate = () => {
          student.bulkCreate([
            {
              name: "abcd",
              favorite_class: "Electrical",
              school_year: 2000,
              subscribed: true,
              age: 25,
              userUid: 41,
            },
            {
              name: "efgh",
              school_year: 2005,
              subscribed: true,
              userUid: 42,
            },
            {
              name: "ijkl",
              favorite_class: "Electrical",
              school_year: 2002,
              subscribed: false,
              age: 18,
              userUid: 43,
            },
            {
              name: "mnop",
              school_year: 2009,
              subscribed: true,
              age: 21,
              userUid: 44,
            },
          ]);
        };
        // delete all records
        const destroy = () => {
          student.destroy({ truncate: true });
        };

        // bulkCreate();

        //   student.findAll({
        //     attributes: ["name"],
        //     where: {
        //       [Op.or]: {
        //         favorite_class: "Computer Science",
        //         subscribed: true,
        //       },
        //     },
        //   });
        // })
        // .then((data) => {
        //   console.log(
        //     "Name of every student whose favorite class is computer science or they are subscribed"
        //   );
        //   data.forEach((value) => console.log(value.toJSON()));
        //   student.findAll({
        //     attributes: [
        //       "school_year",
        //       [sequelize.fn("COUNT", sequelize.col("student_id")), "num_students"],
        //     ],
        //     group: "school_year",
        //   });
        // })
        // .then((data) => {
        //   console.log("Total number of student in each school year:");
        //   data.forEach((value) => console.log(value.toJSON()));
        //
      })
      .catch((err) => console.log(err));
  };
  return student;
};
