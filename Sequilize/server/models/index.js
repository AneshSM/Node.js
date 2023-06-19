const { DataTypes, Model, Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(
  "sequelize_sample_2",
  "postgres",
  "AnePsql204",
  {
    dialect: "postgres",
    logging: false,
  }
);

const user = sequelize.define(
  "users",
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  },
  {
    timestamps: false,
  }
);

// user
//   .sync()
//   .then(() => {
//     const buildANDsave = async () => {
//       const user1 = user.build({
//         username: "user1",
//         password: "user123",
//         age: 20,
//       });
//       await user1.save();
//     };

//     const create = async () => {
//       return user.create({
//         username: "user2",
//         password: "user321",
//         age: 20,
//       });
//     };

//     const getData = async () => {
//       const data = await user.findAll({
//         attributes: [
//           "username",
//           [sequelize.fn("SUM", sequelize.col("uid")), "sum_users"],
//         ],
//         group: "username",
//       });
//       data.forEach((value) => console.log(value.toJSON()));
//     };

//     // user.destroy({ truncate: true });
//   })
//   .catch((err) => console.log(err));

const Student = sequelize.define(
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

Student.sync({ alter: true })
  .then(() => {
    console.log("student model synced successfully!");

    // bulk create
    // Student.bulkCreate([
    //   {
    //     name: "abcd",
    //     favorite_class: "Electrical",
    //     school_year: 2000,
    //     subscribed: true,
    //   },
    //   {
    //     name: "efgh",
    //     school_year: 2005,
    //     subscribed: true,
    //   },
    //   {
    //     name: "ijkl",
    //     favorite_class: "Electrical",
    //     school_year: 2002,
    //     subscribed: false,
    //   },
    //   {
    //     name: "mnop",
    //     school_year: 2009,
    //     subscribed: true,
    //   },
    //   {
    //     name: "qrst",
    //     school_year: 2010,
    //     subscribed: false,
    //   },
    // ]);

    // delete all records
    // Student.destroy({ truncate: true });

    return Student.findAll({
      where: {
        [Op.or]: {
          favorite_class: "Computer Science",
          subscribed: true,
        },
      },
    });
  })
  .then((data) => {
    console.log(
      "Name of every student whose favorite class is computer science or they are subscribed"
    );
    data.forEach((value) => console.log(value.toJSON()));
  })
  .then((data) => {})
  .catch((err) => console.log(err));
